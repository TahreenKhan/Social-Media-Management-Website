import React, { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import './Services.css';

const serviceData = [
  {
    title: "Branding",
    overview: "Crafting premium brand identities that command authority and scale effortlessly.",
    outcomes: ["Market Positioning", "Visual Identity", "Brand Guidelines"]
  },
  {
    title: "Content Systems",
    overview: "Automated content engines that generate compounding interest for your brand.",
    outcomes: ["Content Architecture", "Production Workflows", "Asset Libraries"]
  },
  {
    title: "Social Media",
    overview: "Dominating digital attention through intelligent, platform-native strategies.",
    outcomes: ["Audience Growth", "Engagement Systems", "Trend Leverage"]
  },
  {
    title: "Web Development",
    overview: "Building world-class digital ecosystems engineered for conversion and speed.",
    outcomes: ["Interactive Platforms", "Headless CMS", "Performance Optimization"]
  },
  {
    title: "Video Production",
    overview: "Cinematic visual storytelling that elevates your brand to luxury status.",
    outcomes: ["Commercials", "Documentaries", "Short-form Systems"]
  },
  {
    title: "Paid Advertising",
    overview: "Scalable acquisition engines driven by data and psychological triggers.",
    outcomes: ["Funnel Architecture", "ROAS Optimization", "Creative Testing"]
  },
  {
    title: "SEO",
    overview: "Capturing high-intent organic traffic through technical and content mastery.",
    outcomes: ["Keyword Strategy", "Technical Audits", "Authority Building"]
  },
  {
    title: "Automation",
    overview: "Replacing manual effort with intelligent, self-sustaining business systems.",
    outcomes: ["Workflow Integration", "CRM Architecture", "AI Implementation"]
  },
  {
    title: "Consulting",
    overview: "High-level strategic guidance for brands ready to transition into ecosystems.",
    outcomes: ["Growth Roadmaps", "System Audits", "Executive Advisory"]
  }
];

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <h3 className="service-title">{service.title}</h3>
      <div className="service-content">
        <p className="service-overview">{service.overview}</p>
        <ul className="service-outcomes">
          {service.outcomes.map((outcome, idx) => (
            <li key={idx}>{outcome}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Services = () => {
  const topTrackRef = useRef(null);
  const bottomTrackRef = useRef(null);

  // Split data for two rows
  const topRow = [...serviceData.slice(0, 5), ...serviceData.slice(0, 5)]; 
  const bottomRow = [...serviceData.slice(4), ...serviceData.slice(4)];

  useAnimationFrame((t) => {
    if (!topTrackRef.current || !bottomTrackRef.current) return;
    
    // Smooth infinite scroll logic
    const moveAmount = (t / 20) % 2000; // Adjust speed and reset point based on width
    
    topTrackRef.current.style.transform = `translateX(-${moveAmount}px)`;
    bottomTrackRef.current.style.transform = `translateX(-${2000 - moveAmount}px)`;
  });

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="services-header">
          <h2 className="heading-lg">Ecosystem <span className="text-accent">Capabilities</span></h2>
        </div>
      </div>
      
      <div className="marquee-container">
        <div className="marquee-track" ref={topTrackRef}>
          {topRow.map((service, idx) => (
            <ServiceCard key={`top-${idx}`} service={service} />
          ))}
        </div>
        
        <div className="marquee-track" ref={bottomTrackRef}>
          {bottomRow.map((service, idx) => (
            <ServiceCard key={`bottom-${idx}`} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
