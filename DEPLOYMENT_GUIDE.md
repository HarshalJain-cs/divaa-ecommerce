# 🚀 Deployment Guide - Divaa E-Commerce Gift Card System

## Quick Start Checklist

Before deploying to production, ensure you have:

- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Sample data removed (or kept for testing)
- [ ] Environment variables configured
- [ ] Admin password changed from default
- [ ] Email service configured (Phase 2)
- [ ] Payment gateway configured (Phase 2)
- [ ] Testing completed
- [ ] Backup strategy in place

---

## Step-by-Step Deployment

### 1. Database Setup (Supabase)

#### Create Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in details:
   - **Name:** divaa-ecommerce
   - **Database Password:** (strong password)
   - **Region:** Closest to your users
4. Wait for project to initialize (~2 minutes)

#### Deploy Schema

1. Navigate to SQL Editor in Supabase Dashboard
2. Create a new query
3. Copy contents of `gift-cards-schema.sql` (from previous session)
4. Run the query
5. Verify all tables created:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public'
   ORDER BY table_name;
   ```

#### Insert Initial Data

1. Create a new SQL query
2. Copy contents of `supabase/setup-gift-cards-data.sql`
3. Run the query
4. Verify data inserted:
   ```sql
   SELECT * FROM promo_codes;
   SELECT * FROM gift_card_designs;
   SELECT * FROM admin_users;
   ```

#### Configure RLS (Row Level Security)

RLS policies are already included in the schema, but verify:

1. Go to Authentication → Policies
2. Ensure policies exist for each table
3. Test with different user roles

### 2. Frontend Setup

#### Install Dependencies

```bash
cd divaa-ecommerce
npm install
```

Verify these packages are installed:
- `qrcode`
- `@react-pdf/renderer`
- `nanoid`
- `bcryptjs`
- `@types/qrcode`
- `@types/bcryptjs`

#### Configure Environment Variables

Create `.env` file in project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Service Role Key (for Edge Functions - Phase 2)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Email Service (Phase 2)
RESEND_API_KEY=your-resend-api-key-here

# SMS Service (Phase 2)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890
```

**Get Supabase Keys:**
1. Go to Supabase Dashboard → Settings → API
2. Copy "Project URL" → `VITE_SUPABASE_URL`
3. Copy "anon public" key → `VITE_SUPABASE_ANON_KEY`
4. Copy "service_role" key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

#### Build for Production

```bash
# Test build locally
npm run build

# Preview production build
npm run preview
```

### 3. Deployment Platforms

#### Option A: Vercel (Recommended)

**Setup:**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

4. Configure environment variables:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env`
   - Redeploy: `vercel --prod`

**Custom Domain:**
1. Go to Vercel Dashboard → Domains
2. Add your domain (e.g., divaa.com)
3. Update DNS records as instructed
4. SSL automatically configured

#### Option B: Netlify

**Setup:**

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login:
   ```bash
   netlify login
   ```

3. Initialize:
   ```bash
   netlify init
   ```

4. Deploy:
   ```bash
   netlify deploy --prod
   ```

5. Configure environment variables:
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add all variables from `.env`

#### Option C: Your Own Server (VPS)

**Requirements:**
- Ubuntu 20.04+ or similar
- Node.js 18+
- Nginx
- PM2

**Steps:**

1. SSH into your server:
   ```bash
   ssh user@your-server-ip
   ```

2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. Install PM2:
   ```bash
   sudo npm install -g pm2
   ```

4. Clone repository:
   ```bash
   git clone https://github.com/your-org/divaa-ecommerce.git
   cd divaa-ecommerce
   ```

5. Install dependencies:
   ```bash
   npm install
   ```

6. Build:
   ```bash
   npm run build
   ```

7. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name divaa.com www.divaa.com;

       root /var/www/divaa-ecommerce/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Enable gzip
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

8. Serve with PM2:
   ```bash
   pm2 serve dist 3000 --name divaa-ecommerce --spa
   pm2 startup
   pm2 save
   ```

9. Setup SSL with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d divaa.com -d www.divaa.com
   ```

### 4. Post-Deployment Steps

#### Update Admin Password

**Important:** Change default admin password immediately!

```sql
-- In Supabase SQL Editor
UPDATE admin_users
SET password_hash = '$2a$10$YOUR_NEW_BCRYPT_HASH'
WHERE username = 'harry';
```

Generate new hash:
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your-new-password', 10);
console.log(hash);
```

#### Remove Sample Data (Production Only)

```sql
-- Remove sample gift cards
DELETE FROM gift_cards
WHERE card_number LIKE 'DIVAA-1234-5678-900%';

-- Verify only real cards remain
SELECT COUNT(*) FROM gift_cards;
```

#### Configure Backups

**Supabase Automatic Backups:**
1. Go to Supabase Dashboard → Database → Backups
2. Verify daily backups are enabled (Pro plan)
3. Test restoration process

**Manual Backup:**
```bash
# Backup database
pg_dump -h db.your-project.supabase.co -U postgres -d postgres > backup.sql

