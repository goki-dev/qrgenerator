// render → mounts your App in a fake browser
// screen → queries elements like a user
// waitFor → waits for async UI updates
// fireEvent → simulates events (like file upload)
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../App'

// Mock the qrcode library to avoid actual QR generation in tests. This replaces the real QR code library with a fake one.
// vi.mock(...) → tells Vitest to replace a module
// toCanvas → fake function
// callback(null) → simulates success (no error)
vi.mock('qrcode', () => ({
  default: {
    toCanvas: vi.fn((canvas, url, opts, callback) => {
      callback(null)
    })
  }
}))

class MockFileReader {
  constructor() {
    this.onload = null
    this.result = ''
  }

  readAsDataURL() {
    if (typeof this.onload === 'function') {
      this.onload({ target: { result: 'data:image/png;base64,mockdata' } })
    }
  }
}

vi.stubGlobal('FileReader', MockFileReader)

describe('App', () => {
  it('handles logo upload and shows upload confirmation', async () => {
    render(<App />)

    const fileInput = screen.getByTestId('logoInput')
    const mockFile = new File(['dummy content'], 'logo.png', { type: 'image/png' })

    fireEvent.change(fileInput, { target: { files: [mockFile] } })

    await waitFor(() => {
      expect(screen.getByText('✓ Logo uploaded')).toBeInTheDocument()
    })
  })
})