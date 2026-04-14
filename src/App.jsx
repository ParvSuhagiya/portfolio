import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis';
import './App.css'

import SkillsSection from "./components/SkillsSection.jsx"
import Navbar from "./components/Navbar.jsx"
import AboutMe from "./components/AboutMe.jsx"
import ParticleBackground from "./components/ParticleBackground.jsx"
import HeroDecor from "./components/HeroDecor.jsx"
import Projects from "./components/Projects.jsx"
import Timeline from "./components/Timeline.jsx"
import Certificates from "./components/Certificates.jsx"
import ContactMe from "./components/ContactMe.jsx"

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const introRef = useRef(null);
  const textRef = useRef(null);
  const photoRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonChars = "View My Work".split('');
  const resumeChars = "RESUME".split('');
  const chars = "PARV'S PORTFOLIO".split('');
  const descSplitDone = useRef(false);

    function description_split(){
    if (descSplitDone.current) return; // Only run once
    const desc = descRef.current;
    if (!desc) return; // Safety check
    const letters = desc.innerText.split('');
    let span_arr = '';
    letters.forEach(element => {
      span_arr += `<span class="desc-letter">${element === ' ' ? '&nbsp;' : element}</span>`;
    });
    desc.innerHTML = span_arr;
    descSplitDone.current = true; // Mark as done
  }

  let text = "I’m a passionate Full Stack Developer who enjoys building modern, scalable web applications. I work across both frontend and backend, creating seamless user experiences and efficient server-side logic. I love turning ideas into real-world products and continuously improving my skills with new technologies."
  let words = text.split(" ");

  
  const importantWords = ["Full", "Stack", "Developer", "modern,", "scalable", "frontend", "backend,", "seamless", "efficient", "server-side", "real-world", "technologies."];
  
  const [para,setPara] = useState(words);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    // Apply important class to highlighted words using your DOM approach
    gsap.utils.toArray('.about-word').forEach((e) => {
      if(importantWords.includes(e.textContent.trim())) {
        e.id = "important";
      }
    });

    // Split description text first
    description_split();

    // Intro animation with stagger effect
    gsap.fromTo(
      '.intro-text .char',
      {
        y: 100,
        scale: 0.97
      },
      {
        y: 15,
        scale: 1,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.03
      }
    );

    // Apply exact user requested animation to all other text
    const genericTexts = gsap.utils.toArray('h2, h3, h4, h5, h6, p').filter((el) => {
      // Avoid breaking specific pre-animated blocks, intro, hero texts, or complex SVG/Link nests
      if (
        el.closest('.intro-container') ||
        el.closest('.hero-content') ||
        el.closest('.aboutMe_root') || 
        el.classList.contains('hero-description') ||
        el.classList.contains('proj-eyebrow') ||
        el.classList.contains('cert-eyebrow') ||
        el.querySelector('svg') ||
        el.querySelector('a')
      ) {
        return false;
      }
      return el.innerText.trim().length > 0;
    });

    genericTexts.forEach((el) => {
      // Give overflow hide to all parent containers as requested
      el.style.overflow = "hidden";
      // adding padding bottom so characters aren't clipped initially if there's no margin
      // but let's just apply the pure user request
      
      const split = new SplitType(el, { types: 'lines, words, chars' });
      
      // We also ensure word level overflow hidden for tighter mask reveals
      // but applying it to parent handles most cases smoothly.
      
      if (split.chars && split.chars.length > 0) {
        gsap.fromTo(
          split.chars,
          {
            y: 100,
            scale: 0.97
          },
          {
            y: 15, // exactly as requested
            scale: 1,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true
            }
          }
        );
      }
    });


    // Remove intro after animation
    gsap.to(introRef.current, {
      delay: 3,
      duration: 1,
      opacity: 0,
      pointerEvents: "none"
    });

    // Hero section animations - triggered after intro disappears
    gsap.fromTo(
      photoRef.current,
      {
        opacity: 0,
        x: -100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        delay: 4
      }
    );

    gsap.fromTo(
      nameRef.current,
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        delay: 4.3
      }
    );

    gsap.fromTo(
      descRef.current,
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        delay: 4.6
      }
    );

    gsap.to('.hero-description .desc-letter', {
      duration: 0.5,
      scale: 1.05,
      stagger: 0.1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 5.5 // Give time for the slide-in animation to complete
    });

    // Button container animation first
    gsap.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out",
        delay: 4.9
      }
    );

    // about me text animation

    gsap.fromTo(
      '.about-word',
      { opacity: 0.1},
      {
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "center center",
          end: "+=1000", // scroll distance
          scrub: 1,
          pin: true,
        },
        onUpdate: function () {
          const wordElements = gsap.utils.toArray('.about-word');
          const progress = this.progress;
          wordElements.forEach((word, i) => {
            if (progress * wordElements.length > i) {
              word.classList.add("active");
            } else {
              word.classList.remove("active");
            }
          });
        },
      }
    );

  });

  return (
    <>
      <ParticleBackground />
      <div className="intro-container" ref={introRef}>
        <h1 className="intro-text" ref={textRef}>
          <div className="char_container">
            {chars.map((char, i) => (
              <span key={i} className="char">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </h1>
      </div>
      <Navbar />
      <section className="hero-section" id="home">
        <HeroDecor />
        <div className="hero-container">
          <div className="hero-photo" ref={photoRef}>
            <img src="https://res.cloudinary.com/dbouvoh2b/image/upload/v1772976227/profile_final_photo_hfdo45.jpg" alt="Profile" className="profile-img" />
          </div>
          
          <div className="hero-content">
            <h1 className="hero-name" ref={nameRef}>
              Hi, I'm <span className="highlight">Parv</span>
            </h1>
            <p className="hero-description" ref={descRef}>
              A passionate full-stack developer creating beautiful and functional web experiences. 
              I specialize in React, GSAP animations, and modern web design. Let's build something amazing together!
            </p>
            <div className="hero-buttons" ref={buttonRef}>
              <a href="#project_sec" className="cta-button">
                {buttonChars.map((char, i) => (
                  <span key={i} className="button-char">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </a>
              <a href="/resume.pdf" download="Parv_Suhagiya_Resume.pdf" className="cta-button">
                {resumeChars.map((char, i) => (
                  <span key={i} className="button-char">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </a>
              
            </div>
          </div>
        </div>
      </section>

      <div className="main-content">
        <AboutMe words={para} />
        <SkillsSection />
        <Projects />
        <Timeline />
        <Certificates />
        <ContactMe />
      </div>
    </>
  )
}

export default App
