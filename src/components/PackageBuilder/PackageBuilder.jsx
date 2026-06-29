import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Star } from 'lucide-react';
import './PackageBuilder.css';

const categories = ['CONTENT', 'PRODUCTION', 'MARKETING'];

const servicesData = {
  CONTENT: [
    { id: 'story', name: 'Story Design', cost: 3999, isCustom: false },
    { id: 'post', name: 'Post Design', cost: 4999, isCustom: false },
    { id: 'reel', name: 'Reel Editing', cost: 7999, isCustom: false },
    { id: 'carousel', name: 'Carousel Posts', cost: 0, isCustom: true },
    { id: 'planning', name: 'Content Planning', cost: 0, isCustom: true }
  ],
  PRODUCTION: [
    { id: 'photo', name: 'Photoshoot Session', cost: 14999, isCustom: false },
    { id: 'video', name: 'Videoshoot Session', cost: 19999, isCustom: false },
    { id: 'drone', name: 'Drone Shoot', cost: 24999, isCustom: false }
  ],
  MARKETING: [
    { id: 'ig_ads', name: 'Instagram Ads', cost: 11999, isCustom: false },
    { id: 'fb_ads', name: 'Facebook Ads', cost: 11999, isCustom: false },
    { id: 'branding', name: 'Branding Strategy', cost: 17999, isCustom: false },
    { id: 'influencer', name: 'Influencer Outreach', cost: 29999, isCustom: false }
  ]
};

const allServicesFlat = Object.entries(servicesData).flatMap(([category, services]) => 
  services.map(s => ({ ...s, category }))
);

const getCategoryColor = (category) => {
  switch(category) {
    case 'CONTENT': return '#8B0000'; // Maroon
    case 'PRODUCTION': return '#1A5F7A'; // Deep Teal
    case 'MARKETING': return '#D4AF37'; // Gold
    default: return '#8B0000';
  }
};

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    
    const duration = 500; // ms
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * ease);
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue.toLocaleString('en-IN')}</span>;
};

