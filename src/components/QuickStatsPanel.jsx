import React from "react";

export default function QuickStatsPanel() {
  return (
    <div className="card" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Problems Solved: <span style={{ color: '#4caf50' }}>1,234</span></div>
      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Success Rate: <span style={{ color: '#0072ff' }}>87%</span></div>
      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Favorite Language: <span style={{ color: '#ff9800' }}>Python</span></div>
      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Users Online: <span style={{ color: '#f44336' }}>1,234</span></div>
      {/* Mini performance graph placeholder */}
      <div style={{ minWidth: 120, height: 40, background: 'linear-gradient(90deg, #0072ff33, #00c6ff33)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0072ff', fontWeight: 600 }}>
        📈 +12% this week
      </div>
    </div>
  );
} 