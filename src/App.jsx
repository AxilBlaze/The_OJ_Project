import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
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
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
