import React, { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2rem', background: 'var(--card-bg)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div className="logo-container">
          <div className="glow-background"></div>
          
          <div className="code-brackets bracket-left">{'{'}</div>
          <div className="code-brackets bracket-right">{'}'}</div>
          
          <div className="fire-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
          
          <div className="logo-text">
            <span className="code-part">Code</span><span className="blaze-part">Blaze</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggleTheme} style={{ fontSize: '1.3rem', padding: '0.3rem 0.7rem', borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', transition: 'background 0.2s' }}>
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        {isAuthenticated ? (
          <button onClick={logout} style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', background: '#ff6b35', color: '#fff', fontWeight: 600, marginRight: '0.5rem', border: 'none', transition: 'all 0.3s ease' }}>
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', background: '#ff6b35', color: '#fff', fontWeight: 600, marginRight: '0.5rem', border: 'none', transition: 'all 0.3s ease' }}>
                Sign In
              </button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', background: 'linear-gradient(90deg, #007acc, #005a9e)', color: '#fff', fontWeight: 600, border: 'none', transition: 'all 0.3s ease' }}>
                Get Started
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 