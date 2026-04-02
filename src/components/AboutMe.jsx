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

      <svg className="about-quote about-quote-right" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="url(#am-gold-grad)"/>
      </svg>
    </div>
  );
};

export default AboutMe;
