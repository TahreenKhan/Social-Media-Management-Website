import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../Founder/Founder.css'; // Reusing standard executive styling

const CoFounder = () => {
  return (
    <div className="page-wrapper">
      <section className="executive-hero">
        <div className="container executive-hero-container">
          <motion.div 
            className="executive-hero-image"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="executive-image-wrapper">
              <img src="/assets/cofounder.png" alt="Prasad N. Dhage" />
            </div>
          </motion.div>
          
          <motion.div 
            className="executive-hero-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="executive-badge">CO-FOUNDER</div>
            <h1 className="executive-name">PRASAD N. DHAGE</h1>
            <div className="executive-subtitle">VISUAL EDITOR & MEDIA ARCHITECT</div>
            
            <p className="executive-intro">
              Helping brands grow through creative strategy, content creation, and performance marketing.
            </p>

            <p className="executive-desc">
              Prasad N. Dhage is a skilled visual editor and co-founder of Nexoresha Media Works. He shapes the aesthetic signature of all agency campaigns, converting raw footage into premium high-retention digital assets. Prasad manages color science, pacing dynamics, and immersive SFX pipelines for all elite brand portfolios.
            </p>

            <div className="leadership-focus">
              <h3 className="focus-title">Leadership Focus</h3>
              <div className="leadership-pills">
                <span className="focus-pill">Narrative Pacing</span>
                <span className="focus-pill">Color Grading</span>
                <span className="focus-pill">Sound Design</span>
                <span className="focus-pill">Creative Direction</span>
                <span className="focus-pill">Post-Production</span>
              </div>
            </div>

            <div className="executive-stats-row">
              <div className="stat-block">
                <div className="stat-value">4+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-block">
                <div className="stat-value">300+</div>
                <div className="stat-label">Edits Delivered</div>
              </div>
              <div className="stat-block">
                <div className="stat-value">25M+</div>
                <div className="stat-label">Total Views</div>
              </div>
              <div className="stat-block">
                <div className="stat-value">12+</div>
                <div className="stat-label">Client Partners</div>
              </div>
            </div>
            
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2.5rem', display: 'inline-block' }}>
              REQUEST CUSTOM EDIT
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="leadership-profile section" style={{ background: '#f5efe6' }}>
        <div className="container">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem', color: '#3e1a1a' }}
          >
            TECHNICAL <span className="text-accent">CREDENTIALS</span>
          </motion.h2>

          <div className="leadership-grid">
            {[
              {
                title: 'Cinematic Retention Pacing',
                desc: 'Expertise in speed ramping, visual beats cutting, and narrative pacing to maximize retention rates for vertical mobile feeds.'
              },
              {
                title: 'Sensory Sound Design (SFX)',
                desc: 'Orchestrating rich ambient layers, sound effects, and musical transitions to build immersive cinematic audio landscapes.'
              },
              {
                title: 'Aesthetic Color Grading',
                desc: 'Advanced LUT and color log processing to achieve luxury aesthetics, custom color palettes, and cinematic lighting highlights.'
              },
              {
                title: 'Storytelling Architecture',
                desc: 'Structuring raw footage into cohesive narrative stories that convey visual authority, authority branding, and product prestige.'
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="leadership-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="leadership-card-title">{item.title}</div>
                <p className="leadership-card-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem', color: '#3e1a1a' }}
          >
            CLIENT <span className="text-accent">COLLABORATIONS</span>
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Khushi Kumpawat', impact: '2.4M Reach Generated' },
              { name: "Sidhpura's Institute", impact: 'Trusted Academic Leader' },
              { name: 'The Thane Foodie', impact: '1.1M Reach Generated' },
              { name: 'Finland International School', impact: '1.8M Views Delivered' },
              { name: 'Bha2pa (Touring Party)', impact: '3.1M Total Views' },
              { name: 'Malvan Tadka', impact: '18+ Outlets Promoted' }
            ].map((client, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                style={{ 
                  background: '#f2e8d9', 
                  padding: '2rem', 
                  borderRadius: '12px',
                  border: '1px solid rgba(163,0,0,0.1)',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#3e1a1a', marginBottom: '0.5rem' }}>
                  {client.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                  Campaign Impact
                </div>
                <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 500 }}>
                  {client.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoFounder;
