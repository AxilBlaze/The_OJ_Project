import React, { useState } from "react";
import api from "../api/axios";

const snippets = {
  'C++': `int main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`,
  'Java': `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
  'Python': `print("Hello, World!")`,
};

const langColors = {
  'C++': '#0072ff',
  'Java': '#ff9800',
  'Python': '#4caf50',
};

export default function CodeSnippetRenderer() {
  const [lang, setLang] = useState('Python');
  const [code, setCode] = useState(snippets['Python']);
  const [inputData, setInputData] = useState('');
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('input'); // 'input' | 'output'

  const handleLangChange = (l) => {
    setLang(l);
    setCode(snippets[l] || '');
    setOutput('');
    setError('');
  };

  const handleRun = async () => {
    setRunning(true);
    setError('');
    setOutput('');
    setActiveTab('output');
    try {
      const languageMap = { 'Python': 'py', 'C++': 'cpp', 'Java': 'java' };
      const resp = await api.post('/submit/api/run/', {
        language: languageMap[lang],
        code,
        custom_input: inputData,
      });
      setOutput(resp.data.output ?? '');
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to run code');
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: 32, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Try Code Online</h2>
        <select value={lang} onChange={e => handleLangChange(e.target.value)} style={{ marginLeft: 'auto', padding: '0.4rem', borderRadius: 6, border: '1px solid var(--border)' }}>
          {Object.keys(snippets).map(l => <option key={l}>{l}</option>)}
        </select>
        <button onClick={() => {navigator.clipboard.writeText(code)}} style={{ marginLeft: 8, padding: '0.4rem 1rem', borderRadius: 6, background: langColors[lang], color: '#fff', fontWeight: 600, border: 'none' }}>Copy</button>
      </div>
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={10}
        placeholder={`Write ${lang} code here...`}
        style={{ width: '100%', minHeight: 220, borderRadius: 8, border: '1px solid var(--border)', background: '#0f172a', color: '#e5e7eb', padding: '1rem', fontFamily: 'monospace', fontSize: '1rem', marginBottom: 10 }}
      />
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border)', margin: '8px 0 12px' }}>
        <button
          onClick={() => setActiveTab('input')}
          style={{
            padding: '0.45rem 0.9rem',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            background: activeTab === 'input' ? '#1f2937' : 'transparent',
            color: '#e5e7eb',
            cursor: 'pointer',
            fontWeight: activeTab === 'input' ? 700 : 500,
          }}
        >
          Input
        </button>
        <button
          onClick={() => setActiveTab('output')}
          style={{
            padding: '0.45rem 0.9rem',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            background: activeTab === 'output' ? '#1f2937' : 'transparent',
            color: '#e5e7eb',
            cursor: 'pointer',
            fontWeight: activeTab === 'output' ? 700 : 500,
          }}
        >
          Output
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'input' && (
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Input (optional)</label>
          <textarea
            value={inputData}
            onChange={e => setInputData(e.target.value)}
            rows={4}
            placeholder="Provide stdin for your program (optional)"
            style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border)', background: '#111827', color: '#e5e7eb', padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.95rem' }}
          />
        </div>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={handleRun} disabled={running} style={{ padding: '0.6rem 1.1rem', borderRadius: 8, background: running ? '#6b7280' : '#10b981', color: '#fff', fontWeight: 700, border: 'none' }}>{running ? 'Running...' : 'Run'}</button>
        <button onClick={() => { setOutput(''); setError(''); }} style={{ padding: '0.6rem 1.1rem', borderRadius: 8, background: '#334155', color: '#fff', fontWeight: 700, border: 'none' }}>Clear</button>
      </div>
      {activeTab === 'output' && (
        <div style={{ marginTop: 12 }}>
          {error && (
            <div style={{ background: '#dc2626', color: '#fff', padding: '0.6rem 0.8rem', borderRadius: 6, marginBottom: 8 }}>{error}</div>
          )}
          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Output</div>
            <pre style={{ background: '#0b1220', color: '#e5e7eb', borderRadius: 8, padding: '0.9rem 1rem', fontSize: '0.95rem', whiteSpace: 'pre-wrap', border: `1px solid ${langColors[lang]}` }}>{output}</pre>
          </div>
        </div>
      )}
    </div>
  );
}