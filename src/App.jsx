import { useRef, useEffect } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css'
import Boxes from "./components/Boxes.jsx"
import SkillsSection from "./components/SkillsSection.jsx"
import Navbar from "./components/Navbar.jsx"
import AboutMe from "./components/AboutMe.jsx"
import Projects from "./components/Projects.jsx"
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

  useEffect(() => {
    // Description splitting is now handled in useGSAP
  }, []);

  useGSAP(() => {
    // Split description text first
    description_split();

    // Intro animation with stagger effect
    gsap.fromTo(
      '.char',
      {
        opacity: 0,
        scale: 0.5,
        y: 100
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "back.out",
        stagger: 0.08
      }
    );

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
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out",
        delay: 4.9
      }
    );

  });

  return (
    <>
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
      <Boxes />
      <section className="hero-section" id="home">
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
            <button className="cta-button" ref={buttonRef}>
              {buttonChars.map((char, i) => (
                <span key={i} className="button-char">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </button>
          </div>
        </div>
      </section>

      <div className="main-content">
        <AboutMe />
        <SkillsSection />
        <Projects />
        <Certificates />
        <ContactMe />
      </div>
    </>
  )
}

export default App
