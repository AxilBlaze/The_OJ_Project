import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const phrases = [
  "Sharpen Your Skills.",
  "Solve.",
  "Compete.",
  "Grow."
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % phrases.length), 2000);
    return () => clearInterval(interval);
  }, []);


  const handleStartCoding = async () => {
    if (problems.length === 0) {
      // Fetch problems if not already loaded
      try {
        setLoading(true);
        const response = await api.get('/api/accounts/problems/');
        const fetchedProblems = response.data;
        
        if (fetchedProblems.length > 0) {
          // Select a random problem from fetched data
          const randomIndex = Math.floor(Math.random() * fetchedProblems.length);
          const randomProblem = fetchedProblems[randomIndex];
          navigate(`/problem/${randomProblem.id}`);
        } else {
          // Fallback to problems page if no problems available
          navigate('/problems');
        }
      } catch (error) {
        console.error('Failed to fetch problems:', error);
        // Fallback to problems page if API fails
        navigate('/problems');
      } finally {
        setLoading(false);
      }
    } else {
      // Use already loaded problems
      const randomIndex = Math.floor(Math.random() * problems.length);
      const randomProblem = problems[randomIndex];
      navigate(`/problem/${randomProblem.id}`);
    }
  };

  return (
    <section className="hero-banner" style={{
      position: 'relative',
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      background: 'linear-gradient(90deg, var(--card-bg) 60%, transparent)',
      borderRadius: '1.5rem',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      padding: '1rem'
    }}>
      {/* Particle background placeholder */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.18,
        background: 'repeating-linear-gradient(135deg, #b8b8b8 0 2px, transparent 2px 20px)'
      }} />
      <h1 className="hero-title" style={{
        fontSize: 'clamp(1.6rem, 6vw, 2.7rem)',
        fontWeight: 800,
        letterSpacing: '0.01em',
        color: '#007acc',
        animation: 'shine 2s linear infinite',
        zIndex: 1,
        textAlign: 'center'
      }}>
        {phrases[index]}
      </h1>
      <div className="hero-actions" style={{ display: 'flex', gap: '1.5rem', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          className="hero-btn" 
          onClick={handleStartCoding}
          disabled={loading}
          style={{ 
            padding: '0.8rem 2.2rem', 
            fontSize: '1.1rem', 
            borderRadius: '2rem', 
            background: loading ? '#ccc' : 'linear-gradient(90deg, #ff6b35, #e55a2b)', 
            color: '#fff', 
            fontWeight: 700, 
            boxShadow: loading ? 'none' : '0 2px 8px rgba(255, 107, 53, 0.3)', 
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Loading...' : 'Start Coding'}
        </button>
        <button 
          className="hero-btn" 
          onClick={() => navigate('/problems')}
          style={{ padding: '0.8rem 2.2rem', fontSize: '1.1rem', borderRadius: '2rem', background: 'linear-gradient(90deg, #007acc, #005a9e)', color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px rgba(0, 122, 204, 0.3)', border: 'none', cursor: 'pointer' }}
        >
          Browse Problems
        </button>
        <button className="hero-btn" style={{ padding: '0.8rem 2.2rem', fontSize: '1.1rem', borderRadius: '2rem', background: '#ff6b35', color: '#fff', fontWeight: 700, border: 'none' }}>Join Contest</button>
      </div>
      {/* Stats bar placeholder */}
      <div className="hero-stats" style={{ display: 'flex', gap: '2.5rem', marginTop: '1.5rem', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span className="hero-stat" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#007acc' }}>🟢 1,234 users online</span>
        <span className="hero-stat" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#ff6b35' }}>✅ 12,345 problems solved today</span>
        <span className="hero-stat" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#007acc' }}>📨 45,678 submissions</span>
      </div>
      <style>{`
        @keyframes shine {
          0% { filter: brightness(1.1); }
          50% { filter: brightness(1.5); }
          100% { filter: brightness(1.1); }
        }
      `}</style>
    </section>
  );
} 