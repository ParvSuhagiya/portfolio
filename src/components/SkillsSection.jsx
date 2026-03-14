import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SkillsSection.css';

gsap.registerPlugin(ScrollTrigger);

// --- SVG Icons ---
const Icons = {
  React: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
      <circle r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#F7DF1E" rx="2"/>
      <path d="M19.5 25.6c.7 1.1 1.6 1.9 3.2 1.9 1.3 0 2.2-.7 2.2-1.6 0-1.1-.9-1.5-2.4-2.1l-.8-.4c-2.4-1-4-2.3-4-5 0-2.5 1.9-4.4 4.8-4.4 2.1 0 3.6.7 4.7 2.6l-2.6 1.7c-.6-1-1.1-1.4-2.1-1.4-1 0-1.6.6-1.6 1.4 0 1 .6 1.4 2.1 2l.8.4c2.8 1.2 4.4 2.4 4.4 5.2 0 2.9-2.3 4.6-5.4 4.6-3 0-5-1.4-5.9-3.3l2.6-1.6zm-10.2.3c.5.9.9 1.6 2 1.6.9 0 1.5-.4 1.5-1.8v-10h3.2V26c0 3-1.7 4.3-4.3 4.3-2.3 0-3.6-1.2-4.3-2.6l2-.8z" fill="#000"/>
    </svg>
  ),
  HTML5: () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3l1.8 20.3L16 26l9.2-2.7L27 3H5z" fill="#E44D26"/>
      <path d="M16 24.5l7.5-2.1 1.5-17H16v19.1z" fill="#F16529"/>
      <path d="M10.8 13h5.2v-2.5H8.1l.4 4.5H16V12.5H10.8V13zm.5 5.5H8.8l.3 3.5 6.9 1.9v-2.6l-3.8-1-.2-1.8z" fill="#EBEBEB"/>
      <path d="M16 13v2.5h4.8l-.5 5-4.3 1.2v2.6l6.9-1.9 1-11.8H16V13z" fill="#fff"/>
    </svg>
  ),
  CSS3: () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3l1.8 20.3L16 26l9.2-2.7L27 3H5z" fill="#1572B6"/>
      <path d="M16 24.5l7.5-2.1 1.5-17H16v19.1z" fill="#33A9DC"/>
      <path d="M16 13h-5l-.3-3.5H16V7H8.1l.8 9H16V13zm0 6.5l-3.8-1-.2-2.5H9.4l.5 5.5 6.1 1.7V19.5z" fill="#EBEBEB"/>
      <path d="M16 13v2.5h4.6l-.4 4.9-4.2 1.1v2.6l6.1-1.7 1-12.4H16V13z" fill="#fff"/>
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3c-.4 0-.8.1-1.1.3L5.2 8.9C4.5 9.3 4 10 4 10.8v10.4c0 .8.5 1.5 1.2 1.9l9.7 5.6c.7.4 1.5.4 2.2 0l9.7-5.6c.7-.4 1.2-1.1 1.2-1.9V10.8c0-.8-.5-1.5-1.2-1.9L17.1 3.3c-.3-.2-.7-.3-1.1-.3z" fill="#339933"/>
      <path d="M16 7.7v17l7.2-4.2V11.9L16 7.7z" fill="#fff" opacity=".2"/>
      <text x="8.5" y="20" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#fff">JS</text>
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9 3C11 3 11.3 5.1 11.3 5.1v2.1h4.7v.6H7.7S4 7.4 4 12.4s3.3 4.8 3.3 4.8H9v-2.3s-.1-3.3 3.2-3.3h5.6s3.1.1 3.1-3V5.9S21.4 3 15.9 3zM13.2 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#366A96"/>
      <path d="M16.1 29c4.9 0 4.6-2.1 4.6-2.1v-2.1h-4.7v-.6h8.3s3.7.4 3.7-4.6-3.3-4.8-3.3-4.8H23v2.3s.1 3.3-3.2 3.3h-5.6s-3.1-.1-3.1 3v2.7S10.6 29 16.1 29zm2.7-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FFC331"/>
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.5 14.5l-12-12a2.1 2.1 0 00-3 0l-2.6 2.6 3.4 3.4a2.5 2.5 0 013.2 3.2l3.3 3.3a2.5 2.5 0 11-1.5 1.5L17 13.6v8.1a2.5 2.5 0 11-2 0v-8.2a2.5 2.5 0 01-1.4-3.3L10.3 6.9 2.5 14.7a2.1 2.1 0 000 3l12 12a2.1 2.1 0 003 0l12-12a2.1 2.1 0 000-3.2z" fill="#F05032"/>
    </svg>
  ),
  GSAP: () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#0AE448"/>
      <text x="4" y="22" fontFamily="monospace" fontSize="13" fontWeight="900" fill="#000">GS</text>
      <text x="4" y="30" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#000">AP</text>
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="2" fill="#3178C6"/>
      <path d="M18.7 17.5v1.4c.4.2.8.4 1.3.5s1 .2 1.5.2c.5 0 1-.1 1.4-.2.5-.1.9-.3 1.2-.5.4-.2.6-.5.8-.9.2-.3.3-.7.3-1.2 0-.3 0-.6-.1-.9-.1-.2-.2-.5-.4-.7-.2-.2-.4-.4-.7-.6-.3-.2-.6-.3-1-.5-.3-.1-.5-.2-.7-.3-.2-.1-.4-.2-.5-.3-.1-.1-.2-.2-.3-.3 0-.1-.1-.2-.1-.4 0-.1 0-.2.1-.3.1-.1.2-.2.3-.2.1-.1.3-.1.4-.2h.6c.3 0 .5 0 .8.1.2 0 .5.1.7.2.2.1.4.2.6.3v-1.3c-.3-.1-.7-.2-1-.3-.4-.1-.8-.1-1.2-.1-.5 0-1 .1-1.4.2-.4.1-.8.3-1.1.5-.3.2-.6.5-.7.8-.2.3-.3.7-.3 1.2 0 .6.2 1.1.5 1.5.3.4.8.7 1.5 1l.7.3c.2.1.4.2.5.3.1.1.2.2.3.3.1.1.1.2.1.4s0 .3-.1.4c-.1.1-.2.2-.3.3-.1.1-.3.1-.5.2h-.6c-.3 0-.6 0-.9-.1-.3-.1-.6-.2-.8-.3-.2-.1-.4-.3-.5-.4zm-3.8-5.3h2.9v-1.3h-7.4v1.3h2.9v8H15v-8z" fill="#fff"/>
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 29c2.2 0 4-1.8 4-4v-4h-4a4 4 0 000 8z" fill="#0ACF83"/>
      <path d="M7 17a4 4 0 014-4h4v8h-4a4 4 0 01-4-4z" fill="#A259FF"/>
      <path d="M7 9a4 4 0 014-4h4v8h-4a4 4 0 01-4-4z" fill="#F24E1E"/>
      <path d="M15 5h4a4 4 0 010 8h-4V5z" fill="#FF7262"/>
      <path d="M23 17a4 4 0 11-8 0 4 4 0 018 0z" fill="#1ABCFE"/>
    </svg>
  ),
};

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "React", level: 90, color: "#61DAFB" },
      { name: "JavaScript", icon: "JavaScript", level: 85, color: "#F7DF1E" },
      { name: "TypeScript", icon: "TypeScript", level: 78, color: "#3178C6" },
      { name: "HTML5", icon: "HTML5", level: 95, color: "#E44D26" },
      { name: "CSS3", icon: "CSS3", level: 90, color: "#1572B6" },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "NodeJS", level: 80, color: "#339933" },
      { name: "Python", icon: "Python", level: 75, color: "#3776AB" },
    ]
  },
  {
    category: "Animation",
    skills: [
      { name: "GSAP", icon: "GSAP", level: 88, color: "#0AE448" },
      { name: "Figma", icon: "Figma", level: 82, color: "#A259FF" },
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: "Git", level: 85, color: "#F05032" },
    ]
  }
];

