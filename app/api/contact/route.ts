import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { ContactAPIResponse } from '@/lib/types'

// TODO: Add rate limiting before production (e.g. upstash/ratelimit)

export async function POST(req: NextRequest): Promise<NextResponse<ContactAPIResponse>> {
  try {
    const body = await req.json()
    const { name, email, message } = body

    // ---- Server-side validation (never trust client data) ----
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Invalid name.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (!message || typeof message !== 'string' || message.trim().length < 20) {
      return NextResponse.json({ error: 'Message too short.' }, { status: 400 })
    }

    if (message.trim().length > 2000) {
      return NextResponse.json({ error: 'Message too long.' }, { status: 400 })
    }

    // ---- Nodemailer ----
    // Credentials come from .env.local — NEVER hardcode here
    // EMAIL_USER = your Gmail address
    // EMAIL_PASS = your Gmail App Password (not account password)
    // RECIPIENT_EMAIL = where to receive the enquiry
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"${name.trim()}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      replyTo: email.trim(),
      subject: `New Legal Inquiry from ${name.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #C9A84C; border-bottom: 2px solid #C9A84C; padding-bottom: 10px;">New Legal Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #555; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px 0; color: #222;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #555; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; color: #222;"><a href="mailto:${email.trim()}">${email.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #555; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; color: #222; line-height: 1.7;">${message.trim().replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #999; font-size: 12px;">Sent via website contact form.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] Error:', err)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}
