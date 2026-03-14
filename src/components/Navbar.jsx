import React, { useRef } from 'react'
import gsap from 'gsap'
import './navbar.css'

const Navbar = () => {
  const navbarRef = useRef(null);

  const handleMouseEnter = () => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    const texts = navbar.querySelectorAll('.t');

    // Show all texts with stagger
    gsap.set(texts, { display: 'block' });
    gsap.fromTo(texts,
      { opacity: 0, x: -14 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out', stagger: 0.06 }
    );

    // Animate the navbar border to gold
    gsap.to(navbar, {
      borderColor: 'rgba(255, 226, 38, 0.6)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    const texts = navbar.querySelectorAll('.t');

    // Hide all texts
    gsap.to(texts, {
      opacity: 0,
      x: -8,
      duration: 0.25,
      ease: 'power2.in',
      stagger: 0.04,
      onComplete: () => gsap.set(texts, { display: 'none' })
    });

    // Animate navbar border back to transparent
    gsap.to(navbar, {
      borderColor: 'rgba(255, 255, 255, 0.196)',
      duration: 0.3,
      ease: 'power2.in'
    });
  };

  const handleClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const items = [
    { icon: 'ri-home-line',         label: 'Home',         sectionId: 'home' },
    { icon: 'ri-user-line',          label: 'About Me',     sectionId: 'about' },
    { icon: 'ri-sparkling-fill',      label: 'Skills',       sectionId: 'skills' },
    { icon: 'ri-code-s-slash-line',  label: 'Projects',     sectionId: 'projects' },
    { icon: 'ri-certificate-2-line', label: 'Certificates', sectionId: 'certificates' },
    { icon: 'ri-mail-line',          label: 'Contact Me',   sectionId: 'contact' },
  ];

  return (
    <div
      className='navbar'
      ref={navbarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className='list_ul'>
        {items.map((item) => (
          <li key={item.label} className='list_li' onClick={() => handleClick(item.sectionId)}>
            <i className={item.icon}></i>
            <span className="t">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
