
export function QRCanvas( { onDownload } ) 
{
    return (
    <>
    
        <div className="QRcontainer">
            {/* explicit width/height attributes ensure the canvas drawing buffer is large enough */}
            <canvas id="canvas" className="qr-canvas" width="400" height="400" aria-label="QR preview"></canvas>
       </div>
       <div className="qr-meta">
            <button onClick={onDownload} className="download-btn">Download QR Code</button>
       </div>
    </>
    )
}