import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    const { data, error } = await resetPassword(email);

    if (error) {
      setErrorMsg(error.message || 'Failed to send reset link.');
      setLoading(false);
    } else {
      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <div className="auth-container">
      {/* Background glow effects */}
      <div className="auth-glow-1"></div>
      <div className="auth-glow-2"></div>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="auth-header">
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">
            Enter your email to receive a recovery link.
          </p>
        </div>

        {errorMsg && (
          <div className="auth-alert auth-alert-error">
            <AlertCircle className="auth-alert-icon" size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {success && (
          <div className="auth-alert auth-alert-success">
            <CheckCircle className="auth-alert-icon" size={16} />
            <div>
              <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Reset Link Sent</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                [Simulated] A password recovery link has been printed to the developer console for {email}.
              </p>
            </div>
          </div>
        )}

        {!success ? (
          <form onSubmit={handleReset} className="auth-form">
            <div className="auth-form-group">
              <label className="auth-label" htmlFor="email">Email Address</label>
              <div className="auth-input-wrapper">
                <input
                  id="email"
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <Mail className="auth-input-icon" size={18} />
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-spinner"></span>
              ) : (
                'Send Recovery Link'
              )}
            </button>
          </form>
        ) : (
          <button 
            type="button" 
            className="auth-submit-btn" 
            style={{ background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', boxShadow: 'none' }}
            onClick={() => {
              setSuccess(false);
              setEmail('');
            }}
          >
            Send Another Link
          </button>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/signin" className="auth-forgot-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
