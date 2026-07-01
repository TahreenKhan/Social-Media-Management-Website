import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  BarChart3, 
  Calendar, 
  Layers, 
  User, 
  Lock, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { HashLink as Link } from 'react-router-hash-link';
import { useAuth } from '../../hooks/useAuth';
import './Dashboard.css';

const Dashboard = () => {
  const { user, signOut, updateProfile, updatePassword } = useAuth();
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'settings'

  // Settings form states
  const [newName, setNewName] = useState(user?.user_metadata?.full_name || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status message states
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!newName) {
      setProfileError('Display Name cannot be empty.');
      return;
    }

    setProfileLoading(true);
    setProfileError('');
    setProfileSuccess(false);

    const { error } = await updateProfile(newName);

    if (error) {
      setProfileError(error.message || 'Failed to update profile.');
      setProfileLoading(false);
    } else {
      setProfileLoading(false);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 4000);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setPasswordError('Both fields are required.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess(false);

    const { error } = await updatePassword(newPassword);

    if (error) {
      setPasswordError(error.message || 'Failed to update password.');
      setPasswordLoading(false);
    } else {
      setPasswordLoading(false);
      setPasswordSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setTimeout(() => setPasswordSuccess(false), 4000);
    }
  };

  // Activity Timeline mock
  const activities = [
    { id: 1, text: "Scheduled 'Creative Reels Launch' for Instagram", time: "2 hours ago" },
    { id: 2, text: "Custom media engine pack: Premium Package selected", time: "1 day ago" },
    { id: 3, text: "Linked Google Analytics to social channels", time: "3 days ago" },
    { id: 4, text: "Account created successfully", time: "Just registered" },
  ];

  return (
    <div className="dashboard-container">
      {/* Soft background glows */}
      <div className="dashboard-glow"></div>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-glass">
            <div className="sidebar-profile">
              <div className="sidebar-avatar-wrapper">
                <img 
                  className="sidebar-avatar" 
                  src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`} 
                  alt={user?.user_metadata?.full_name} 
                />
              </div>
              <h3 className="sidebar-name">{user?.user_metadata?.full_name || 'Creative Partner'}</h3>
              <p className="sidebar-email">{user?.email}</p>
            </div>

            <nav className="sidebar-menu">
              <button 
                className={`sidebar-menu-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <LayoutDashboard size={18} />
                Overview
              </button>

              <button 
                className={`sidebar-menu-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={18} />
                Settings
              </button>

              <button 
                className="sidebar-menu-btn" 
                style={{ color: '#d9534f', marginTop: '2rem' }}
                onClick={signOut}
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Panel */}
        <div className="dashboard-main">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' ? (
              <motion.div
                key="overview"
                className="main-glass-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="panel-header">
                  <h2 className="panel-title">Creative Control Room</h2>
                  <p className="panel-subtitle">Welcome back, {user?.user_metadata?.full_name || 'Partner'}. Monitor your engine performance.</p>
                </div>

                {/* Metrics */}
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-icon-box">
                      <BarChart3 size={20} />
                    </div>
                    <div className="metric-info">
                      <span className="metric-label">Engagements</span>
                      <span className="metric-value">24.5K</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon-box">
                      <Calendar size={20} />
                    </div>
                    <div className="metric-info">
                      <span className="metric-label">Posts Scheduled</span>
                      <span className="metric-value">12 Posts</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon-box">
                      <Layers size={20} />
                    </div>
                    <div className="metric-info">
                      <span className="metric-label">Active Campaigns</span>
                      <span className="metric-value">3 Active</span>
                    </div>
                  </div>
                </div>

                {/* Detail Blocks */}
                <div className="dashboard-details-grid">
                  {/* Left Column: Recent Activities */}
                  <div className="detail-section">
                    <h3 className="detail-section-title">Timeline Updates</h3>
                    <div className="detail-card">
                      <div className="activity-list">
                        {activities.map((act) => (
                          <div key={act.id} className="activity-item">
                            <div className="activity-marker"></div>
                            <div className="activity-content">
                              <p className="activity-text">{act.text}</p>
                              <p className="activity-time">{act.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Engine package selection mock */}
                  <div className="detail-section">
                    <h3 className="detail-section-title">Your Engine</h3>
                    <div className="detail-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(139,0,0,0.1)', color: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <TrendingUp size={20} />
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Accelerated Tier</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Social Content Accelerator</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        Your customized social engine is active and scaling your reach. Next cycle renews in 14 days.
                      </p>
                      <Link 
                        to="/#build" 
                        className="settings-btn" 
                        style={{ fontSize: '0.75rem', padding: '0.6rem 1.2rem', width: '100%', justifyContent: 'center', textDecoration: 'none', display: 'inline-flex', boxSizing: 'border-box' }}
                      >
                        Configure Engine
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                className="main-glass-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="panel-header">
                  <h2 className="panel-title">Account Settings</h2>
                  <p className="panel-subtitle">Manage your profile information and credentials.</p>
                </div>

                <div className="dashboard-details-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  {/* Profile Edit Card */}
                  <div className="detail-section">
                    <h3 className="detail-section-title">Profile Metadata</h3>
                    <div className="detail-card">
                      {profileSuccess && (
                        <div className="auth-alert auth-alert-success" style={{ marginBottom: '1rem' }}>
                          <CheckCircle className="auth-alert-icon" size={16} />
                          <span>Profile metadata updated successfully.</span>
                        </div>
                      )}
                      {profileError && (
                        <div className="auth-alert auth-alert-error" style={{ marginBottom: '1rem' }}>
                          <AlertCircle className="auth-alert-icon" size={16} />
                          <span>{profileError}</span>
                        </div>
                      )}
                      
                      <form onSubmit={handleUpdateProfile} className="settings-form">
                        <div className="settings-input-group">
                          <label className="settings-label">Display Name</label>
                          <input 
                            type="text" 
                            className="settings-input" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                            placeholder="John Doe"
                            disabled={profileLoading}
                            required
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="settings-btn"
                          disabled={profileLoading}
                        >
                          {profileLoading ? <RefreshCw className="btn-spinner" size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <User size={14} />}
                          Save Profile
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Password Change Card */}
                  <div className="detail-section">
                    <h3 className="detail-section-title">Update Password</h3>
                    <div className="detail-card">
                      {passwordSuccess && (
                        <div className="auth-alert auth-alert-success" style={{ marginBottom: '1rem' }}>
                          <CheckCircle className="auth-alert-icon" size={16} />
                          <span>Security credentials updated.</span>
                        </div>
                      )}
                      {passwordError && (
                        <div className="auth-alert auth-alert-error" style={{ marginBottom: '1rem' }}>
                          <AlertCircle className="auth-alert-icon" size={16} />
                          <span>{passwordError}</span>
                        </div>
                      )}

                      <form onSubmit={handleUpdatePassword} className="settings-form">
                        <div className="settings-input-group">
                          <label className="settings-label">New Password</label>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <input 
                              type={showNewPassword ? 'text' : 'password'} 
                              className="settings-input" 
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="••••••••••••"
                              disabled={passwordLoading}
                              required
                              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                            />
                            <Lock size={16} style={{ position: 'absolute', left: '0.85rem', color: 'var(--text-secondary)', opacity: 0.6, pointerEvents: 'none' }} />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              style={{ position: 'absolute', right: '0.85rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              tabIndex="-1"
                              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                            >
                              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        <div className="settings-input-group">
                          <label className="settings-label">Confirm Password</label>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <input 
                              type={showConfirmPassword ? 'text' : 'password'} 
                              className="settings-input" 
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="••••••••••••"
                              disabled={passwordLoading}
                              required
                              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                            />
                            <Lock size={16} style={{ position: 'absolute', left: '0.85rem', color: 'var(--text-secondary)', opacity: 0.6, pointerEvents: 'none' }} />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              style={{ position: 'absolute', right: '0.85rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              tabIndex="-1"
                              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          className="settings-btn"
                          disabled={passwordLoading}
                        >
                          {passwordLoading ? <RefreshCw className="btn-spinner" size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Lock size={14} />}
                          Change Password
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
