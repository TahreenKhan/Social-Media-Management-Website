import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)',
        position: 'fixed',
        inset: 0,
        zIndex: 9999
      }}>
        <div style={{
          padding: '2.5rem',
          borderRadius: '24px',
          background: 'rgba(245, 239, 230, 0.55)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(18, 18, 18, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)'
        }}>
          {/* Animated Spinner */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid rgba(139, 0, 0, 0.15)',
            borderTopColor: 'var(--accent-primary)',
            animation: 'spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite'
          }} />
          <p style={{
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'var(--text-primary)',
            opacity: 0.8
          }}>
            Decrypting Session...
          </p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to Sign In but save the current location they were trying to access
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
