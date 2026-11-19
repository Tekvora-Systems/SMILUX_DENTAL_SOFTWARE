const nodemailer = require('nodemailer');

/**
 * Centralized email service for Smilux.
 *
 * - getTransporter() lazily builds a cached nodemailer transport from SMTP_*
 *   env vars. If no credentials are configured it falls back to an Ethereal
 *   test inbox (dev only) so the app still "sends" mail you can preview.
 * - sendEmail() is the low-level sender used by every template helper below.
 * - The helpers (sendLoginOtpEmail, sendWelcomeEmail, sendPasswordResetEmail)
 *   are the ones auth flows should call. They never throw — failures are
 *   logged so a mail outage never blocks an auth request.
 */

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '10', 10);
const BRAND = '#118bb0';
const FROM = process.env.SMTP_FROM || '"Smilux" <noreply@smilux.co.ke>';

let _transporter = null;
let _etherealInfo = null;

async function getTransporter() {
  if (_transporter) return _transporter;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    return _transporter;
  }

  // Dev fallback: auto-create an Ethereal test account
  const testAccount = await nodemailer.createTestAccount();
  _transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  _etherealInfo = testAccount;
  console.log('\n📧 Ethereal test account created (no SMTP_USER/SMTP_PASS set):');
  console.log('   User:', testAccount.user);
  console.log('   Pass:', testAccount.pass);
  console.log('   Preview: https://ethereal.email\n');
  return _transporter;
}

/**
 * Low-level send. Resolves to the nodemailer `info` object (or null on
 * failure). Callers that need the message id / preview url can use it.
 */
async function sendEmail({ to, subject, text, html }) {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({ from: FROM, to, subject, text, html });

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log(`📧 Email sent (Ethereal preview): ${previewUrl}`);
  } else if (process.env.NODE_ENV !== 'production') {
    console.log(`📧 Email sent to ${to}: ${subject}`);
  }
  return info;
}

// ─── Branded HTML wrapper ──────────────────────────────────────────────────
function wrapHtml({ preheader, body }) {
  return `
  <div style="background:#f4f1fb;padding:32px 0;font-family:'Lexend',Segoe UI,Arial,sans-serif;color:#222323">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto">
      <tr><td style="padding:0 16px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e9e4f7;border-radius:14px;overflow:hidden;box- :0 4px 20px rgba(123,77,255,0.08)">
          <!-- Header -->
          <tr><td style="background:linear-gradient(135deg,#9C7AFF,#6C44E0);padding:24px 28px">
            <span style="font-size:18px;font-weight:800;color:#ffffff;letter-spacing:.2px">Smilux</span>
            <span style="display:block;font-size:11px;color:#ffffffcc;margin-top:2px">Dental Practice Management</span>
          </td></tr>
          <!-- Body -->
          <tr><td style="padding:28px 28px 8px">
            <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader || ''}</div>
            ${body}
          </td></tr>
          <!-- Footer -->
          <tr><td style="padding:16px 28px 28px;border-top:1px solid #f1edfa">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6">
              You're receiving this email because you have an account with Smilux.
              If you didn't take this action, you can safely ignore this message.
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:#cbd5e1">— Smilux Team · Tekvora Systems Ltd, Nairobi</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </div>`;
}

function codeBox(code) {
  return `
    <div style="background:#f6f3ff;border:1px solid #e9e4f7;border-radius:10px;padding:22px 16px;text-align:center;margin:20px 0">
      <span style="font-size:34px;font-weight:800;letter-spacing:10px;color:#0f5d77">${code}</span>
    </div>`;
}

// ─── Template helpers (never throw) ───────────────────────────────────────
async function sendLoginOtpEmail(email, name, otp) {
  try {
    const body = `
      <h2 style="margin:0 0 6px;font-size:20px;color:#222323">Your login code</h2>
      <p style="margin:0 0 8px;color:#595959;line-height:1.6">Hi ${name}, use the code below to finish signing in to your Smilux account.</p>
      ${codeBox(otp)}
      <p style="margin:12px 0 0;color:#94a3b8;font-size:12px">This code expires in <strong>${OTP_EXPIRY_MINUTES} minutes</strong>. Never share it with anyone.</p>`;
    await sendEmail({
      to: email,
      subject: `Your Smilux login code: ${otp}`,
      text: `Hi ${name},\n\nYour one-time login code is: ${otp}\n\nIt expires in ${OTP_EXPIRY_MINUTES} minutes. If you didn't request this, you can ignore this email.\n\n— Smilux Team`,
      html: wrapHtml({ preheader: `Your Smilux login code is ${otp}`, body }),
    });
  } catch (err) {
    console.error('Failed to send login OTP email:', err.message);
  }
}

async function sendWelcomeEmail(email, name, clinicName) {
  try {
    const body = `
      <h2 style="margin:0 0 6px;font-size:20px;color:#222323">Welcome to Smilux 🎉</h2>
      <p style="margin:0 0 8px;color:#595959;line-height:1.6">Hi ${name}, your clinic <strong>${clinicName}</strong> is all set. You can now manage appointments, patients, dental charting, M-Pesa payments, and more — all from one place.</p>
      <p style="margin:16px 0 0"><a href="${process.env.APP_URL || 'http://localhost:4200'}/login" style="display:inline-block;background:#118bb0;color:#fff;text-decoration:none;font-weight:600;font-size:13px;padding:11px 20px;border-radius:8px">Go to my dashboard</a></p>
      <p style="margin:18px 0 0;color:#94a3b8;font-size:12px">Need help getting started? Reply to this email and our team will reach out.</p>`;
    await sendEmail({
      to: email,
      subject: `Welcome to Smilux — ${clinicName} is ready`,
      text: `Hi ${name},\n\nWelcome to Smilux! Your clinic "${clinicName}" is all set.\nYou can sign in at ${process.env.APP_URL || 'http://localhost:4200'}/login.\n\n— Smilux Team`,
      html: wrapHtml({ preheader: `Welcome to Smilux — ${clinicName} is ready`, body }),
    });
  } catch (err) {
    console.error('Failed to send welcome email:', err.message);
  }
}

async function sendPasswordResetEmail(email, name, otp) {
  try {
    const body = `
      <h2 style="margin:0 0 6px;font-size:20px;color:#222323">Reset your password</h2>
      <p style="margin:0 0 8px;color:#595959;line-height:1.6">Hi ${name}, we received a request to reset the password for your Smilux account. Use the code below to choose a new password.</p>
      ${codeBox(otp)}
      <p style="margin:12px 0 0;color:#94a3b8;font-size:12px">This code expires in <strong>${OTP_EXPIRY_MINUTES} minutes</strong>. If you didn't ask to reset your password, you can safely ignore this email.</p>`;
    await sendEmail({
      to: email,
      subject: `Reset your Smilux password`,
      text: `Hi ${name},\n\nYour password reset code is: ${otp}\n\nIt expires in ${OTP_EXPIRY_MINUTES} minutes. If you didn't request this, you can ignore this email.\n\n— Smilux Team`,
      html: wrapHtml({ preheader: `Your Smilux password reset code is ${otp}`, body }),
    });
  } catch (err) {
    console.error('Failed to send password reset email:', err.message);
  }
}

module.exports = {
  getTransporter,
  sendEmail,
  sendLoginOtpEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  OTP_EXPIRY_MINUTES,
};
