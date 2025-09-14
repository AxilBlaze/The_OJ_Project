import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../api/axios';
import './ProblemsPage.css';

const ProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('id');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching problems from API...');
      const response = await api.get('/api/accounts/problems/');
      console.log('API Response:', response.data);
      setProblems(response.data);
    } catch (err) {
      console.error('Error fetching problems:', err);
      console.error('Error details:', err.response?.data);
      console.error('Error status:', err.response?.status);
      setError(`Failed to fetch problems: ${err.response?.data?.detail || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const difficultyColor = {
    Easy: '#4caf50',
    Medium: '#ff9800',
    Hard: '#f44336',
  };

  const filteredProblems = problems
    .filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'difficulty':
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return a.id - b.id;
      }
    });

  if (loading) {
    return (
      <div className="problems-page">
        <Header />
        <main className="problems-main">
          <div className="loading">Loading problems...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="problems-page">
        <Header />
        <main className="problems-main">
          <div className="error">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="problems-page">
      <Header />
      <main className="problems-main">
        <div className="problems-container">
          <div className="problems-header">
            <h1>Problem Archive</h1>
            <p>Practice coding problems and improve your skills</p>
          </div>

          <div className="problems-controls">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filters-section">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="id">Sort by ID</option>
                <option value="title">Sort by Title</option>
                <option value="difficulty">Sort by Difficulty</option>
              </select>
            </div>
          </div>

          <div className="problems-list">
            {filteredProblems.length === 0 ? (
              <div className="no-problems">
                No problems found matching your criteria.
              </div>
            ) : (
              filteredProblems.map(problem => (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className="problem-card"
                >
                  <div className="problem-info">
                    <div className="problem-title">{problem.title}</div>
                    <div className="problem-description">
                      {problem.description || 'No description available'}
                    </div>
                    <div className="problem-tags">
                      {problem.tags?.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="problem-meta">
                    <span 
                      className="difficulty"
                      style={{ color: difficultyColor[problem.difficulty] }}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProblemsPage;
