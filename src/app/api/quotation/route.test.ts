import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import nodemailer from 'nodemailer'

// Mock the nodemailer library
vi.mock('nodemailer')

describe('POST /api/quotation', () => {
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
      customerInfo: {
        name: 'John Doe',
        email: 'john.doe@customer.com',
      },
      items: [
        {
          product: { id: 1, name: 'Classic Oak Door' },
          quantity: 2,
          selectedDimensions: { width: '36', height: '80', thickness: '1.5' },
        },
      ],
    }

    const request = new Request('http://localhost/api/quotation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockRequestData),
    })

    const response = await POST(request)

    // 1. Check if the response is successful
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.message).toBe('Quotation request sent successfully!')

    // 2. Check that sendMail was called twice
    expect(sendMailMock).toHaveBeenCalledTimes(2)

    // 3. Inspect the internal email
    const internalEmail = sendMailMock.mock.calls[0][0]
    expect(internalEmail.to).toBe('test@internal.com')
    expect(internalEmail.subject).toContain('New Quotation Request from John Doe')
    expect(internalEmail.html).toContain('Classic Oak Door')

    // 4. Inspect the customer confirmation email
    const customerEmail = sendMailMock.mock.calls[1][0]
    expect(customerEmail.to).toBe('john.doe@customer.com')
    expect(customerEmail.subject).toContain('We have received your quotation request')
    expect(customerEmail.html).toContain('Classic Oak Door')
  })

  it('should return 400 if required data is missing', async () => {
    const request = new Request('http://localhost/api/quotation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerInfo: {}, items: [] }), // Missing items
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    // Ensure no emails were sent
    expect(sendMailMock).not.toHaveBeenCalled()
  })
})