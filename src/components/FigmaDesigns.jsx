import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FigmaDesigns.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── ADD YOUR FIGMA DESIGNS HERE ─────────────────────────────────────────── */
const figmaData = [
  {
    title: 'Coding Gita UI',
    category: 'Desktop Design',
    description: 'cloned the UI of coding gita website landing page.',
    image: 'https://res.cloudinary.com/dotryksrv/image/upload/q_auto/f_auto/v1776443003/coding_gita_figma_tb3rau.png', // ← replace with your screenshot
    url: 'https://www.figma.com/design/NPQq2cWNJDJLFPOdHq6RiE/Untitled?node-id=68-7&t=tTm5jcP1IvQKFxXt-1',  // ← replace with your Figma link
  },
  {
    title: 'Red Bus UI',
    category: 'Desktop Design',
    description: 'cloned the UI of red bus website landing page.',
    image: 'https://res.cloudinary.com/dotryksrv/image/upload/q_auto/f_auto/v1776443001/red_bus_figma_k6ju6u.png', // ← replace
    url: 'https://www.figma.com/design/NPQq2cWNJDJLFPOdHq6RiE/Untitled?node-id=84-597&t=tTm5jcP1IvQKFxXt-1',
  },
  {
    title: 'Hospital Landing page',
    category: 'Web Design',
    description: 'Complete dashboard UI kit with analytics widgets, data tables, notifications — designed for a scalable SaaS product experience.',
    image: 'https://res.cloudinary.com/dotryksrv/image/upload/q_auto/f_auto/v1776443001/fortis_figma_wqo9of.png', // ← replace
    url: 'https://www.figma.com/design/NPQq2cWNJDJLFPOdHq6RiE/Untitled?node-id=374-383&t=tTm5jcP1IvQKFxXt-1',
  },
];
/* ─────────────────────────────────────────────────────────────────────────── */

const FigmaDesigns = () => {
  const sectionRef = useRef(null);
  const titleRef  = useRef(null);
  const cardRefs  = useRef([]);

  /* Title animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Card stagger animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 90%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const openFigma = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="fig-root" id="figma-designs" ref={sectionRef}>
      <div className="fig-inner">
        <header className="fig-header" ref={titleRef}>
          <p className="fig-eyebrow">DESIGN WORK</p>
          <h2 className="fig-title">
            My <span className="fig-title-accent">Figma</span> Designs
          </h2>
        </header>

        <div className="fig-grid">
          {figmaData.map((item, i) => (
            <div
              key={item.title}
              className="fig-card"
              ref={el => cardRefs.current[i] = el}
              onClick={() => openFigma(item.url)}
              role="link"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && openFigma(item.url)}
              aria-label={`Open Figma design: ${item.title}`}
            >
              {/* top gold accent line (shows on hover via CSS) */}
              <div className="fig-card-accent" />

              {/* screenshot */}
              <div className="fig-card-img">
                <img src={item.image} alt={item.title} />

                {/* link icon — visible on hover */}
                <div className="fig-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>

                {/* Figma logo badge */}
                <div className="fig-badge">
                  <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5Z" fill="#1ABCFE"/>
                    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5A9.5 9.5 0 1 1 0 47.5Z" fill="#0ACF83"/>
                    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" fill="#FF7262"/>
                    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E"/>
                    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF"/>
                  </svg>
                </div>
              </div>

              {/* card body */}
              <div className="fig-card-body">
                <h3 className="fig-card-name">{item.title}</h3>
                <span className="fig-card-category">{item.category}</span>
                <p className="fig-card-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FigmaDesigns;
