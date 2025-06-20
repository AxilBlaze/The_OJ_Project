import React from "react";

const featured = {
  title: "Longest Increasing Subsequence",
  bonus: 50,
  streak: 3,
  snippet: "Given an unsorted array, find the length of the longest increasing subsequence...",
  discussion: "#",
};

export default function ProblemOfTheDay() {
  return (
    <div className="aside-card" style={{ background: 'linear-gradient(90deg, #e0eafc 60%, var(--card-bg))', borderLeft: '4px solid #0072ff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '2rem' }}>🌟</span>
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem' }}>Problem of the Day</h3>
        <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#0072ff' }}>+{featured.bonus} pts</span>
      </div>
      <div style={{ margin: '0.5rem 0', fontWeight: 700 }}>{featured.title}</div>
      <div style={{ fontSize: '0.95rem', color: 'var(--accent)' }}>{featured.snippet}</div>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#ff9800', fontWeight: 700, fontSize: '1.1rem' }}>🔥 {featured.streak} day streak</span>
        <a href={featured.discussion} style={{ color: '#0072ff', textDecoration: 'underline', fontSize: '0.95rem', marginLeft: 'auto' }}>Discussion</a>
      </div>
    </div>
  );
} 