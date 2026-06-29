import React, { useRef } from 'react';
import { Hexagon, MessageCircle, Globe, Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa';
import { useFrame, Canvas } from '@react-three/fiber';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import './Footer.css';

const Particles = () => {
  const pointsRef = useRef();
  
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  
  for(let i = 0; i < particleCount; i++) {
    positions[i*3] = (Math.random() - 0.5) * 20;
    positions[i*3+1] = (Math.random() - 0.5) * 20;
    positions[i*3+2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if(pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8B0000" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-particles">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <Particles />
        </Canvas>
      </div>
      
      <div className="container">
        <div className="footer-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>
          <div className="footer-brand">
            <Link to="/#home" className="logo" style={{ marginBottom: '1.5rem' }}>
              <img src="/assets/logo.png" alt="Nexoresha Logo" style={{ height: '32px', width: 'auto' }} />
              NEXORESHA
            </Link>
            <p className="footer-desc">
              The Director's Eye for your brand. We redefine luxury through cinematic precision, branding strategies, and modern creative media production.
            </p>
            <div className="social-icons" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="#" style={{ color: 'var(--bg-primary)' }}><FaInstagram size={20} /></a>
              <a href="#" style={{ color: 'var(--bg-primary)' }}><FaLinkedin size={20} /></a>
              <a href="#" style={{ color: 'var(--bg-primary)' }}><FaYoutube size={20} /></a>
              <a href="#" style={{ color: 'var(--bg-primary)' }}><FaFacebook size={20} /></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h4 style={{ color: 'var(--bg-primary)' }}>Navigation</h4>
            <div className="footer-links">
              <Link smooth to="/#home">Home</Link>
              <Link smooth to="/#ecosystem">Brands</Link>
              <Link smooth to="/#work">Highlights</Link>
              <Link smooth to="/#packages">Packages</Link>
              <Link smooth to="/#build">Custom Build</Link>
            </div>
          </div>
          
          <div className="footer-column">
            <h4 style={{ color: 'var(--bg-primary)' }}>Connect</h4>
            <div className="footer-links">
              <RouterLink to="/contact">Contact Form</RouterLink>
              <a href="mailto:nexoreshamediaworks@gmail.com">nexoreshamediaworks@gmail.com</a>
              <a href="tel:+919136936913">+91 91369 36913</a>
              <a href="tel:+918879501593">+91 88795 01593</a>
              <RouterLink to="/privacy-policy" style={{ marginTop: '1rem' }}>Privacy Policy</RouterLink>
              <RouterLink to="/terms-of-service">Terms of Service</RouterLink>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Nexoresha Media Works. All Systems Operational.
          </div>
          <button onClick={scrollToTop} className="back-to-top-btn">
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
