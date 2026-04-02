import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroDecor.css';

const HeroDecor = () => {
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animations mapped slightly abstract to make it look organic
      gsap.to('.decor-item-1', {
        y: -30, rotation: 15, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1
      });
      gsap.to('.decor-item-2', {
        y: 25, x: -15, rotation: -10, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5
      });
      gsap.to('.decor-item-3', {
        y: -20, rotation: -8, scale: 1.05, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2
      });
      gsap.to('.decor-item-4', {
        y: 30, x: 10, rotation: 12, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.8
      });
    }, decorRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-decor-container" ref={decorRef}>
      {/* 3D Wireframe Globe */}
      <svg className="decor-item decor-item-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hd-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#e6a800" stopOpacity="0.1"/>
          </linearGradient>
          <filter id="hd-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="40" stroke="url(#hd-gold-grad)" strokeWidth="1.5" filter="url(#hd-glow)"/>
        <ellipse cx="50" cy="50" rx="40" ry="15" stroke="url(#hd-gold-grad)" strokeWidth="1.2" transform="rotate(30 50 50)" opacity="0.6"/>
        <ellipse cx="50" cy="50" rx="40" ry="15" stroke="url(#hd-gold-grad)" strokeWidth="1.2" transform="rotate(-30 50 50)" opacity="0.6"/>
        <ellipse cx="50" cy="50" rx="15" ry="40" stroke="url(#hd-gold-grad)" strokeWidth="1.2" opacity="0.4"/>
        {/* Center core pulse */}
        <circle cx="50" cy="50" r="3" fill="#ffd700" filter="url(#hd-glow)"/>
      </svg>

      {/* Hexagon Outline */}
      <svg className="decor-item decor-item-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
         <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="url(#hd-gold-grad)" strokeWidth="2" fill="rgba(255,215,0,0.02)" filter="url(#hd-glow)"/>
         <polygon points="50,22 78,37 78,63 50,78 22,63 22,37" stroke="rgba(255,215,0,0.5)" strokeWidth="1" fill="none"/>
         <circle cx="50" cy="10" r="3" fill="#ffd700" />
         <circle cx="90" cy="70" r="3" fill="#ffd700" />
         <circle cx="10" cy="70" r="3" fill="#ffd700" />
      </svg>

      {/* Code Brackets */}
      <svg className="decor-item decor-item-3" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50" y="65" textAnchor="middle" fontFamily="'Courier New', monospace" fontSize="56" fontWeight="bold" fill="url(#hd-gold-grad)" filter="url(#hd-glow)">
          {"{ }"}
        </text>
      </svg>
      
      {/* Code Slash */}
      <svg className="decor-item decor-item-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50" y="70" textAnchor="middle" fontFamily="'Courier New', monospace" fontSize="64" fontWeight="bold" fill="url(#hd-gold-grad)" filter="url(#hd-glow)" opacity="0.8">
          {"</>"}
        </text>
      </svg>
    </div>
  );
};

export default HeroDecor;
