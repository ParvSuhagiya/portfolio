import React from 'react';

const TimelineItem = ({ data, index }) => {
  const { title, organization, date, track, result, projectName, description, team, images } = data;
  const positionClass = index % 2 === 0 ? 'timeline-left' : 'timeline-right';

  // Parse "Month Year" → separate tokens
  const dateParts = date ? date.split(' ') : ['', ''];
  const month = dateParts[0] ?? '';
  const year  = dateParts[1] ?? dateParts[0] ?? '';

  // Center-node emoji or number
  let nodeContent = index + 1;
  if (result) {
    if (result.includes('🥇')) nodeContent = '🥇';
    else if (result.includes('🥈')) nodeContent = '🥈';
    else if (result.includes('🥉')) nodeContent = '🥉';
  }

  const cleanResult = result ? result.replace(/[🥇🥈🥉]/g, '').trim() : '';

  // Duplicate images twice for a seamless scroll loop (translateX(-50%))
  const loopImages = images && images.length > 0
    ? [...images, ...images]
    : [];

  return (
    <div className={`timeline-item-wrapper ${positionClass}`}>
      <div className="timeline-node">{nodeContent}</div>

      <div className="timeline-content">

        {/* ── Header ─────────────────────────────────── */}
        <div className="tc-header">
          <div className="tc-header-left">
            <h3 className="tc-hackathon-name">{title}</h3>
            <span className="tc-org">{organization}</span>
          </div>
          <div className="tc-date-badge">
            <span className="tc-month">{month}</span>
            <span className="tc-year">{year}</span>
          </div>
        </div>

        {/* ── Divider ────────────────────────────────── */}
        <div className="tc-divider" />

        {/* ── Badges ─────────────────────────────────── */}
        <div className="tc-badges">
          <span className="tc-badge tc-badge-track">{track}</span>
          {cleanResult && (
            <span className="tc-badge tc-badge-result">{cleanResult}</span>
          )}
        </div>

        {/* ── Project block ──────────────────────────── */}
        <div className="tc-project-block">
          <p className="tc-project-label">PROJECT</p>
          <h4 className="tc-project-name">{projectName}</h4>
          <p className="tc-description">{description}</p>
        </div>

        {/* ── Auto-scrolling photo strip ─────────────── */}
        {loopImages.length > 0 && (
          <div className="tc-photo-strip">
            <div className="tc-photo-track">
              {loopImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${projectName} photo ${(i % (loopImages.length / 2)) + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Footer: team avatars + CTA ─────────────── */}
        <div className="tc-footer">
          <div className="tc-team">
            {team && team.map((memberImg, i) => (
              <img
                key={i}
                src={memberImg}
                alt={`Team member ${i + 1}`}
                title={`Team member ${i + 1}`}
                className="tc-avatar"
              />
            ))}
            {team && team.length > 0 && (
              <span className="tc-team-label">{team.length} members</span>
            )}
          </div>
          <a href="#projects" className="timeline-view-more">View Details →</a>
        </div>

      </div>
    </div>
  );
};

export default TimelineItem;
