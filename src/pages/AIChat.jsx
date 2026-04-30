import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Bot, User, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am a custom Gemma 3 model running locally on a private server. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchApiUrl = async () => {
      try {
        const urlSnap = await getDoc(doc(db, 'api_config', 'url'));
        if (urlSnap.exists() && urlSnap.data().baseUrl) {
          setApiUrl(urlSnap.data().baseUrl);
        } else {
          setApiUrl('http://localhost:8080'); // Fallback for local testing
        }
      } catch (err) {
        console.error("Failed to fetch API URL:", err);
        setApiUrl('http://localhost:8080');
      }
    };
    fetchApiUrl();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !apiUrl) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ngrok requires a special header sometimes to bypass browser warning
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          messages: newMessages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message;
      setMessages([...newMessages, aiResponse]);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the backend server. The model might be offline or the Ngrok URL is outdated.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-chat-page" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link to="/" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '30px' }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="chat-header" style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 className="section-title" style={{ margin: 0 }}>Gemma 3 <span className="text-gradient">Live Demo</span></h1>
          <p className="section-subtitle-text" style={{ marginTop: '10px' }}>Powered by a customized GGUF model running on a private GPU/CPU backend.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="chat-container glass"
          style={{ display: 'flex', flexDirection: 'column', height: '600px', borderRadius: '20px', overflow: 'hidden' }}
        >
          {/* Chat connection status */}
          <div className="chat-status" style={{ padding: '15px 20px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={16} color={apiUrl ? '#4ade80' : '#fbbf24'} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {apiUrl ? `Backend Connected: ${apiUrl}` : 'Initializing Connection...'}
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ 
                  maxWidth: '80%', 
                  padding: '15px 20px', 
                  borderRadius: '20px',
                  background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  borderBottomRightRadius: msg.role === 'user' ? '5px' : '20px',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '5px' : '20px',
                  display: 'flex',
                  gap: '15px'
                }}>
                  {msg.role === 'assistant' && (
                    <div style={{ marginTop: '2px', color: 'var(--primary)' }}><Bot size={20} /></div>
                  )}
                  <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '15px 20px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Bot size={20} color="var(--primary)" />
                  <span className="loading-dots">Gemma is thinking...</span>
                </div>
              </div>
            )}
            
            {error && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ padding: '10px 20px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.9rem' }}>
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Gemma..."
              disabled={isLoading || !apiUrl}
              style={{ flex: 1, padding: '15px 20px', borderRadius: '15px', border: 'none', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '1rem', outline: 'none' }}
            />
            <button 
              type="submit" 
              disabled={isLoading || !apiUrl || !input.trim()}
              className="btn btn-primary"
              style={{ padding: '0 25px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChat;
