import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const TOTAL_FRAMES = 240;
const INITIAL_PRELOAD = 30;

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [showText, setShowText] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Helper to format frame number (e.g., 1 -> '001')
  const getFramePath = (index) => {
    const paddedIndex = index.toString().padStart(3, '0');
    return `/assets/hero-sequence/ezgif-frame-${paddedIndex}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    // Store loaded Image objects
    const loadedImages = [];
    
    // Function to draw a specific frame
    const drawFrame = (index) => {
      if (!loadedImages[index]) return;
      const img = loadedImages[index];
      
      // Handle canvas resizing and image aspect ratio cover
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;
      
      if (canvasRatio > imgRatio) {
        // Canvas is wider than image (crop top/bottom)
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        // Canvas is taller than image (crop sides)
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }
      
      // Clear canvas and draw
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Preload images
    const preloadImages = async () => {
      // 1. Load initial batch first so we can display immediately
      for (let i = 1; i <= INITIAL_PRELOAD; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        await new Promise((resolve) => {
          img.onload = () => {
            loadedImages[i] = img;
            if (i === 1) drawFrame(1); // Draw first frame immediately
            setImagesLoaded(prev => prev + 1);
            resolve();
          };
          img.onerror = resolve; // Continue even if one fails
        });
      }
      
      // 2. Load the rest asynchronously in the background without awaiting
      for (let i = INITIAL_PRELOAD + 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          loadedImages[i] = img;
          setImagesLoaded(prev => prev + 1);
        };
      }
    };

    preloadImages();

    // Scroll Logic via requestAnimationFrame
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            setHasScrolled(true);
          }
          if (!containerRef.current) return;
          
          // Calculate scroll progress within the hero section
          const section = containerRef.current;
          const rect = section.getBoundingClientRect();
          
          // rect.top is 0 when section top hits viewport top.
          // rect.top goes negative as we scroll down.
          // The total scroll distance is section height - viewport height.
          const scrollDistance = rect.height - window.innerHeight;
          let progress = -rect.top / scrollDistance;
          
          // Clamp progress between 0 and 1
          progress = Math.max(0, Math.min(1, progress));
          
          // Map progress to frame index (1 to TOTAL_FRAMES)
          const frameIndex = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.floor(progress * TOTAL_FRAMES) + 1)
          );
          
          drawFrame(frameIndex);
          
          // Show text only near the end of the scroll (e.g. > 85%)
          setShowText(progress > 0.85);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Handle Resize
    const handleResize = () => {
      // Redraw current frame on resize
      if (!containerRef.current) return;
      const section = containerRef.current;
      const rect = section.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      let progress = -rect.top / scrollDistance;
      progress = Math.max(0, Math.min(1, progress));
      const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.floor(progress * TOTAL_FRAMES) + 1));
      drawFrame(frameIndex);
      setShowText(progress > 0.85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="hero-section" ref={containerRef} id="home">
      <div className="hero-sticky-container">
        
        <canvas ref={canvasRef} className="hero-canvas"></canvas>
        <div className="hero-gradient-overlay"></div>

        <AnimatePresence>
          {showText && (
            <>
              <motion.div 
                className="hero-fade-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25))',
                  zIndex: 5
                }}
              />
              <motion.div 
                className="hero-content"
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.95 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="heading-xl hero-title">
                  From Social Media Chaos<br/>
                  To <span className="highlight">Business Growth</span>
                </h1>
                <div className="hero-actions">
                  <a href="#build" className="btn btn-primary">Build My Engine</a>
                  <a href="#work" className="btn btn-outline" style={{ background: 'var(--white)' }}>View Highlights</a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!hasScrolled && (
            <motion.div 
              className="scroll-indicator-wrapper"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 1 },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              style={{ 
                position: 'absolute', 
                bottom: '40px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                zIndex: 20,
                color: 'var(--white)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 500,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Scroll Down
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Hero;
