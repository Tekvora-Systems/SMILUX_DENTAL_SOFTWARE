import React, { useState, useRef, useEffect } from 'react';
import { LoginLayout } from './login.jsx';
import { AuthInput, AuthPasswordField } from '../components/auth/AuthField.jsx';
import AuthErrorBanner from '../components/auth/AuthErrorBanner.jsx';
import Button from '../components/UI/Button.jsx';
import SEO from '../components/common/SEO.jsx';
import api from '../api/axios';

// ─── Step indicators ───────────────────────────────────────────────────────
function Steps({ current }) {
  const steps = ['Request', 'Verify', 'Reset'];
  return (
    <div className="flex items-center justify-center gap-0 mb-5">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = current > idx;
        const active = current === idx;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold border-2 transition-all duration-200
                ${done ? 'bg-[#118bb0] border-[#118bb0] text-white' :
                  active ? 'bg-white border-[#118bb0] text-[#118bb0]' :
                    'bg-white border-slate-200 text-slate-400'}`}>
                {done ? (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : idx}
              </div>
              <span className={`mt-1 text-[10px] font-semibold ${active ? 'text-[#118bb0]' : done ? 'text-[#118bb0]' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-[2px] w-10 mx-1 mb-4 rounded transition-all duration-300 ${done ? 'bg-[#118bb0]' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── OTP digit input ───────────────────────────────────────────────────────
function OtpInput({ value, onChange, disabled }) {
  const len = 6;
  const digits = value.split('');
  const refs = useRef([]);

  const handleKey = (e, i) => {
    if (e.key === 'Backspace') {
      if (digits[i]) {
        const next = digits.map((d, idx) => idx === i ? '' : d).join('');
        onChange(next);
      } else if (i > 0) {
        refs.current[i - 1]?.focus();
      }
      return;
    }
    if (e.key === 'ArrowLeft' && i > 0) { refs.current[i - 1]?.focus(); return; }
    if (e.key === 'ArrowRight' && i < len - 1) { refs.current[i + 1]?.focus(); return; }
  };

  const handleChange = (e, i) => {
    const ch = e.target.value.replace(/\D/g, '').slice(-1);
    const next = digits.map((d, idx) => idx === i ? ch : d);
    // fill remaining empties
    onChange(next.join(''));
    if (ch && i < len - 1) refs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, len);
    onChange(pasted.padEnd(len, '').slice(0, len));
    const focus = Math.min(pasted.length, len - 1);
    refs.current[focus]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center my-4">
      {Array.from({ length: len }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={digits[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKey(e, i)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="h-11 w-10 rounded-lg border-2 border-slate-200 bg-white text-center text-lg font-bold text-slate-900 outline-none transition-all focus:border-[#118bb0] focus:ring-2 focus:ring-[#118bb0]/20 disabled:opacity-50"
        />
      ))}
    </div>
  );
}

// ─── Resend countdown ──────────────────────────────────────────────────────
function ResendTimer({ onResend, loading }) {
  const [secs, setSecs] = useState(60);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (secs <= 0) return;
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);

  const handleResend = async () => {
    setResending(true);
    await onResend();
    setSecs(60);
    setResending(false);
  };

  if (secs > 0) {
    return (
      <p className="text-center text-xs text-slate-500 mt-1">
        Resend code in <span className="font-semibold text-[#118bb0]">{secs}s</span>
      </p>
    );
  }
  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={resending || loading}
      className="block w-full text-center text-xs font-semibold text-[#118bb0] hover:underline mt-1 disabled:opacity-50 cursor-pointer"
    >
      {resending ? 'Sending…' : 'Resend code'}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function ForgotPassword({ onNavigate, onOpenReferral }) {
  const [step, setStep] = useState(1);           // 1 = email, 2 = otp, 3 = new pw
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  // ── Step 1: request reset code ─────────────────────────────────────────
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: email.trim() });
      setStep(2);
    } catch (err) {
      // Always advance — server never reveals whether the email exists
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: verify the 6-digit code ───────────────────────────────────
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    if (otp.replace(/\D/g, '').length < 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }
    setLoading(true);
    try {
      // Lightweight check: attempt reset with a placeholder password just to
      // validate the code — we do the real reset on step 3.
      // Instead, just advance; the server will reject on step 3 if code is wrong.
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2 resend ──────────────────────────────────────────────────────
  const handleResend = async () => {
    setError('');
    setOtp('');
    try {
      await api.post('/auth/forgot-password', { email: email.trim() });
    } catch {
      // silent — server always returns 200
    }
  };

  // ── Step 3: set new password ───────────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', {
        email: email.trim(),
        otp: otp.replace(/\D/g, ''),
        newPassword,
      });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please start again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────
  if (done) {
    return (
      <LoginLayout onOpenReferral={onOpenReferral}>
        <SEO title="Password Reset" description="Your Smilux password has been reset." />
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200">
            <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Password reset!</h2>
            <p className="mt-1 text-xs text-slate-500">Your new password has been saved. You can now sign in.</p>
          </div>
          <Button variant="primary" className="w-full" onClick={() => onNavigate('login')}>
            Go to Sign In
          </Button>
        </div>
      </LoginLayout>
    );
  }

  return (
    <LoginLayout onOpenReferral={onOpenReferral}>
      <SEO title="Forgot Password" description="Reset your Smilux account password." />
      <div className="space-y-1">

        <div className="text-center mb-2">
          <h2 className="text-xl font-bold text-slate-900">Reset Password</h2>
          <p className="mt-1 text-xs text-slate-500">
            {step === 1 && 'Enter your account email to receive a reset code.'}
            {step === 2 && `Enter the 6-digit code sent to ${email}.`}
            {step === 3 && 'Choose a new password for your account.'}
          </p>
        </div>

        <Steps current={step} />

        <AuthErrorBanner error={error} onDismiss={() => setError('')} />

        {/* ── Step 1: Email ──────────────────────────────────────────── */}
        {step === 1 && (
          <form onSubmit={handleRequestCode} className="space-y-3" noValidate>
            <AuthInput
              id="fp-email"
              name="email"
              label="Email address"
              type="email"
              placeholder="doctor@clinic.co.ke"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            <Button type="submit" variant="primary" loading={loading} className="w-full font-semibold">
              {loading ? 'Sending code…' : 'Send Reset Code'}
            </Button>
          </form>
        )}

        {/* ── Step 2: OTP ───────────────────────────────────────────── */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="space-y-2" noValidate>
            <OtpInput value={otp} onChange={setOtp} disabled={loading} />
            <ResendTimer onResend={handleResend} loading={loading} />
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={otp.replace(/\D/g, '').length < 6}
              className="w-full font-semibold mt-2"
            >
              {loading ? 'Verifying…' : 'Verify Code'}
            </Button>
            <button
              type="button"
              onClick={() => { setStep(1); setOtp(''); setError(''); }}
              className="block w-full text-center text-xs text-slate-500 hover:text-slate-700 mt-1 cursor-pointer"
            >
              ← Use a different email
            </button>
          </form>
        )}

        {/* ── Step 3: New password ───────────────────────────────────── */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-3" noValidate>
            <AuthPasswordField
              id="fp-newpw"
              name="newPassword"
              label="New password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              visible={showPw}
              onToggleVisible={() => setShowPw((v) => !v)}
              toggleLabel="text"
              placeholder="At least 6 characters"
              required
            />
            <AuthPasswordField
              id="fp-confirmpw"
              name="confirmPassword"
              label="Confirm new password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              visible={showConfirm}
              onToggleVisible={() => setShowConfirm((v) => !v)}
              toggleLabel="text"
              placeholder="••••••••"
              required
            />
            <Button type="submit" variant="primary" loading={loading} className="w-full font-semibold">
              {loading ? 'Saving…' : 'Set New Password'}
            </Button>
          </form>
        )}

        <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-500">
          Remembered it?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-[#118bb0] hover:underline cursor-pointer"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </LoginLayout>
  );
}
