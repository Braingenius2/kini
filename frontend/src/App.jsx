import React, { useState, useRef } from 'react';
import { Camera, Shield, MessageSquare, AlertTriangle, Loader2 } from 'lucide-react';
import { analyzeText } from './utils/analyzer';
import Tesseract from 'tesseract.js';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleScan = async (type = 'text', customText = null) => {
    const textToScan = customText || inputText;
    
    if (type === 'text' && !textToScan.trim()) {
      alert("Please paste some text to scan.");
      return;
    }

    setLoading(true);
    setStatus('Analyzing patterns...');
    
    const isTextMode = type === 'text';
    
    // Perform immediate local analysis (Zero-Server fallback)
    const localResult = analyzeText(textToScan);

    try {
      let response;
      if (isTextMode) {
        const url = `http://localhost:8000/scan/text?content=${encodeURIComponent(textToScan)}`;
        response = await fetch(url, { method: 'POST' });
      } else {
        response = await fetch('http://localhost:8000/scan/image', { method: 'POST' });
      }

      if (response && response.ok) {
        const data = await response.json();
        setScanResult(data);
      } else {
        setScanResult(localResult);
      }
    } catch (error) {
      console.log("Using internal Kini engine (Offline Mode)");
      setScanResult(localResult);
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setStatus('Reading image (OCR)...');
    
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      console.log("OCR Extracted:", text);
      handleScan('text', text);
    } catch (err) {
      console.error("OCR Error:", err);
      alert("Failed to read image. Please try typing the text.");
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Kini</h1>
        <p>Your Digital Selling Sanctuary</p>
      </header>

      <main className="sanctuary-card">
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*"
          onChange={handleFileUpload}
        />
        <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
          {loading && status.includes('OCR') ? (
            <Loader2 size={48} className="animate-spin" color="#6d28d9" style={{ marginBottom: '1rem' }} />
          ) : (
            <Camera size={48} color="#6d28d9" style={{ marginBottom: '1rem' }} />
          )}
          <h3>Upload Chat Screenshot</h3>
          <p>{status || "We'll look for scams and red flags"}</p>
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

        <button className="btn-primary" onClick={() => handleScan('text')} disabled={loading}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <Loader2 size={18} className="animate-spin" />
              {status || 'Analyzing...'}
            </div>
          ) : 'Scan for Risks'}
        </button>
      </main>

      {scanResult && (
        <section className="sanctuary-card" style={{ animation: 'slideUp 0.5s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield color="#ba1a1a" />
            <h3>Analysis Result</h3>
            <span className={`risk-badge risk-${scanResult.risk_level?.toLowerCase() || 'low'}`}>
              {scanResult.risk_level} RISK
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
            <p style={{ fontSize: '0.85rem' }}>"{scanResult.suggestion || 'Proceed with caution and verify payment before shipping.'}"</p>
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
