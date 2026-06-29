import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import EcosystemUniverse from '../../components/EcosystemUniverse/EcosystemUniverse';
import './Founder.css';

const Founder = () => {
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
              <img src="/assets/founder.png" alt="Ayush Choudhary" />
            </div>
          </motion.div>
          
          <motion.div 
            className="executive-hero-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="executive-badge">FOUNDER</div>
            <h1 className="executive-name">AYUSH CHOUDHARY</h1>
            <div className="executive-subtitle">VISIONARY BEHIND NEXORESHA MEDIA</div>
            
            <p className="executive-intro">
              Helping brands grow through creative strategy, content creation, and performance marketing.
            </p>

            <p className="executive-desc">
              Ayush Choudhary is a visionary entrepreneur and strategist who operates at the intersection of technology, creative narrative, and high-impact cinematography. As the orchestrator of the Nexoresha ecosystem, he sets the brand's direction and builds frameworks that bridge complex web software and narrative storytelling with commercial media marketing.
            </p>

            <div className="leadership-focus">
              <h3 className="focus-title">Leadership Focus</h3>
              <div className="leadership-pills">
                <span className="focus-pill">Brand Strategy</span>
                <span className="focus-pill">Content Creation</span>
                <span className="focus-pill">Performance Marketing</span>
                <span className="focus-pill">Creative Direction</span>
                <span className="focus-pill">Digital Growth</span>
              </div>
            </div>

            <div className="executive-stats-row">
              <div className="stat-block">
                <div className="stat-value">5+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-block">
                <div className="stat-value">120+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-block">
                <div className="stat-value">45+</div>
                <div className="stat-label">Brands Worked With</div>
              </div>
              <div className="stat-block">
                <div className="stat-value">25M+</div>
                <div className="stat-label">Campaign Reach</div>
              </div>
            </div>
            
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2.5rem', display: 'inline-block' }}>
              DISCUSS BUSINESS
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
            LEADERSHIP <span className="text-accent">PROFILE</span>
          </motion.h2>

          <div className="leadership-grid">
            {[
              {
                title: 'Ecosystem Visionary',
                desc: 'The capability to construct and orchestrate a multi-company ecosystem bridging software technologies, creative literature, and visual media production under a unified brand voice.'
              },
              {
                title: 'Strategic Innovation',
                desc: 'Expertise in aligning core technological foundations with audience psychology and social media algorithms to maximize conversion value for premium brands.'
              },
              {
                title: 'Empowering Leadership',
                desc: 'Fostering a creative playground where directors, designers, and editors work with absolute agency, standardizing production pipelines to deliver premium high-end results.'
              },
              {
                title: 'Operational Excellence',
                desc: 'Transitioning creative media from pure aesthetic art into structured business growth parameters, turning likes and organic reach into measurable client revenue assets.'
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

      <EcosystemUniverse />
    </div>
  );
};

export default Founder;
