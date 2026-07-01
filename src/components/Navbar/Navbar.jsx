import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = ({ cartCount = 0, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const rect = homeSection.getBoundingClientRect();
        const scrollDistance = rect.height - window.innerHeight;
        const progress = -rect.top / scrollDistance;
        // Trigger at 85% of hero animation completion
        if (progress > 0.85) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      } else {
        // Fallback for pages without hero
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount to set initial state correctly
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-container">
        <Link to="/#home" className="logo">
          <img src="/assets/logo.png" alt="Nexoresha Logo" style={{ height: '32px', width: 'auto' }} />
          NEXORESHA
        </Link>
        
        <ul className="nav-links">
          <li><Link smooth to="/#home" className="nav-link">Home</Link></li>
          <li><Link smooth to="/#ecosystem" className="nav-link">Companies</Link></li>
          <li><Link smooth to="/#work" className="nav-link">Highlights</Link></li>
          <li><Link smooth to="/#packages" className="nav-link">Packages</Link></li>
          <li><Link smooth to="/#build" className="nav-link">Customize</Link></li>
          <li><RouterLink to="/contact" className="nav-link">Contact Us</RouterLink></li>
        </ul>

        <div className="nav-actions">
          <button className="cart-btn" aria-label="Cart" onClick={onOpenCart} style={{ position: 'relative' }}>
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: 'var(--accent-primary)', color: 'white', fontSize: '0.65rem', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>
          
          {user ? (
            <div className="nav-profile-wrapper" ref={dropdownRef}>
              <button 
                className="nav-avatar-btn" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="User Profile Menu"
              >
                <img 
                  className="nav-avatar-img" 
                  src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} 
                  alt={user.user_metadata?.full_name} 
                />
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    className="nav-profile-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="dropdown-header">
                      <div className="dropdown-user-name">{user.user_metadata?.full_name || 'Creative Partner'}</div>
                      <div className="dropdown-user-email">{user.email}</div>
                    </div>
                    <div className="dropdown-links">
                      <RouterLink to="/dashboard" className="dropdown-link" onClick={() => setDropdownOpen(false)}>
                        <LayoutDashboard size={14} />
                        Dashboard
                      </RouterLink>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-logout-btn" 
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut();
                      }}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <RouterLink to="/signin" className="nav-link" style={{ textTransform: 'uppercase', fontSize: '0.85rem' }}>Sign In</RouterLink>
              <Link smooth to="/#build" className="btn btn-primary">Build My Engine</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
