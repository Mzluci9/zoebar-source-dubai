import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend with your API key
const resend = new Resend('re_B8HWTGVw_Hg796QGJzwre3tzfTFwm1tDm');

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    console.log('📧 Sending email from:', name, email);

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Zoebar Contact Form <onboarding@resend.dev>',
      to: ['natnaelargaw@gmail.com'],
      replyTo: email,
      subject: `New Contact from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .email-container {
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #047857 0%, #065f46 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .header p {
              margin: 10px 0 0 0;
              opacity: 0.9;
              font-size: 14px;
            }
            .content {
              padding: 30px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: #f9fafb;
              border-radius: 8px;
              border-left: 4px solid #047857;
            }
            .label {
              font-weight: 600;
              color: #047857;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 8px;
            }
            .value {
              color: #1f2937;
              font-size: 15px;
              word-wrap: break-word;
            }
            .message-box {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #047857;
              margin-top: 10px;
            }
            .message-text {
              white-space: pre-wrap;
              word-wrap: break-word;
              line-height: 1.6;
            }
            .footer {
              background: #047857;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 13px;
            }
            .footer p {
              margin: 5px 0;
            }
            .footer a {
              color: white;
              text-decoration: underline;
            }
            .reply-button {
              display: inline-block;
              background: white;
              color: #047857;
              padding: 10px 20px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 600;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>🔔 New Contact Form Submission</h1>
              <p>Zoebar Business Group Website</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">👤 Name</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #047857;">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">📱 Phone Number</div>
                <div class="value">${phone || 'Not provided'}</div>
              </div>
              
              <div class="message-box">
                <div class="label">💬 Message</div>
                <div class="value message-text">${message}</div>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>Click reply to respond directly to ${name}</strong></p>
              <a href="mailto:${email}" class="reply-button">Reply to ${name}</a>
              <p style="margin-top: 15px; opacity: 0.8;">Sent from Zoebar Contact Form</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Email sent successfully!', data);

    res.json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data.id 
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to send email'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Email Server Running!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Listening on: http://localhost:${PORT}`);
  console.log(`✅ Resend API: Connected`);
  console.log(`📬 Sending emails to: natnaelargaw@gmail.com`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('Ready to receive contact form submissions! 🎉');
  console.log('');
});

