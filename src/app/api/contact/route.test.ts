import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import nodemailer from 'nodemailer'

// Mock the nodemailer library
vi.mock('nodemailer')

describe('POST /api/contact', () => {
  const sendMailMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock sendMail to resolve successfully
    sendMailMock.mockResolvedValue({ messageId: 'test-message-id' })

    // Mock the createTransport function to return our mock sender
    vi.mocked(nodemailer.createTransport).mockReturnValue({ 
      sendMail: sendMailMock 
    } as any)

    // Stub ALL required environment variables
    vi.stubEnv('EMAIL_SERVER_HOST', 'smtp.test.com')
    vi.stubEnv('EMAIL_SERVER_PORT', '587')
    vi.stubEnv('EMAIL_SERVER_USER', 'test@test.com')
    vi.stubEnv('EMAIL_SERVER_PASSWORD', 'testpassword')
    vi.stubEnv('EMAIL_TO', 'test@internal.com')
    vi.stubEnv('EMAIL_FROM', 'noreply@company.com')
  })

  it('should send two emails (internal and customer) on successful submission', async () => {
    const mockRequestData = {
      name: 'Jane Doe',
      email: 'jane.doe@customer.com',
      subject: 'Question about products',
      message: 'Hello, I have a question.',
    }

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockRequestData),
    })

    const response = await POST(request)

    // 1. Check if the response is successful
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.message).toBe('Message sent successfully!')

    // 2. Check that sendMail was called twice
    expect(sendMailMock).toHaveBeenCalledTimes(2)

    // 3. Inspect the internal email
    const internalEmail = sendMailMock.mock.calls[0][0]
    expect(internalEmail.to).toBe('test@internal.com')
    expect(internalEmail.subject).toContain('New Contact Form Submission: Question about products')
    expect(internalEmail.html).toContain('Hello, I have a question.')

    // 4. Inspect the customer confirmation email
    const customerEmail = sendMailMock.mock.calls[1][0]
    expect(customerEmail.to).toBe('jane.doe@customer.com')
    expect(customerEmail.subject).toContain('We have received your message')
    expect(customerEmail.html).toContain('For your records, here is a copy of your message:')
  })

  it('should return 400 if required fields are missing', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'test', email: 'test@test.com' }), // Missing subject and message
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    // Ensure no emails were sent
    expect(sendMailMock).not.toHaveBeenCalled()
  })
})