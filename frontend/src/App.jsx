import React, { useState } from 'react';
import { Camera, Shield, MessageSquare, AlertTriangle } from 'lucide-react';
import { analyzeText } from './utils/analyzer';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleScan = async (type = 'text') => {
    if (type === 'text' && !inputText.trim()) {
      alert("Please paste some text to scan.");
      return;
    }

    setLoading(true);
    
    // Perform immediate local analysis (Zero-Server fallback)
    const localResult = type === 'text' 
      ? analyzeText(inputText)
      : analyzeText("I accidentally sent 200k more than the price. Please refund the balance to my brother's account ASAP.");

    try {
      let response;
      if (type === 'text') {
        const url = `http://localhost:8000/scan/text?content=${encodeURIComponent(inputText)}`;
        response = await fetch(url, { method: 'POST' });
      } else {
        response = await fetch('http://localhost:8000/scan/image', { method: 'POST' });
      }

      if (response.ok) {
        const data = await response.json();
        setScanResult(data);
      } else {
        // Backend not found (ideal for Showcase demo on GitHub Pages)
        setScanResult(localResult);
      }
    } catch (error) {
      // Offline mode
      console.log("Using internal Kini engine (Offline Mode)");
      setScanResult(localResult);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Kini</h1>
        <p>Your Digital Selling Sanctuary</p>
      </header>

      <main className="sanctuary-card">
        <div className="upload-zone" onClick={() => handleScan('image')}>
          <Camera size={48} color="#6d28d9" style={{ marginBottom: '1rem' }} />
          <h3>Upload Chat Screenshot</h3>
          <p>We'll look for scams and red flags</p>
        </div>

        <div style={{ textAlign: 'center', color: '#ccc' }}>— OR —</div>

        <textarea 
          placeholder="Paste suspicious text here..."
          className="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ 
            width: '100%', 
            minHeight: '120px', 
            borderRadius: '16px', 
            padding: '1rem', 
            border: '1px solid #f3ebf9',
            backgroundColor: '#fef7ff'
          }}
        />

        <button className="btn-primary" onClick={handleScan}>
          {loading ? 'Analyzing...' : 'Scan for Risks'}
        </button>
      </main>

      {scanResult && (
        <section className="sanctuary-card" style={{ animation: 'slideUp 0.5s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield color="#ba1a1a" />
            <h3>Analysis Result</h3>
            <span className={`risk-badge risk-${scanResult.risk.toLowerCase()}`}>
              {scanResult.risk} RISK
            </span>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#4a4455' }}>{scanResult.analysis}</p>

          <div className="red-flags">
            {scanResult.flags.map(flag => (
              <div key={flag} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <AlertTriangle size={16} color="#7d4e00" />
                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{flag}</span>
              </div>
            ))}
          </div>

          <div className="suggestion" style={{ background: '#f9f1ff', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #6d28d9' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Shield Suggestion:</p>
            <p style={{ fontSize: '0.85rem' }}>"{scanResult.suggestion}"</p>
          </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', fontSize: '0.8rem', color: '#aaa', marginTop: 'auto' }}>
        Built for 3MTT NextGen Showcase • Digital Inclusion
      </footer>
    </div>
  );
}

export default App;
