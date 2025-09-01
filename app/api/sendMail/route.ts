import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    console.log('=== CONTACT FORM SUBMISSION START ===')
    console.log('Environment variables check:')
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET')
    console.log('SMTP_PORT:', process.env.SMTP_PORT || 'NOT SET')
    console.log('SMTP_USER:', process.env.SMTP_USER || 'NOT SET')
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'SET (hidden)' : 'NOT SET')
    console.log('')
    
    const body = await request.json()
    const { name, email, phone, company, subject, budget, propertyType, message } = body
    console.log('Form data received:', { name, email, phone, subject, budget, propertyType, messageLength: message?.length })

    // Validate required fields
    if (!name || !email || !phone || !message) {
      console.log('❌ Validation failed - missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if SMTP configuration is available
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP configuration missing. Please set SMTP_USER and SMTP_PASS environment variables.')
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Create transporter
    console.log('Creating SMTP transporter...')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    console.log('SMTP transporter created successfully')

    // Verify transporter configuration
    try {
      console.log('Verifying SMTP connection...')
      await transporter.verify()
      console.log('SMTP transporter verified successfully')
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return NextResponse.json(
        { 
          error: 'Email service configuration error. Please contact support.',
          details: {
            message: verifyError instanceof Error ? verifyError.message : 'Unknown verification error',
            code: (verifyError as any).code
          }
        },
        { status: 500 }
      )
    }

    // Get client IP address safely
    const getClientIP = (req: NextRequest): string => {
      try {
        const forwarded = req.headers.get('x-forwarded-for')
        const realIP = req.headers.get('x-real-ip')
        const cfConnectingIP = req.headers.get('cf-connecting-ip')
        
        if (forwarded) {
          return forwarded.split(',')[0].trim()
        }
        if (realIP) {
          return realIP
        }
        if (cfConnectingIP) {
          return cfConnectingIP
        }
        return 'Unknown'
      } catch {
        return 'Unknown'
      }
    }

    const clientIP = getClientIP(request)

        // Create the shared HTML email content
    const emailHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject && subject.includes('Partner Request') ? 'New Hemkey Partner Request' : 'New Contact Form Submission'}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px 25px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="display: inline-block; background-color: #D4AF37; padding: 8px 16px; border-radius: 20px; margin-bottom: 15px;">
              <span style="font-size: 24px;">${subject && subject.includes('Partner Request') ? '🤝' : '📧'}</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 0.5px; border-bottom: 3px solid #D4AF37; padding-bottom: 10px; display: inline-block;">
              ${subject && subject.includes('Partner Request') ? 'New Hemkey Partner Request' : 'New Contact Form Submission'}
            </h1>
            <p style="color: #D4AF37; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">
              ${subject && subject.includes('Partner Request') ? 'Partnership Opportunity Received' : 'Your Query Has Been Received'}
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 30px 25px;">
            
            <!-- Contact Information Section -->
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #D4AF37; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; display: flex; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
                <span style="margin-right: 10px; font-size: 24px;">👤</span>
                Contact Information
              </h2>
              
              <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                <div style="display: flex; align-items: center; padding: 12px 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e9ecef; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                  <span style="font-size: 18px; margin-right: 12px; color: #D4AF37;">👤</span>
                  <div>
                    <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Full Name</div>
                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 600;">${name}</div>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; padding: 12px 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e9ecef; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                  <span style="font-size: 18px; margin-right: 12px; color: #D4AF37;">📧</span>
                  <div>
                    <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Email Address</div>
                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 600;">${email}</div>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; padding: 12px 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e9ecef; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                  <span style="font-size: 18px; margin-right: 12px; color: #D4AF37;">📞</span>
                  <div>
                    <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Phone Number</div>
                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 600;">${phone}</div>
                  </div>
                </div>
                
                ${company ? `
                <div style="display: flex; align-items: center; padding: 12px 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e9ecef; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                  <span style="font-size: 18px; margin-right: 12px; color: #D4AF37;">🏢</span>
                  <div>
                    <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Company</div>
                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 600;">${company}</div>
                  </div>
                </div>
                ` : ''}
              </div>
            </div>

            <!-- Query/Partnership Details Section -->
            <div style="background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%); border-radius: 12px; padding: 25px; margin-bottom: 25px; border: 2px solid #D4AF37; position: relative; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
              <div style="position: absolute; top: -10px; left: 20px; background-color: #D4AF37; color: #1a1a1a; padding: 5px 15px; border-radius: 15px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                ${subject && subject.includes('Partner Request') ? 'Partnership Details' : 'Query Details'}
              </div>
              
              <h2 style="color: #1a1a1a; margin: 20px 0 20px 0; font-size: 20px; font-weight: 600; display: flex; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
                <span style="margin-right: 10px; font-size: 24px;">${subject && subject.includes('Partner Request') ? '💼' : '📋'}</span>
                ${subject && subject.includes('Partner Request') ? 'Request Information' : 'Query Information'}
              </h2>
              
              ${subject && !subject.includes('Partner Request') ? `
              <div style="display: flex; align-items: center; padding: 12px 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #D4AF37; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <span style="font-size: 18px; margin-right: 12px; color: #D4AF37;">📋</span>
                <div>
                  <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Subject</div>
                  <div style="font-size: 16px; color: #1a1a1a; font-weight: 600;">${subject}</div>
                </div>
              </div>
              ` : ''}
              
              ${budget ? `
              <div style="display: flex; align-items: center; padding: 12px 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #D4AF37; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <span style="font-size: 18px; margin-right: 12px; color: #D4AF37;">💰</span>
                <div>
                  <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Budget</div>
                  <div style="font-size: 16px; color: #1a1a1a; font-weight: 600;">${budget}</div>
                </div>
              </div>
              ` : ''}
              
              ${propertyType ? `
              <div style="display: flex; align-items: center; padding: 12px 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #D4AF37; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <span style="font-size: 18px; margin-right: 12px; color: #D4AF37;">🏠</span>
                <div>
                  <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Property Type</div>
                  <div style="font-size: 16px; color: #1a1a1a; font-weight: 600;">${propertyType}</div>
                </div>
              </div>
              ` : ''}
              
              <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; border: 2px solid #D4AF37; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <span style="font-size: 18px; margin-right: 12px; color: #D4AF37;">📝</span>
                  <div style="font-size: 14px; color: #6c757d; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Message</div>
                </div>
                <div style="color: #1a1a1a; font-size: 15px; line-height: 1.6; background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%); padding: 15px; border-radius: 6px; border-left: 4px solid #D4AF37;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>

            <!-- Submission Info -->
            <div style="background-color: #e8f4fd; border-radius: 8px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #007bff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 18px; margin-right: 10px; color: #007bff;">📊</span>
                <h3 style="color: #007bff; margin: 0; font-size: 16px; font-weight: 600; border-bottom: 2px solid #007bff; padding-bottom: 5px;">Submission Details</h3>
              </div>
              <div style="color: #495057; font-size: 14px;">
                <div style="margin-bottom: 8px; display: flex; align-items: center;">
                  <span style="font-size: 16px; margin-right: 8px; color: #007bff;">⏱</span>
                  <strong>Submission Time:</strong> ${new Date().toLocaleString()}
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-size: 16px; margin-right: 8px; color: #007bff;">🌍</span>
                  <strong>IP Address:</strong> ${clientIP}
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px 25px; text-align: center; border-radius: 0 0 8px 8px;">
            <div style="margin-bottom: 20px;">
              <span style="font-size: 32px; color: #D4AF37;">🙏</span>
            </div>
            <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
              Thank You for Connecting with Hemkey
            </h3>
            <p style="color: #D4AF37; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${subject && subject.includes('Partner Request') 
                ? 'Our team will review your partnership request and get back to you shortly.' 
                : 'This query was submitted via the Hemkey website. Our team will reach out to you shortly.'}
            </p>
            <div style="border-top: 1px solid #D4AF37; padding-top: 20px;">
              <p style="color: #6c757d; margin: 0; font-size: 12px;">
                This email was sent from the HEMKEY website ${subject && subject.includes('Partner Request') ? 'partner form' : 'contact form'}.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Create the shared plain text content
    const emailTextContent = `
${subject && subject.includes('Partner Request') ? 'New Hemkey Partner Request' : 'New Contact Form Submission'}

Contact Information:
- Full Name: ${name}
- Email Address: ${email}
- Phone Number: ${phone}
${company ? `- Company: ${company}` : ''}

${subject && subject.includes('Partner Request') ? 'Partnership Details:' : 'Query Details:'}
${subject && !subject.includes('Partner Request') ? `- Subject: ${subject}` : ''}
${budget ? `- Budget: ${budget}` : ''}
${propertyType ? `- Property Type: ${propertyType}` : ''}
- Message: ${message}

Submission Time: ${new Date().toLocaleString()}
IP Address: ${clientIP}

---
This email was sent from the HEMKEY website ${subject && subject.includes('Partner Request') ? 'partner form' : 'contact form'}.
    `

    // Email options for business (Hemkey)
    const mailOptionsBusiness = {
      from: process.env.SMTP_USER,
      to: 'business@hemkey.com',
      subject: subject || `New Contact Form Submission: ${name}`,
      html: emailHtmlContent,
      text: emailTextContent,
    }

    // Email options for user (form submitter)
    const mailOptionsUser = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Thank you for contacting Hemkey",
      html: emailHtmlContent,
      text: emailTextContent,
    }

    // Send detailed email to Hemkey (business@hemkey.com)
    await transporter.sendMail(mailOptionsBusiness)

    // Send the same formatted email to the user
    let userEmailSent = false
    let userEmailError = null

    try {
      await transporter.sendMail(mailOptionsUser)
      userEmailSent = true
    } catch (error) {
      console.error('Error sending user confirmation email:', error)
      userEmailError = error instanceof Error ? error.message : 'Unknown error occurred'
    }

    // Return success response
    const responseMessage = subject && subject.includes('Partner Request') 
      ? 'Partner request sent successfully' 
      : 'Query submitted successfully'

    return NextResponse.json(
      { 
        success: true, 
        message: responseMessage,
        userEmailSent,
        userEmailError: userEmailError ? `User confirmation email failed: ${userEmailError}` : null
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    
    // Provide more detailed error information for debugging
    let errorMessage = 'Failed to send email. Please try again later.'
    let errorDetails = null
    
    if (error instanceof Error) {
      errorDetails = {
        message: error.message,
        code: (error as any).code,
        stack: error.stack
      }
      
      // Handle specific SMTP errors
      if ((error as any).code === 'EAUTH') {
        errorMessage = 'Email authentication failed. Please check SMTP credentials.'
      } else if ((error as any).code === 'ECONNECTION') {
        errorMessage = 'Email connection failed. Please check SMTP settings.'
      } else if ((error as any).code === 'ETIMEDOUT') {
        errorMessage = 'Email connection timed out. Please try again.'
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