const allSkills = skillsData.flatMap(cat => cat.skills.map(s => ({ ...s, category: cat.category })));

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const tabsRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const progressRefs = useRef([]);
  const statsRef = useRef(null);

  const categories = ['All', ...skillsData.map(c => c.category)];
  const filtered = activeCategory === 'All'
    ? allSkills
    : allSkills.filter(s => s.category === activeCategory);

  // Initial scroll-triggered entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      );
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: subtitleRef.current, start: 'top 85%' }
        }
      );
      // Tabs bar
      gsap.fromTo(tabsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.35,
          scrollTrigger: { trigger: tabsRef.current, start: 'top 90%' }
        }
      );
      // Stats row
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 90%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards + bars whenever filtered list changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const bars = progressRefs.current.filter(Boolean);

      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.07 }
      );

      bars.forEach((bar) => {
        if (!bar) return;
        gsap.fromTo(bar,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power3.out', delay: 0.3,
            transformOrigin: 'left center'
          }
        );
      });
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section className="sk-root" id="skills" ref={sectionRef}>
      {/* Background grid lines decoration */}
      <div className="sk-bg-grid" />

      <div className="sk-inner">

        {/* Header */}
        <header className="sk-header">
          <p className="sk-eyebrow" ref={subtitleRef}>TECHNICAL EXPERTISE</p>
          <h2 className="sk-title" ref={titleRef}>
            Skills &amp; <span className="sk-title-accent">Technologies</span>
          </h2>
        </header>

        {/* Stats row */}
        <div className="sk-stats" ref={statsRef}>
          <div className="sk-stat">
            <span className="sk-stat-num">8+</span>
            <span className="sk-stat-label">Technologies</span>
          </div>
          <div className="sk-stat-divider" />
          <div className="sk-stat">
            <span className="sk-stat-num">3+</span>
            <span className="sk-stat-label">Years Experience</span>
          </div>
          <div className="sk-stat-divider" />
          <div className="sk-stat">
            <span className="sk-stat-num">20+</span>
            <span className="sk-stat-label">Projects Built</span>
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="sk-tabs" ref={tabsRef}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`sk-tab ${activeCategory === cat ? 'sk-tab--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="sk-grid" ref={gridRef}>
          {filtered.map((skill, i) => {
            const IconComp = Icons[skill.icon];
            return (
              <div
                key={`${skill.category}-${skill.name}`}
                className="sk-card"
                ref={el => cardRefs.current[i] = el}
                style={{ '--skill-color': skill.color }}
              >
                {/* Top accent line */}
                <div className="sk-card-accent" />

                <div className="sk-card-body">
                  {/* Icon */}
                  <div className="sk-icon-wrap">
                    {IconComp && <IconComp />}
                  </div>

                  {/* Name + category */}
                  <div className="sk-card-meta">
                    <h3 className="sk-card-name">{skill.name}</h3>
                    <span className="sk-card-cat">{skill.category}</span>
                  </div>

                  {/* Percentage */}
                  <div className="sk-card-pct" style={{ color: skill.color }}>
                    {skill.level}<span className="sk-pct-symbol">%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="sk-bar-track">
                  <div
                    className="sk-bar-fill"
                    data-level={skill.level}
                    ref={el => progressRefs.current[i] = el}
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`
                    }}
                  >
                    <div className="sk-bar-glow" style={{ background: skill.color }} />
                  </div>
                </div>

                {/* Proficiency dots */}
                <div className="sk-dots">
                  {[1,2,3,4,5].map(d => (
                    <span
                      key={d}
                      className="sk-dot"
                      style={{
                        background: d <= Math.ceil(skill.level / 20) ? skill.color : 'rgba(255,255,255,0.1)'
                      }}
                    />
                  ))}
                  <span className="sk-dot-label">
                    {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : skill.level >= 70 ? 'Proficient' : 'Learning'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
