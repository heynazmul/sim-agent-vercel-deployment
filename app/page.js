'use client';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.result || data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + error.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#343541'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #565869',
        backgroundColor: '#202123',
        color: '#ececf1',
        fontSize: '18px',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Sim AI Chat
      </div>

      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {messages.length === 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#8e8ea0',
            fontSize: '16px'
          }}>
            Start a conversation with Sim AI
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} style={{
            backgroundColor: msg.role === 'user' ? '#343541' : '#444654',
            padding: '16px',
            borderRadius: '8px',
            maxWidth: '800px',
            width: '100%',
            margin: '0 auto',
            color: '#ececf1'
          }}>
            <div style={{
              fontWeight: '600',
              marginBottom: '8px',
              color: msg.role === 'user' ? '#19c37d' : '#9b87f5'
            }}>
              {msg.role === 'user' ? 'You' : 'Sim AI'}
            </div>
            <div style={{
              whiteSpace: 'pre-wrap',
              lineHeight: '1.6'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {loading && (
          <div style={{
            backgroundColor: '#444654',
            padding: '16px',
            borderRadius: '8px',
            maxWidth: '800px',
            width: '100%',
            margin: '0 auto',
            color: '#ececf1'
          }}>
            <div style={{
              fontWeight: '600',
              marginBottom: '8px',
              color: '#9b87f5'
            }}>
              Sim AI
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>●</span>
              <span style={{ animation: 'pulse 1.5s ease-in-out 0.2s infinite' }}>●</span>
              <span style={{ animation: 'pulse 1.5s ease-in-out 0.4s infinite' }}>●</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div style={{
        padding: '20px',
        backgroundColor: '#343541',
        borderTop: '1px solid #565869'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder="Message Sim AI..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 16px',
              backgroundColor: '#40414f',
              border: '1px solid #565869',
              borderRadius: '8px',
              color: '#ececf1',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 24px',
              backgroundColor: loading || !input.trim() ? '#565869' : '#19c37d',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
