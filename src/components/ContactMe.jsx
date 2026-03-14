import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactMe.css';

gsap.registerPlugin(ScrollTrigger);

// Inline SVG illustration — person at desk with floating mail/chat icons
const ContactIllustration = () => (
  <svg className="contact-illustration" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Desk */}
    <rect x="120" y="280" width="260" height="12" rx="4" fill="#1a1500" stroke="#ffd700" strokeWidth="1" opacity="0.6"/>
    <rect x="160" y="292" width="8" height="60" rx="2" fill="#1a1500" stroke="#ffd700" strokeWidth="0.5" opacity="0.4"/>
    <rect x="332" y="292" width="8" height="60" rx="2" fill="#1a1500" stroke="#ffd700" strokeWidth="0.5" opacity="0.4"/>

    {/* Monitor */}
    <rect x="185" y="200" width="130" height="80" rx="6" fill="#0a0800" stroke="#ffd700" strokeWidth="1.5"/>
    <rect x="191" y="206" width="118" height="62" rx="3" fill="#111" />
    {/* Screen content — code lines */}
    <rect x="200" y="216" width="50" height="3" rx="1" fill="#ffd700" opacity="0.6"/>
    <rect x="200" y="224" width="70" height="3" rx="1" fill="#ffd700" opacity="0.3"/>
    <rect x="200" y="232" width="40" height="3" rx="1" fill="#ffd700" opacity="0.5"/>
    <rect x="200" y="240" width="60" height="3" rx="1" fill="#ffd700" opacity="0.2"/>
    <rect x="200" y="248" width="80" height="3" rx="1" fill="#ffd700" opacity="0.4"/>
    <rect x="200" y="256" width="35" height="3" rx="1" fill="#ffd700" opacity="0.3"/>
    {/* Monitor stand */}
    <rect x="240" y="280" width="20" height="4" rx="1" fill="#1a1500" stroke="#ffd700" strokeWidth="0.5" opacity="0.5"/>

    {/* Person — sitting at desk */}
    {/* Head */}
    <circle cx="250" cy="160" r="22" fill="#1a1500" stroke="#ffd700" strokeWidth="1.5"/>
    {/* Eyes */}
    <circle cx="242" cy="157" r="2.5" fill="#ffd700" opacity="0.8"/>
    <circle cx="258" cy="157" r="2.5" fill="#ffd700" opacity="0.8"/>
    {/* Smile */}
    <path d="M243 167 Q250 173 257 167" stroke="#ffd700" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
    {/* Body */}
    <path d="M235 182 Q250 195 265 182" fill="#1a1500" stroke="#ffd700" strokeWidth="1.5"/>
    <rect x="230" y="185" width="40" height="50" rx="8" fill="#1a1500" stroke="#ffd700" strokeWidth="1.5"/>
    {/* Arms */}
    <path d="M230 200 Q200 220 210 260" stroke="#ffd700" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
    <path d="M270 200 Q300 220 290 260" stroke="#ffd700" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
    {/* Keyboard */}
    <rect x="210" y="272" width="80" height="8" rx="3" fill="#0a0800" stroke="#ffd700" strokeWidth="0.8" opacity="0.5"/>

    {/* Floating mail envelope — top right */}
    <g className="contact-float-1" transform="translate(370, 100)">
      <rect x="0" y="0" width="50" height="35" rx="5" fill="#1a1500" stroke="#ffd700" strokeWidth="1.5"/>
      <path d="M5 5 L25 22 L45 5" stroke="#ffd700" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M5 30 L18 20" stroke="#ffd700" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M45 30 L32 20" stroke="#ffd700" strokeWidth="1" fill="none" opacity="0.4"/>
    </g>

    {/* Floating chat bubble — top left */}
    <g className="contact-float-2" transform="translate(60, 80)">
      <rect x="0" y="0" width="55" height="35" rx="10" fill="#1a1500" stroke="#ffd700" strokeWidth="1.5"/>
      <rect x="10" y="10" width="25" height="3" rx="1" fill="#ffd700" opacity="0.6"/>
      <rect x="10" y="17" width="35" height="3" rx="1" fill="#ffd700" opacity="0.3"/>
      <rect x="10" y="24" width="18" height="3" rx="1" fill="#ffd700" opacity="0.5"/>
      <polygon points="15,35 10,48 25,35" fill="#1a1500" stroke="#ffd700" strokeWidth="1.5"/>
    </g>

    {/* Floating @ symbol — right */}
    <g className="contact-float-3" transform="translate(380, 220)">
      <circle cx="20" cy="20" r="20" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.5"/>
      <text x="11" y="27" fontFamily="Poppins, sans-serif" fontSize="18" fontWeight="700" fill="#ffd700" opacity="0.7">@</text>
    </g>

    {/* Location pin — left */}
    <g className="contact-float-4" transform="translate(80, 200)">
      <path d="M15 0 C6.7 0 0 6.7 0 15 C0 25 15 38 15 38 C15 38 30 25 30 15 C30 6.7 23.3 0 15 0Z" fill="#1a1500" stroke="#ffd700" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="15" cy="14" r="5" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.6"/>
    </g>

    {/* Small sparkles */}
    <circle cx="340" cy="170" r="3" fill="#ffd700" opacity="0.3"/>
    <circle cx="130" cy="140" r="2" fill="#ffd700" opacity="0.4"/>
    <circle cx="400" cy="280" r="2.5" fill="#ffd700" opacity="0.2"/>
    <circle cx="100" cy="300" r="2" fill="#ffd700" opacity="0.3"/>
  </svg>
);

