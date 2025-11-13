# Twilio Setup Guide for Supabase Phone Authentication

## 🔐 Your Twilio Credentials

**⚠️ IMPORTANT: Your credentials are stored securely in:**
```
TWILIO_CREDENTIALS_PRIVATE.txt (local file, not committed to Git)
```

**This file contains:**
- Twilio Account SID
- Twilio Auth Token
- Twilio Verify Service SID
- Your test phone number

**🔒 Security:** This file is in `.gitignore` and will never be committed to Git.

---

## 📱 Step-by-Step Configuration

### Step 1: Get Your Credentials

1. **Open the private credentials file:**
   ```
   TWILIO_CREDENTIALS_PRIVATE.txt
   ```

2. **You'll find:**
   - Account SID (starts with `AC...`)
   - Auth Token (32 characters)
   - Verify Service SID (starts with `VA...`)
   - Test phone number (with country code)

### Step 2: Configure Twilio in Supabase Dashboard

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `divaa-ecommerce`

2. **Navigate to Authentication Settings**
   - Click on **Authentication** (left sidebar)
   - Click on **Providers** tab
   - Scroll down to find **Phone** provider

3. **Enable Phone Authentication**
   - Toggle **Phone** to **ON**
   - Select **SMS Provider**: **Twilio Verify**

4. **Enter Twilio Credentials**
   - Copy from `TWILIO_CREDENTIALS_PRIVATE.txt`
   - Paste into Supabase fields:
     - Twilio Account SID
     - Twilio Auth Token
     - Twilio Verify Service SID

5. **Configure OTP Settings**
   - **OTP Expiration Time**: 600 seconds (10 minutes)
   - **OTP Length**: 6 digits
   - Click **Save**

### Step 3: Configure Rate Limiting (Recommended)

1. In the same **Phone** provider settings
2. Set **Rate Limiting**:
   - **Max attempts per hour**: 5
   - **Max SMS per day per number**: 10
3. This prevents abuse and saves costs

### Step 4: Test Phone Authentication

#### Test with your phone number from the credentials file

**Testing Steps:**

1. **Open your app**: http://localhost:5173
2. **Navigate to Login/Signup page**
3. **Click "Continue with Phone"**
4. **Select Country**: India (+91)
5. **Enter your test phone number** (from credentials file)
6. **Click "Send OTP"**
7. **Check your phone** for SMS with 6-digit code
8. **Enter the code** in the app
9. **Verify** - You should be logged in!

---

## 🔍 Verification Checklist

Before going live, verify:

- [ ] Credentials from `TWILIO_CREDENTIALS_PRIVATE.txt` entered in Supabase
- [ ] Phone provider is enabled in Supabase
- [ ] Test SMS received successfully
- [ ] OTP verification works
- [ ] Rate limiting is configured
- [ ] Database migration completed (phone fields added)
- [ ] Manual code updates applied (useAuth.ts, StyledAuthForm.tsx)

---

## 🚨 Troubleshooting

### SMS Not Received?

1. **Check Twilio Console**: https://console.twilio.com
   - Go to **Monitor** → **Logs** → **Verify**
   - Check if SMS was attempted

2. **Verify Phone Number Format**
   - Must be E.164 format: `+[country code][number]`
   - Example: `+919011068966`
   - Include country code with +

3. **Check Twilio Account Status**
   - Make sure account is active
   - Check account balance (if using paid account)
   - Verify Service SID is correct

4. **Supabase Logs**
   - Go to Supabase Dashboard → **Logs**
   - Check for authentication errors

### OTP Verification Failed?

1. **Check OTP Expiration**
   - OTPs expire after 10 minutes
   - Request a new OTP if expired

2. **Verify Service SID**
   - Make sure you're using Verify Service SID, not Messaging Service SID
   - Format: `VA...` (not `MG...`)

3. **Check Console Logs**
   - Open browser DevTools → Console
   - Look for error messages

### "Invalid credentials" Error?

1. **Double-check credentials** in `TWILIO_CREDENTIALS_PRIVATE.txt`
   - Account SID starts with `AC`
   - Auth Token (32 characters)
   - Verify Service SID starts with `VA`

2. **Try re-entering credentials** in Supabase
3. **Save and wait** 1-2 minutes for changes to propagate

---

## 💰 Twilio Pricing

**Verify API Pricing (India):**
- SMS: ₹0.58 per message (~$0.0070 USD)
- Verification success rate: ~98%

**Cost Estimation:**
- 100 verifications/day = ₹58/day = ₹1,740/month
- 500 verifications/day = ₹290/day = ₹8,700/month
- 1000 verifications/day = ₹580/day = ₹17,400/month

**Tips to reduce costs:**
1. Implement rate limiting (already done)
2. Use OTP expiration (10 minutes)
3. Limit resend attempts (30s cooldown)
4. Monitor failed attempts in Twilio Console

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep `TWILIO_CREDENTIALS_PRIVATE.txt` local only
- Store credentials in Supabase Dashboard
- Use environment variables for any backend services
- Enable rate limiting
- Monitor suspicious activity in Twilio Console
- Rotate auth tokens periodically

### ❌ DON'T:
- Commit credentials to Git
- Share credentials publicly
- Hardcode credentials in code
- Disable rate limiting
- Use the same credentials across multiple projects

---

## 📊 Monitoring & Analytics

### Twilio Console
- Monitor SMS delivery rates
- Track costs
- View error logs
- Check verification success rates

### Supabase Dashboard
- Monitor authentication events
- Track user signups via phone
- View rate limiting blocks
- Check database for phone numbers

---

## 🎯 Next Steps

1. ✅ **Get Credentials** - Open `TWILIO_CREDENTIALS_PRIVATE.txt`
2. ✅ **Configure Twilio** in Supabase Dashboard
3. ✅ **Run Database Migration** (add phone fields to profiles table)
4. ✅ **Apply Manual Updates** (useAuth.ts, StyledAuthForm.tsx)
5. ✅ **Test Phone Auth** with your test number
6. ✅ **Monitor** first few authentications in Twilio Console
7. ✅ **Go Live** once everything works!

---

## 📞 Support

**Twilio Support:**
- Console: https://console.twilio.com
- Documentation: https://www.twilio.com/docs/verify
- Support: support@twilio.com

**Supabase Support:**
- Dashboard: https://supabase.com/dashboard
- Documentation: https://supabase.com/docs/guides/auth/phone-login
- Discord: https://discord.supabase.com

---

## ⚠️ SECURITY REMINDER

**Your Twilio credentials are in:**
- `TWILIO_CREDENTIALS_PRIVATE.txt` (local, gitignored)

**Never:**
- Commit this file to Git
- Share it publicly
- Email it unencrypted
- Post it in forums/chat

**For production:**
- Consider separate Twilio account for prod vs dev
- Different Verify Service for staging/production
- Regular credential rotation
- IP allowlisting in Twilio (if possible)

---

**Ready to configure? Follow Step 1 above!** 🚀
