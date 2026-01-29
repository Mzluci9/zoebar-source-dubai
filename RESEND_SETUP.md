# Resend Email Setup Guide - Contact Form

Complete setup guide for using **Resend** with your contact form. Resend is a modern, developer-friendly email API.

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Resend API Key (1 minute)

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (no credit card required)
3. Verify your email
4. Go to **API Keys** in the dashboard
5. Click **"Create API Key"**
6. Name it "Zoebar Contact Form"
7. **Copy your API key** (starts with `re_`)
   - Example: `re_B8HWTGVw_Hg796QGJzwre3tzfTFwm1tDm`

### Step 2: Install Supabase CLI (if not installed)

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows (with Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

Or download from: https://github.com/supabase/cli/releases

### Step 3: Login to Supabase

```bash
supabase login
```

### Step 4: Link Your Project

```bash
# In your project directory
cd /Users/natnael/Documents/dev/eden/zoebar-source-dubai

# Link to your Supabase project
supabase link --project-ref your-project-ref
```

**Don't have a Supabase project?**
```bash
# Initialize a new one
supabase init

# Or create one at https://supabase.com/dashboard
```

### Step 5: Set Resend API Key Secret

```bash
# Set the secret in Supabase
supabase secrets set RESEND_API_KEY=re_B8HWTGVw_Hg796QGJzwre3tzfTFwm1tDm
```

Replace with your actual Resend API key!

### Step 6: Deploy the Edge Function

```bash
# Deploy the send-email function
supabase functions deploy send-email
```

### Step 7: Test Locally (Optional)

```bash
# Start Supabase locally
supabase start

# Serve the function locally
supabase functions serve send-email --env-file ./supabase/.env.local

# Test with curl
curl -i --location --request POST 'http://localhost:54321/functions/v1/send-email' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Test User","email":"test@example.com","phone":"123456789","message":"This is a test message"}'
```

### Step 8: Get Supabase Environment Variables

Add these to your `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Find these values:**
- Supabase Dashboard → Settings → API
- Copy the Project URL and anon/public key

### Step 9: Restart Your Dev Server

```bash
# Stop the server (Ctrl+C)
# Restart
npm run dev -- --port 3333
```

### Step 10: Test! 🎉

1. Go to http://localhost:3333/contact
2. Fill out the form
3. Click "Send Message"
4. Check **natnaelargaw@gmail.com**

## ✅ What You Get

- ✅ **Professional emails** with beautiful HTML formatting
- ✅ **Free tier:** 100 emails/day, 3,000 emails/month
- ✅ **Reply-to** automatically set to sender's email
- ✅ **Fast delivery** - typically under 1 second
- ✅ **Reliable** - 99.9% uptime SLA
- ✅ **Secure** - API key kept secret on server
- ✅ **Scalable** - Serverless Edge Function

## 📧 Email Features

Your emails will include:
- Professional HTML design with your brand colors (Emerald green)
- Sender's name, email, phone, and message
- Click-to-reply functionality
- Mobile-responsive design
- Clean, modern layout

## 🆓 Resend Free Tier

- **3,000 emails per month**
- **100 emails per day**
- All features included
- No credit card required
- Perfect for contact forms

Upgrade anytime:
- $20/month = 50,000 emails
- Custom plans available

## 🔒 Security

- ✅ API key stored securely in Supabase (not in code)
- ✅ Serverless function (no server to maintain)
- ✅ CORS protection
- ✅ Rate limiting built-in
- ✅ Input validation

## 🐛 Troubleshooting

### "Supabase configuration missing" Error

**Solution:**
1. Make sure `.env.local` has both:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
2. Restart the dev server

### Function Deployment Failed

**Solution:**
```bash
# Check function logs
supabase functions logs send-email

# Redeploy
supabase functions deploy send-email --no-verify-jwt
```

### Emails Not Arriving

1. **Check Resend Dashboard:**
   - Go to https://resend.com/logs
   - See delivery status

2. **Check Spam Folder**

3. **Verify API Key:**
   ```bash
   # Check if secret is set
   supabase secrets list
   ```

4. **Check Function Logs:**
   ```bash
   supabase functions logs send-email
   ```

### "onboarding@resend.dev" Domain Limitation

The free Resend account uses `onboarding@resend.dev` as the from address.

**To use your own domain:**
1. Go to Resend Dashboard → Domains
2. Click "Add Domain"
3. Add your domain (e.g., zoebar.com)
4. Add DNS records (MX, TXT, CNAME)
5. Verify domain
6. Update function code:
   ```typescript
   from: "contact@zoebar.com" // Your verified domain
   ```

## 🌐 Alternative: No Supabase Setup

If you don't want to use Supabase, you can:

### Option 1: Use EmailJS (Frontend only)
See [GOOGLE_WORKSPACE_SETUP.md](GOOGLE_WORKSPACE_SETUP.md)

### Option 2: Simple Node.js Backend

Create `server.js`:
```javascript
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend('re_B8HWTGVw_Hg796QGJzwre3tzfTFwm1tDm');

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'natnaelargaw@gmail.com',
      replyTo: email,
      subject: `New Contact from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Message:</strong> ${message}</p>`
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

Then update Contact.tsx to use `http://localhost:3001/api/send-email`

## 📊 Monitoring

**Resend Dashboard Features:**
- Email delivery logs
- Open/click tracking (if enabled)
- Bounce handling
- API usage metrics
- Webhook events

**Supabase Dashboard:**
- Function invocations
- Function logs
- Error tracking
- Performance metrics

## 💰 Cost Comparison

| Service | Free Tier | Paid |
|---------|-----------|------|
| Resend | 3,000/month | $20/mo = 50k |
| SendGrid | 100/day | $20/mo = 50k |
| Mailgun | 5,000/month | $35/mo = 50k |
| AWS SES | 3,000/month | $0.10/1k |

Resend offers the best free tier and developer experience!

## 📚 Resources

- **Resend Docs:** https://resend.com/docs
- **Supabase Edge Functions:** https://supabase.com/docs/guides/functions
- **Example Emails:** https://resend.com/docs/send-with-nodejs

---

**Setup Time:** 5 minutes
**Maintenance:** Zero
**Reliability:** 99.9% uptime

**Last Updated:** October 2025

