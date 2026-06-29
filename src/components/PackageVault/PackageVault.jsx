import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../../config';
import './PackageVault.css';

const packages = [
  {
    id: 'bronze',
    name: 'Foundation',
    price: '$2.5k',
    period: '/mo',
    description: 'Perfect for established businesses looking to solidify their initial digital foundation and brand identity.',
    deliverables: ['Brand Identity Deck', 'Basic Landing Page', 'Social Setup', 'Content Strategy'],
    benefits: ['Clear Positioning', 'Professional Presence', 'Increased Brand Trust'],
    features: [
      { name: 'Brand Strategy', included: true },
      { name: 'Basic Web Presence', included: true },
      { name: 'Social Media Management', included: true },
      { name: 'Content Production', included: false },
      { name: 'Advanced Automation', included: false },
      { name: 'Dedicated Ecosystem Team', included: false }
    ]
  },
  {
    id: 'silver',
    name: 'Momentum',
    price: '$5k',
    period: '/mo',
    description: 'A comprehensive growth package designed for brands ready to scale their reach and conversions.',
    deliverables: ['Performance Website', 'Monthly Content', 'Paid Ads Setup', 'Basic CRM'],
    benefits: ['Consistent Lead Flow', 'Higher Conversion Rate', 'Streamlined Operations'],
    features: [
      { name: 'Brand Strategy', included: true },
      { name: 'Performance Website', included: true },
      { name: 'Social Media Management', included: true },
      { name: 'Content Production (Basic)', included: true },
      { name: 'Advanced Automation', included: false },
      { name: 'Dedicated Ecosystem Team', included: false }
    ]
  },
  {
    id: 'gold',
    name: 'Ecosystem',
    price: '$12k',
    period: '/mo',
    isPopular: true,
    description: 'The ultimate marketing ecosystem. A fully managed solution that turns your digital presence into a conversion engine.',
    deliverables: ['Scalable Web App', 'Premium Video Content', 'Omnichannel Campaigns', 'Advanced CRM'],
    benefits: ['Market Dominance', 'Predictable Revenue', 'Enterprise-grade Systems'],
    features: [
      { name: 'Brand Architecture', included: true },
      { name: 'Scalable Web App', included: true },
      { name: 'Omnichannel Growth', included: true },
      { name: 'Premium Video Production', included: true },
      { name: 'Advanced CRM Automation', included: true },
      { name: 'Dedicated Ecosystem Team', included: false }
    ]
  },
  {
    id: 'platinum',
    name: 'Dominance',
    price: '$25k',
    period: '/mo',
    description: 'For global brands and industry leaders. We build and manage your entire digital infrastructure.',
    deliverables: ['Global Architecture', 'Custom Platforms', 'Cinematic Shoots', 'AI Automation'],
    benefits: ['Global Reach', 'Unfair Market Advantage', 'Automated Scale'],
    features: [
      { name: 'Global Brand Architecture', included: true },
      { name: 'Custom Digital Platform', included: true },
      { name: 'Omnichannel Domination', included: true },
      { name: 'Cinematic Production System', included: true },
      { name: 'AI & Machine Learning Automation', included: true },
      { name: 'Dedicated Ecosystem Team', included: true }
    ]
  }
];

const PackageVault = ({ addToCart }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedPackage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    
    // Esc to close
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedPackage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedPackage]);

  const handleAddToCart = () => {
    addToCart(selectedPackage);
    setSelectedPackage(null);
  };

  return (
    <section className="section vault-section" id="packages">
      <div className="container">
        <div className="vault-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            The <span className="text-accent">Packages</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}
          >
            Structured growth tiers engineered for different stages of business maturation. Click to view details.
          </motion.p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, idx) => (
            <motion.div 
              key={pkg.id}
              className={`package-card tier-${pkg.id}`}
              onClick={() => setSelectedPackage(pkg)}
              style={{ cursor: 'pointer' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              {pkg.isPopular && <div className="spotlight-badge">Premium</div>}
              
              <div className="tier-name">{pkg.name}</div>
              <div className="tier-price">
                {pkg.price}<span>{pkg.period}</span>
              </div>
              
              <div className="tier-features">
                {pkg.features.slice(0, 4).map((feature, fIdx) => (
                  <div className={`feature-item ${feature.included ? 'active' : ''}`} key={fIdx}>
                    {feature.included ? 
                      <Check className="feature-icon" size={18} /> : 
                      <X size={18} style={{ color: 'var(--border-light)' }} />
                    }
                    {feature.name}
                  </div>
                ))}
              </div>
              
              <button className={`btn package-btn ${selectedPackage?.id === pkg.id ? 'active' : ''}`} style={{ width: '100%' }}>
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PACKAGE DETAILS MODAL */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="modal-overlay" onClick={() => setSelectedPackage(null)}>
            <motion.div 
              className="modal-content package-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <button className="modal-close" onClick={() => setSelectedPackage(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-header">
                <h3>{selectedPackage.name} Package</h3>
                <div className="modal-price">{selectedPackage.price}{selectedPackage.period}</div>
              </div>
              
              <p className="modal-desc">{selectedPackage.description}</p>
              
              <div className="modal-grid">
                <div>
                  <h4>Key Features</h4>
                  <ul className="modal-list">
                    {selectedPackage.features.filter(f => f.included).map((f, i) => (
                      <li key={i}><Check size={16} className="text-accent" /> {f.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Deliverables</h4>
                  <ul className="modal-list">
                    {selectedPackage.deliverables.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Add To Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default PackageVault;
