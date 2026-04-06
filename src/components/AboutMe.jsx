import "./aboutMe.css"

const AboutMe = ({ words }) => {
  return (
    <div className="about-wrapper">
      <svg className="about-quote about-quote-left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="am-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#e6a800" />
          </linearGradient>
        </defs>
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="url(#am-gold-grad)"/>
      </svg>

      <section id="about">
        {words && words.map((word, index) => (
          <span 
              key={index} 
              className="about-word"
          >
            {word}
          </span>
        ))}
      </section>

      <div className="about-details">
        <div className="about-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          India /* Update with actual location */
        </div>
        
        <div className="about-links">
          <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="about-btn leetcode-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.606-2.636a5.055 5.055 0 0 0-3.585-1.419c-1.285 0-2.6.471-3.6 1.436L3.922 10.511a5.1 5.1 0 0 0-1.465 3.659c0 1.43.528 2.809 1.465 3.754l4.346 4.363c1.015 1.015 2.317 1.481 3.585 1.481s2.57-.466 3.585-1.481l2.606-2.636c.514-.515.496-1.366-.039-1.901-.535-.536-1.386-.554-1.903-.039v.019zM20.51 7.218l-8.68 8.665c-.535.535-1.386.553-1.903.038-.514-.515-.496-1.366.039-1.901l8.68-8.665c.535-.535 1.386-.553 1.902-.038.515.515.497 1.366-.038 1.901z"/>
            </svg>
            Active on LeetCode
          </a>

          <a href="/resume.pdf" download="Parv_Suhagiya_Resume.pdf" className="about-btn resume-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            View My Resume
          </a>
        </div>
      </div>

      <svg className="about-quote about-quote-right" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="url(#am-gold-grad)"/>
      </svg>
    </div>
  );
};

export default AboutMe;
