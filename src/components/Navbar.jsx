import React, { useRef, useState, useEffect } from 'react'
import './navbar.css'

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide if scrolling down and deeply past the hero banner. Show if scrolling up.
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth <= 900) {
      setIsMobileOpen(false);
    }
  };

  const items = [
    { label: 'Home',         sectionId: 'home' },
    { label: 'About',        sectionId: 'about' },
    { label: 'Skills',       sectionId: 'skills' },
    { label: 'Projects',     sectionId: 'projects' },
    { label: 'Certificates', sectionId: 'certificates' },
    { label: 'Contact',      sectionId: 'contact' },
  ];

  return (
    <>
      <div className={`hamburger-icon ${isVisible ? '' : 'hidden'}`} onClick={toggleMenu}>
        <i className={isMobileOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
      </div>
      <div className={`navbar ${isMobileOpen ? 'mobile-open' : ''} ${isVisible ? '' : 'nav-hidden'}`}>
        <ul className='list_ul'>
          {items.map((item) => (
            <li key={item.label} className='list_li' onClick={() => handleClick(item.sectionId)}>
              <span className="t">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
