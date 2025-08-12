// Gemini API Service for Ember AI Assistant
// Get API key from environment variables (Vite uses import.meta.env)
let GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDQp0dJ1gua0P-ePdldCP61v7M3WDi-6ZQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.baseUrl = GEMINI_API_URL;
  }

  // Initialize the service with API key
  initialize(apiKey) {
    this.apiKey = apiKey;
  }

  // Set API key manually (useful if environment variables don't work)
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    console.log('API key set successfully');
  }

  // Generate response from Gemini API
  async generateResponse(userMessage, conversationHistory = [], problemContext = null, userCodeContext = null) {
    if (!this.apiKey || this.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      // Provide basic placeholder responses when API key is not configured
      return this.getPlaceholderResponse(userMessage, problemContext);
    }

    try {
      // Prepare conversation context
      const conversationContext = this.buildConversationContext(conversationHistory, userMessage, problemContext, userCodeContext);
      
             const response = await fetch(this.baseUrl, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'X-goog-api-key': this.apiKey,
         },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: conversationContext
            }]
          }],
          generationConfig: {
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
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from Gemini API');
      }

    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  // Build conversation context for better responses
  buildConversationContext(conversationHistory, currentMessage, problemContext = null, userCodeContext = null) {
    const systemPrompt = `You are Ember, an AI coding assistant for an online coding platform.
Your goals:
1. Problem solving: help users understand and solve coding problems
2. Code review: suggest improvements to user code
3. Debugging: identify and fix bugs
4. Learning: explain concepts and best practices
5. Algorithm design: propose efficient approaches

Tone and style:
- Friendly, encouraging, and patient
- Clear, step-by-step, practical, and concise
- Use code examples when helpful

Formatting rules:
- Respond in plain text only
- Do not use markdown formatting or asterisks for emphasis
- Do not use bold or italics

Current conversation context:`;

    let context = systemPrompt + '\n\n';
    
    // Add problem context if available
    if (problemContext) {
      context += `Current Problem Context:\n`;
      context += `Title: ${problemContext.title}\n`;
      context += `Difficulty: ${problemContext.difficulty || 'N/A'}\n`;
      context += `Description: ${problemContext.description}\n`;
      context += `Sample Input: ${problemContext.sample_input}\n`;
      context += `Sample Output: ${problemContext.sample_output}\n`;
      context += `Tags: ${problemContext.tags?.join(', ') || 'N/A'}\n\n`;
    }

    // Add user code context if available
    if (userCodeContext && userCodeContext.code) {
      const language = userCodeContext.language || 'plaintext';
      // Truncate very long code to keep prompt size reasonable
      const maxChars = 8000;
      const codeSnippet = userCodeContext.code.length > maxChars
        ? userCodeContext.code.slice(0, maxChars) + "\n// ... code truncated ..."
        : userCodeContext.code;
      context += `User's Current Code (${language}):\n`;
      context += codeSnippet + "\n\n";
    }
    
    // Add conversation history
    if (conversationHistory.length > 0) {
      context += 'Previous conversation:\n';
      conversationHistory.forEach((msg, index) => {
        const role = msg.type === 'user' ? 'User' : 'Ember';
        context += `${role}: ${msg.content}\n`;
      });
      context += '\n';
    }

    // Add current message
    context += `User: ${currentMessage}\n\nEmber:`;

    return context;
  }

  // Validate API key format
  validateApiKey(apiKey) {
    return apiKey && apiKey.length > 0 && apiKey !== 'YOUR_GEMINI_API_KEY_HERE';
  }

  // Get placeholder responses when API key is not configured
  getPlaceholderResponse(userMessage, problemContext) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return `Hello! I'm Ember, your AI coding assistant. 🔥

I'm currently in demo mode. To get full AI assistance, you'll need to configure your Gemini API key.

For now, I can help you understand the problem structure and provide general coding tips. What would you like to know?`;
    }
    
    if (message.includes('problem') || message.includes('understand')) {
      if (problemContext) {
        return `Let me help you understand this problem. 🔥

Problem overview:
- Title: ${problemContext.title}
- Difficulty: ${problemContext.difficulty}
- Tags: ${problemContext.tags?.join(', ') || 'N/A'}

Key points:
1. Read the problem description carefully
2. Understand the input and output format
3. Consider edge cases
4. Think about the most efficient approach

Would you like me to break down the input, output, and constraints step by step?`;
      } else {
        return `I can help you understand this problem. 🔥

I need the problem details first. After you configure your Gemini API key, I will analyze the problem and propose an approach.

For now, try to summarize the inputs, outputs, and constraints in your own words.`;
      }
    }
    
    if (message.includes('debug') || message.includes('error')) {
      return `I can help you debug your code! 🔥

Common debugging steps:
1. Check for syntax errors
2. Verify input/output format
3. Test with sample cases
4. Use print statements to trace execution
5. Check edge cases

Once you configure your Gemini API key, I'll be able to analyze your specific code and provide detailed debugging help!`;
    }
    
    if (message.includes('algorithm') || message.includes('approach')) {
      return `Great question about algorithms. 🔥

General problem-solving approach:
1. Understand the problem and constraints
2. Work through small examples
3. Consider multiple approaches (brute force vs optimized)
4. Choose a solution that balances correctness and efficiency
5. Implement and test with edge cases`;
    }
    
    if (message.includes('time complexity') || message.includes('complexity')) {
      return `Time complexity basics. 🔥

Common complexities:
- O(1): constant
- O(log n): logarithmic
- O(n): linear
- O(n log n): linearithmic
- O(n^2): quadratic
- O(2^n): exponential`;
    }
    
    // Default response
    return `I'm here to help with your coding questions. 🔥

To enable full AI assistance for this problem:
1. Get a Gemini API key from Google AI Studio
2. Add it to your .env file as VITE_GEMINI_API_KEY
3. Restart your development server

Meanwhile, I can give general guidance. Tell me what part you're stuck on (approach, debugging, edge cases, or optimization).`;
  }

  // Test API connection
  async testConnection() {
    try {
      const response = await this.generateResponse('Hello, can you help me with coding?');
      return response && response.length > 0;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}

// Create singleton instance
const geminiService = new GeminiService();

export default geminiService; 