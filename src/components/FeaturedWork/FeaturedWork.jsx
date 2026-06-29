import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import './FeaturedWork.css';

const projects = [
  {
    id: 'project-1',
    name: 'Aura Genesis Revival',
    category: 'Branding & Social Media',
    industry: 'Luxury Retail',
    objective: 'Rebrand an aging luxury jewelry line and launch a viral social media campaign targeting Gen Z luxury buyers.',
    servicesUsed: ['Brand Strategy', 'Visual Identity', 'Instagram Management', 'Reel Editing'],
    deliverables: ['Brand Book', '12 Custom Reels', '30 Static Posts', 'Social Media Playbook'],
    strategy: 'Shift the narrative from "traditional" to "modern heirloom". Use high-contrast moody photography mixed with fast-paced cinematic reels to create a sense of exclusivity.',
    process: 'Conducted a 3-day cinematic shoot focusing on macro details of the jewelry. Edited the footage into 5-second punchy reels optimized for Instagram algorithms.',
    execution: 'Deployed a 6-week organic campaign leading up to their Q4 collection drop, completely restructuring their Instagram grid into a dark luxury aesthetic.',
    results: ['+412% Profile Visits', '+85% Organic Reach', 'Sold out Q4 collection in 48 hours'],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'project-2',
    name: 'Pulse Media Accelerator',
    category: 'Paid Advertising',
    industry: 'Digital Content Network',
    objective: 'Drive low-cost subscriber acquisition for a new digital newsletter using Facebook and Instagram ads.',
    servicesUsed: ['Facebook Ads', 'Instagram Ads', 'Ad Creative Design', 'Copywriting'],
    deliverables: ['20 Ad Creatives', '5 Video Ads', 'A/B Testing Framework', 'Conversion Landing Page'],
    strategy: 'Utilize rapid A/B testing of polarizing hooks and educational carousel ads to find winning ad combinations within the first 72 hours.',
    process: 'Designed educational carousels breaking down complex media topics. Set up dynamic ad sets targeting lookalike audiences based on early engagers.',
    execution: 'Scaled the winning ad sets aggressively while turning off underperforming creatives. Optimized the landing page based on heatmaps.',
    results: ['$1.12 Cost Per Acquisition', '15,000+ New Subscribers', '2.4x Return on Ad Spend'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'project-3',
    name: 'Optima Health Launch',
    category: 'Video Production',
    industry: 'Healthcare Tech',
    objective: 'Create a cinematic commercial to launch a new health-tracking wearable device.',
    servicesUsed: ['Videoshoot Session', 'Drone Shoot', 'Scriptwriting', 'Color Grading'],
    deliverables: ['60s Main Commercial', '3x 15s Social Cutdowns', 'B-Roll Library'],
    strategy: 'Focus on the lifestyle transformation rather than technical specs. Show high-performing individuals integrating the device seamlessly into extreme environments.',
    process: 'Scouted 4 outdoor locations including mountains and urban tracks. Utilized FPV drones for dynamic tracking shots of athletes.',
    execution: 'Edited the commercial with high-energy sound design and aggressive pacing to match the brand\'s energetic identity.',
    results: ['2.1M YouTube Views', 'Featured in HealthTech Magazine', '300% Pre-order goal achieved'],
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'project-4',
    name: 'Vanguard SaaS Growth',
    category: 'Content Creation & Influencer',
    industry: 'B2B Software',
    objective: 'Increase brand awareness and trust among enterprise decision-makers through thought-leadership content and influencer partnerships.',
    servicesUsed: ['Influencer Outreach', 'Content Planning', 'Post Design', 'LinkedIn Strategy'],
    deliverables: ['6-Month Content Calendar', '15 Influencer Collaborations', 'Weekly Thought-Leadership Carousels'],
    strategy: 'Partner with micro-influencers in the tech space (CTOs, Dev Leads) to authentically review the software while flooding LinkedIn with high-value educational carousels.',
    process: 'Identified and vetted 30 potential tech influencers. Designed a visual system for LinkedIn carousels that made complex software architecture easy to understand.',
    execution: 'Coordinated the posting schedule so influencer reviews coincided with our educational content pushes, creating a surround-sound effect in the industry.',
    results: ['+12,000 LinkedIn Followers', '45 Enterprise Demos Booked', 'Viral 1M+ reach on hero carousel'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  }
];

const FeaturedWork = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject]);

  return (
    <section className="section work-section" id="work">
      <div className="container">
        <div className="work-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Featured <span className="text-accent">Highlights</span>
          </motion.h2>
          <motion.p
            style={{ maxWidth: '600px', color: 'var(--bg-secondary)', marginTop: '1rem', opacity: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            A curated selection of our most impactful digital transformations.
          </motion.p>
        </div>

        <div className="work-grid">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              className="work-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="work-image-container">
                <img src={project.image} alt={project.name} className="work-image" />
                <div className="work-overlay">
                  <div className="work-stats">
                    {project.results.slice(0,2).map((res, i) => (
                      <div className="stat-pill" key={i}>{res}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="work-content">
                <div>
                  <div className="work-category">{project.category}</div>
                  <h3 className="work-title">{project.name}</h3>
                </div>
                <div className="work-button-wrapper" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                  <button 
                    className="btn package-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <motion.div 
              className="modal-content project-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{ maxWidth: '800px', padding: '0', overflow: 'hidden' }}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)} style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '50%', color: 'white', zIndex: 10 }}>
                <X size={24} />
              </button>

              <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                <img src={selectedProject.image} alt={selectedProject.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '2rem' }}>
                  <div style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{selectedProject.category}</div>
                  <h3 style={{ color: 'white', fontSize: '2.5rem', fontFamily: 'var(--font-heading)', margin: 0 }}>{selectedProject.name}</h3>
                </div>
              </div>

              <div style={{ padding: '2.5rem', maxHeight: '50vh', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-light)' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Client Industry</h4>
                    <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{selectedProject.industry}</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Services Used</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {selectedProject.servicesUsed.map((s, i) => <span key={i} style={{ background: 'var(--bg-secondary)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{s}</span>)}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem' }}>Project Objective</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{selectedProject.objective}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem' }}>Strategy</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{selectedProject.strategy}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem' }}>Creative Process</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{selectedProject.process}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem' }}>Execution Summary</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{selectedProject.execution}</p>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem' }}>Results Achieved</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {selectedProject.results.map((r, i) => (
                      <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>✓ {r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default FeaturedWork;
