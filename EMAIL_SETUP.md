# Email Setup Guide for HEMKEY Contact Form

This guide explains how to set up the email functionality for the contact form on your HEMKEY website.

## Prerequisites

- Node.js and npm installed
- Access to an email service (Gmail, Outlook, Yahoo, or custom SMTP server)

## Installation

The required packages have already been installed:
- `nodemailer` - For sending emails
- `@types/nodemailer` - TypeScript types

## Configuration

### 1. Create Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 2. Email Service Setup

#### Option A: Gmail (Recommended for testing)

1. **Enable 2-Step Verification:**
   - Go to your Google Account settings
   - Navigate to Security
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password:**
   - Go to Security > App passwords
   - Select "Mail" as the app
   - Generate a new password
   - Use this password in `SMTP_PASS`

3. **Configuration:**
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=your-16-digit-app-password
   ```

#### Option B: Outlook/Hotmail

```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### Option C: Yahoo

```bash
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

#### Option D: Custom SMTP Server

```bash
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Testing

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Test the Contact Form

1. Navigate to `/contact` page
2. Fill out the form with test data
3. Submit the form
4. Check your email at `business@hemkey.com`

### 3. Check Console Logs

Monitor the terminal for any error messages during form submission.

## Features

### Form Validation
- **Required Fields:** Name, Email, Phone, Subject, Message
- **Email Format:** Validates email address format
- **Phone Format:** Accepts international phone numbers
- **Message Length:** Minimum 10 characters
- **Real-time Validation:** Shows errors on field blur

### Email Content
The email includes:
- Contact information (Name, Email, Phone)
- Query details (Subject, Budget, Property Type, Message)
- Submission timestamp
- IP address for security
- Professional HTML formatting

### Error Handling
- Form validation errors
- SMTP connection errors
- Network errors
- User-friendly error messages

## Troubleshooting

### Common Issues

1. **"Failed to send email" error:**
   - Check SMTP credentials
   - Verify email service settings
   - Check firewall/network restrictions

2. **Gmail authentication failed:**
   - Ensure 2-Step Verification is enabled
   - Use App Password, not regular password
   - Check if "Less secure app access" is needed

3. **Port blocked:**
   - Try port 465 with `secure: true`
   - Check with your email provider for correct settings

### Debug Mode

To enable debug logging, add this to your `.env.local`:

```bash
DEBUG=nodemailer:*
```

## Security Considerations

1. **Environment Variables:** Never commit `.env.local` to version control
2. **Rate Limiting:** Consider implementing rate limiting for production
3. **Input Validation:** All inputs are validated and sanitized
4. **SMTP Security:** Uses TLS encryption for secure transmission

## Production Deployment

### Environment Variables
Ensure your production environment has the same environment variables set.

### Email Service
Consider using a production email service like:
- SendGrid
- Mailgun
- Amazon SES
- Postmark

### Monitoring
Set up monitoring for:
- Email delivery success rates
- Form submission errors
- SMTP connection issues

## Support

If you encounter issues:
1. Check the console logs
2. Verify environment variables
3. Test SMTP settings with a simple email client
4. Check email service documentation

## Files Modified

- `app/api/sendMail/route.ts` - API endpoint for sending emails
- `app/contact/page.tsx` - Enhanced contact form with validation
- `env.example` - Environment variables template
- `EMAIL_SETUP.md` - This setup guide

