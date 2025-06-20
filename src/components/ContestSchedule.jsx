import React from "react";

const contests = [
  { id: 1, name: "Weekly Challenge #42", start: Date.now() + 3600 * 1000 * 5, duration: 7200, participants: 320, level: "Intermediate" },
  { id: 2, name: "Beginner Blitz", start: Date.now() + 3600 * 1000 * 30, duration: 5400, participants: 180, level: "Easy" },
];

function getCountdown(start) {
  const diff = Math.max(0, Math.floor((start - Date.now()) / 1000));
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = diff % 60;
  return `${h}h ${m}m ${s}s`;
}

export default function ContestSchedule() {
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="aside-card">
      <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>Upcoming Contests</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {contests.map(c => (
          <div key={c.id} style={{
            background: 'var(--bg)', borderRadius: 8, padding: '0.7rem 1rem', border: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: 4
          }}>
            <div style={{ fontWeight: 700 }}>{c.name}</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--accent)' }}>Level: {c.level} | Participants: {c.participants}</div>
            <div style={{ fontSize: '0.95rem', color: '#0072ff' }}>Starts in: <span style={{ fontWeight: 600 }}>{getCountdown(c.start)}</span></div>
            <div style={{ fontSize: '0.9rem', color: '#888' }}>Duration: {Math.floor(c.duration / 60)} min</div>
          </div>
        ))}
      </div>
      <button style={{ marginTop: 14, width: '100%', padding: '0.5rem', borderRadius: 8, background: 'var(--accent)', color: 'var(--bg)', fontWeight: 600, border: 'none' }}>View All Contests</button>
    </div>
  );
} 