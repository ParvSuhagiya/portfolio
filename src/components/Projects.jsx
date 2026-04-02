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
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    demoVideoLink: 'https://www.youtube.com/embed/pkKn8q5AvsY?si=zDC9VkJhc57_YUuI'
  },
  {
    title: 'E-Commerce Platform',
    category: 'Full-Stack',
    tech: ['React', 'Node.js', 'MongoDB'],
    description: 'A complete e-commerce solution with product listings, shopping cart, user authentication, payment integration, and an admin dashboard for inventory management.',
    image: '/images/projects/ecommerce.png',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    demoVideoLink: ''
  },
  {
    title: 'Task Manager App',
    category: 'Full-Stack',
    tech: ['React', 'Python', 'PostgreSQL'],
    description: 'A productivity application featuring drag-and-drop task management, real-time collaboration, deadline tracking, and customizable project boards inspired by Kanban methodology.',
    image: '/images/projects/taskmanager.png',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    demoVideoLink: ''
  },
  {
    title: 'Weather Dashboard',
    category: 'Frontend',
    tech: ['JavaScript', 'API', 'CSS3'],
    description: 'A dynamic weather application that displays real-time weather data, 7-day forecasts, and interactive maps using multiple weather APIs with a beautiful glassmorphic interface.',
    image: '/images/projects/weather.png',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    demoVideoLink: ''
  },
  {
    title: 'Chat Application',
    category: 'Full-Stack',
    tech: ['React', 'Socket.io', 'Node.js'],
    description: 'A real-time messaging application with private and group chats, message history, typing indicators, file sharing, and end-to-end encryption support.',
    image: '/images/projects/chat.png',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    demoVideoLink: ''
  },
  {
    title: 'Blog Platform',
    category: 'Full-Stack',
    tech: ['React', 'Node.js', 'MongoDB'],
    description: 'A modern blogging platform with a rich text editor, image uploads, categories and tags, commenting system, and SEO-optimized page rendering.',
    image: '/images/projects/blog.png',
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    demoVideoLink: ''
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
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
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
              <div className="proj-card-img">
                {p.demoVideoLink ? (
                  <iframe
                    src={p.demoVideoLink}
                    title={p.title}
                    className="proj-card-iframe"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img src={p.image} alt={p.title} />
                )}
                <div className="proj-card-accent"></div>
              </div>

              <div className="proj-card-body">
                <h3 className="proj-card-name">{p.title}</h3>
                <div className="proj-card-tags">
                  {p.tech.map(t => (
                    <span key={t} className="proj-tag">{t}</span>
                  ))}
                </div>

                <div className="proj-card-actions">
                  {p.githubLink && (
                    <a href={p.githubLink} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="proj-card-btn" title="GitHub Repository">
                      <svg className="proj-btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                      Code
                    </a>
                  )}
                  {p.demoLink && (
                    <a href={p.demoLink} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="proj-card-btn proj-card-btn-primary" title="Live Demo">
                      <svg className="proj-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      Demo
                    </a>
                  )}
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="proj-modal-media">
              {project.demoVideoLink ? (
                <iframe src={project.demoVideoLink} title={project.title} className="proj-modal-iframe" allowFullScreen></iframe>
              ) : (
                <img src={project.image} alt={project.title} />
              )}
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

              <div className="proj-modal-links">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="proj-btn-github">
                    <svg className="proj-btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                    GitHub
                  </a>
                )}
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="proj-btn-demo">
                    <svg className="proj-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
