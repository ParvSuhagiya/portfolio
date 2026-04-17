import { useRef, useEffect } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import GitHubContributions from "./components/GitHubContributions.jsx"
import FigmaDesigns from "./components/FigmaDesigns.jsx"
import { useScrollSpy } from "./hooks/useScrollSpy.js"

/* ── Per-section page titles & URL hashes ── */
const SECTIONS = [
  { id: 'home',           hash: '/#home',          title: 'Parv Suhagiya | Full Stack Developer | Portfolio' },
  { id: 'about',          hash: '/#about',         title: 'About Parv Suhagiya | Full Stack Developer' },
  { id: 'contributions',  hash: '/#contributions', title: 'Parv Suhagiya | GitHub Contributions' },
  { id: 'skills',         hash: '/#skills',        title: 'Parv Suhagiya | Skills & Technologies' },
  { id: 'projects',       hash: '/#projects',      title: 'Parv Suhagiya | Projects | Full Stack Developer' },
  { id: 'timeline',       hash: '/#timeline',      title: 'Parv Suhagiya | Experience & Hackathons' },
  { id: 'certificates',   hash: '/#certificates',  title: 'Parv Suhagiya | Certifications & Achievements' },
  { id: 'figma-designs',  hash: '/#figma-designs', title: 'Parv Suhagiya | Figma Design Work' },
  { id: 'contact',        hash: '/#contact',       title: 'Contact Parv Suhagiya | Full Stack Developer' },
];

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const introRef = useRef(null);
  const textRef = useRef(null);
  const photoRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  /* Dynamic title + hash on scroll */
  useScrollSpy(SECTIONS);

  /* Scroll to section on initial load if hash is present */
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.replace('#', '');
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  const buttonChars = "View My Work".split('');
  const resumeChars = "RESUME".split('');
  const chars = "PARV'S PORTFOLIO".split('');

  const text = "I'm a passionate Full Stack Developer who enjoys building modern, scalable web applications. I work across both frontend and backend, creating seamless user experiences and efficient server-side logic. I love turning ideas into real-world products and continuously improving my skills with new technologies."
  const words = text.split(" ");

  const importantWords = ["Full", "Stack", "Developer", "modern,", "scalable", "frontend", "backend,", "seamless", "efficient", "server-side", "real-world", "technologies."];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
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
    // Apply important class to highlighted words
    gsap.utils.toArray('.about-word').forEach((e) => {
      if (importantWords.includes(e.textContent.trim())) {
        e.id = "important";
      }
    });

    // Intro animation — char level is fine here (short text, runs once)
    gsap.fromTo(
      '.intro-text .char',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.04
      }
    );

    // ── Lightweight scroll-reveal for section headings & paragraphs ──
    // Use LINE-level reveals (not char-level) to keep GPU happy.
    const genericTexts = gsap.utils.toArray('h2, h3, h4, h5, h6, p').filter((el) => {
      if (
        el.closest('.intro-container') ||
        el.closest('.hero-content') ||
        el.closest('.aboutMe_root') ||
        el.classList.contains('hero-description') ||
        el.classList.contains('proj-eyebrow') ||
        el.classList.contains('cert-eyebrow') ||
        el.querySelector('svg') ||
        el.querySelector('a')
      ) return false;
      return el.innerText.trim().length > 0;
    });

    genericTexts.forEach((el) => {
      // Simple, GPU-friendly fade+rise on the whole element — no SplitType needed
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          }
        }
      );
    });

    // Remove intro after animation
    gsap.to(introRef.current, {
      delay: 2.8,
      duration: 0.8,
      opacity: 0,
      pointerEvents: "none"
    });

    // Hero section animations
    gsap.fromTo(
      photoRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 3.5 }
    );

    gsap.fromTo(
      nameRef.current,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 3.7 }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 3.9 }
    );

    // Button container
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "back.out", delay: 4.1 }
    );

    // About Me word-reveal (scrub animation — no change needed here, it's smooth)
    gsap.fromTo(
      '.about-word',
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "center center",
          end: "+=1000",
          scrub: 0.6,
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
              <a href="https://drive.google.com/file/d/1MmKPgIpUA8sOYCoDKz-P0YHGp0iLQYZL/view?usp=drive_open" target='_blank' className="cta-button">
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
        <AboutMe words={words} />
        <GitHubContributions />
        <SkillsSection />
        <Projects />
        <Timeline />
        <Certificates />
        <FigmaDesigns />
        <ContactMe />
      </div>
    </>
  )
}

export default App
