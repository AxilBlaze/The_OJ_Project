import React, { useEffect, useState } from 'react';
import './CelebrationAnimation.css';

const CelebrationAnimation = ({ isVisible, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isVisible) {
      // Create confetti particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      }));
      setParticles(newParticles);

      // Auto-hide after animation completes
      const timer = setTimeout(() => {
        onComplete && onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="celebration-overlay">
      {/* Fire background */}
      <div className="fire-container">
        <div className="fire fire-1"></div>
        <div className="fire fire-2"></div>
        <div className="fire fire-3"></div>
        <div className="fire fire-4"></div>
        <div className="fire fire-5"></div>
      </div>

      {/* Success message */}
      <div className="success-message">
        <div className="success-icon">🎉</div>
        <h2 className="success-title">CORRECT ANSWER!</h2>
        <p className="success-subtitle">All test cases passed! 🔥</p>
      </div>

      {/* Confetti particles */}
      <div className="confetti-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="confetti-particle"
            style={{
              left: particle.x + 'px',
              top: particle.y + 'px',
              backgroundColor: particle.color,
              width: particle.size + 'px',
              height: particle.size + 'px',
              transform: `rotate(${particle.rotation}deg)`,
              animation: `fall ${Math.random() * 2 + 2}s linear forwards`
            }}
          />
        ))}
      </div>

      {/* Sparkle effects */}
      <div className="sparkles">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CelebrationAnimation; 