import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ProblemArchivePreview from '../components/ProblemArchivePreview';
import LeaderboardPreview from '../components/LeaderboardPreview';
import ContestSchedule from '../components/ContestSchedule';
import ProblemOfTheDay from '../components/ProblemOfTheDay';
import QuickStatsPanel from '../components/QuickStatsPanel';
import AchievementsTeaser from '../components/AchievementsTeaser';
import SearchBar from '../components/SearchBar';
import CodeSnippetRenderer from '../components/CodeSnippetRenderer';
import Footer from '../components/Footer';
import './LandingPage.css'; // We can rename this later if we want

const HomePage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/accounts/hello/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error);
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
            <SearchBar />
            <ProblemArchivePreview />
          </section>
          <aside>
            <ProblemOfTheDay />
            <LeaderboardPreview />
            <ContestSchedule />
            <AchievementsTeaser />
          </aside>
        </div>
        <CodeSnippetRenderer />
        <p>Message from backend: {message}</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage; 