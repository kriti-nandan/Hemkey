const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testSMTP() {
  console.log('Testing SMTP Configuration...\n');
  
  // Check environment variables
  console.log('Environment Variables:');
  console.log('SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || 'NOT SET');
  console.log('SMTP_USER:', process.env.SMTP_USER || 'NOT SET');
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'SET (hidden)' : 'NOT SET');
  console.log('');

  // Validate required variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Missing required environment variables!');
    console.error('Please check your .env.local file.');
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true, // Enable debug output
    logger: true, // Log to console
  });

  try {
    console.log('🔍 Verifying SMTP connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Test sending a simple email
    console.log('📧 Testing email send...');
    
    const testEmail = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: 'SMTP Test - HEMKEY Website',
      text: 'This is a test email to verify SMTP configuration.',
      html: `
        <h2>SMTP Test Successful!</h2>
        <p>Your email configuration is working correctly.</p>
        <p><strong>Host:</strong> ${process.env.SMTP_HOST}</p>
        <p><strong>Port:</strong> ${process.env.SMTP_PORT}</p>
        <p><strong>User:</strong> ${process.env.SMTP_USER}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `
    };

    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('❌ SMTP Test Failed:');
    console.error('Error:', error.message);
    
    // Common error solutions
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication Error Solutions:');
      console.log('1. Check your email and password');
      console.log('2. For Outlook: Enable "Less secure app access"');
      console.log('3. For Gmail: Use App Password if 2FA is enabled');
      console.log('4. Verify your email service allows SMTP access');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n🔧 Connection Error Solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify SMTP_HOST and SMTP_PORT');
      console.log('3. Check firewall settings');
      console.log('4. Try different port (465 with secure: true)');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n🔧 Timeout Error Solutions:');
      console.log('1. Check network connectivity');
      console.log('2. Try different SMTP server');
      console.log('3. Check email service status');
    }
  }
}

// Run the test
testSMTP().catch(console.error);
