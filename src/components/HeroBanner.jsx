import React from "react";

const phrases = [
  "Sharpen Your Skills.",
  "Solve.",
  "Compete.",
  "Grow."
];

export default function HeroBanner() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % phrases.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-banner" style={{
      position: 'relative',
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      background: 'linear-gradient(90deg, var(--card-bg) 60%, transparent)',
      borderRadius: '1.5rem',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      padding: '1rem'
    }}>
      {/* Particle background placeholder */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.18,
        background: 'repeating-linear-gradient(135deg, #b8b8b8 0 2px, transparent 2px 20px)'
      }} />
      <h1 className="hero-title" style={{
        fontSize: 'clamp(1.6rem, 6vw, 2.7rem)',
        fontWeight: 800,
        letterSpacing: '0.01em',
        color: '#007acc',
        animation: 'shine 2s linear infinite',
        zIndex: 1,
        textAlign: 'center'
      }}>
        {phrases[index]}
      </h1>
      <div className="hero-actions" style={{ display: 'flex', gap: '1.5rem', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="hero-btn" style={{ padding: '0.8rem 2.2rem', fontSize: '1.1rem', borderRadius: '2rem', background: 'linear-gradient(90deg, #ff6b35, #e55a2b)', color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)', border: 'none' }}>Start Coding</button>
        <button className="hero-btn" style={{ padding: '0.8rem 2.2rem', fontSize: '1.1rem', borderRadius: '2rem', background: 'linear-gradient(90deg, #007acc, #005a9e)', color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px rgba(0, 122, 204, 0.3)', border: 'none' }}>Browse Problems</button>
        <button className="hero-btn" style={{ padding: '0.8rem 2.2rem', fontSize: '1.1rem', borderRadius: '2rem', background: '#ff6b35', color: '#fff', fontWeight: 700, border: 'none' }}>Join Contest</button>
      </div>
      {/* Stats bar placeholder */}
      <div className="hero-stats" style={{ display: 'flex', gap: '2.5rem', marginTop: '1.5rem', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span className="hero-stat" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#007acc' }}>🟢 1,234 users online</span>
        <span className="hero-stat" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#ff6b35' }}>✅ 12,345 problems solved today</span>
        <span className="hero-stat" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#007acc' }}>📨 45,678 submissions</span>
      </div>
      <style>{`
        @keyframes shine {
          0% { filter: brightness(1.1); }
          50% { filter: brightness(1.5); }
          100% { filter: brightness(1.1); }
        }
      `}</style>
    </section>
  );
} 