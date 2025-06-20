import React from "react";

const badges = [
  { name: "Streak Master", icon: "🔥", progress: 80, rarity: "Epic" },
  { name: "Contest Winner", icon: "🏆", progress: 100, rarity: "Legendary" },
  { name: "First Solve", icon: "✨", progress: 100, rarity: "Common" },
];

const rarityColor = {
  Common: '#b8b8b8',
  Epic: '#7c4dff',
  Legendary: '#ffd700',
};

export default function AchievementsTeaser() {
  return (
    <div className="aside-card">
      <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Achievements</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {badges.map(b => (
          <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.5rem' }}>{b.icon}</span>
            <span style={{ fontWeight: 600 }}>{b.name}</span>
            <div style={{ flex: 1, height: 8, background: '#eee', borderRadius: 4, margin: '0 8px' }}>
              <div style={{ width: `${b.progress}%`, height: 8, background: rarityColor[b.rarity], borderRadius: 4, transition: 'width 0.3s' }} />
            </div>
            <span style={{ fontSize: '0.9rem', color: rarityColor[b.rarity], fontWeight: 700 }}>{b.rarity}</span>
          </div>
        ))}
      </div>
      <button style={{ marginTop: 12, width: '100%', padding: '0.5rem', borderRadius: 8, background: 'var(--accent)', color: 'var(--bg)', fontWeight: 600, border: 'none' }}>View All Badges</button>
    </div>
  );
} 