const axios = require('axios');

// Hugging Face Router API configuration (OpenAI-compatible)
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_ROUTER_URL = 'https://router.huggingface.co/v1/chat/completions';

// @desc    Chat with AI assistant using Hugging Face Router API
// @route   POST /api/chatbot/ask
// @access  Private (Student)
exports.askQuestion = async (req, res) => {
  try {
    const { question, courseTitle } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ message: 'Question is required' });
    }

    let answer = '';
    let source = 'builtin';

    // Try Hugging Face Router API
    if (HF_API_KEY) {
      try {
        console.log('Trying Hugging Face Router API...');
        
        const systemPrompt = courseTitle 
          ? `You are a helpful AI learning assistant for an online course platform. The student is currently taking the course: "${courseTitle}". Provide clear, concise, and encouraging answers to help them learn. Keep responses under 200 words.`
          : 'You are a helpful AI learning assistant. Provide clear, concise, and encouraging answers to help students learn. Keep responses under 200 words.';

        const response = await axios.post(
          HF_ROUTER_URL,
          {
            model: 'MiniMaxAI/MiniMax-M2.5:novita',
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: question
              }
            ],
            max_tokens: 300,
            temperature: 0.7,
            top_p: 0.9
          },
          {
            headers: {
              'Authorization': `Bearer ${HF_API_KEY}`,
              'Content-Type': 'application/json'
            },
            timeout: 15000 // 15 second timeout
          }
        );

        if (response.data?.choices?.[0]?.message?.content) {
          answer = response.data.choices[0].message.content.trim();
          source = 'huggingface-minimax';
          console.log('Hugging Face Router API success!');
        }
      } catch (apiError) {
        console.log('Hugging Face Router API error:', apiError.message);
        if (apiError.response) {
          console.log('API Error Response:', apiError.response.data);
        }
      }
    }

    // If no AI response, use built-in knowledge
    if (!answer || answer.length < 10) {
      answer = generateResponse(question);
      source = 'builtin';
    }

    res.json({
      question,
      answer,
      timestamp: new Date(),
      source
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.json({
      question: req.body.question || '',
      answer: generateResponse(req.body.question || ''),
      timestamp: new Date(),
      source: 'builtin'
    });
  }
};

