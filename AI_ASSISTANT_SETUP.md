# 🔥 Ember AI Assistant Setup Guide

## Overview
Ember is an AI coding assistant integrated into CodeBlaze that helps users with problem solving, code review, debugging, and learning programming concepts. It uses Google's Gemini API for intelligent responses.

## Features
- 🤖 **Intelligent Coding Help**: Get assistance with algorithms, debugging, and best practices
- 💬 **Conversational Interface**: Natural chat-based interaction
- 🔥 **Ember Personality**: Friendly and encouraging AI assistant
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful animations and smooth interactions

## Setup Instructions

### 1. Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables
Create a `.env` file in the `frontend` directory:

```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

**Important**: Replace `your_gemini_api_key_here` with your actual Gemini API key.

### 3. Alternative: Direct Configuration
If you prefer to configure the API key directly in the code:

1. Open `frontend/src/services/geminiService.js`
2. Find line 3: `const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';`
3. Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual API key

### 4. Restart Development Server
After adding the API key, restart your development server:

```bash
npm start
```

## Usage

### Accessing Ember
- Navigate to any problem page (e.g., `/problem/1`)
- Look for the **🔥 Ember** button in the top-right corner
- Click to open the chat interface
- Start asking coding questions related to the current problem!

### Example Questions
- "Can you help me understand this problem?"
- "What's the best approach to solve this?"
- "Can you help me debug my code?"
- "What's the time complexity of this solution?"
- "How can I optimize my algorithm?"
- "Can you explain this concept with examples?"

### Features
- **Problem-Specific Help**: Ember understands the current problem context
- **Real-time Chat**: Instant responses from Ember
- **Conversation History**: Context-aware responses
- **Code Examples**: Ember provides practical code snippets
- **Error Handling**: Graceful handling of API issues
- **Mobile Friendly**: Responsive design for all devices

## Technical Details

### Architecture
- **Frontend**: React.js with modern CSS animations
- **AI Service**: Google Gemini API integration
- **State Management**: React hooks for conversation state
- **Styling**: Custom CSS with glassmorphism effects

### API Configuration
- **Model**: Gemini Pro
- **Temperature**: 0.7 (balanced creativity and accuracy)
- **Max Tokens**: 1024 (sufficient for detailed responses)
- **Safety Settings**: Medium threshold for content filtering

### File Structure
```
frontend/src/
├── components/
│   ├── AIAssistant.jsx      # Main AI assistant component
│   └── AIAssistant.css      # Styling for AI assistant
├── services/
│   └── geminiService.js     # Gemini API integration
└── AI_ASSISTANT_SETUP.md    # This setup guide
```

## Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Ensure your `.env` file is in the correct location
   - Check that the API key is properly formatted
   - Restart the development server

2. **"Gemini API error" messages**
   - Verify your API key is valid and active
   - Check your internet connection
   - Ensure you have sufficient API quota

3. **Chat interface not appearing**
   - Check browser console for JavaScript errors
   - Ensure all files are properly imported
   - Verify React components are mounted correctly

### API Limits
- Gemini API has rate limits and usage quotas
- Monitor your usage in Google AI Studio
- Consider implementing rate limiting for production

## Security Notes
- Never commit API keys to version control
- Use environment variables for sensitive data
- Consider implementing API key rotation
- Monitor API usage for unusual patterns

## Future Enhancements
- [ ] Code syntax highlighting in responses
- [ ] File upload for code review
- [ ] Integration with problem context
- [ ] Voice input/output
- [ ] Conversation export functionality
- [ ] Customizable AI personality

## Support
If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify API key configuration
4. Test with simple questions first

---

**Happy coding with Ember! 🔥** 