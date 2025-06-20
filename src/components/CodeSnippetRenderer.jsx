import React, { useState } from "react";

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
  const [lang, setLang] = useState('C++');
  return (
    <div className="card" style={{ marginTop: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Sample Code</h2>
        <select value={lang} onChange={e => setLang(e.target.value)} style={{ marginLeft: 'auto', padding: '0.4rem', borderRadius: 6, border: '1px solid var(--border)' }}>
          {Object.keys(snippets).map(l => <option key={l}>{l}</option>)}
        </select>
        <button onClick={() => {navigator.clipboard.writeText(snippets[lang])}} style={{ marginLeft: 8, padding: '0.4rem 1rem', borderRadius: 6, background: langColors[lang], color: '#fff', fontWeight: 600, border: 'none' }}>Copy</button>
      </div>
      <pre style={{ background: '#222', color: '#fff', borderRadius: 8, padding: '1rem', fontSize: '1rem', overflowX: 'auto', border: `2px solid ${langColors[lang]}` }}>
        <code>{snippets[lang]}</code>
      </pre>
    </div>
  );
} 