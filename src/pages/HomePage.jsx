import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import LeaderboardPreview from '../components/LeaderboardPreview';
import ContestSchedule from '../components/ContestSchedule';
import QuickStatsPanel from '../components/QuickStatsPanel';
import AchievementsTeaser from '../components/AchievementsTeaser';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import './LandingPage.css'; // We can rename this later if we want

const HomePage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const difficultyColor = {
    Easy: '#4caf50',
    Medium: '#ff9800',
    Hard: '#f44336',
  };

  useEffect(() => {
    api.get('/api/accounts/problems/')
      .then(response => {
        setProblems(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch problems:", error);
        setError('Failed to load problems. Please try again later.');
        setProblems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="homepage-root">
      <Header />
      <main>
        <HeroBanner />
        <QuickStatsPanel />
        <div className="main-grid">
          <section>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ margin: 0, fontSize: '1.3rem' }}>Problem Archive</h2>
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
              {loading && <p>Loading problems...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {!loading && !error && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {problems.length > 0 ? (
                    problems.map(problem => (
                      <Link to={`/problem/${problem.id}`} key={problem.id} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: 'var(--card-bg)', borderRadius: 12, padding: '1rem 1.2rem', border: '1px solid var(--border)',
                        boxShadow: '0 1px 4px #0001', transition: 'box-shadow 0.2s', textDecoration: 'none', color: 'inherit'
                      }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 2 }}>{problem.title}</div>
                          <div style={{ fontSize: '0.95rem', color: 'var(--accent)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '400px' }}>
                            {problem.description}
                          </div>
                          <div style={{ marginTop: 4, display: 'flex', gap: 8 }}>
                            {problem.tags.map(tag => tag && <span key={tag} style={{ fontSize: '0.8rem', background: '#eee', color: '#333', borderRadius: 6, padding: '2px 8px', marginRight: 4 }}>{tag}</span>)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                          <span style={{ fontWeight: 600, color: difficultyColor[problem.difficulty] || '#888', fontSize: '1rem' }}>{problem.difficulty}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p>No problems found in the database.</p>
                  )}
                </div>
              )}
            </div>
          </section>
          <aside>
            <LeaderboardPreview />
            <ContestSchedule />
            <AchievementsTeaser />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage; 