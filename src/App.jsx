import { useState } from 'react'
import './App.css'
import { MainInput }  from './MainInput'
import QRCode from "qrcode";
import { QRCanvas } from './QRCanvas'
import vetprimeLogoVertical from './assets/vetprime_logo_vertical.png'
import bgtile from './assets/3pxtile.png'

export default function App() {

  const [logoSrc, setLogoSrc] = useState(vetprimeLogoVertical);
  const [qrGenerated, setQrGenerated] = useState(false);
  // const [url, setUrl] = useState("");

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
    setQrGenerated(false);
    // setUrl("");
    // const urlInput = url;
    const urlInput = document.getElementById('urlinput');
    if (urlInput) urlInput.value = "";
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function handleDownload() {
    if (!qrGenerated) {
      alert('Please generate a QR code first');
      return;
    }
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
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
    const opts = { 
      width: 400,
      errorCorrectionLevel: 'H' // use high error correction to allow for the logo overlay 
    };
    QRCode.toCanvas(canvas, url, opts, (error) => {
      if (error) {
        alert(error);
        setQrGenerated(false);
        return;
      }
      setQrGenerated(true);

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
     
      {/* Noise Layer */}
      <div className="pointer-events-none fixed inset-0 opacity-20"
          style={{
            backgroundImage: `url(${bgtile})`,
            backgroundRepeat: 'repeat',
            zIndex: -1,
          }}
        />

    <div className="pointer-events-none absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full top-20 left-20"
      style={{ zIndex: -1 }} />

      <header className="app-header">
        <div className="brand">
          <h1>QR Generator</h1>
          <p className="subtitle">Create clean QR codes instantly</p>
        </div>
      </header>

      {/* <aside> and <main> are semantic tags. Like labeled DIVs that is used for SEO */}
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
          <QRCanvas onDownload={handleDownload} />
        </section>
      </main>



      
    </div>
  )
}
