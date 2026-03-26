export function QRCanvas( { generateQR } ) 
{
    return (
    <>
       <canvas id="canvas" ref={canvasRef} className="QRcontainer"></canvas>
    </>
    )
}