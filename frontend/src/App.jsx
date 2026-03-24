import React, { useState } from 'react';
import { Camera, Shield, MessageSquare, AlertTriangle } from 'lucide-react';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = () => {
    setLoading(true);
    // Mimicking analysis
    setTimeout(() => {
      setScanResult({
        risk: 'MEDIUM',
        score: 65,
        flags: ['Urgent Tone', 'Off-platform Request'],
        analysis: 'The buyer is using high-pressure language typical of advance-fee fraud.',
        suggestion: 'Ask for verification before proceeding.'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Kini</h1>
        <p>Your Digital Selling Sanctuary</p>
      </header>

      <main className="sanctuary-card">
        <div className="upload-zone" onClick={handleScan}>
          <Camera size={48} color="#6d28d9" style={{ marginBottom: '1rem' }} />
          <h3>Upload Chat Screenshot</h3>
          <p>We'll look for scams and red flags</p>
        </div>

        <div style={{ textAlign: 'center', color: '#ccc' }}>— OR —</div>

        <textarea 
          placeholder="Paste suspicious text here..."
          className="input-text"
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
