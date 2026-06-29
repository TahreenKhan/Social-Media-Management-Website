import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';
import { Link as RouterLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount = 0, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);

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
          <Link smooth to="/#build" className="btn btn-primary">Build My Engine</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
