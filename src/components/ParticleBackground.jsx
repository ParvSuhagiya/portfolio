import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 500;
const SIZES  = [1, 1, 1.5, 2, 2, 3];   // weighted — more small than big
const rand   = (min, max) => Math.random() * (max - min) + min;

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const dpr    = Math.min(window.devicePixelRatio || 1, 2);
    let W, H, particles, rafId;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticle(y) {
      const isGold = Math.random() < 0.12;
      const size   = SIZES[Math.floor(Math.random() * SIZES.length)];
      return {
        x:         rand(0, W),
        y:         y ?? rand(0, H),
        size,
        vx:        rand(-0.08, 0.08),
        vy:        rand(-0.18, -0.04),    // slow upward drift
        wobbleAmp: rand(0.1, 0.4),        // horizontal sway amplitude
        wobbleSpd: rand(0.008, 0.022),    // sway speed
        wobbleOff: rand(0, Math.PI * 2), // phase offset
        rotation:  rand(0, Math.PI / 2), // initial angle
        rotSpeed:  rand(-0.01, 0.01),    // spin speed
        baseAlpha: rand(0.15, isGold ? 0.75 : 0.5),
        alpha:     0,                    // fades in
        alphaDir:  1,
        twinkleSpd:rand(0.004, 0.014),   // twinkle oscillation
        twinkleOff:rand(0, Math.PI * 2),
        twinkleT:  0,
        isGold,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(null));
    }

    function frame(t = 0) {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic wobble
        p.wobbleOff += p.wobbleSpd;
        p.x  += p.vx + Math.sin(p.wobbleOff) * p.wobbleAmp;
        p.y  += p.vy;

        // Spin
        p.rotation += p.rotSpeed;

        // Twinkle — alpha oscillates gently
        p.twinkleT += p.twinkleSpd;
        const twinkleFactor = 0.75 + 0.25 * Math.sin(p.twinkleT + p.twinkleOff);
        const displayAlpha  = Math.min(p.alpha * twinkleFactor, 1);

        // Fade in
        if (p.alpha < p.baseAlpha) p.alpha += 0.002;

        // Wrap — respawn at bottom when floated off top
        if (p.y < -4) {
          Object.assign(p, makeParticle(H + 4));
          p.alpha = 0;
          continue;
        }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;

        // Draw rotated square
        ctx.save();
        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.isGold
          ? `rgba(255,215,0,${displayAlpha.toFixed(3)})`
          : `rgba(255,255,255,${displayAlpha.toFixed(3)})`;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      rafId = requestAnimationFrame(frame);
    }

    init();
    frame();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); }, 200);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground;
