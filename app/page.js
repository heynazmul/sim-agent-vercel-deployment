'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Sim AI Chat</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px' }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding: '10px 20px' }}>
          Send
        </button>
      </div>
    </div>
  );
}
