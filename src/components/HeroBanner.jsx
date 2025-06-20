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
    <section style={{
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
      <h1 style={{
        fontSize: '2.7rem',
        fontWeight: 800,
        letterSpacing: '0.01em',
        background: 'linear-gradient(90deg, #00c6ff, #0072ff, #00c6ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'shine 2s linear infinite',
        zIndex: 1
      }}>
        {phrases[index]}
      </h1>
      <div style={{ display: 'flex', gap: '1.5rem', zIndex: 1 }}>
        <button style={{ padding: '0.8rem 2.2rem', fontSize: '1.1rem', borderRadius: '2rem', background: 'linear-gradient(90deg, #0072ff, #00c6ff)', color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px #0072ff22', border: 'none' }}>Start Coding</button>
        <button style={{ padding: '0.8rem 2.2rem', fontSize: '1.1rem', borderRadius: '2rem', background: 'var(--card-bg)', color: 'var(--text)', fontWeight: 700, border: '1px solid var(--border)' }}>Browse Problems</button>
        <button style={{ padding: '0.8rem 2.2rem', fontSize: '1.1rem', borderRadius: '2rem', background: 'var(--accent)', color: 'var(--bg)', fontWeight: 700, border: 'none' }}>Join Contest</button>
      </div>
      {/* Stats bar placeholder */}
      <div style={{ display: 'flex', gap: '2.5rem', marginTop: '1.5rem', zIndex: 1 }}>
        <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>🟢 1,234 users online</span>
        <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>✅ 12,345 problems solved today</span>
        <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>📨 45,678 submissions</span>
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