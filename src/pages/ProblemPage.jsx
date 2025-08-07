import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import StarryBackground from "../components/StarryBackground";
import CelebrationAnimation from "../components/CelebrationAnimation";
import AIAssistant from "../components/AIAssistant";

export default function ProblemPage() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('Python');
  const [inputData, setInputData] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('input'); // 'input' or 'output'
  const [showCelebration, setShowCelebration] = useState(false);

  // Predefined code templates for each language
  const codeTemplates = {
    'Python': `# Python solution for ${problem?.title || 'Problem'}

def main():
    # Read input
    # n = int(input())
    # arr = list(map(int, input().split()))
    
    # Your solution here
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
    
    'C++': `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // Read input
    // int n;
    // cin >> n;
    // vector<int> arr(n);
    // for(int i = 0; i < n; i++) {
    //     cin >> arr[i];
    // }
    
    // Your solution here
    cout << "Hello, World!" << endl;
    
    return 0;
}`,
    
    'Java': `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // Read input
        // int n = sc.nextInt();
        // int[] arr = new int[n];
        // for(int i = 0; i < n; i++) {
        //     arr[i] = sc.nextInt();
        // }
        
        // Your solution here
        System.out.println("Hello, World!");
        
        sc.close();
    }
}`
  };

  useEffect(() => {
    api.get(`/api/accounts/problem/${problemId}/`)
      .then(res => {
        setProblem(res.data);
        setLoading(false);
        // Set initial code template when problem loads
        setCode(codeTemplates['Python']);
      })
      .catch(err => {
        setLoading(false);
        setProblem(null);
      });
  }, [problemId]);

  // Handle language change and load appropriate template
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage]);
  };

  const handleRun = async () => {
    if (!code.trim()) {
      setError('Please enter some code to run.');
      return;
    }

    setRunning(true);
    setError('');
    setOutput('');
    setResult(null);
    setActiveTab('output');

    // Map frontend language names to backend language codes
    const languageMap = {
      'Python': 'py',
      'C++': 'cpp',
      'Java': 'java' // Note: Java not supported in backend yet
    };

    const backendLanguage = languageMap[language];
    
    if (!backendLanguage) {
      setError('Selected language is not supported by the backend.');
      setRunning(false);
      return;
    }

    try {
      const response = await api.post('/submit/api/run/', {
        language: backendLanguage,
        code: code,
        problem_id: problemId,
        custom_input: inputData.trim() || null // Send custom input if provided, otherwise null for test cases
      });

      if (response.data.output !== undefined) {
        setOutput(response.data.output);
        setResult('run');
      } else {
        setError('Code execution failed.');
      }
    } catch (err) {
      console.error('Run error:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to run code. Please try again.');
      }
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please enter some code to submit.');
      return;
    }

    setSubmitting(true);
    setError('');
    setOutput('');
    setResult(null);
    setActiveTab('output');

    // Map frontend language names to backend language codes
    const languageMap = {
      'Python': 'py',
      'C++': 'cpp',
      'Java': 'java' // Note: Java not supported in backend yet
    };

    const backendLanguage = languageMap[language];
    
    if (!backendLanguage) {
      setError('Selected language is not supported by the backend.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await api.post('/submit/api/submit/', {
        language: backendLanguage,
        code: code,
        problem_id: problemId
      });

              if (typeof response.data.success === 'boolean') {
          setOutput(response.data.output);
          setResult(response.data.success ? 'success' : 'fail');
          setExpectedOutput(response.data.expected_output);
          
          // Show celebration animation if submission is successful
          if (response.data.success) {
            setShowCelebration(true);
          }
        } else {
          setError('Code execution failed.');
        }
    } catch (err) {
      console.error('Submission error:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to submit code. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Add state for result and expected output
  const [result, setResult] = useState(null);
  const [expectedOutput, setExpectedOutput] = useState('');

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
  if (!problem) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Problem not found.</div>;

  // Example tags and difficulty (replace with real data if available)
  const tags = problem.tags || ['Array', 'Hash Table'];
  const difficulty = problem.difficulty || 'Easy';

  return (
    <>
      <StarryBackground />
      <CelebrationAnimation 
        isVisible={showCelebration} 
        onComplete={() => setShowCelebration(false)} 
      />
      <AIAssistant />
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
              <span style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>{problem.title}</span>
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
                onChange={e => handleLanguageChange(e.target.value)}
                style={{ background: '#18181b', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 12px', fontSize: 16 }}
              >
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="Java" disabled>Java (Coming Soon)</option>
              </select>
            </div>
            
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={12}
              placeholder="Write your code here..."
              style={{ width: '100%', borderRadius: 8, border: '1px solid #444', background: '#18181b', color: '#f1f5f9', padding: '1rem', fontFamily: 'monospace', fontSize: '1rem', resize: 'vertical', minHeight: 240, marginBottom: 12 }}
            />
            
            {/* Tab Navigation */}
            <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px solid #444' }}>
              <button
                onClick={() => setActiveTab('input')}
                style={{
                  padding: '0.5rem 1rem',
                  background: activeTab === 'input' ? '#444' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px 6px 0 0',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'input' ? 600 : 400
                }}
              >
                Input
              </button>
              <button
                onClick={() => setActiveTab('output')}
                style={{
                  padding: '0.5rem 1rem',
                  background: activeTab === 'output' ? '#444' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px 6px 0 0',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'output' ? 600 : 400
                }}
              >
                Output
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'input' && (
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 4, color: '#fff' }}>
                  Input Data (Optional):
                  <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 400, marginLeft: 8 }}>
                    Leave empty to use test cases
                  </span>
                </label>
                <textarea
                  value={inputData}
                  onChange={e => setInputData(e.target.value)}
                  rows={6}
                  placeholder="Enter input data for your code... (Leave empty to use test cases)"
                  style={{ width: '100%', borderRadius: 8, border: '1px solid #444', background: '#18181b', color: '#f1f5f9', padding: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem', resize: 'vertical', marginBottom: 12 }}
                />
              </div>
            )}

            {activeTab === 'output' && (
              <div>
                {error && (
                  <div style={{ 
                    background: '#dc2626', 
                    color: '#fff', 
                    padding: '0.5rem', 
                    borderRadius: 6, 
                    marginBottom: 12, 
                    fontSize: '0.9rem' 
                  }}>
                    {error}
                  </div>
                )}

                {output && (
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 8, color: '#fff' }}>
                      {result === 'success' && '✅ Correct Answer!'}
                      {result === 'fail' && '❌ Wrong Answer'}
                      {result === 'run' && '▶️ Output:'}
                    </div>
                    <pre style={{ 
                      background: '#18181b', 
                      padding: '0.7rem 1rem', 
                      borderRadius: 6, 
                      color: '#f1f5f9',
                      whiteSpace: 'pre-wrap',
                      fontSize: '0.9rem',
                      maxHeight: 200,
                      overflow: 'auto',
                      marginBottom: 12
                    }}>
                      {output}
                    </pre>
                    {result === 'fail' && expectedOutput && (
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: '#fbbf24' }}>Expected Output:</div>
                        <pre style={{ 
                          background: '#1e293b', 
                          padding: '0.5rem 0.7rem', 
                          borderRadius: 4, 
                          color: '#f1f5f9',
                          whiteSpace: 'pre-wrap',
                          fontSize: '0.8rem'
                        }}>
                          {expectedOutput}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button
                onClick={handleRun}
                disabled={running}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: running ? '#666' : '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: running ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {running ? 'Running...' : 'Run'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: submitting ? '#666' : '#22c55e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 