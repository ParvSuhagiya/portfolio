import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Certificates.css';

gsap.registerPlugin(ScrollTrigger);

const certificatesData = [
  {
    title: 'React Developer Certification',
    issuer: 'Meta',
    date: 'January 2024',
    description: 'Comprehensive certification covering React fundamentals, hooks, state management, component architecture, testing with Jest, and building production-ready applications following industry best practices.',
    image: '/images/certificates/react.png',
    credentialId: 'META-RD-2024-0892',
  },
  {
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: 'November 2023',
    description: 'Mastered core JavaScript concepts including ES6+, regular expressions, debugging, data structures, algorithm scripting, object-oriented programming, and functional programming paradigms.',
    image: '/images/certificates/javascript.png',
    credentialId: 'FCC-JSADS-2023',
  },
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'September 2023',
    description: 'Completed projects demonstrating proficiency in HTML5 semantic elements, CSS3 Flexbox, Grid, animations, responsive design principles, and accessibility best practices.',
    image: '/images/certificates/webdesign.png',
    credentialId: 'FCC-RWD-2023',
  },
  {
    title: 'Full-Stack Web Development',
    issuer: 'Udemy',
    date: 'March 2024',
    description: 'End-to-end full-stack development certification covering Node.js, Express, MongoDB, REST APIs, authentication, deployment, and building production web applications from scratch.',
    image: '/images/certificates/fullstack.png',
    credentialId: 'UDEMY-FSWD-2024',
  },
  {
    title: 'Git & GitHub Mastery',
    issuer: 'Coursera',
    date: 'August 2023',
    description: 'Certification in version control using Git, branching strategies, merge conflict resolution, pull requests, collaborative workflows, CI/CD pipelines, and GitHub Actions.',
    image: '/images/certificates/git.png',
    credentialId: 'COURSERA-GGM-2023',
  },
  {
    title: 'Python for Data Science',
    issuer: 'IBM',
    date: 'December 2023',
    description: 'Certification covering Python programming, data analysis with Pandas and NumPy, data visualization with Matplotlib, and introductory machine learning concepts for data-driven applications.',
    image: '/images/certificates/python.png',
    credentialId: 'IBM-PDS-2023',
  },
];

const Certificates = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 90%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const openModal = (idx) => {
    setExpandedIdx(idx);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(modalRef.current,
        { scale: 0.85, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
      );
    });
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      scale: 0.9, opacity: 0, y: 30,
      duration: 0.3, ease: 'power2.in'
    });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setExpandedIdx(null);
        document.body.style.overflow = '';
      }
    });
  };

  const cert = expandedIdx !== null ? certificatesData[expandedIdx] : null;

  return (
    <section className="cert-root" id="certificates" ref={sectionRef}>
      <div className="cert-inner">
        <header className="cert-header" ref={titleRef}>
          <p className="cert-eyebrow">ACHIEVEMENTS</p>
          <h2 className="cert-title">
            My <span className="cert-title-accent">Certificates</span>
          </h2>
        </header>

        <div className="cert-grid">
          {certificatesData.map((c, i) => (
            <div
              key={c.title}
              className="cert-card"
              ref={el => cardRefs.current[i] = el}
              onClick={() => openModal(i)}
            >
              <div className="cert-card-accent" />
              <div className="cert-card-img">
                <img src={c.image} alt={c.title} />
              </div>
              <div className="cert-card-body">
                <h3 className="cert-card-name">{c.title}</h3>
                <span className="cert-card-issuer">{c.issuer} · {c.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {expandedIdx !== null && (
        <div className="cert-overlay" ref={overlayRef} onClick={closeModal}>
          <div className="cert-modal" ref={modalRef} onClick={e => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="cert-modal-img">
              <img src={cert.image} alt={cert.title} />
            </div>

            <div className="cert-modal-content">
              <span className="cert-modal-issuer">{cert.issuer}</span>
              <h2 className="cert-modal-title">{cert.title}</h2>
              <span className="cert-modal-date">{cert.date}</span>
              <p className="cert-modal-desc">{cert.description}</p>
              <div className="cert-modal-credential">
                <span className="cert-cred-label">Credential ID</span>
                <span className="cert-cred-id">{cert.credentialId}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
