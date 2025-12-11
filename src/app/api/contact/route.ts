import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import {
  getContactFormConfirmationHtml,
  getContactFormConfirmationText,
  getContactFormInternalHtml,
  getContactFormInternalText,
} from '@/lib/email-templates'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    let transporter

    if (process.env.EMAIL_SERVER_HOST) {
      const requiredEnvVars = [
        'EMAIL_SERVER_HOST',
        'EMAIL_SERVER_PORT',
        'EMAIL_SERVER_USER',
        'EMAIL_SERVER_PASSWORD',
        'EMAIL_FROM',
      ]
      const missingEnvVars = requiredEnvVars.filter(
        envVar => !process.env[envVar],
      )

      if (missingEnvVars.length > 0) {
        const errorMessage = `Missing required environment variables: ${missingEnvVars.join(
          ', ',
        )}`
        console.error(errorMessage)
        return NextResponse.json(
          { message: `Server configuration error: ${errorMessage}` },
          { status: 500 },
        )
      }

      transporter = nodemailer.createTransport({
        service: "yahoo",
        pool: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      })
    } else if (process.env.NODE_ENV === 'development') {
      const testAccount = await nodemailer.createTestAccount()
      console.log(
        'No EMAIL_SERVER_HOST found, using temporary Ethereal account',
      )
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
    } else {
      return NextResponse.json(
        {
          message:
            'Server configuration error: Email server is not configured for production.',
        },
        { status: 500 },
      )
    }

    // Send internal notification
    const internalMailOptions = {
      from: `${process.env.EMAIL_FROM || 'noreply@example.com'}`,
      // replyTo: data.email, // REMOVED: Likely causing Yahoo 550 error
      to: process.env.EMAIL_TO || "thecarpenterwood@yahoo.com",
      subject: `New Contact Form Submission: ${data.subject}`,
      text: getContactFormInternalText(data),
      html: getContactFormInternalHtml(data),
    }
    const internalInfo = await transporter.sendMail(internalMailOptions)

    // Send customer confirmation
    const customerMailOptions = {
      from: `${process.env.EMAIL_FROM || 'noreply@example.com'}`,
      to: data.email,
      subject: 'We have received your message',
      text: getContactFormConfirmationText(data),
      html: getContactFormConfirmationHtml(data),
    }
    const customerInfo = await transporter.sendMail(customerMailOptions)

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 },
    )
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { message: 'Failed to send message.' },
      { status: 500 },
    )
  }
}