const ContactMe = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const illusRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      );

      gsap.fromTo(illusRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: illusRef.current, start: 'top 85%' }
        }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%' }
        }
      );

      gsap.fromTo(socialsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: socialsRef.current, start: 'top 90%' }
        }
      );

      // Float the SVG elements
      gsap.to('.contact-float-1', { y: -10, duration: 2.5, ease: 'power1.inOut', yoyo: true, repeat: -1 });
      gsap.to('.contact-float-2', { y: 8, duration: 3, ease: 'power1.inOut', yoyo: true, repeat: -1, delay: 0.5 });
      gsap.to('.contact-float-3', { y: -6, x: 5, duration: 2.8, ease: 'power1.inOut', yoyo: true, repeat: -1, delay: 1 });
      gsap.to('.contact-float-4', { y: 8, duration: 3.2, ease: 'power1.inOut', yoyo: true, repeat: -1, delay: 0.3 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — wire up to your backend/email service
    const btn = e.target.querySelector('.ct-submit');
    gsap.to(btn, {
      scale: 0.95, duration: 0.1, ease: 'power2.in',
      onComplete: () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
      }
    });
  };

  return (
    <section className="ct-root" id="contact" ref={sectionRef}>
      <div className="ct-inner">
        <header className="ct-header" ref={titleRef}>
          <p className="ct-eyebrow">GET IN TOUCH</p>
          <h2 className="ct-title">
            Let's <span className="ct-title-accent">Connect</span>
          </h2>
          <p className="ct-subtitle">Have a project in mind or just want to say hi? Drop me a message and I'll get back to you as soon as possible.</p>
        </header>

        <div className="ct-layout">
          {/* Illustration side */}
          <div className="ct-illus-side" ref={illusRef}>
            <ContactIllustration />

            {/* Info cards below illustration */}
            <div className="ct-info-cards">
              <div className="ct-info-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ct-info-icon">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
                <div>
                  <span className="ct-info-label">Email</span>
                  <span className="ct-info-value">parv@example.com</span>
                </div>
              </div>
              <div className="ct-info-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ct-info-icon">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <div>
                  <span className="ct-info-label">Location</span>
                  <span className="ct-info-value">India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <form className="ct-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-name">Your Name</label>
              <input className="ct-input" id="ct-name" type="text" placeholder="John Doe" required />
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-email">Email Address</label>
              <input className="ct-input" id="ct-email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-subject">Subject</label>
              <input className="ct-input" id="ct-subject" type="text" placeholder="Project Collaboration" />
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-message">Message</label>
              <textarea className="ct-textarea" id="ct-message" placeholder="Tell me about your project..." rows="5" required></textarea>
            </div>
            <button type="submit" className="ct-submit">
              <span>Send Message</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ct-send-icon">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="ct-socials" ref={socialsRef}>
          <div className="ct-social-divider">
            <div className="ct-div-line" />
            <span className="ct-div-text">or find me on</span>
            <div className="ct-div-line" />
          </div>
          <div className="ct-social-links">
            <a href="https://github.com/parv" target="_blank" rel="noopener noreferrer" className="ct-social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="https://linkedin.com/in/parv" target="_blank" rel="noopener noreferrer" className="ct-social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://twitter.com/parv" target="_blank" rel="noopener noreferrer" className="ct-social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com/parv" target="_blank" rel="noopener noreferrer" className="ct-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom footer line */}
      <div className="ct-footer">
        <p className="ct-footer-text">© 2024 Parv. Built with React & GSAP.</p>
      </div>
    </section>
  );
};

export default ContactMe;
