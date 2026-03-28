import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainInput }  from './MainInput'
import QRCode from "qrcode";
import { QRCanvas } from './QRCanvas'
import vetprimeLogoVertical from './assets/vetprime_logo_vertical.png'

export default function App() {

  const [logoSrc, setLogoSrc] = useState(vetprimeLogoVertical);
  const [url, setUrl] = useState("");

  function handleLogoUpload(e) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoSrc(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleResetLogo() {
    setLogoSrc(vetprimeLogoVertical);
    setUrl("");
    const urlInput = document.getElementById('urlinput');
    if (urlInput) urlInput.value = "";
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function triggerFileInput() {
    document.getElementById('logoInput')?.click();
  }

  function handleGenerateClick() {
    const urlInput = document.getElementById('urlinput');
    const urlValue = urlInput?.value.trim();
    if (!urlValue) {
      alert('Please enter a URL');
      return;
    }
    generateQR(urlValue);
  }

  function generateQR(url) {
    // e.preventDefault()

    const canvas = document.getElementById("canvas"); // plain JS
    if (!canvas) return;

    // specify a higher width so the generated image fills the larger canvas
    const opts = { width: 400 };
    QRCode.toCanvas(canvas, url, opts, (error) => {
      if (error) {
        alert(error);
        return;
      }

      // draw a small logo/image in the centre of the QR code
      if (logoSrc) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const logo = new Image();
          logo.src = logoSrc;
          logo.onload = () => {
            const size = 80; // px, change as needed
            const x = (canvas.width - size) / 2;
            const y = (canvas.height - size) / 2;
            ctx.drawImage(logo, x, y, size, size);
          };
          logo.onerror = () => {
            console.warn('logo failed to load');
          };
        }
      }

    });

  }
  
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
          <h1>QR Generator</h1>
          <p className="subtitle">Create clean QR codes instantly</p>
        </div>
      </header>

      <aside className="controls">
        <div className="controls-inner">
          <MainInput generateQR={generateQR} />
          <div className="logo-upload">
            <label htmlFor="logoInput">Upload Logo (JPG/PNG):</label>
            <input
              id="logoInput"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleLogoUpload}
              style={{ display: 'none' }}
            />
            {logoSrc && logoSrc !== vetprimeLogoVertical && <p className="logo-preview-text">✓ Logo uploaded</p>}
            <div className="button-group">
              <button onClick={triggerFileInput} className="upload-btn">Upload Logo</button>
              <button onClick={handleResetLogo} className="reset-btn">Reset</button>
            </div>
            <button onClick={handleGenerateClick} className="generate-btn">Generate</button>
          </div>
        </div>
      </aside>
    <br />
      <main className="app-content">
        <section className="qr-card">
          <div className="QRcontainer">
            {/* explicit width/height attributes ensure the canvas drawing buffer is large enough */}
            <canvas id="canvas" className="qr-canvas" width="400" height="400" aria-label="QR preview"></canvas>
          </div>
          <div className="qr-meta">
            <p className="hint">Preview</p>
          </div>
        </section>

        
      </main>

    </div>
  )
}
