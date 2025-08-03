# 🚀 Vihaya.app Deployment Guide

## **Step 1: Deploy to Vercel**

### **Option A: Using Vercel CLI**
```bash
# Login to Vercel
vercel login

# Deploy your project
vercel

# Follow the prompts:
# - Link to existing project? → No
# - Project name? → vihaya-ai-platform
# - Directory? → ./
# - Override settings? → No
```

### **Option B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

## **Step 2: Connect Your Domain (vihaya.app)**

### **In Vercel Dashboard:**
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your domain: `vihaya.app`
4. Add `www.vihaya.app` (optional)

### **In GoDaddy DNS Settings:**
1. Log into GoDaddy
2. Go to "My Products" → "DNS"
3. Find your `vihaya.app` domain
4. Update DNS records:

#### **For Root Domain (vihaya.app):**
```
Type: A
Name: @
Value: 76.76.19.19
TTL: 600
```

#### **For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

#### **Alternative: Use Vercel's Nameservers**
1. In Vercel, get the nameservers (usually 4 NS records)
2. In GoDaddy, change nameservers to Vercel's nameservers
3. This is the recommended approach for easier management

## **Step 3: Verify Deployment**

### **Check Your Site:**
- Visit `https://vihaya.app`
- Test all pages and features
- Verify AI training data: `https://vihaya.app/ai-training-data.json`
- Check robots.txt: `https://vihaya.app/robots.txt`
- Verify sitemap: `https://vihaya.app/sitemap.xml`

### **SEO Verification:**
- Test meta tags with browser dev tools
- Verify structured data with Google's Rich Results Test
- Check mobile responsiveness
- Test PWA functionality

## **Step 4: Environment Variables (if needed)**

If you add any environment variables later:
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add any API keys or configuration
3. Redeploy if needed

## **Step 5: Custom Domain SSL**

Vercel automatically provides SSL certificates for custom domains. Wait 24-48 hours for full propagation.

## **Troubleshooting**

### **If domain doesn't work:**
1. Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
2. Verify nameservers are correct
3. Wait up to 48 hours for full propagation

### **If build fails:**
1. Check Vercel build logs
2. Ensure all dependencies are in package.json
3. Verify Node.js version compatibility

## **Performance Optimization**

Your site is already optimized with:
- ✅ AI-friendly robots.txt
- ✅ Structured data for SEO
- ✅ PWA manifest
- ✅ Service worker
- ✅ Image optimization
- ✅ Security headers

## **Next Steps**

1. **Monitor Performance:** Use Vercel Analytics
2. **SEO Tracking:** Set up Google Search Console
3. **Analytics:** Add Google Analytics or Vercel Analytics
4. **Backup:** Consider setting up automatic backups

---

**🎉 Your Vihaya.app will be live and AI-optimized!** 