# Twilio OTP Troubleshooting Guide

## Common Error: Invalid From Number

### Error Message
```
Error sending confirmation OTP to provider: Invalid From Number (caller ID): VA5ebc9c43d64252497361670962aa5f3d
More information: https://www.twilio.com/docs/errors/21212
```

### Root Cause
This error occurs when Supabase is configured to use **Twilio Verify** but the Verify Service SID (`VA...`) is being incorrectly interpreted as a phone number.

---

## Quick Fix

### Step 1: Access Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Providers** → **Phone**

### Step 2: Correct Configuration

**For Twilio Verify (Recommended):**

```
✅ Enable Phone Authentication: ON
✅ SMS Provider: Twilio Verify
✅ Twilio Account SID: AC... (your Account SID)
✅ Twilio Auth Token: (your Auth Token)
✅ Twilio Verify Service SID: VA5ebc9c43d64252497361670962aa5f3d
❌ From Number: (LEAVE EMPTY - not needed for Verify)
```

**Important:**
- The SMS Provider dropdown **MUST** be set to **"Twilio Verify"**
- Do NOT use "Twilio Programmable SMS" if you have a Verify Service SID
- The "From Number" field should be empty or not visible when using Twilio Verify

### Step 3: Save & Test
1. Click **Save**
2. Wait 2-3 minutes for changes to propagate
3. Test phone authentication in your app

---

## Understanding the Error

### Two Twilio SMS Methods

| Twilio Verify ✅ | Twilio Programmable SMS ❌ |
|-----------------|---------------------------|
| Uses Verify Service SID (`VA...`) | Uses a phone number (`+1234567890`) |
| No "From Number" needed | Requires "From Number" |
| Built-in OTP management | Manual OTP handling |
| Better for auth flows | Better for general SMS |

### Why the Error Happens
When you select "Twilio Programmable SMS" by mistake, Supabase expects a phone number in the "From Number" field. If you paste your Verify Service SID there instead, it tries to use `VA...` as a phone number, which is invalid.

---

## Verification Checklist

After fixing the configuration:

- [ ] SMS Provider is "Twilio Verify" (not Programmable SMS)
- [ ] Account SID starts with `AC`
- [ ] Auth Token is entered correctly
- [ ] Verify Service SID starts with `VA`
- [ ] "From Number" field is empty
- [ ] Configuration is saved
- [ ] Waited 2-3 minutes
- [ ] Tested OTP flow successfully

---

## Testing OTP Flow

### Test Steps:
1. Open your app: http://localhost:5173
2. Go to Login/Signup page
3. Click "Continue with Phone"
4. Enter phone number in E.164 format: `+919011068966`
5. Click "Send OTP"
6. Check your phone for SMS (arrives within 10-30 seconds)
7. Enter the 6-digit OTP code
8. Verify successful login/signup

### Expected Behavior:
- OTP SMS arrives within 10-30 seconds
- No errors in browser console
- No errors in Supabase logs
- Successful authentication after OTP entry

---

## Additional Troubleshooting

### Still Getting Errors?

**1. Check Twilio Console Logs**
   - Go to https://console.twilio.com
   - Navigate to **Monitor** → **Logs** → **Verify**
   - Look for failed verification attempts

**2. Verify Phone Number Format**
   - Must be E.164 format: `+[country code][number]`
   - Example: `+919011068966` (India)
   - No spaces, dashes, or parentheses

**3. Check Twilio Account Status**
   - Ensure account is active
   - Check sufficient balance (for paid accounts)
   - Verify Service must be active

**4. Review Supabase Logs**
   - Dashboard → Logs → Authentication
   - Look for detailed error messages

**5. Clear Configuration**
   - Try removing all Twilio credentials
   - Save (with Phone auth disabled)
   - Wait 1 minute
   - Re-enter credentials correctly
   - Enable Phone auth again

---

## Configuration Reference

### Correct Setup for Twilio Verify

```json
{
  "provider": "phone",
  "enabled": true,
  "sms_provider": "twilio_verify",
  "twilio_account_sid": "AC...",
  "twilio_auth_token": "your_token",
  "twilio_verify_service_sid": "VA5ebc9c43d64252497361670962aa5f3d"
}
```

**Note:** There is NO "from_number" field when using Twilio Verify.

---

## Related Documentation

- [TWILIO_SETUP_GUIDE.md](../TWILIO_SETUP_GUIDE.md) - Complete Twilio setup
- [PHONE_AUTH_SETUP.md](../PHONE_AUTH_SETUP.md) - Phone auth implementation
- [Twilio Error 21212 Documentation](https://www.twilio.com/docs/errors/21212)
- [Supabase Phone Auth Docs](https://supabase.com/docs/guides/auth/phone-login)

---

## Support

**Twilio Support:**
- Console: https://console.twilio.com
- Documentation: https://www.twilio.com/docs/verify
- Support: support@twilio.com

**Supabase Support:**
- Dashboard: https://supabase.com/dashboard
- Documentation: https://supabase.com/docs
- Discord: https://discord.supabase.com

---

## Summary

**The Problem:**
- Supabase trying to use Verify Service SID as a phone number

**The Solution:**
- Set SMS Provider to "Twilio Verify" in Supabase Dashboard
- Enter Verify Service SID in the correct field
- Leave "From Number" empty

**Prevention:**
- Always double-check SMS Provider dropdown before saving
- Verify configuration after saving
- Test OTP flow before deploying to production

---

**Last Updated:** 2025-11-14
**Status:** Resolved