const PackageBuilder = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('CONTENT');
  const [selectedServices, setSelectedServices] = useState(['post', 'reel']);
  const [estimate, setEstimate] = useState(0);

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    let total = 0;
    selectedServices.forEach(id => {
      const service = allServicesFlat.find(s => s.id === id);
      if (service && !service.isCustom) total += service.cost;
    });
    
    setEstimate(Math.round(total));
  }, [selectedServices]);

  const getServiceNodes = () => {
    const nodes = selectedServices.map(id => allServicesFlat.find(s => s.id === id));
    const total = nodes.length;
    const radius = window.innerWidth < 768 ? 90 : 130;
    
    return nodes.map((node, index) => {
      const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { ...node, x, y, radius };
    });
  };

  const handleAddToCart = () => {
    if (selectedServices.length === 0) return;
    
    const serviceNames = selectedServices.map(id => allServicesFlat.find(s => s.id === id).name);
    const hasCustom = selectedServices.some(id => allServicesFlat.find(s => s.id === id).isCustom);
    
    const customPackage = {
      id: `custom-${Date.now()}`,
      name: `Custom Engine`,
      price: estimate,
      description: `Build including: ${serviceNames.join(', ')}`,
      isCustom: hasCustom
    };
    
    addToCart(customPackage);
  };

  const currentServicesList = servicesData[activeCategory];
  const hasCustomItems = selectedServices.some(id => allServicesFlat.find(s => s.id === id).isCustom);

  return (
    <section className="section builder-section" id="build">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Build Your <span className="text-accent">Engine</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            style={{ maxWidth: '600px', margin: '1rem auto 3rem', color: 'var(--text-secondary)' }}
          >
            Configure a custom digital ecosystem. Watch the estimated investment adapt in real-time.
          </motion.p>
        </div>

        <div className="builder-grid">
          {/* Left Column: Controls */}
          <div className="builder-controls">
            
            <div className="control-group">
              <h3 className="control-title">Service Category</h3>
              <div className="pill-group">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    className={`pill-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group" style={{ minHeight: '300px' }}>
              <h3 className="control-title">Core Services</h3>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategory}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="service-toggles"
                >
                  {currentServicesList.map(service => {
                    const isActive = selectedServices.includes(service.id);
                    return (
                      <motion.div 
                        key={service.id}
                        className={`service-toggle ${isActive ? 'active' : ''}`}
                        onClick={() => toggleService(service.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`toggle-checkbox ${isActive ? 'pulse-anim' : ''}`}>
                          {isActive && <Check size={14} color="var(--white)" />}
                        </div>
                        <div className="toggle-info">
                          <span className="toggle-name">
                            {service.name} 
                            {service.isCustom && <Star size={12} style={{ display: 'inline', marginLeft: '4px', color: 'var(--accent-primary)' }} />}
                          </span>
                          <span className="toggle-price">
                            {service.isCustom ? 'Custom Pricing' : `+₹${service.cost.toLocaleString('en-IN')}`}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>



          </div>

          {/* Right Column: Visualizer & Estimate */}
          <div className="builder-visualizer">
            <div className="visualizer-canvas glass">
              
              <div className="system-core" style={{
                background: 'var(--text-primary)',
                color: 'var(--white)',
                borderColor: 'var(--accent-primary)',
                boxShadow: '0 0 40px rgba(139, 0, 0, 0.4)'
              }}>
                <div className="core-pulse"></div>
                <div className="core-pulse" style={{ animationDelay: '1s' }}></div>
                <span style={{ position: 'relative', zIndex: 2, fontWeight: 700, letterSpacing: '0.1em' }}>CORE</span>
              </div>

              <AnimatePresence>
                {getServiceNodes().map((node) => (
                  <motion.div
                    key={node.id}
                    className="service-node"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    style={{ 
                      borderColor: getCategoryColor(node.category),
                      boxShadow: `0 0 25px ${getCategoryColor(node.category)}40`
                    }}
                    whileHover={{ scale: 1.15, boxShadow: `0 0 40px ${getCategoryColor(node.category)}80`, zIndex: 20 }}
                  >
                    <div style={{
                      width: '100%', height: '100%', borderRadius: '50%',
                      background: `linear-gradient(135deg, ${getCategoryColor(node.category)}11, ${getCategoryColor(node.category)}22)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Star size={18} color={getCategoryColor(node.category)} fill={`${getCategoryColor(node.category)}22`} />
                    </div>
                    
                    <span className="node-label" style={{ color: getCategoryColor(node.category) }}>{node.name}</span>
                    
                    {/* Connection Line & Data Flow Animation */}
                    <svg style={{ 
                      position: 'absolute', 
                      top: '50%', left: '50%', 
                      width: node.radius, height: '6px', 
                      transformOrigin: '0 50%', 
                      zIndex: -1, 
                      transform: `translateY(-50%) rotate(${Math.atan2(-node.y, -node.x)}rad)`,
                      pointerEvents: 'none'
                    }}>
                      <line x1="0" y1="3" x2="100%" y2="3" stroke={getCategoryColor(node.category)} strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />
                      <circle cx="100%" cy="3" r="3" fill={getCategoryColor(node.category)} filter="drop-shadow(0 0 4px currentColor)">
                        <animate attributeName="cx" values="100%;0%" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  </motion.div>
                ))}
              </AnimatePresence>
              
            </div>

            <motion.div 
              className="estimate-panel glass"
              animate={{ 
                boxShadow: selectedServices.length > 0 ? '0 10px 40px rgba(139, 0, 0, 0.1)' : '0 10px 30px rgba(0,0,0,0.05)',
                borderColor: selectedServices.length > 0 ? 'rgba(139, 0, 0, 0.2)' : 'rgba(255,255,255,0.5)'
              }}
            >
              <div className="estimate-header">Estimated Investment</div>
              <div className="estimate-value" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                ₹<AnimatedNumber value={estimate} />
                {hasCustomItems && <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>+</span>}
              </div>
              <div className="estimate-note">Based on {selectedServices.length} services. {hasCustomItems && 'Custom items require consultation.'}</div>
              
              <motion.button 
                className="btn btn-primary w-full mt-6" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}
                onClick={handleAddToCart}
                disabled={selectedServices.length === 0}
                whileHover={selectedServices.length > 0 ? { scale: 1.02 } : {}}
                whileTap={selectedServices.length > 0 ? { scale: 0.98 } : {}}
              >
                <ShoppingCart size={20} /> Add To Cart
              </motion.button>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default PackageBuilder;
