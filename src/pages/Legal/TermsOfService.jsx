import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--text-secondary)', textDecoration: 'none', borderBottom: '1px solid rgba(18,18,18,0.2)' }}>
            &larr; Back to Home
          </Link>
          <div className="legal-subtitle">Legal Documentation</div>
          <h1 className="legal-title">Terms of Service</h1>
          <div className="legal-updated">Last Updated: May 29, 2026</div>
        </div>

        <motion.div 
          className="legal-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>By accessing or using the Nexoresha Media Works website and services, you agree to these Terms of Service.</p>
          <p>If you do not agree, please discontinue use of our website and services.</p>

          <h2>1. Services</h2>
          <p>Nexoresha Media Works provides services including:</p>
          <ul>
            <li>Social Media Management</li>
            <li>Branding</li>
            <li>Content Creation</li>
            <li>Reel Editing</li>
            <li>Content Planning</li>
            <li>Marketing Campaigns</li>
            <li>Photoshoots</li>
            <li>Videoshoots</li>
            <li>Advertising Services</li>
            <li>Custom Digital Solutions</li>
          </ul>

          <h2>2. Client Responsibilities</h2>
          <p>Clients agree to:</p>
          <ul>
            <li>Provide accurate information</li>
            <li>Supply required materials on time</li>
            <li>Review and approve content promptly</li>
            <li>Maintain lawful business practices</li>
          </ul>
          <p>Delays from the client side may affect project timelines.</p>

          <h2>3. Payments</h2>
          
          <h3>General</h3>
          <p>All payments must be made according to the agreed package or quotation.</p>
          
          <h3>Custom Services</h3>
          <p>Custom package pricing may vary depending on project scope and requirements.</p>
          
          <h3>Late Payments</h3>
          <p>Projects may be paused until outstanding payments are received.</p>

          <h2>4. Refund Policy</h2>
          <p>Due to the nature of digital and creative services:</p>
          
          <h3>Non-Refundable Services</h3>
          <p>Once work has begun, payments are generally non-refundable.</p>
          
          <h3>Partial Refunds</h3>
          <p>May be considered only in exceptional circumstances at our discretion.</p>
          
          <h3>Custom Projects</h3>
          <p>Custom projects are non-refundable once execution begins.</p>

          <h2>5. Intellectual Property</h2>
          
          <h3>Client-Owned Materials</h3>
          <p>Clients retain ownership of materials they provide.</p>
          
          <h3>Agency-Created Materials</h3>
          <p>Ownership of final deliverables transfers after full payment unless otherwise specified.</p>
          
          <h3>Portfolio Rights</h3>
          <p>Nexoresha Media Works reserves the right to showcase completed work in portfolios, social media, and case studies unless otherwise agreed in writing.</p>

          <h2>6. Content Approval</h2>
          <p>Clients are responsible for reviewing and approving content before publication.</p>
          <p>We are not liable for errors that were approved by the client.</p>

          <h2>7. Advertising Platforms</h2>
          <p>We are not responsible for decisions made by:</p>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>YouTube</li>
            <li>Google</li>
            <li>Other advertising platforms</li>
          </ul>
          <p>Platform algorithm changes may impact campaign performance.</p>

          <h2>8. Performance Disclaimer</h2>
          <p>We strive for the best results; however:</p>
          <p>We do not guarantee:</p>
          <ul>
            <li>Viral content</li>
            <li>Specific follower growth</li>
            <li>Specific sales numbers</li>
            <li>Specific engagement rates</li>
          </ul>
          <p>Results depend on numerous external factors.</p>

          <h2>9. Limitation of Liability</h2>
          <p>Nexoresha Media Works shall not be liable for:</p>
          <ul>
            <li>Indirect damages</li>
            <li>Business losses</li>
            <li>Revenue losses</li>
            <li>Reputation losses</li>
            <li>Platform outages</li>
          </ul>
          <p>Our maximum liability shall not exceed the amount paid for the service.</p>

          <h2>10. Service Termination</h2>
          <p>We reserve the right to terminate services if:</p>
          <ul>
            <li>Terms are violated</li>
            <li>Abusive behavior occurs</li>
            <li>Payments remain unpaid</li>
            <li>Illegal activities are involved</li>
          </ul>

          <h2>11. Governing Law</h2>
          <p>These Terms shall be governed by the laws of India.</p>
          <p>Any disputes shall be subject to the jurisdiction of the courts located in Maharashtra, India.</p>

          <h2>12. Contact Information</h2>
          <p>For terms or service-related questions:</p>
          
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

export default TermsOfService;
