import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message } = await req.json();

    // Initialize Resend with API key from environment
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Send email using Resend
    const data = await resend.emails.send({
      from: "Zoebar Contact Form <onboarding@resend.dev>",
      to: ["natnaelargaw@gmail.com"],
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
            }
            .header {
              background: linear-gradient(135deg, #047857 0%, #065f46 100%);
              color: white;
              padding: 30px;
              border-radius: 12px 12px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border: 1px solid #e5e7eb;
              border-top: none;
            }
            .field {
              margin-bottom: 20px;
              background: white;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #047857;
            }
            .label {
              font-weight: 600;
              color: #047857;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 8px;
            }
            .value {
              color: #1f2937;
              font-size: 16px;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #047857;
              margin-top: 20px;
            }
            .footer {
              background: #047857;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 0 0 12px 12px;
              font-size: 14px;
            }
            .footer a {
              color: white;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔔 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Zoebar Business Group</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 Name</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">📱 Phone</div>
              <div class="value">${phone || "Not provided"}</div>
            </div>
            
            <div class="message-box">
              <div class="label">💬 Message</div>
              <div class="value" style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">
              <strong>Reply directly to this email</strong> to respond to ${name}
            </p>
            <p style="margin: 0; opacity: 0.8;">
              Sent from <a href="http://localhost:3333/contact">Zoebar Contact Form</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

