// Gemini API Service for Ember AI Assistant
// Get API key from environment variables (Vite uses import.meta.env)
import { GoogleGenAI } from "@google/genai";

let GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-3-flash-preview';

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.client = null;
    if (this.apiKey) {
      this.initialize(this.apiKey);
    }
  }

  // Initialize the service with API key
  initialize(apiKey) {
    this.apiKey = apiKey;
    try {
      this.client = new GoogleGenAI({ apiKey: this.apiKey });
    } catch (error) {
      console.error("Failed to initialize Gemini client:", error);
    }
  }

  // Set API key manually (useful if environment variables don't work)
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    this.initialize(apiKey);
    console.log('API key set successfully');
  }

  // Generate response from Gemini API
  async generateResponse(userMessage, conversationHistory = [], problemContext = null, userCodeContext = null) {
    if (!this.apiKey || this.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      // Provide basic placeholder responses when API key is not configured
      return this.getPlaceholderResponse(userMessage, problemContext);
    }

    if (!this.client) {
      this.initialize(this.apiKey);
    }

    try {
      // Prepare conversation context
      const conversationContext = this.buildConversationContext(conversationHistory, userMessage, problemContext, userCodeContext);

      const response = await this.client.models.generateContent({
        model: GEMINI_MODEL,
        contents: conversationContext,
        config: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      });

      if (response && response.text) {
        // Parse the response to extract buttons if present
        return this.parseInteractiveResponse(response.text, userMessage, problemContext);
      } else {
        throw new Error('Invalid response format from Gemini SDK');
      }

    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fallback for 403 or 429 errors if needed, or just rethrow
      throw error;
    }
  }

  // Parse AI response to extract interactive elements
  parseInteractiveResponse(aiResponse, userMessage, problemContext) {
    // For now, return the response as text with default buttons
    // In a more advanced implementation, we could parse the AI response for button suggestions
    const message = userMessage.toLowerCase();

    // Generate appropriate buttons based on context
    let buttons = [];

    if (message.includes('problem') || message.includes('understand')) {
      buttons = [
        { text: "◆ Break it down", action: "breakdown" },
        { text: "◆ Show example", action: "show_example" }
      ];
    } else if (message.includes('debug') || message.includes('error')) {
      buttons = [
        { text: "◆ Debug steps", action: "debug_steps" },
        { text: "◆ Show example", action: "debug_example" }
      ];
    } else if (message.includes('algorithm') || message.includes('approach')) {
      buttons = [
        { text: "◆ Show approaches", action: "show_approaches" },
        { text: "◆ Give example", action: "algorithm_example" }
      ];
    } else {
      buttons = [
        { text: "◆ Need hints?", action: "more_hints" },
        { text: "◆ Try myself", action: "try_myself" }
      ];
    }

    return {
      text: aiResponse,
      buttons: buttons
    };
  }

  // Build conversation context for better responses
  buildConversationContext(conversationHistory, currentMessage, problemContext = null, userCodeContext = null) {
    const systemPrompt = `You are Ember, an AI coding assistant for an online coding platform. You have a playful, concise personality similar to Leeco but keep your name as Ember.

Your personality:
- Be concise and conversational (2-3 sentences max for initial responses)
- Use natural, flowing language with emojis
- Format responses with proper line breaks and spacing for readability
- End responses with engaging questions and interactive options

Response format:
- Use natural line breaks instead of commas for lists
- Format examples clearly with proper spacing
- Always end with interactive options like:
  "✨ Want a hint on the approach, or want to try coding now?"
  "🚀 Want me to debug your code, or want to try fixing it yourself first?"
  "💡 Want to see the solution, or want more hints?"
- Use emojis strategically (🔥, 💡, 🚀, ✨, etc.)
- Be encouraging and conversational, not mechanical`;

    let contents = [{ role: "user", parts: [{ text: systemPrompt }] }];

    // Add problem context if available
    if (problemContext) {
      let problemText = `Current Problem Context:\n`;
      problemText += `Title: ${problemContext.title}\n`;
      problemText += `Difficulty: ${problemContext.difficulty || 'N/A'}\n`;
      problemText += `Description: ${problemContext.description}\n`;
      problemText += `Sample Input: ${problemContext.sample_input}\n`;
      problemText += `Sample Output: ${problemContext.sample_output}\n`;
      problemText += `Tags: ${problemContext.tags?.join(', ') || 'N/A'}\n`;
      contents.push({ role: "user", parts: [{ text: problemText }] });
    }

    // Add user code context if available
    if (userCodeContext && userCodeContext.code) {
      const language = userCodeContext.language || 'plaintext';
      // Truncate very long code to keep prompt size reasonable
      const maxChars = 8000;
      const codeSnippet = userCodeContext.code.length > maxChars
        ? userCodeContext.code.slice(0, maxChars) + "\n// ... code truncated ..."
        : userCodeContext.code;
      contents.push({ role: "user", parts: [{ text: `User's Current Code (${language}):\n${codeSnippet}` }] });
    }

    // Add conversation history
    if (conversationHistory.length > 0) {
      conversationHistory.forEach((msg) => {
        const role = msg.type === 'user' ? 'user' : 'model';
        contents.push({ role: role, parts: [{ text: msg.content }] });
      });
    }

    // Add current message
    contents.push({ role: "user", parts: [{ text: currentMessage }] });
    // Prime the model to respond as Ember (Removed to avoid API errors, system prompt handles this)
    // contents.push({ role: "model", parts: [{ text: "Ember:" }] });

    return contents;
  }

  // Validate API key format
  validateApiKey(apiKey) {
    return apiKey && apiKey.length > 0 && apiKey !== 'YOUR_GEMINI_API_KEY_HERE';
  }

  // Get placeholder responses when API key is not configured
  getPlaceholderResponse(userMessage, problemContext) {
    const message = userMessage.toLowerCase();

    if (message.includes('hello') || message.includes('hi')) {
      return {
        text: `Hey there! I'm Ember 🔥 I'm in demo mode right now, but I can still help with basic problem understanding!`,
        buttons: [
          { text: "◆ Show me the problem", action: "explain_problem" },
          { text: "◆ Give me tips", action: "general_tips" }
        ]
      };
    }

    if (message.includes('problem') || message.includes('understand')) {
      if (problemContext) {
        return {
          text: `Alright! This is "${problemContext.title}" 🔥\n\n${problemContext.difficulty} difficulty\nThe key is understanding what goes in and what comes out!`,
          buttons: [
            { text: "◆ Break it down", action: "breakdown" },
            { text: "◆ Show example", action: "show_example" }
          ]
        };
      } else {
        return {
          text: `I'd love to help explain this problem! 🔥\n\nBut I need the full AI power for that - want to set up the API key or try a different question?`,
          buttons: [
            { text: "◆ Setup guide", action: "setup_guide" },
            { text: "◆ Ask something else", action: "other_help" }
          ]
        };
      }
    }

    if (message.includes('debug') || message.includes('error')) {
      return {
        text: `Debugging time! 🔥\n\nCheck syntax, test with samples, and trace your logic.\nI can give you a systematic approach!`,
        buttons: [
          { text: "◆ Debug steps", action: "debug_steps" },
          { text: "◆ Show example", action: "debug_example" }
        ]
      };
    }

    if (message.includes('algorithm') || message.includes('approach')) {
      return {
        text: `Great question! 🚀\n\nStart with small examples, think of different approaches, then pick the most efficient one!`,
        buttons: [
          { text: "◆ Show approaches", action: "show_approaches" },
          { text: "◆ Give example", action: "algorithm_example" }
        ]
      };
    }

    if (message.includes('time complexity') || message.includes('complexity')) {
      return {
        text: `Complexity basics! 💡\n\nO(1) is instant\nO(n) grows linearly\nO(n²) gets slow fast\n\nWant to see how to analyze your code?`,
        buttons: [
          { text: "◆ Explain complexity", action: "explain_complexity" },
          { text: "◆ Analyze code", action: "analyze_code" }
        ]
      };
    }

    // Default response
    return {
      text: `I'm Ember, ready to help! 🔥 I'm in demo mode, but I can still guide you through coding concepts and problem-solving!`,
      buttons: [
        { text: "◆ Problem help", action: "problem_help" },
        { text: "◆ Coding tips", action: "coding_tips" }
      ]
    };
  }

  // Test API connection
  async testConnection() {
    try {
      const response = await this.generateResponse('Hello, can you help me with coding?');
      return response && response.text.length > 0;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}

// Create singleton instance
const geminiService = new GeminiService();

export default geminiService; 