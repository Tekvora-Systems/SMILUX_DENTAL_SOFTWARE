import React, { useState, useRef, useEffect } from 'react';
import { LoginLayout } from './login.jsx';
import AuthErrorBanner from '../components/auth/AuthErrorBanner.jsx';
import Button from '../components/UI/Button.jsx';
import SEO from '../components/common/SEO.jsx';
import api from '../api/axios';

const OTP_LENGTH = 6;

function OtpInput({ value, onChange, disabled }) {
  const inputs = useRef([]);

  const digits = value.padEnd(OTP_LENGTH, '').split('').slice(0, OTP_LENGTH);

  const handleKey = (e, idx) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = digits.slice();
      if (next[idx]) {
        next[idx] = '';
        onChange(next.join(''));
      } else if (idx > 0) {
        next[idx - 1] = '';
        onChange(next.join(''));
        inputs.current[idx - 1]?.focus();
      }
      return;
    }

    if (e.key === 'ArrowLeft' && idx > 0) {
      inputs.current[idx - 1]?.focus();
      return;
    }
    if (e.key === 'ArrowRight' && idx < OTP_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
      return;
    }
  };

  const handleChange = (e, idx) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) return;

    // Handle paste: fill from idx
    if (raw.length > 1) {
      const next = digits.slice();
      let pos = idx;
      for (const ch of raw) {
        if (pos >= OTP_LENGTH) break;
        next[pos++] = ch;
      }
      onChange(next.join(''));
      const focusAt = Math.min(idx + raw.length, OTP_LENGTH - 1);
      inputs.current[focusAt]?.focus();
      return;
    }

    const next = digits.slice();
    next[idx] = raw[0];
    onChange(next.join(''));
    if (idx < OTP_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2.5">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => (inputs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKey(e, idx)}
          onFocus={(e) => e.target.select()}
          className={[
            'h-12 w-11 rounded border text-center text-xl font-bold tracking-widest',
            'border-slate-300 bg-white text-slate-900',
            'focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none',
            'transition-all duration-150',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            digit ? 'border-blue-400 bg-blue-50' : ''
          ].join(' ')}
        />
      ))}
    </div>
  );
}

export default function OtpVerifyPage({ email, onLoginSuccess, onNavigate, onOpenReferral }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Countdown for resend button
  const [countdown, setCountdown] = useState(60);
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const maskedEmail = email
    ? email.replace(/^(.{2})(.+)(@.+)$/, (_, a, b, c) => a + '*'.repeat(b.length) + c)
    : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (otp.length < OTP_LENGTH) {
      setError('Please enter the full 6-digit code.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/verify-otp', { email, otp });
      if (res.data?.token) {
        localStorage.setItem('smilux_token', res.data.token);
        localStorage.setItem('smilux_user', JSON.stringify(res.data.user));
      }
      if (onLoginSuccess) onLoginSuccess(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code. Please try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setResending(true);
    setError('');
    setSuccessMsg('');
    try {
      await api.post('/auth/resend-otp', { email });
      setSuccessMsg('A new code has been sent to your email.');
      setCountdown(60);
      setOtp('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <LoginLayout onOpenReferral={onOpenReferral}>
      <SEO title="Verify Login Code" description="Enter your one-time code to access Smilux." />
      <div className="space-y-5">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 border border-blue-100">
            <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Check your email</h2>
          <p className="mt-1 text-sm text-slate-500">
            We sent a 6-digit code to <span className="font-medium text-slate-700">{maskedEmail}</span>
          </p>
        </div>

        <AuthErrorBanner error={error} onDismiss={() => setError('')} />

        {successMsg && (
          <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <OtpInput value={otp} onChange={setOtp} disabled={loading} />

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={otp.length < OTP_LENGTH}
            className="w-full"
          >
            {loading ? 'Verifying…' : 'Verify & Sign In'}
          </Button>
        </form>

        {/* Resend */}
        <div className="text-center text-sm text-slate-500">
          Didn&apos;t receive it?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || resending}
            className={[
              'font-semibold',
              countdown > 0 || resending
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-blue-600 hover:underline cursor-pointer'
            ].join(' ')}
          >
            {resending ? 'Sending…' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
          </button>
        </div>

        {/* Back to login */}
        <div className="text-center pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('login')}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            ← Back to sign in
          </button>
        </div>
      </div>
    </LoginLayout>
  );
}
