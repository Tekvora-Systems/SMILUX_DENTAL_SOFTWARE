const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  sendLoginOtpEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  OTP_EXPIRY_MINUTES,
} = require('../services/emailService');
const User = require('../models/User');
const Clinic = require('../models/Clinic');
const Branch = require('../models/Branch');

const secret = process.env.JWT_SECRET || 'smilux_secret_key_2026';

// ─── Step 1: Verify credentials → generate & send OTP ─────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).populate('clinicId');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    // Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    await user.save();

    // Send OTP email (non-blocking on failure)
    await sendLoginOtpEmail(user.email, user.name, otp);

    // In development, also log the OTP to console so you can test without email
    if (process.env.NODE_ENV !== 'production') {
      console.log(`\n🔑 OTP for ${user.email}: ${otp}\n`);
    }

    res.json({
      otpRequired: true,
      email: user.email,
      message: `A verification code has been sent to ${user.email}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Step 2: Verify OTP → issue JWT ───────────────────────────────────────
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).populate('clinicId');
    if (!user) {
      return res.status(401).json({ message: 'Invalid request' });
    }

    if (!user.otp || user.otp !== String(otp).trim()) {
      return res.status(401).json({ message: 'Invalid verification code' });
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      // Clear expired OTP
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      return res.status(401).json({ message: 'Verification code has expired. Please sign in again.' });
    }

    // Clear OTP fields and update lastLogin
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clinicId: user.clinicId?._id || user.clinicId,
        branchId: user.branchId
      },
      secret,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clinic: user.clinicId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Resend OTP ────────────────────────────────────────────────────────────
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid request' });
    }

    // Rate-limit: allow resend only if previous OTP is older than 60 seconds
    if (user.otpExpiry) {
      const secondsLeft = (user.otpExpiry.getTime() - Date.now()) / 1000;
      const totalWindow = OTP_EXPIRY_MINUTES * 60;
      const secondsSinceSent = totalWindow - secondsLeft;
      if (secondsSinceSent < 60) {
        return res.status(429).json({ message: `Please wait ${Math.ceil(60 - secondsSinceSent)} seconds before requesting a new code.` });
      }
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    await user.save();

    await sendLoginOtpEmail(user.email, user.name, otp);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`\n🔑 Resent OTP for ${user.email}: ${otp}\n`);
    }

    res.json({ message: 'A new verification code has been sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Register Clinic ───────────────────────────────────────────────────────
exports.registerClinic = async (req, res) => {
  try {
    const { clinicName, ownerName, email, password, phone } = req.body;
    if (!clinicName || !ownerName || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const code = clinicName.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) + Math.floor(100 + Math.random() * 900);

    const clinic = await Clinic.create({
      name: clinicName,
      code,
      phone,
      email: email.toLowerCase()
    });

    const branch = await Branch.create({
      clinicId: clinic._id,
      name: `${clinicName} Main Branch`,
      code: 'MAIN',
      phone,
      email: email.toLowerCase(),
      isMainBranch: true
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      clinicId: clinic._id,
      branchId: branch._id,
      name: ownerName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'ClinicOwner',
      phone
    });

    // Send a welcome email (fire-and-forget; never blocks registration)
    sendWelcomeEmail(user.email, user.name, clinic.name).catch(() => {});

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clinicId: clinic._id,
        branchId: branch._id
      },
      secret,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clinic
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Forgot password → email a reset code ──────────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Always respond 200 (don't leak which emails are registered)
    if (!email) {
      return res.json({ message: 'If that email exists, reset instructions have been sent.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.isActive) {
      return res.json({ message: 'If that email exists, reset instructions have been sent.' });
    }

    // Rate-limit: one reset request per 60 seconds
    if (user.resetOtpRequestedAt) {
      const since = (Date.now() - user.resetOtpRequestedAt.getTime()) / 1000;
      if (since < 60) {
        return res.json({ message: 'If that email exists, reset instructions have been sent.' });
      }
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    user.resetOtpRequestedAt = new Date();
    await user.save();

    await sendPasswordResetEmail(user.email, user.name, otp);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`\n🔑 Reset code for ${user.email}: ${otp}\n`);
    }

    res.json({ message: 'If that email exists, reset instructions have been sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Reset password → verify code & set new password ──────────────────────
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, reset code, and new password are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid or expired reset code' });
    }

    if (!user.resetOtp || user.resetOtp !== String(otp).trim()) {
      return res.status(401).json({ message: 'Invalid reset code' });
    }
    if (!user.resetOtpExpiry || user.resetOtpExpiry < new Date()) {
      user.resetOtp = undefined;
      user.resetOtpExpiry = undefined;
      await user.save();
      return res.status(401).json({ message: 'Reset code has expired. Please request a new one.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    // Clear reset fields + login OTP for safety
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    user.resetOtpRequestedAt = undefined;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Your password has been reset. You can now sign in.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Dev-only: return current OTP for a user (never in production) ─────────
exports.devGetOtp = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: 'Not found' });
  }
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const user = await User.findOne({ email: email.toLowerCase() }).select('otp otpExpiry');
    if (!user || !user.otp) return res.status(404).json({ message: 'No active OTP' });
    if (user.otpExpiry < new Date()) return res.status(410).json({ message: 'OTP expired' });
    res.json({ otp: user.otp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Get current user ──────────────────────────────────────────────────────
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('clinicId').select('-password -otp -otpExpiry');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
