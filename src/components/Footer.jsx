import React from "react";

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '2rem 0 1rem 0', color: 'var(--accent)', fontSize: '1rem' }}>
      <div style={{ marginBottom: 8 }}>
        <a href="#" style={{ color: 'var(--accent)', margin: '0 1rem' }}>About</a>
        <a href="#" style={{ color: 'var(--accent)', margin: '0 1rem' }}>Contact</a>
        <a href="#" style={{ color: 'var(--accent)', margin: '0 1rem' }}>Privacy</a>
      </div>
      <div>
        &copy; {new Date().getFullYear()} CodeBlaze. All rights reserved.
      </div>
    </footer>
  );
} 