import React from "react";

export default function SearchBar() {
  return (
    <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: 16 }}>
      <input placeholder="Search problems..." style={{ flex: 2, padding: '0.6rem 1rem', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
      <select style={{ flex: 1, padding: '0.6rem', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
        <option>All Difficulties</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <select style={{ flex: 1, padding: '0.6rem', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
        <option>All Tags</option>
        <option>DP</option>
        <option>Graphs</option>
        <option>Strings</option>
        <option>Binary Trees</option>
      </select>
      <select style={{ flex: 1, padding: '0.6rem', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
        <option>All Languages</option>
        <option>C++</option>
        <option>Java</option>
        <option>Python</option>
        <option>JavaScript</option>
      </select>
    </div>
  );
} 