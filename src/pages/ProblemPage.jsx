import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import StarryBackground from "../components/StarryBackground";

export default function ProblemPage() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('Python');

  useEffect(() => {
    api.get(`/api/accounts/problem/${problemId}/`)
      .then(res => {
        setProblem(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setProblem(null);
      });
  }, [problemId]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
  if (!problem) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Problem not found.</div>;

  // Example tags and difficulty (replace with real data if available)
  const tags = problem.tags || ['Array', 'Hash Table'];
  const difficulty = problem.difficulty || 'Easy';

  return (
    <>
      <StarryBackground />
      <div style={{ minHeight: '100vh', color: '#e5e7eb', fontFamily: 'Inter, sans-serif', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 2rem', borderBottom: '1px solid #27272a', background: '#23232a' }}>
          <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', color: '#a1a1aa', fontSize: 22, marginRight: 18, cursor: 'pointer' }}>&larr;</button>
          <span style={{ fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: 1 }}>Problem List</span>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', maxWidth: 1200, margin: '2.5rem auto', gap: 32 }}>
          {/* Problem Description */}
          <div style={{ flex: 1.2, background: '#23232a', borderRadius: 12, padding: '2.2rem 2.5rem', boxShadow: '0 2px 16px #0002' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>{problem.id}. {problem.title}</span>
              <span style={{ marginLeft: 10, color: '#22c55e', fontSize: 18, fontWeight: 600, background: '#1e293b', borderRadius: 6, padding: '2px 10px', letterSpacing: 0.5 }}>{difficulty}</span>
              {/* Solved badge example */}
              <span style={{ marginLeft: 10, color: '#22d3ee', fontSize: 16, fontWeight: 600, background: '#0e7490', borderRadius: 6, padding: '2px 10px', letterSpacing: 0.5 }}>Solved ✓</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              {tags.map((tag, idx) => (
                <span key={idx} style={{ background: '#334155', color: '#a5b4fc', borderRadius: 5, padding: '2px 10px', fontSize: 14, fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
            <div style={{ fontSize: 17, lineHeight: 1.7, color: '#e5e7eb', marginBottom: 24 }}>
              <pre style={{ background: 'none', padding: 0, borderRadius: 0, fontSize: 'inherit', color: 'inherit', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{problem.description}</pre>
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 600, marginBottom: 4, color: '#fbbf24' }}>Sample Input</div>
              <pre style={{ background: '#18181b', padding: '0.7rem 1rem', borderRadius: 6, color: '#f1f5f9' }}>{problem.sample_input}</pre>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4, color: '#fbbf24' }}>Sample Output</div>
              <pre style={{ background: '#18181b', padding: '0.7rem 1rem', borderRadius: 6, color: '#f1f5f9' }}>{problem.sample_output}</pre>
            </div>
          </div>

          {/* Code Editor Area */}
          <div style={{ flex: 1, background: '#23232a', borderRadius: 12, padding: '2.2rem 2rem', boxShadow: '0 2px 16px #0002', display: 'flex', flexDirection: 'column', minWidth: 350 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10, color: '#fff' }}>
              <label htmlFor="language-select" style={{ marginRight: 12 }}>Language:</label>
              <select
                id="language-select"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                style={{ background: '#18181b', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 12px', fontSize: 16 }}
              >
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
              </select>
              <span style={{ fontWeight: 400, color: '#a1a1aa', fontSize: 15, marginLeft: 16 }}>(Auto)</span>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={16}
              placeholder="Write your code here..."
              style={{ width: '100%', borderRadius: 8, border: '1px solid #444', background: '#18181b', color: '#f1f5f9', padding: '1rem', fontFamily: 'monospace', fontSize: '1rem', resize: 'vertical', minHeight: 320, marginBottom: 18 }}
            />
            <button style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', alignSelf: 'flex-end' }}
              onClick={() => setOutput('Hello from the compiler!')}
            >
              Submit
            </button>
            <div style={{
              marginTop: 18,
              background: '#18181b',
              borderRadius: 8,
              border: '1px solid #444',
              color: '#fbbf24',
              padding: '1rem',
              minHeight: 80,
              fontFamily: 'monospace',
              fontSize: '1rem'
            }}>
              <div style={{ fontWeight: 600, marginBottom: 6, color: '#fff' }}>Output</div>
              <pre style={{ margin: 0, color: '#f1f5f9' }}>{output || "Output will appear here..."}</pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 