import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

const SignUp = () => {
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Toggle visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Strength score
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('Too short');

  // Status states
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password strength logic
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setStrengthLabel('Too short');
      return;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    setPasswordStrength(score);

    switch (score) {
      case 0:
      case 1:
        setStrengthLabel('Weak');
        break;
      case 2:
        setStrengthLabel('Fair');
        break;
      case 3:
        setStrengthLabel('Good');
        break;
      case 4:
        setStrengthLabel('Strong');
        break;
      default:
        setStrengthLabel('Too short');
    }
  }, [password]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validations
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const { data, error } = await signUp({ email, password, fullName });

    if (error) {
      setErrorMsg(error.message || 'Failed to create an account.');
      setLoading(false);
    } else {
      if (rememberMe) {
        localStorage.setItem('nexoresha_remember_email', email);
      } else {
        localStorage.removeItem('nexoresha_remember_email');
      }
      setLoading(false);
      navigate('/dashboard');
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMsg('');

    const { data, error } = await signInWithGoogle();

    if (error) {
      setErrorMsg(error.message || 'Google authentication failed.');
      setGoogleLoading(false);
    } else {
      setGoogleLoading(false);
      navigate('/dashboard');
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
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">
            Already have an account?
            <Link to="/signin" className="auth-subtitle-link">Sign In</Link>
          </p>
        </div>

        {errorMsg && (
          <div className="auth-alert auth-alert-error">
            <AlertCircle className="auth-alert-icon" size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSignUp} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label" htmlFor="fullName">Full Name</label>
            <div className="auth-input-wrapper">
              <input
                id="fullName"
                type="text"
                className="auth-input"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading || googleLoading}
                required
              />
              <User className="auth-input-icon" size={18} />
            </div>
          </div>

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
                disabled={loading || googleLoading}
                required
              />
              <Mail className="auth-input-icon" size={18} />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="password">Password</label>
            <div className="auth-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || googleLoading}
                required
              />
              <Lock className="auth-input-icon" size={18} />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Visual Password Strength Meter */}
            {password && (
              <div className="pw-strength-container">
                <div className="pw-strength-bar-wrapper">
                  <div className={`pw-strength-bar ${passwordStrength >= 1 ? (passwordStrength === 1 ? 'weak' : passwordStrength === 2 ? 'fair' : passwordStrength === 3 ? 'good' : 'strong') : ''}`}></div>
                  <div className={`pw-strength-bar ${passwordStrength >= 2 ? (passwordStrength === 2 ? 'fair' : passwordStrength === 3 ? 'good' : 'strong') : ''}`}></div>
                  <div className={`pw-strength-bar ${passwordStrength >= 3 ? (passwordStrength === 3 ? 'good' : 'strong') : ''}`}></div>
                  <div className={`pw-strength-bar ${passwordStrength >= 4 ? 'strong' : ''}`}></div>
                </div>
                <div className="pw-strength-text">
                  <span>Password strength:</span>
                  <span style={{ 
                    fontWeight: 600, 
                    color: passwordStrength === 1 ? '#d9534f' : passwordStrength === 2 ? '#f0ad4e' : passwordStrength === 3 ? '#5bc0de' : '#5cb85c' 
                  }}>
                    {strengthLabel}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="auth-input-wrapper">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading || googleLoading}
                required
              />
              <Lock className="auth-input-icon" size={18} />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="auth-extra-row">
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                className="auth-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading || googleLoading}
              />
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading || googleLoading}
          >
            {loading ? (
              <span className="btn-spinner"></span>
            ) : (
              <>
                Sign Up <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-separator">Or continue with</div>

        <button
          type="button"
          className="btn-google"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            <span className="btn-google-spinner"></span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default SignUp;
