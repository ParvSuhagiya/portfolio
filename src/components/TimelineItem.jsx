import React from 'react';

const TimelineItem = ({ data, index }) => {
  const { title, organization, date, track, result, projectName, description, team, images } = data;
  const positionClass = index % 2 === 0 ? 'timeline-left' : 'timeline-right';

  // Determine the display in the center node
  let nodeContent = index + 1;
  if (result) {
    if (result.includes('🥇')) nodeContent = '🥇';
    else if (result.includes('🥈')) nodeContent = '🥈';
    else if (result.includes('🥉')) nodeContent = '🥉';
  }

  return (
    <div className={`timeline-item-wrapper ${positionClass}`}>
      <div className="timeline-node">
        {nodeContent}
      </div>

      <div className="timeline-content">
        <h3 className="timeline-hackathon-name">{title}</h3>
        <div className="timeline-subtext">
          <span>{organization}</span>
          <span>{date}</span>
        </div>
        
        <div className="timeline-track-result">
          {track} • {result.replace(/[🥇🥈🥉]/g, '').trim()}
        </div>

        <h4 className="timeline-project-name">{projectName}</h4>
        
        <p className="timeline-description">
          {description}
        </p>

        <div className="timeline-team">
          {team && team.map((memberImg, i) => (
             <img key={i} src={memberImg} alt={`Team member ${i + 1}`} title={`Team member ${i + 1}`} />
          ))}
        </div>

        <div className="timeline-gallery">
          {images && images.map((imgSrc, i) => (
            <img key={i} src={imgSrc} alt={`${projectName} preview ${i + 1}`} title={`${projectName}`} />
          ))}
        </div>

        <a href="#projects" className="timeline-view-more">View Details →</a>
      </div>
    </div>
  );
};

export default TimelineItem;
