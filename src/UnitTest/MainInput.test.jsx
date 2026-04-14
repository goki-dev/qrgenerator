import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MainInput } from '/src/MainInput'

//@testing-library/user-event: This simulates REAL user behavior like typing, clicking, etc. It is more accurate than fireEvent for simulating user interactions. fireEvent is more low-level and can be used for specific events, but user-event provides a more realistic simulation of how users interact with the UI. In this test, we use user-event to simulate typing into the input field and submitting the form, which closely mimics real user behavior.

//Groups related tests together. Think of it like a “folder” of tests. So everything inside is testing MainInput
describe('MainInput', () => {
  it('renders the input field and handles form submission', async () => {
    const mockGenerateQR = vi.fn() // Mock the generateQR function
    const user = userEvent.setup()

    render(<MainInput generateQR={mockGenerateQR} />)

    //Creates a fake function using Vitest that we can use to test if it was called correctly. We will pass this mock function as a prop to the MainInput component, and then we can check if it was called with the expected arguments when the form is submitted. 
    const input = screen.getByPlaceholderText('Enter text to generate QR code')

    // Check that the input field is rendered
    expect(input).toBeInTheDocument()

    // Simulate user typing a URL
    await user.type(input, 'https://example.com')

    // Simulate form submission (pressing Enter or clicking submit if you add a button)
    fireEvent.submit(screen.getByRole('form'))

    // Verify that generateQR was called with the correct URL
    expect(mockGenerateQR).toHaveBeenCalledWith('https://example.com')
  })

    // 2nd test case: Verify the input starts empty on initial render
  it('renders with an empty input field initially', () => {
    const mockGenerateQR = vi.fn()

    render(<MainInput generateQR={mockGenerateQR} />)

    const input = screen.getByPlaceholderText('Enter text to generate QR code')
    expect(input).toHaveValue('') // Assert the input value is empty
  })
})