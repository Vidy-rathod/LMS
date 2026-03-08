import { useState, useRef, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AIChatbot = ({ courseId, courseTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        type: 'bot',
        text: `Hey! 👋 I'm your AI Learning Assistant!\n\nI can help you with:\n• Programming questions\n• Study tips & motivation\n• Course content explanations\n• Silly questions (I love those! 😄)\n\nAsk me anything!`,
        timestamp: new Date()
      }]);
      loadSuggestions();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadSuggestions = async () => {
    try {
      const { data } = await api.get(`/chatbot/suggestions/${courseId}`);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Failed to load suggestions');
    }
  };

  const handleSendMessage = async (messageText = null) => {
    const question = messageText || inputMessage.trim();
    if (!question) return;

    const userMessage = {
      type: 'user',
      text: question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/chatbot/ask', {
        question,
        courseTitle: courseTitle
      });

      const botMessage = {
        type: 'bot',
        text: data.answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      if (error.response?.status === 503) {
        errorMessage = 'The AI model is loading. Please wait and try again.';
      } else if (error.response?.status === 408) {
        errorMessage = 'Request timeout. Try a shorter question.';
      }

      const errorMsg = {
        type: 'bot',
        text: errorMessage,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 z-50 hover:bg-blue-700"
        style={{
          boxShadow: '0 10px 40px rgba(37, 99, 235, 0.4)'
        }}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-blue-600 animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-[400px] h-[600px] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-blue-200"
          style={{
            background: 'white',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Header */}
          <div 
            className="bg-blue-600 text-white p-4 flex items-center justify-between border-b border-blue-500"
          >
            <div className="flex items-center">
              <div className="relative">
                <div className="bg-white rounded-lg p-2 mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-2 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-semibold text-base">AI Assistant</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 rounded-lg p-1.5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {message.type === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : message.isError
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && suggestions.length > 0 && (
              <div className="space-y-2 animate-fadeIn">
                <p className="text-xs text-gray-600 font-medium px-1">Suggested questions:</p>
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left text-sm bg-white hover:bg-blue-50 text-gray-700 rounded-lg px-3 py-2 border border-gray-200 hover:border-blue-300 transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-800 placeholder-gray-400"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 text-white rounded-lg px-3 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed self-end"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
