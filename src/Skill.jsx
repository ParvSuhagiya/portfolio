import React from 'react';
import './Skill.css';

const Skill = ({ name, logo, level }) => {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <div className="skill-logo">
          <img src={logo} alt={`${name} logo`} />
        </div>
        <div className="skill-info">
          <h3 className="skill-name">{name}</h3>
          <span className="skill-percentage">{level}%</span>
        </div>
      </div>
      <div className="skill-bar-container">
        <div
          className="skill-bar-fill"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Skill;