import { useState } from 'react';

export default function CodeTabs({ jsx, css }) {
  const [activeTab, setActiveTab] = useState('jsx');

  const code = activeTab === 'jsx' ? jsx : css;

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveTab('jsx')}>JSX</button>
        <button onClick={() => setActiveTab('css')}>CSS</button>
      </div>
      <pre style={{ background: '#f5f5f5', padding: '10px', overflowX: 'auto' }}>
        <code>{code}</code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        style={{ marginRight: '10px' }}
      >
        Copy
      </button>
      <button
        onClick={() => {
          const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${activeTab}-code.txt`;
          a.click();
        }}
      >
        Download
      </button>
    </div>
  );
}
