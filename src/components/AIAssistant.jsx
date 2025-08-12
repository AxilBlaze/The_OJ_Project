import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AIAssistant.css';
import geminiService from '../services/geminiService';
import api from '../api/axios';

const AIAssistant = () => {
  const { problemId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [problemContext, setProblemContext] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hi! I'm Ember, your AI coding assistant. I'm here to help you solve this problem and improve your programming skills. What can I help you with today? 🔥`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'connected', 'error'
  // Track live code and language from ProblemPage via window events
  const [userCodeContext, setUserCodeContext] = useState({ code: '', language: 'Python' });
  const messagesEndRef = useRef(null);

  // Fetch problem context and check API status when component mounts
  useEffect(() => {
    // Check API connection
    const checkApiStatus = async () => {
      try {
        // Add a small delay to ensure everything is loaded
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if API key is set
        const hasValidKey = geminiService.apiKey && geminiService.apiKey.length > 0;
        
        if (!hasValidKey) {
          setApiStatus('error');
          return;
        }
        
        const isConnected = await geminiService.testConnection();
        setApiStatus(isConnected ? 'connected' : 'error');
      } catch (error) {
        console.error('API status check failed:', error);
        setApiStatus('error');
      }
    };
    
    checkApiStatus();

    // Fetch problem context
    if (problemId) {
      const fetchProblemContext = async () => {
        try {
          const { data } = await api.get(`/api/accounts/problem/${problemId}/`);
          setProblemContext(data);
        } catch (error) {
          console.error('Failed to fetch problem context:', error);
        }
      };
      fetchProblemContext();
    }
    // Listen for code updates broadcasted from ProblemPage
    const handleCodeUpdate = (e) => {
      const { code, language } = e.detail || {};
      setUserCodeContext({ code: code || '', language: language || 'Python' });
    };
    window.addEventListener('oj-code-update', handleCodeUpdate);

    return () => {
      window.removeEventListener('oj-code-update', handleCodeUpdate);
    };
  }, [problemId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Get conversation history (excluding the welcome message)
    const conversationHistory = messages.filter(msg => msg.id !== 1);
    
    // Refresh problem context if missing (e.g., initial load race)
    if (!problemContext && problemId) {
      try {
        const { data } = await api.get(`/api/accounts/problem/${problemId}/`);
        setProblemContext(data);
      } catch {}
    }

    // Call Gemini API with problem context and live code
    const aiResponseText = await geminiService.generateResponse(
      inputMessage,
      conversationHistory,
      problemContext,
      userCodeContext
    );
    
    const aiResponse = {
      id: Date.now() + 1,
      type: 'ai',
      content: aiResponseText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };





  // Ember character SVG component
  const EmberCharacter = ({ size = 24, className = "" }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flame hair/head */}
      <defs>
        <radialGradient id="flameGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="50%" stopColor="#f7931e" />
          <stop offset="100%" stopColor="#e55a2b" />
        </radialGradient>
        <radialGradient id="innerFlame" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#ff6b35" />
        </radialGradient>
      </defs>
      
      {/* Main flame body */}
      <path 
        d="M50 85 Q60 70 65 50 Q70 30 50 15 Q30 30 35 50 Q40 70 50 85 Z" 
        fill="url(#flameGradient)"
        className="ember-flame-main"
      />
      
      {/* Inner flame */}
      <path 
        d="M50 75 Q55 65 58 50 Q60 35 50 25 Q40 35 42 50 Q45 65 50 75 Z" 
        fill="url(#innerFlame)"
        className="ember-flame-inner"
      />
      
      {/* Cute eyes */}
      <circle cx="45" cy="45" r="3" fill="#333" className="ember-eye" />
      <circle cx="55" cy="45" r="3" fill="#333" className="ember-eye" />
      <circle cx="45" cy="43" r="1" fill="#fff" />
      <circle cx="55" cy="43" r="1" fill="#fff" />
      
      {/* Cute smile */}
      <path 
        d="M45 55 Q50 60 55 55" 
        stroke="#333" 
        strokeWidth="2" 
        fill="none" 
        className="ember-smile"
      />
      
      {/* Sparkles */}
      <circle cx="25" cy="30" r="1" fill="#ffd700" className="ember-sparkle" />
      <circle cx="75" cy="35" r="1" fill="#ffd700" className="ember-sparkle" />
      <circle cx="30" cy="70" r="1" fill="#ffd700" className="ember-sparkle" />
      <circle cx="70" cy="65" r="1" fill="#ffd700" className="ember-sparkle" />
    </svg>
  );

  return (
    <div className="ai-assistant-container">
      {/* Floating AI Button */}
      <button 
        className={`ai-assistant-button ${isOpen ? 'active' : ''} ${apiStatus === 'connected' ? 'connected' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={`Chat with Ember AI Assistant ${apiStatus === 'connected' ? '(Connected)' : apiStatus === 'error' ? '(API Error)' : '(Checking...)'}`}
      >
        <div className="ember-icon">
          <EmberCharacter size={20} className="ember-character" />
        </div>
        <span className="ember-name">Ember</span>
        {apiStatus === 'connected' && <div className="status-indicator connected"></div>}
        {apiStatus === 'error' && <div className="status-indicator error"></div>}
        {apiStatus === 'checking' && <div className="status-indicator checking"></div>}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="ai-chat-interface">
          <div className="chat-header">
            <div className="chat-title">
              <div className="ember-icon-small">
                <EmberCharacter size={24} className="ember-character" />
              </div>
              <span>Ember AI Assistant</span>
              <div className="header-status-indicator">
                {apiStatus === 'connected' && <div className="status-indicator connected header-dot"></div>}
                {apiStatus === 'error' && <div className="status-indicator error header-dot"></div>}
                {apiStatus === 'checking' && <div className="status-indicator checking header-dot"></div>}
              </div>
            </div>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.type}`}
              >
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message ai">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <textarea
              className="chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Ember for help with coding problems..."
              rows="1"
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          

        </div>
      )}
    </div>
  );
};

export default AIAssistant; 