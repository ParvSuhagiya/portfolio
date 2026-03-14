import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'Portfolio Website',
    category: 'Frontend',
    tech: ['React', 'GSAP', 'CSS3'],
    description: 'A stunning personal portfolio built with React and GSAP animations. Features smooth scroll-triggered animations, interactive UI elements, and a fully responsive design with a dark theme aesthetic.',
    image: '/images/projects/portfolio.png',
  },
  {
    title: 'E-Commerce Platform',
    category: 'Full-Stack',
    tech: ['React', 'Node.js', 'MongoDB'],
    description: 'A complete e-commerce solution with product listings, shopping cart, user authentication, payment integration, and an admin dashboard for inventory management.',
    image: '/images/projects/ecommerce.png',
  },
  {
    title: 'Task Manager App',
    category: 'Full-Stack',
    tech: ['React', 'Python', 'PostgreSQL'],
    description: 'A productivity application featuring drag-and-drop task management, real-time collaboration, deadline tracking, and customizable project boards inspired by Kanban methodology.',
    image: '/images/projects/taskmanager.png',
  },
  {
    title: 'Weather Dashboard',
    category: 'Frontend',
    tech: ['JavaScript', 'API', 'CSS3'],
    description: 'A dynamic weather application that displays real-time weather data, 7-day forecasts, and interactive maps using multiple weather APIs with a beautiful glassmorphic interface.',
    image: '/images/projects/weather.png',
  },
  {
    title: 'Chat Application',
    category: 'Full-Stack',
    tech: ['React', 'Socket.io', 'Node.js'],
    description: 'A real-time messaging application with private and group chats, message history, typing indicators, file sharing, and end-to-end encryption support.',
    image: '/images/projects/chat.png',
  },
  {
    title: 'Blog Platform',
    category: 'Full-Stack',
    tech: ['React', 'Node.js', 'MongoDB'],
    description: 'A modern blogging platform with a rich text editor, image uploads, categories and tags, commenting system, and SEO-optimized page rendering.',
    image: '/images/projects/blog.png',
  },
];

const Projects = () => {
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

  const project = expandedIdx !== null ? projectsData[expandedIdx] : null;

  return (
    <section className="proj-root" id="projects" ref={sectionRef}>
      <div className="proj-inner">
        <header className="proj-header" ref={titleRef}>
          <p className="proj-eyebrow">FEATURED WORK</p>
          <h2 className="proj-title">
            My <span className="proj-title-accent">Projects</span>
          </h2>
        </header>

        <div className="proj-grid">
          {projectsData.map((p, i) => (
            <div
              key={p.title}
              className="proj-card"
              ref={el => cardRefs.current[i] = el}
              onClick={() => openModal(i)}
            >
              <div className="proj-card-accent" />
              <div className="proj-card-img">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="proj-card-body">
                <h3 className="proj-card-name">{p.title}</h3>
                <div className="proj-card-tags">
                  {p.tech.map(t => (
                    <span key={t} className="proj-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {expandedIdx !== null && (
        <div className="proj-overlay" ref={overlayRef} onClick={closeModal}>
          <div className="proj-modal" ref={modalRef} onClick={e => e.stopPropagation()}>
            <button className="proj-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="proj-modal-img">
              <img src={project.image} alt={project.title} />
            </div>

            <div className="proj-modal-content">
              <span className="proj-modal-cat">{project.category}</span>
              <h2 className="proj-modal-title">{project.title}</h2>
              <p className="proj-modal-desc">{project.description}</p>
              <div className="proj-modal-tags">
                {project.tech.map(t => (
                  <span key={t} className="proj-modal-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
