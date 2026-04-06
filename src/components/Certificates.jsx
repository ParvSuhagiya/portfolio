import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Certificates.css';

gsap.registerPlugin(ScrollTrigger);

const certificatesData = [
  {
    title: 'Appian AI Fundamentals Certification',
    issuer: 'Meta',
    date: 'January 2024',
    description: 'This certificate recognizes the successful completion of training in Appian’s AI capabilities, including AI-driven process automation, intelligent decision-making, and enterprise workflow integration. It demonstrates proficiency in leveraging AI within business processes to enhance efficiency, scalability, and data-driven outcomes.',
    image: 'https://res.cloudinary.com/dgoh0rhen/image/upload/v1775493913/appian_ai_certificate_seorpo.png',
    credentialId: 'META-RD-2024-0892',
  },
  {
    title: 'Elite Hackathon Participation Certificate',
    issuer: 'freeCodeCamp',
    date: 'November 2023',
    description: 'This certificate recognizes active participation in a competitive hackathon focused on building innovative solutions to real-world problems. It demonstrates hands-on experience in coding, teamwork, and rapid problem-solving under time constraints, reflecting strong technical and collaborative skills.',
    image: 'https://res.cloudinary.com/dgoh0rhen/image/upload/v1775493914/elite_hack_certificate_zo9z8t.jpg',
    credentialId: 'FCC-JSADS-2023',
  },
  {
    title: 'Synaptix AI Certification',
    issuer: 'freeCodeCamp',
    date: 'September 2023',
    description: 'This certificate recognizes the successful completion of training in advanced artificial intelligence concepts, including machine learning, data analytics, and AI-driven automation. It demonstrates the ability to apply intelligent systems for solving real-world problems and building data-driven solutions.',
    image: 'https://res.cloudinary.com/dgoh0rhen/image/upload/v1775493914/synaptix_ai_a0bp7j.jpg',
    credentialId: 'FCC-RWD-2023',
  }
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
