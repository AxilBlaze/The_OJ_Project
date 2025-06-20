import React from "react";

const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array", "HashMap"], acceptance: 48, snippet: "Given an array of integers...", sample: "Input: [2,7,11,15], Target: 9" },
  { id: 2, title: "Binary Tree Paths", difficulty: "Medium", tags: ["Tree", "DFS"], acceptance: 39, snippet: "Given a binary tree...", sample: "Input: [1,2,3,null,5]" },
  { id: 3, title: "Word Ladder", difficulty: "Hard", tags: ["BFS", "Graph"], acceptance: 22, snippet: "Given two words and a dictionary...", sample: "Input: beginWord = 'hit'..." },
];

const difficultyColor = {
  Easy: '#4caf50',
  Medium: '#ff9800',
  Hard: '#f44336',
};

export default function ProblemArchivePreview() {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: '1.3rem' }}>Problem Archive</h2>
        <button style={{ fontSize: '0.95rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: 16 }}>
        <input placeholder="Search problems..." style={{ flex: 1, padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
        <select style={{ padding: '0.5rem', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {problems.map(p => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--card-bg)', borderRadius: 12, padding: '1rem 1.2rem', border: '1px solid var(--border)',
            boxShadow: '0 1px 4px #0001', transition: 'box-shadow 0.2s',
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 2 }}>{p.title}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--accent)' }}>{p.snippet}</div>
              <div style={{ fontSize: '0.9rem', color: '#888', marginTop: 2 }}>Sample: <code>{p.sample}</code></div>
              <div style={{ marginTop: 4, display: 'flex', gap: 8 }}>
                {p.tags.map(tag => <span key={tag} style={{ fontSize: '0.8rem', background: '#eee', color: '#333', borderRadius: 6, padding: '2px 8px', marginRight: 4 }}>{tag}</span>)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <span style={{ fontWeight: 600, color: difficultyColor[p.difficulty], fontSize: '1rem' }}>{p.difficulty}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>{p.acceptance}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 