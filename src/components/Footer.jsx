import React from "react";

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '2rem 0 1rem 0', color: '#ff6b35', fontSize: '1rem' }}>
      <div style={{ marginBottom: 8 }}>
        <a href="#" style={{ color: '#007acc', margin: '0 1rem', textDecoration: 'none', transition: 'opacity 0.3s ease' }}>About</a>
        <a href="#" style={{ color: '#ff6b35', margin: '0 1rem', textDecoration: 'none', transition: 'opacity 0.3s ease' }}>Contact</a>
        <a href="#" style={{ color: '#007acc', margin: '0 1rem', textDecoration: 'none', transition: 'opacity 0.3s ease' }}>Privacy</a>
      </div>
      <div>
        &copy; {new Date().getFullYear()} CodeBlaze. All rights reserved.
      </div>
    </footer>
  );
} 