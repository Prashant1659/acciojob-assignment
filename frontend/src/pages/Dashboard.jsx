import { useState } from 'react';
import axios from 'axios';
import useSessionStore from '../store/sessionStore.js';
import PreviewIframe from '../components/PreviewFrame.jsx';
import CodeTabs from '../components/CodeTabs.jsx';

export default function Dashboard() {
  const { chat, jsxCode, cssCode, updateChat, setCode } = useSessionStore();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    updateChat({ role: 'user', content: prompt });
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/generate',
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const { message, jsx, css } = res.data;
      updateChat({ role: 'ai', content: message });
      setCode(jsx, css);
      setPrompt('');
    } catch (error) {
      alert('Error generating code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Chat Panel */}
      <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
        <h2>Chat</h2>
        <div style={{ flex: 1, maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {chat.map((msg, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <strong>{msg.role}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your UI component..."
          style={{ marginTop: '10px' }}
        />
        <button onClick={sendPrompt} disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? 'Generating...' : 'Send'}
        </button>
      </div>

      {/* Preview & Code Panel */}
      <div style={{ width: '70%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2>Live Preview</h2>
        <PreviewIframe jsx={jsxCode} css={cssCode} />
        <CodeTabs jsx={jsxCode} css={cssCode} />
      </div>
    </div>
  );
}
