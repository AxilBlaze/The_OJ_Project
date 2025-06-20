import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProblemArchivePreview from './components/ProblemArchivePreview';
import LeaderboardPreview from './components/LeaderboardPreview';
import ContestSchedule from './components/ContestSchedule';
import ProblemOfTheDay from './components/ProblemOfTheDay';
import QuickStatsPanel from './components/QuickStatsPanel';
import AchievementsTeaser from './components/AchievementsTeaser';
import SearchBar from './components/SearchBar';
import CodeSnippetRenderer from './components/CodeSnippetRenderer';
import Footer from './components/Footer';
import './App.css';

function App() {
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
