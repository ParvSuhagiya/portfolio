import { useEffect, useState, useRef } from 'react';
import './GitHubContributions.css';

const GITHUB_USERNAME = 'ParvSuhagiya';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Color levels matching the site's black & gold theme
const LEVEL_COLORS = [
  'rgba(255,255,255,0.05)',   // 0 – no contribution
  'rgba(255,215,0,0.20)',     // 1 – light
  'rgba(255,215,0,0.45)',     // 2 – medium-light
  'rgba(255,215,0,0.70)',     // 3 – medium-heavy
  '#ffd700',                  // 4 – maximum
];

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function GitHubContributions() {
  const [weeks, setWeeks] = useState([]);
  const [stats, setStats] = useState({ total: 0, streak: 0, maxDay: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Use the github-contributions-api proxy (no auth needed)
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch');
        return r.json();
      })
      .then(data => {
        // data.contributions is array of { date, count, level }
        const contributions = data.contributions || [];

        // Build weeks grid (53 cols × 7 rows)
        const today = new Date();
        // Pad to start on Sunday
        const endDate = new Date(today);
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 364);

        // align to Sunday
        startDate.setDate(startDate.getDate() - startDate.getDay());

        const contribMap = {};
        contributions.forEach(c => { contribMap[c.date] = c.count; });

        const weeksArr = [];
        let cur = new Date(startDate);
        while (cur <= endDate) {
          const week = [];
          for (let d = 0; d < 7; d++) {
            const iso = cur.toISOString().split('T')[0];
            week.push({ date: iso, count: contribMap[iso] || 0 });
            cur.setDate(cur.getDate() + 1);
          }
          weeksArr.push(week);
        }

        // Stats
        let total = 0, streak = 0, curStreak = 0, maxDay = 0;
        const flat = weeksArr.flat().filter(d => d.date <= today.toISOString().split('T')[0]);
        flat.forEach(d => { total += d.count; if (d.count > maxDay) maxDay = d.count; });
        for (let i = flat.length - 1; i >= 0; i--) {
          if (flat[i].count > 0) { curStreak++; if (curStreak > streak) streak = curStreak; }
          else if (i < flat.length - 1) break;
        }

        setWeeks(weeksArr);
        setStats({ total, streak, maxDay });
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Intersection observer for fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Month labels: find where each month starts in the weeks grid
  const monthLabels = [];
  if (weeks.length > 0) {
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const firstDay = week.find(d => d.date);
      if (!firstDay) return;
      const m = new Date(firstDay.date).getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ month: MONTHS[m], col: wi });
        lastMonth = m;
      }
    });
  }

  const handleMouseEnter = (e, day) => {
    const rect = e.target.getBoundingClientRect();
    const containerRect = sectionRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top - 10,
      text: day.count === 0
        ? `No contributions on ${formatDate(day.date)}`
        : `${day.count} contribution${day.count > 1 ? 's' : ''} on ${formatDate(day.date)}`
    });
  };

  const handleMouseLeave = () => setTooltip(t => ({ ...t, visible: false }));

  return (
    <section className={`gh-section${visible ? ' gh-visible' : ''}`} ref={sectionRef} id="contributions">
      <div className="gh-header">
        <h2 className="gh-title">
          <span className="gh-title-accent">GitHub</span> Contributions
        </h2>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="gh-profile-link"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="gh-icon">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18.92-.26 1.9-.38 2.88-.39.98.01 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.07.78 2.15v3.19c0 .31.21.66.79.55C20.22 21.4 23.5 17.09 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
          </svg>
          @{GITHUB_USERNAME}
        </a>
      </div>

      {loading && (
        <div className="gh-loading">
          <div className="gh-spinner" />
          <p>Loading contributions…</p>
        </div>
      )}

      {error && (
        <div className="gh-error">
          <p>⚠️ Could not load contribution data.</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Stats row */}
          <div className="gh-stats">
            <div className="gh-stat-card">
              <span className="gh-stat-num">{stats.total.toLocaleString()}</span>
              <span className="gh-stat-label">Contributions (last year)</span>
            </div>
            <div className="gh-stat-card">
              <span className="gh-stat-num">{stats.streak}</span>
              <span className="gh-stat-label">Longest Streak</span>
            </div>
            <div className="gh-stat-card">
              <span className="gh-stat-num">{stats.maxDay}</span>
              <span className="gh-stat-label">Best Day</span>
            </div>
          </div>

          {/* Heatmap */}
          <div className="gh-chart-wrapper" style={{ position: 'relative' }}>
            {/* Month labels */}
            <div className="gh-month-row">
              <div className="gh-day-labels-spacer" />
              <div className="gh-months-inner">
                {monthLabels.map((ml, i) => (
                  <span
                    key={i}
                    className="gh-month-label"
                    style={{ gridColumn: ml.col + 1 }}
                  >
                    {ml.month}
                  </span>
                ))}
              </div>
            </div>

            <div className="gh-grid-row">
              {/* Day-of-week labels */}
              <div className="gh-day-labels">
                {DAYS.map((d, i) => (
                  <span key={d} className="gh-day-label" style={{ opacity: i % 2 === 1 ? 1 : 0 }}>
                    {d}
                  </span>
                ))}
              </div>

              {/* Cells */}
              <div className="gh-grid">
                {weeks.map((week, wi) => (
                  <div className="gh-grid-col" key={wi}>
                    {week.map((day, di) => {
                      const lvl = getLevel(day.count);
                      return (
                        <div
                          key={di}
                          className="gh-cell"
                          style={{ background: LEVEL_COLORS[lvl] }}
                          onMouseEnter={e => handleMouseEnter(e, day)}
                          onMouseLeave={handleMouseLeave}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Tooltip */}
            {tooltip.visible && (
              <div
                className="gh-tooltip"
                style={{ left: tooltip.x, top: tooltip.y }}
              >
                {tooltip.text}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="gh-legend">
            <span className="gh-legend-label">Less</span>
            {LEVEL_COLORS.map((c, i) => (
              <div key={i} className="gh-cell gh-legend-cell" style={{ background: c }} />
            ))}
            <span className="gh-legend-label">More</span>
          </div>
        </>
      )}
    </section>
  );
}
