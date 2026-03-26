import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainInput }  from './MainInput'
import QRCode from "qrcode";
import { QRCanvas } from './QRCanvas'

export default function App() {

  // const [url, setURL] = useState("")

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
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const logo = new Image();
        // use a relative path from public/ or assets folder
        logo.src = 'src/assets/vetprime_logo_vertical.png';
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

      alert("success!");
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

        <aside className="controls">
          <div className="controls-inner">
            <MainInput generateQR={generateQR} />
          </div>
        </aside>
      </main>

      <footer className="app-footer">Made with ❤️</footer>
    </div>
  )
}
