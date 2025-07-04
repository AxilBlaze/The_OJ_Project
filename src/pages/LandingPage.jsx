import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ProblemOfTheDay from '../components/ProblemOfTheDay';
import CodeSnippetRenderer from '../components/CodeSnippetRenderer';
import Footer from '../components/Footer';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="homepage-root">
      <Header />
      <main>
        <HeroBanner />
        <div className="main-grid">
          <div className="landing-page-centered">
            <ProblemOfTheDay />
          </div>
        </div>
        <CodeSnippetRenderer />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage; 