import React, { useRef, useState, useEffect } from 'react'
import './navbar.css'

const NAV_ITEMS = [
  { label: 'Home',          sectionId: 'home',          hash: '#home' },
  { label: 'About',         sectionId: 'about',         hash: '#about' },
  { label: 'Skills',        sectionId: 'skills',        hash: '#skills' },
  { label: 'Projects',      sectionId: 'projects',      hash: '#projects' },
  { label: 'Timeline',      sectionId: 'timeline',      hash: '#timeline' },
  { label: 'Certificates',  sectionId: 'certificates',  hash: '#certificates' },
  { label: 'Designs',       sectionId: 'figma-designs', hash: '#figma-designs' },
  { label: 'Contact',       sectionId: 'contact',       hash: '#contact' },
];

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isVisible, setIsVisible]       = useState(true);
  const [activeId, setActiveId]         = useState('home');
  const lastScrollY = useRef(0);

  /* Hide on scroll down, show on scroll up */
  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      setIsVisible(cur < lastScrollY.current || cur < 150);
      lastScrollY.current = cur;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Track active section from URL hash */
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActiveId(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    // Set initial from hash
    const init = window.location.hash.replace('#', '');
    if (init) setActiveId(init);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveId(sectionId);
    if (window.innerWidth <= 900) setIsMobileOpen(false);
  };

  return (
    <>
      <div
        className={`hamburger-icon ${isVisible ? '' : 'hidden'}`}
        onClick={() => setIsMobileOpen(v => !v)}
        aria-label="Toggle navigation menu"
        role="button"
      >
        <i className={isMobileOpen ? 'ri-close-line' : 'ri-menu-line'} />
      </div>

      <nav
        className={`navbar ${isMobileOpen ? 'mobile-open' : ''} ${isVisible ? '' : 'nav-hidden'}`}
        aria-label="Primary navigation"
      >
        <ul className='list_ul'>
          {NAV_ITEMS.map(({ label, sectionId, hash }) => (
            <li
              key={label}
              className={`list_li${activeId === sectionId ? ' nav-active' : ''}`}
              onClick={() => handleClick(sectionId)}
            >
              {/* semantic anchor for SEO crawlers */}
              <a
                href={hash}
                className="t"
                onClick={e => e.preventDefault()}
                aria-label={`Navigate to ${label} section`}
                aria-current={activeId === sectionId ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
