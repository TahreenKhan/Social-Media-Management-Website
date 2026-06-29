import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import './EcosystemUniverse.css';

const companies = [
  { 
    id: 'tech', 
    name: 'NEXORESHA TECHNOLOGIES', 
    type: 'TECH CORE', 
    role: 'OWNER & FOUNDER',
    desc: 'The technical core, building premium custom software solutions, ecommerce platforms, web applications, and digital interfaces.',
    x: -360, y: 260 
  },
  { 
    id: 'tales', 
    name: 'NEXORESHA TALES', 
    type: 'STORYTELLING & LITERATURE', 
    role: 'OWNER & FOUNDER',
    desc: 'The storytelling division, drafting rich narrative copy, editorial scriptures, brand storylines, and creative content scripts.',
    x: 0, y: 260 
  },
  { 
    id: 'media', 
    name: 'NEXORESHA MEDIA WORKS', 
    type: 'CINEMATOGRAPHY & BRANDING', 
    role: 'OWNER & FOUNDER',
    desc: 'The production house, designing visual assets, filming cinematic advertisements, and managing high-tier social media channels.',
    x: 360, y: 260 
  },
];

const EcosystemMap = () => {
  return (
    <section className="section map-section" id="ecosystem" style={{ background: '#f5efe6' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}
        >
          <img src="/assets/logo.png" alt="Nexoresha Logo" style={{ width: '145px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))' }} />
        </motion.div>

        <div className="map-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <motion.div 
            style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            THE ECOSYSTEM
          </motion.div>
      <motion.h2 
        className="heading-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ color: '#3e1a1a', textTransform: 'uppercase', fontSize: '2.5rem', marginBottom: '0.5rem' }}
      >
        NEXORESHA BRANDS
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}
      >
        Ventures built to scale custom engineering, storytelling, and high-fidelity production.
      </motion.p>
    </div>

    <div className="ecosystem-grid" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {companies.map((comp, idx) => {
        const link = comp.id === 'tech' ? 'https://nexoresha.tech/' : 
                     comp.id === 'media' ? 'https://www.nexoreshamedia.works/' : null;
        
        const CardContent = (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a30000', border: '1px solid rgba(163,0,0,0.2)', padding: '0.2rem 0.6rem', borderRadius: '20px', letterSpacing: '1px' }}>
                {comp.type}
              </span>
              {link && <ExternalLink size={14} color="#a30000" />}
            </div>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#3e1a1a', marginBottom: '0.5rem', fontWeight: 700 }}>
              {comp.name}
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              {comp.role}
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {comp.desc}
            </p>
          </>
        );

        return (
          <motion.div
            key={comp.id}
            className="branch-node"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            style={{
              background: '#f2e8d9',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '16px',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              cursor: link ? 'pointer' : 'default',
              position: 'relative'
            }}
          >
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {CardContent}
              </a>
            ) : (
              CardContent
            )}
          </motion.div>
        );
      })}
    </div>
  </div>
    </section>
  );
};

export default EcosystemMap;
