import React, { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useAuth();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2rem', background: 'var(--card-bg)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--accent)' }}>
          {time.toLocaleTimeString()} | UTC: {time.toUTCString().slice(17, 25)}
        </span>
        <span style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.03em' }}>
          CodeArena
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggleTheme} style={{ fontSize: '1.3rem', padding: '0.3rem 0.7rem', borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', transition: 'background 0.2s' }}>
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        {isAuthenticated ? (
          <button onClick={logout} style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', background: 'var(--accent)', color: 'var(--bg)', fontWeight: 600, marginRight: '0.5rem' }}>
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', background: 'var(--accent)', color: 'var(--bg)', fontWeight: 600, marginRight: '0.5rem' }}>
                Sign In
              </button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '0.5rem 1.2rem', borderRadius: '2rem', background: 'var(--text)', color: 'var(--bg)', fontWeight: 600 }}>
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