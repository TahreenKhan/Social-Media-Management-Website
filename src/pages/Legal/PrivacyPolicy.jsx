import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--text-secondary)', textDecoration: 'none', borderBottom: '1px solid rgba(18,18,18,0.2)' }}>
            &larr; Back to Home
          </Link>
          <div className="legal-subtitle">Legal Documentation</div>
          <h1 className="legal-title">Privacy Policy</h1>
          <div className="legal-updated">Last Updated: May 29, 2026</div>
        </div>

        <motion.div 
          className="legal-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>Welcome to Nexoresha Media Works ("Company", "we", "our", or "us").</p>
          <p>We respect your privacy and are committed to protecting the information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following information:</p>

          <h3>Personal & Business Information</h3>
          <ul>
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Company Name</li>
            <li>Business Information</li>
            <li>Social Media Handles</li>
          </ul>

          <h3>Payment Information</h3>
          <p>Payments are processed through secure third-party payment providers. We do not store your complete card or banking details on our servers.</p>

          <h3>Automatically Collected Information</h3>
          <ul>
            <li>IP Address</li>
            <li>Browser Type</li>
            <li>Device Information</li>
            <li>Pages Visited</li>
            <li>Website Usage Data</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide requested services</li>
            <li>Create custom marketing strategies</li>
            <li>Process payments</li>
            <li>Respond to inquiries</li>
            <li>Improve website performance</li>
            <li>Send project updates</li>
            <li>Deliver customer support</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Sharing of Information</h2>
          <p>We do not sell your personal information.</p>
          <p>Information may be shared with:</p>
          <ul>
            <li>Payment gateway providers</li>
            <li>Hosting providers</li>
            <li>Marketing tools</li>
            <li>Analytics services</li>
            <li>Government authorities when legally required</li>
          </ul>

          <h2>4. Cookies</h2>
          <p>Our website may use cookies to:</p>
          <ul>
            <li>Improve user experience</li>
            <li>Analyze traffic</li>
            <li>Remember preferences</li>
            <li>Enhance website performance</li>
          </ul>
          <p>Users may disable cookies through their browser settings.</p>

          <h2>5. Data Security</h2>
          <p>We implement reasonable security measures to protect user information.</p>
          <p>However, no internet transmission method can be guaranteed to be 100% secure.</p>

          <h2>6. Third-Party Services</h2>
          <p>Our website may contain links to third-party websites.</p>
          <p>We are not responsible for the privacy practices of those websites.</p>

          <h2>7. Data Retention</h2>
          <p>We retain information only as long as necessary for:</p>
          <ul>
            <li>Service delivery</li>
            <li>Legal compliance</li>
            <li>Business operations</li>
          </ul>

          <h2>8. Your Rights</h2>
          <p>You may request:</p>
          <ul>
            <li>Access to your information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information</li>
            <li>Withdrawal of consent where applicable</li>
          </ul>

          <h2>9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy at any time.</p>
          <p>Updates will be reflected on this page.</p>

          <h2>10. Contact Information</h2>
          <p>For privacy-related questions:</p>
          
          <h3>Email</h3>
          <p><a href="mailto:nexoreshamediaworks@gmail.com" style={{ color: 'var(--accent-primary)' }}>nexoreshamediaworks@gmail.com</a></p>
          
          <h3>Phone</h3>
          <p>+91 91369 36913<br />+91 88795 01593</p>
          
          <h3>Address</h3>
          <p>710, ganesh wadi building no 2, Midc, Andheri east<br />Nexoresha Media Works</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
