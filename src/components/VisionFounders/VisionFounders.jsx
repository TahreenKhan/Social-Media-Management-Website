import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import './VisionFounders.css';

const Counter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const VisionFounders = () => {
  return (
    <section className="section vision-section" id="vision">
      <div className="container">
        <div className="vision-grid">
          
          <motion.div 
            className="vision-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', marginBottom: '1rem' }}>Our Vision</h3>
            <h2 className="heading-lg">We Help Businesses Build <span className="text-accent">Powerful Digital Presence</span></h2>
            
            <div className="vision-highlight">
              "From social media management and content creation to branding and web development, Nexoresha helps businesses stand out, grow faster, and stay relevant in a digital-first world."
            </div>
            
            <p className="vision-text">
              We are a premium creative agency dedicated to transforming chaos into measurable growth. We bridge the gap between high-end luxury aesthetics and ruthless conversion science.
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-num"><Counter end={98} suffix="%" /></div>
                <div className="stat-label">Client Retention</div>
              </div>
              <div className="stat-item">
                <div className="stat-num"><Counter end={12} suffix="x" /></div>
                <div className="stat-label">Average ROAS</div>
              </div>
            </div>
          </motion.div>

          <div className="founders-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <RouterLink to="/founder" className="founder-card">
                <div className="founder-image-container">
                  <img src="/assets/founder.png" alt="Ayush Choudhary" className="founder-image" />
                </div>
                <div className="founder-overlay">
                  <span className="fc-badge">FOUNDER</span>
                  <h3 className="founder-name">Ayush Choudhary</h3>
                  <div className="fc-subtitle">Visionary Behind Nexoresha Media</div>
                  <p className="fc-desc">Helping brands grow through creative strategy, content creation, and performance marketing.</p>
                </div>
              </RouterLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <RouterLink to="/co-founder" className="founder-card">
                <div className="founder-image-container">
                  <img src="/assets/cofounder.png" alt="Prasad N. Dhage" className="founder-image" />
                </div>
                <div className="founder-overlay">
                  <span className="fc-badge">CO-FOUNDER</span>
                  <h3 className="founder-name">Prasad N. Dhage</h3>
                  <div className="fc-subtitle">Chief Editor & Creative Lead</div>
                  <p className="fc-desc">Helping brands grow through creative strategy, content creation, and performance marketing.</p>
                </div>
              </RouterLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionFounders;
