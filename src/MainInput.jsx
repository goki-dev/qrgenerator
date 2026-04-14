import { useState } from "react"

export function MainInput( { generateQR } ) 
{
    const [url, setUrl] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        generateQR(url)
    }

    return (
    <>
        <form onSubmit={handleSubmit} className="new-item-form" role="form">
          <input id="urlinput" 
          type="text" placeholder='Enter text to generate QR code' 
          value={url} onChange={(e) => setUrl(e.target.value)} />
        </form>
    </>
    )
}