# Restore
psql -h db.your-project.supabase.co -U postgres -d postgres < backup.sql
```

#### Set Up Monitoring

**Sentry (Error Tracking):**

1. Create account at [sentry.io](https://sentry.io)
2. Install Sentry:
   ```bash
   npm install @sentry/react
   ```
3. Configure in `src/main.tsx`:
   ```typescript
   import * as Sentry from "@sentry/react";

   Sentry.init({
     dsn: "your-sentry-dsn",
     environment: "production",
   });
   ```

**Supabase Monitoring:**
1. Go to Supabase Dashboard → Reports
2. Monitor:
   - API requests
   - Database size
   - Active connections
   - Function invocations (Phase 2)

### 5. Testing in Production

#### Smoke Tests

1. **Homepage loads:** Visit your domain
2. **Gift cards page:** Navigate to `/gift-cards`
3. **Purchase flow:**
   - Select design and amount
   - Fill in details
   - Apply promo code GIFT5
   - Complete checkout (test payment)
4. **Admin login:** Visit `/admin` with new password
5. **Balance check:** Test at `/gift-cards/balance`
6. **Redemption:** Add to cart, redeem test card at checkout

#### Performance Tests

Use [Lighthouse](https://developers.google.com/web/tools/lighthouse):

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://divaa.com --view
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

#### Load Testing

Use [k6](https://k6.io/):

```javascript
// loadtest.js
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  let res = http.get('https://divaa.com/gift-cards');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'page loads in <2s': (r) => r.timings.duration < 2000,
  });
}
```

Run:
```bash
k6 run loadtest.js
```

### 6. Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] Admin password changed
- [ ] Environment variables not in code
- [ ] RLS policies enabled
- [ ] Rate limiting configured (Supabase)
- [ ] CORS properly configured
- [ ] XSS protection enabled
- [ ] SQL injection protection (parameterized queries)
- [ ] Sensitive data encrypted
- [ ] API keys rotated regularly

### 7. SEO & Performance

#### SEO Optimization

1. Add meta tags in `index.html`:
   ```html
   <meta name="description" content="Buy digital gift cards for Divaa Jewels. Perfect gifts for any occasion.">
   <meta name="keywords" content="gift cards, jewelry, divaa, digital gifts">
   <meta property="og:title" content="Divaa Gift Cards">
   <meta property="og:description" content="Send the perfect gift with Divaa digital gift cards">
   <meta property="og:image" content="https://divaa.com/og-image.jpg">
   ```

2. Generate sitemap:
   ```xml
   <!-- public/sitemap.xml -->
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://divaa.com/</loc>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://divaa.com/gift-cards</loc>
       <priority>0.9</priority>
     </url>
     <!-- Add more URLs -->
   </urlset>
   ```

3. Add robots.txt:
   ```txt
   # public/robots.txt
   User-agent: *
   Allow: /
   Disallow: /admin

   Sitemap: https://divaa.com/sitemap.xml
   ```

#### Performance Optimization

1. **Enable CDN:**
   - Vercel/Netlify automatically use CDN
   - For custom server, use Cloudflare

2. **Image Optimization:**
   ```bash
   # Install sharp for image optimization
   npm install sharp
   ```

3. **Code Splitting:**
   - Already implemented with lazy loading
   - Verify in build output

4. **Compression:**
   - Enable gzip/brotli in Nginx
   - Vercel/Netlify automatically compress

### 8. Maintenance

#### Regular Tasks

**Daily:**
- Monitor error logs
- Check transaction volume
- Review failed payments (Phase 2)

**Weekly:**
- Review admin dashboard
- Check expired gift cards
- Verify email delivery rates (Phase 2)
- Update promo codes if needed

**Monthly:**
- Database backup verification
- Performance audit
- Security review
- Dependency updates

**Quarterly:**
- Full system audit
- Load testing
- User feedback review
- Feature planning

#### Update Process

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Run tests
npm run test

# Build
npm run build

# Deploy
vercel --prod  # or your deployment method
```

### 9. Rollback Plan

If something goes wrong:

#### Frontend Rollback

**Vercel:**
```bash
# List deployments
vercel list

# Rollback to previous
vercel rollback your-deployment-url
```

**Manual:**
```bash
# Checkout previous commit
git checkout previous-commit-hash

# Rebuild and deploy
npm run build
npm run deploy
```

#### Database Rollback

```sql
-- Restore from backup
psql -h db.your-project.supabase.co -U postgres -d postgres < backup_date.sql
```

### 10. Support & Documentation

**Internal Documentation:**
- `/GIFT_CARD_SYSTEM.md` - Complete system guide
- `/supabase/README.md` - Database setup
- `/email-templates/README.md` - Email templates
- `/supabase/functions/README.md` - Edge Functions (Phase 2)

**External Resources:**
- Supabase Docs: https://supabase.com/docs
- React Router: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com
- Resend API: https://resend.com/docs

---

## Production Checklist Summary

### Pre-Launch

- [ ] Database schema deployed
- [ ] Initial data inserted
- [ ] Admin password changed
- [ ] Sample data removed
- [ ] Environment variables configured
- [ ] Build tested locally
- [ ] All tests passing

### Launch

- [ ] Deploy to production
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Monitoring enabled
- [ ] Backups configured

### Post-Launch

- [ ] Smoke tests completed
- [ ] Performance audit passed
- [ ] Security scan clean
- [ ] Load testing passed
- [ ] Documentation updated
- [ ] Team trained

---

## Emergency Contacts

- **Supabase Support:** https://supabase.com/support
- **Vercel Support:** https://vercel.com/support
- **Database Issues:** Check Supabase Dashboard → Logs

---

## Success Metrics

Track these KPIs:

- Gift cards purchased
- Total revenue
- Redemption rate
- Average cart value with gift cards
- Promo code usage
- User satisfaction
- Page load times
- Error rates

---

**Your gift card system is ready for deployment! 🎉**

Follow this guide step-by-step for a smooth launch.

Good luck! 🚀