// Generate intelligent built-in responses
function generateResponse(question) {
  const q = question.toLowerCase();
  
  // Greetings
  if (q.match(/^(hi|hello|hey|hola|namaste)/)) {
    return "Hey! 👋 I'm your AI learning buddy! I can help you with:\n\n• Programming (JavaScript, Python, React, etc.)\n• Study tips and motivation\n• Silly questions (I love those! 😄)\n• Math, science, or any topic\n• Just chatting!\n\nWhat's on your mind?";
  }
  
  // How are you
  if (q.includes('how are you') || q.includes('whats up')) {
    return "I'm doing great, thanks for asking! 😊 I'm always excited to help students learn!\n\nHow are YOU doing? What would you like to learn or talk about today?";
  }
  
  // Jokes
  if (q.includes('joke') || q.includes('funny')) {
    const jokes = [
      "Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛😄",
      "Why do Java developers wear glasses?\n\nBecause they can't C#! 😎",
      "How many programmers does it take to change a light bulb?\n\nNone. It's a hardware problem! 💡",
      "Why did the programmer quit his job?\n\nBecause he didn't get arrays! 😅"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)] + "\n\nWant another one or shall we learn something?";
  }
  
  // PM of India
  if (q.includes('pm of india') || q.includes('prime minister of india')) {
    return "Narendra Modi is the Prime Minister of India (as of 2024). He's been serving since May 2014 and is from the BJP party.\n\nWant to know more about Indian politics or switch to another topic?";
  }
  
  // President
  if (q.includes('president of india')) {
    return "Droupadi Murmu is the President of India (as of 2024). She's the first tribal woman to hold this position!\n\nInterested in learning more about the Indian government?";
  }
  
  // Time/Date
  if (q.includes('time') || q.includes('date') || q.includes('today')) {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `📅 ${date}\n⏰ ${time}\n\nPerfect time to learn something new! What interests you?`;
  }
  
  // JavaScript
  if (q.includes('javascript') || q.includes(' js ')) {
    return "JavaScript is awesome! 🚀\n\nKey points:\n• Runs in browsers and servers (Node.js)\n• Makes websites interactive\n• Easy to start, powerful to master\n• Huge job market!\n\nCore concepts:\n- Variables (let, const, var)\n- Functions & Arrow Functions\n• Objects & Arrays\n- DOM Manipulation\n- Async/Await\n\nWhat specifically would you like to know?";
  }
  
  // Python
  if (q.includes('python')) {
    return "Python is amazing! 🐍\n\nWhy Python rocks:\n• Super easy to read and write\n• Perfect for beginners\n• Used in AI, web dev, data science\n• Tons of jobs!\n\nPopular uses:\n- Web (Django, Flask)\n- Data Science (Pandas, NumPy)\n- AI/ML (TensorFlow, PyTorch)\n- Automation\n\nWhat would you like to learn about Python?";
  }
  
  // React
  if (q.includes('react')) {
    return "React is super popular! ⚛️\n\nWhy React?\n• Component-based\n• Fast with Virtual DOM\n• Used by Facebook, Instagram, Netflix\n• Great for building UIs\n\nCore concepts:\n- Components & Props\n- State & Hooks\n- JSX Syntax\n- useEffect & useState\n\nWant to learn React? I can explain any concept!";
  }
  
  // HTML/CSS
  if (q.includes('html') || q.includes('css')) {
    return "HTML & CSS are the foundation of the web! 🌐\n\nHTML = Structure (skeleton)\nCSS = Style (appearance)\n\nKey topics:\n- HTML tags & elements\n- CSS selectors & properties\n- Flexbox & Grid layouts\n- Responsive design\n\nWant to learn how to build your first webpage?";
  }
  
  // Programming general
  if (q.includes('programming') || q.includes('coding') || q.includes('code')) {
    return "Programming is an amazing skill! 💻\n\nHow to start:\n1. Choose a language (Python is easiest)\n2. Learn basics (variables, loops, functions)\n3. Practice daily (even 20 minutes!)\n4. Build projects\n5. Never give up!\n\nResources:\n• This LMS platform\n• FreeCodeCamp\n• YouTube tutorials\n• Practice on LeetCode\n\nWhat language interests you?";
  }
  
  // Learning/Study tips
  if (q.includes('learn') || q.includes('study')) {
    return "Great question! Here's how to learn effectively: 📚\n\n1. Practice daily (consistency beats intensity)\n2. Build projects (learn by doing)\n3. Teach others (best way to learn)\n4. Make mistakes (they're your teachers)\n5. Stay curious!\n\nStudy tips:\n✓ Take breaks (Pomodoro technique)\n✓ Active learning (don't just watch)\n✓ Review regularly\n✓ Join communities\n\nWhat are you trying to learn?";
  }
  
  // Motivation
  if (q.includes('give up') || q.includes('quit') || q.includes('hard') || q.includes('difficult')) {
    return "Don't give up! You've got this! 💪\n\nRemember:\n• Every expert was once a beginner\n• Mistakes are part of learning\n• Progress > Perfection\n• You're already doing great by asking!\n\n\"The only way to do great work is to love what you do.\" - Steve Jobs\n\nWhat's challenging you? Let's tackle it together!";
  }
  
  // Thank you
  if (q.includes('thank')) {
    return "You're so welcome! 😊\n\nI'm always here to help! Feel free to ask me:\n• Learning questions\n• Programming help\n• Silly questions\n• Or just chat!\n\nWhat else can I help you with?";
  }
  
  // Default
  return `I'm your AI learning buddy! 🤖\n\nI can help you with:\n\n💻 Programming:\n• JavaScript, Python, React, HTML/CSS\n• Web Development\n• Debugging & Best Practices\n\n📚 Learning:\n• Study tips & strategies\n• Motivation & support\n• Course content help\n\n🎯 General:\n• Math & Science\n• Career advice\n• Silly questions\n• Just chatting!\n\nWhat would you like to know?`;
}

// @desc    Get chat suggestions
// @route   GET /api/chatbot/suggestions/:courseId
// @access  Private (Student)
exports.getSuggestions = async (req, res) => {
  try {
    const suggestions = [
      "Tell me a joke!",
      "Explain JavaScript",
      "How do I learn programming?",
      "Give me motivation",
      "What's your favorite color?",
      "Help me with React",
      "Study tips please",
      "I'm feeling stuck"
    ];

    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Quick help
// @route   POST /api/chatbot/quick-help
// @access  Private (Student)
exports.quickHelp = async (req, res) => {
  try {
    const { type } = req.body;

    const quickResponses = {
      'how-to-navigate': 'Use Previous/Next buttons. Complete each lesson to unlock the next!',
      'mark-complete': 'Click "Mark as Complete" after watching to unlock the next lesson.',
      'resume-video': 'Your progress saves automatically. Videos resume where you left off!',
      'progress-tracking': 'Check your dashboard to see progress and stats.',
      'locked-lesson': 'Lessons unlock one by one. Complete the previous lesson first!',
      'technical-issue': 'Try refreshing the page. Still stuck? Let me know!',
      'general-help': 'I can help with anything! Just ask me!'
    };

    const response = quickResponses[type] || 'How can I help you today?';

    res.json({ answer: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
