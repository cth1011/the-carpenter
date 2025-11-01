import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import {
  getCustomerConfirmationHtml,
  getCustomerConfirmationText,
  getInternalQuotationHtml,
  getInternalQuotationText,
} from '@/lib/email-templates'

export async function POST(request: Request) {
  try {
    const { items, customerInfo } = await request.json()

    if (!items || items.length === 0 || !customerInfo) {
      return NextResponse.json(
        { message: 'Missing items or customer info' },
        { status: 400 },
      )
    }

    let transporter

    // If a host is provided in env, use it.
    if (process.env.EMAIL_SERVER_HOST) {
      const requiredEnvVars = [
        'EMAIL_SERVER_HOST',
        'EMAIL_SERVER_PORT',
        'EMAIL_SERVER_USER',
        'EMAIL_SERVER_PASSWORD',
        'EMAIL_FROM',
        'EMAIL_TO',
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
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT) || 587,
        secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      })
    } else if (process.env.NODE_ENV === 'development') {
      // Otherwise, in dev, fallback to a generated Ethereal account
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

    // 2. Format email content using templates
    const emailHtml = getInternalQuotationHtml(customerInfo, items)
    const emailText = getInternalQuotationText(customerInfo, items)

    // 3. Define mail options
    const mailOptions = {
      from: `"The Carpenter Website" <${
        process.env.EMAIL_FROM || 'noreply@thecarpenter.com'
      }>`,
      to: process.env.EMAIL_TO || customerInfo.email,
      subject: `New Quotation Request from ${customerInfo.name}`,
      text: emailText,
      html: emailHtml,
    }

    // 4. Send the internal notification email
    const internalInfo = await transporter.sendMail(mailOptions)

    if (process.env.NODE_ENV === 'development') {
      console.log('Internal email sent: %s', internalInfo.messageId)
      console.log(
        'Internal email preview URL: %s',
        nodemailer.getTestMessageUrl(internalInfo),
      )
    }

    // 5. Send the confirmation email to the customer
    const customerEmailHtml = getCustomerConfirmationHtml(customerInfo, items)
    const customerEmailText = getCustomerConfirmationText(customerInfo, items)

    const customerMailOptions = {
      from: `"The Carpenter" <${process.env.EMAIL_FROM}>`,
      to: customerInfo.email,
      subject: 'We have received your quotation request',
      text: customerEmailText,
      html: customerEmailHtml,
    }

    const customerInfoEmail = await transporter.sendMail(customerMailOptions)

    if (process.env.NODE_ENV === 'development') {
      console.log('Customer email sent: %s', customerInfoEmail.messageId)
      console.log(
        'Customer email preview URL: %s',
        nodemailer.getTestMessageUrl(customerInfoEmail),
      )
    }

    return NextResponse.json(
      { message: 'Quotation request sent successfully!' },
      { status: 200 },
    )
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { message: 'Failed to send quotation request.' },
      { status: 500 },
    )
  }
}
