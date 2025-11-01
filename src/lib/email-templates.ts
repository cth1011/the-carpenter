import { QuotationItem } from '@/store/quotation'

type CustomerInfo = {
  name: string
  email: string
  phone?: string
  address?: string
  message?: string
}

const createHtmlTable = (items: QuotationItem[]) => {
  const tableRows = items
    .map(item => {
      const { width, height, thickness } = item.selectedDimensions
      const dimensionsText =
        !width && !height && !thickness
          ? 'N/A'
          : `W: ${width || 'N/A'}″, H: ${height || 'N/A'}″, T: ${
              thickness || 'N/A'
            }mm`

      return `
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${item.product.name}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">
        ${dimensionsText}
      </td>
    </tr>
  `
    })
    .join('')

  return `
    <table style="width: 100%; border-collapse: collapse; font-family: sans-serif;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f2f2f2;">Product</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: center; background-color: #f2f2f2;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f2f2f2;">Dimensions</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `
}

const formatDimensionsText = (dimensions: QuotationItem['selectedDimensions']) => {
  const { width, height, thickness } = dimensions
  if (!width && !height && !thickness) {
    return 'N/A'
  }
  return `W: ${width || 'N/A'}″, H: ${height || 'N/A'}″, T: ${
    thickness || 'N/A'
  }mm`
}

export const getInternalQuotationHtml =
  (customerInfo: CustomerInfo,
   items: QuotationItem[],
  ) => {
  return `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>New Quotation Request</h2>
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${customerInfo.name}</li>
          <li><strong>Email:</strong> ${customerInfo.email}</li>
          <li><strong>Phone:</strong> ${customerInfo.phone || 'Not provided'}</li>
          <li><strong>Address:</strong> ${customerInfo.address || 'Not provided'}</li>
        </ul>
        <h3>Message:</h3>
        <p>${customerInfo.message || 'No message provided.'}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <h3>Requested Items:</h3>
        ${createHtmlTable(items)}
      </div>
    `
}

export const getInternalQuotationText =
  (customerInfo: CustomerInfo,
   items: QuotationItem[],
  ) => {
  return `
      New Quotation Request

      Customer Information:

      - Name: ${customerInfo.name}

      - Email: ${customerInfo.email}

      - Phone: ${customerInfo.phone || 'Not provided'}

      - Address: ${customerInfo.address || 'Not provided'}

      Message:

      ${customerInfo.message || 'No message provided.'}


      Requested Items:

      ${items
        .map(
          item =>
            `- ${item.quantity}x ${item.product.name} (${formatDimensionsText(
              item.selectedDimensions,
            )})`,
        )
        .join('\n')}
    `
}

export const getCustomerConfirmationHtml =
  (customerInfo: CustomerInfo,
   items: QuotationItem[],
  ) => {
  return `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>Thank you for your quotation request!</h2>
        <p>Hi ${customerInfo.name},</p>
        <p>We've received your request and will get back to you within 1-2 business days. Below is a summary of the items you requested.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <h3>Your Requested Items:</h3>
        ${createHtmlTable(items)}
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p>If you have any questions, please reply to this email.</p>
        <p>Regards,<br>The Carpenter Team</p>
      </div>
    `
}

export const getCustomerConfirmationText = (
  customerInfo: CustomerInfo,
  items: QuotationItem[],
) => {
  return `
      Hi ${customerInfo.name},

      Thank you for your quotation request. We\'ve received it and will get back to you within 1-2 business days. Below is a summary of the items you requested.

      Requested Items:

      ${items
        .map(
          item =>
            `- ${item.quantity}x ${item.product.name} (${formatDimensionsText(
              item.selectedDimensions,
            )})`,
        )
        .join('\n')}

      If you have any questions, please reply to this email.

      Regards,
      The Carpenter Team
    `
}

// ----------------------------------------------------------------
// Contact Form Templates
// ----------------------------------------------------------------

type ContactFormData = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export const getContactFormInternalHtml = (data: ContactFormData) => {
  return `
    <div style="font-family: sans-serif; line-height: 1.6;">
      <h2>New Contact Form Submission</h2>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <h3>Sender Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
      </ul>
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${data.message}</p>
    </div>
  `
}

export const getContactFormInternalText = (data: ContactFormData) => {
  return `
    New Contact Form Submission
    Subject: ${data.subject}
    -----------------------------------

    Sender Information:
    - Name: ${data.name}
    - Email: ${data.email}
    - Phone: ${data.phone || 'Not provided'}

    Message:
    ${data.message}
  `
}

export const getContactFormConfirmationHtml = (data: ContactFormData) => {
  return `
    <div style="font-family: sans-serif; line-height: 1.6;">
      <h2>We\'ve received your message</h2>
      <p>Hi ${data.name},</p>
      <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
      <p>For your records, here is a copy of your message:</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <div style="background-color: #f9f9f9; border: 1px solid #eee; padding: 15px; border-radius: 5px;">
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p>Regards,<br>The Carpenter Team</p>
    </div>
  `
}

export const getContactFormConfirmationText = (data: ContactFormData) => {
  return `
    Hi ${data.name},

    Thank you for contacting us. We have received your message and will get back to you as soon as possible.

    For your records, here is a copy of your message:
    -----------------------------------
    Subject: ${data.subject}

    ${data.message}
    -----------------------------------

    Regards,
    The Carpenter Team
  `
}

