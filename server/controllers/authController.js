const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Clinic = require('../models/Clinic');
const Branch = require('../models/Branch');

const secret = process.env.JWT_SECRET || 'smilux_secret_key_2026';
const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '10', 10);

// ─── Mailer ────────────────────────────────────────────────────────────────
let _transporter = null;

async function getTransporter() {
  if (_transporter) return _transporter;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  } else {
    // Dev fallback: auto-create an Ethereal test account
    const testAccount = await nodemailer.createTestAccount();
    _transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass }
    });
    console.log('\n📧 Ethereal test account created:');
    console.log('   User:', testAccount.user);
    console.log('   Pass:', testAccount.pass);
    console.log('   Preview URL base: https://ethereal.email\n');
  }

  return _transporter;
}

async function sendOTPEmail(email, name, otp) {
  try {
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Smilux" <noreply@smilux.co.ke>',
      to: email,
      subject: `Your Smilux login code: ${otp}`,
      text: `Hi ${name},\n\nYour one-time login code is: ${otp}\n\nThis code expires in ${OTP_EXPIRY_MINUTES} minutes.\n\nIf you didn't request this, please ignore this email.\n\n— Smilux Team`,
      html: `
        <div style="font-family:sans-serif;max-width:420px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:8px">
          <h2 style="color:#1e3a5f;margin:0 0 8px">Your login code</h2>
          <p style="color:#475569;margin:0 0 20px">Hi ${name}, enter this code to complete your sign-in.</p>
          <div style="background:#f1f5f9;border-radius:6px;padding:20px;text-align:center;letter-spacing:8px;font-size:32px;font-weight:700;color:#0f172a">${otp}</div>
          <p style="color:#94a3b8;font-size:13px;margin:16px 0 0">Expires in <strong>${OTP_EXPIRY_MINUTES} minutes</strong>. Do not share this code.</p>
        </div>
      `
    });

    // Print preview link when using Ethereal
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`📧 OTP email preview: ${previewUrl}`);
    }
  } catch (err) {
    console.error('Failed to send OTP email:', err.message);
    // Don't throw — log and continue; OTP is still in DB
  }
}

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
    await sendOTPEmail(user.email, user.name, otp);

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

    await sendOTPEmail(user.email, user.name, otp);

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
