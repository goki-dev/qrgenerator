import { useRef } from 'react';

export function QRCanvas( { generateQR } ) 
{
    const canvasRef = useRef(null);
    return (
    <>
       <canvas id="canvas" ref={canvasRef} className="QRcontainer"></canvas>
    </>
    )
}