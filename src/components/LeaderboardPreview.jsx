import React from "react";

const coders = [
  { id: 1, name: "Alice", rating: 2450, region: "US", avatar: "https://i.pravatar.cc/40?img=1", badge: "🥇" },
  { id: 2, name: "Bob", rating: 2380, region: "IN", avatar: "https://i.pravatar.cc/40?img=2", badge: "🥈" },
  { id: 3, name: "Charlie", rating: 2300, region: "CN", avatar: "https://i.pravatar.cc/40?img=3", badge: "🥉" },
];

export default function LeaderboardPreview() {
  return (
    <div className="aside-card">
      <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>Live Leaderboard</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {coders.map((c, i) => (
          <div key={c.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg)', borderRadius: 8, padding: '0.7rem 1rem',
            boxShadow: i === 0 ? '0 2px 8px #ffd70033' : 'none',
            border: i === 0 ? '2px solid gold' : '1px solid var(--border)',
            transition: 'all 0.3s',
          }}>
            <img src={c.avatar} alt={c.name} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #fff' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{c.name} {c.badge}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>Rating: <span style={{ color: c.rating >= 2400 ? '#0072ff' : '#ff9800' }}>{c.rating}</span> | {c.region}</div>
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0072ff' }}>#{i + 1}</span>
          </div>
        ))}
      </div>
      <button style={{ marginTop: 14, width: '100%', padding: '0.5rem', borderRadius: 8, background: 'var(--accent)', color: 'var(--bg)', fontWeight: 600, border: 'none' }}>View Full Leaderboard</button>
    </div>
  );
} 