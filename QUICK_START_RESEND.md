# ⚡ Quick Start: Contact Form with Resend

Your contact form is ready to use **Resend** - just 5 minutes of setup!

## 🎯 Your Resend API Key

You already have it:
```
re_B8HWTGVw_Hg796QGJzwre3tzfTFwm1tDm
```

## ✅ Quick Setup Steps

### 1. Install Supabase CLI (1 minute)

**macOS:**
```bash
brew install supabase/tap/supabase
```

**Windows:**
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**Or download:** https://github.com/supabase/cli/releases

### 2. Login & Link Project (1 minute)

```bash
# Login to Supabase
supabase login

# In your project directory
cd /Users/natnael/Documents/dev/eden/zoebar-source-dubai

# If you don't have a project yet, create one at https://supabase.com/dashboard
# Then link it:
supabase link --project-ref YOUR_PROJECT_REF
```

### 3. Set Resend API Key (30 seconds)

```bash
supabase secrets set RESEND_API_KEY=re_B8HWTGVw_Hg796QGJzwre3tzfTFwm1tDm
```

### 4. Deploy Function (1 minute)

```bash
supabase functions deploy send-email
```

### 5. Get Supabase Credentials (1 minute)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings → API**
4. Copy these two values:
   - Project URL (looks like: `https://abc123.supabase.co`)
   - anon/public key (starts with `eyJ...`)

### 6. Update .env.local (30 seconds)

Add to your `.env.local`:

```env
# OpenAI for AI Assistant (already there)
VITE_OPENAI_API_KEY=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

# Supabase for Contact Form (add these)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 7. Restart Server (10 seconds)

```bash
# Press Ctrl+C to stop current server
# Then start again
npm run dev -- --port 3333
```

### 8. Test! 🎉

1. Visit: http://localhost:3333/contact
2. Fill form and submit
3. Check: natnaelargaw@gmail.com

## ✨ What You Get

- Professional HTML emails
- 3,000 free emails/month
- Auto-reply feature
- Beautiful design
- Secure & fast

## 📚 Detailed Guide

Need help? See [RESEND_SETUP.md](RESEND_SETUP.md) for:
- Troubleshooting
- Custom domain setup
- Monitoring & logs
- Advanced features

## 🆘 Troubleshooting

**Function deployment fails?**
```bash
# Check logs
supabase functions logs send-email

# Redeploy
supabase functions deploy send-email --no-verify-jwt
```

**Can't find Project Ref?**
- Go to https://supabase.com/dashboard
- Click your project
- Look in the URL: `https://supabase.com/dashboard/project/YOUR_PROJECT_REF`

**Email not sending?**
- Check Resend logs: https://resend.com/logs
- Verify secret is set: `supabase secrets list`

## 🎯 No Supabase? Alternative Options

### Option 1: Test Without Setup (Works Now!)
The form has a fallback - it opens your email client if Supabase isn't configured. Users can still contact you!

### Option 2: Simple Node.js Server
Create a quick Express server - see [RESEND_SETUP.md](RESEND_SETUP.md) for code example.

---

**Total Time:** 5 minutes  
**Cost:** Free (3,000 emails/month)  
**Maintenance:** Zero  

**Questions?** Check [RESEND_SETUP.md](RESEND_SETUP.md) for complete documentation.

