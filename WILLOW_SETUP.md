# Willow Chatbot Setup Instructions

Welcome! This guide will help you set up Willow, your AI-powered chatbot for Parkinson's Park, using Google Gemini Flash-Lite.

## Table of Contents
1. [Getting a Google Gemini API Key](#step-1-getting-a-google-gemini-api-key)
2. [Setting Up Environment Variables](#step-2-setting-up-environment-variables)
3. [Securing Your API Key](#step-3-securing-your-api-key)
4. [Updating Willow's Knowledge Base](#step-4-updating-willows-knowledge-base)
5. [Testing Locally](#step-5-testing-locally)
6. [Deploying to Production](#step-6-deploying-to-production)
7. [Troubleshooting](#troubleshooting)
8. [Cost Management](#cost-management)

---

## Step 1: Getting a Google Gemini API Key

### 1.1. Create a Google Cloud Account
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Accept the terms of service

### 1.2. Get Your API Key
1. Once logged in, click **"Get API key"** in the left sidebar
2. Click **"Create API key"**
3. Select **"Create API key in new project"** (or choose an existing project)
4. Copy the API key that appears - you'll need this soon!
5. **IMPORTANT**: Store this key securely - treat it like a password

### 1.3. Understanding the Gemini Flash-Lite Model
- **Model Name**: `gemini-2.5-flash-lite`
- **Cost**: Very low cost (free tier available)
- **Speed**: Ultra-fast responses
- **Best For**: Conversational AI, customer support, Q&A
- **Limits**: Check current quotas at [Google AI pricing](https://ai.google.dev/pricing)

---

## Step 2: Setting Up Environment Variables

Environment variables keep your API key secure by storing it separately from your code.

### 2.1. Create a .env File
1. In your project root directory (`C:\Users\andre\Repos\Parkinsons-Park-Web-Site\`), create a new file called `.env`
2. Add the following line to the file:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with the API key you copied from Google AI Studio

**Example:**
```
VITE_GEMINI_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr
```

### 2.2. Verify .env is in .gitignore
1. Open `.gitignore` file in your project root
2. Make sure it contains `.env` on its own line:
   ```
   # Environment variables
   .env
   .env.local
   .env.production
   ```
3. This prevents your API key from being committed to Git

**CRITICAL**: Never commit your `.env` file to version control!

---

## Step 3: Securing Your API Key

Since this is a static website, the API key will be exposed in the client-side code after building. Here's how to secure it:

### 3.1. Set Up API Key Restrictions in Google Cloud
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your API key and click the edit icon (pencil)
4. Under **API restrictions**:
   - Select **"Restrict key"**
   - Choose **"Generative Language API"**
   - Click **Save**

### 3.2. Set Up HTTP Referrer Restrictions
1. Still in the API key settings
2. Under **Application restrictions**:
   - Select **"HTTP referrers (web sites)"**
   - Click **"Add an item"**
   - Add your website URLs:
     ```
     https://yourdomain.com/*
     https://www.yourdomain.com/*
     http://localhost:5173/*  (for local development)
     ```
3. Click **Save**

**Important**: Replace `yourdomain.com` with your actual domain. The `/*` allows all paths on your domain.

### 3.3. Set Up Quota Limits
1. In Google Cloud Console, go to **APIs & Services** > **Enabled APIs**
2. Click on **"Generative Language API"**
3. Click **Quotas & System Limits**
4. Set reasonable daily/monthly limits to prevent unexpected charges
   - Suggested: 1,000 requests per day for testing
   - Adjust based on expected traffic

---

## Step 4: Updating Willow's Knowledge Base

Willow's knowledge comes from the `willowKnowledge.ts` file.

### 4.1. Locating the Knowledge Base
The file is located at:
```
C:\Users\andre\Repos\Parkinsons-Park-Web-Site\willowKnowledge.ts
```

### 4.2. Editing the Knowledge Base
1. Open `willowKnowledge.ts` in your code editor
2. The file is organized into sections:
   - **Park Overview**: Basic information about the park
   - **History**: Historical timeline and events
   - **Ecology**: Wildlife and habitats
   - **Geology**: Geological features
   - **Events & Activities**: Upcoming and annual events
   - **Volunteering**: How to get involved
   - **Contact Information**: Contact details
   - **FAQs**: Frequently asked questions

### 4.3. Adding New Information
Simply add or edit text in the relevant section:

```typescript
## NEW SECTION TITLE

**Subsection**:
Add your information here. Keep it clear and factual.

- Use bullet points for lists
- **Bold** important terms
- Keep paragraphs concise
```

### 4.4. Best Practices for the Knowledge Base
- ✅ **Be specific**: Include dates, names, and details
- ✅ **Be accurate**: Double-check facts before adding
- ✅ **Be organized**: Keep information in logical sections
- ✅ **Be concise**: Willow will summarize, so provide key facts
- ❌ **Don't overload**: Too much info can confuse the AI
- ❌ **Don't duplicate**: Keep each fact in one place

### 4.5. After Updating
After making changes:
1. Save the file
2. Rebuild the project: `npm run build`
3. Test with Willow to ensure she has the new information

---

## Step 5: Testing Locally

### 5.1. Install Dependencies (if not already done)
```bash
npm install
```

### 5.2. Start Development Server
```bash
npm run dev
```

### 5.3. Test the Chatbot
1. Open your browser to `http://localhost:5173`
2. Look for the **"Chat with Willow"** button in the bottom right
3. Click it and try asking questions:
   - "What is Parkinson's Park?"
   - "Tell me about the park's history"
   - "What events are coming up?"
   - "How can I volunteer?"

### 5.4. What to Check
- ✅ Chat window opens and closes smoothly
- ✅ Welcome message appears
- ✅ Willow responds to questions
- ✅ Responses are relevant and accurate
- ✅ No error messages in the chat
- ✅ Loading indicator appears while waiting for response

### 5.5. Checking Browser Console
1. Press `F12` to open browser developer tools
2. Go to the **Console** tab
3. Look for any error messages
4. Common issues:
   - `Gemini API key not configured`: Check your `.env` file
   - `Failed to get response`: Check API key is valid
   - `403 Forbidden`: Check API key restrictions

---

## Step 6: Deploying to Production

### 6.1. For GitHub Pages Deployment

#### Option A: Using GitHub Secrets (Recommended for Build Time)
1. Go to your GitHub repository
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Name: `VITE_GEMINI_API_KEY`
5. Value: Your API key
6. Click **Add secret**

#### Option B: Using Vite's Public Directory (NOT RECOMMENDED)
This exposes your API key in the built files. Only use with proper API key restrictions set up.

### 6.2. Update Your Build Process
If using GitHub Actions, update your workflow file to include the environment variable:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
```

### 6.3. Build for Production
```bash
npm run build
```

### 6.4. Deploy
Deploy the `dist` folder to your hosting provider (GitHub Pages, Netlify, Vercel, etc.)

### 6.5. Verify HTTP Referrer Restrictions
After deployment, verify your domain is added to the HTTP referrer restrictions:
1. Test the chatbot on your live site
2. If it doesn't work, check the browser console for errors
3. Add your exact domain to the HTTP referrer restrictions in Google Cloud Console

---

## Troubleshooting

### Issue: "Gemini API key not configured"
**Solution**:
1. Check `.env` file exists in project root
2. Verify it contains `VITE_GEMINI_API_KEY=your_key`
3. Restart dev server: Stop (`Ctrl+C`) and run `npm run dev` again
4. Vite environment variables must start with `VITE_`

### Issue: "Failed to get response from Willow"
**Solutions**:
1. Check API key is valid in Google AI Studio
2. Verify Generative Language API is enabled in Google Cloud Console
3. Check API key restrictions aren't blocking your domain
4. Check you haven't exceeded quota limits

### Issue: "403 Forbidden" Error
**Solution**:
1. Go to Google Cloud Console > API Key settings
2. Check HTTP referrer restrictions include your domain
3. For local testing, ensure `http://localhost:5173/*` is in the list
4. Wait a few minutes for changes to propagate

### Issue: Willow Gives Incorrect Information
**Solution**:
1. Update `willowKnowledge.ts` with correct information
2. Be specific and clear in the knowledge base
3. Rebuild: `npm run build`
4. Clear browser cache
5. Test again

### Issue: Slow Responses
**Solutions**:
1. Check internet connection
2. Verify using `gemini-2.5-flash-lite` (not a larger model)
3. Check Google AI Studio status page
4. Consider if you've hit rate limits

### Issue: API Key Exposed in Build Files
**This is normal for client-side apps, but mitigate with**:
1. HTTP referrer restrictions (see Step 3.2)
2. API restrictions (see Step 3.1)
3. Quota limits (see Step 3.3)
4. Monitor usage in Google Cloud Console

---

## Cost Management

### Understanding Costs
- **Free Tier**: Gemini Flash-Lite has a generous free tier
- **Pricing**: Check current rates at [Google AI Pricing](https://ai.google.dev/pricing)
- **Monitor Usage**: Google Cloud Console > Billing > Reports

### Setting Budget Alerts
1. Go to Google Cloud Console > Billing > Budgets & alerts
2. Click **Create Budget**
3. Set a monthly budget (e.g., $5 or $10)
4. Set alert thresholds (e.g., 50%, 90%, 100%)
5. Add your email to receive alerts

### Optimizing Costs
- ✅ Use Flash-Lite model (cheapest)
- ✅ Set quota limits
- ✅ Implement rate limiting if needed
- ✅ Monitor usage regularly
- ✅ Keep responses concise (shorter = cheaper)

### Expected Usage Costs
With proper setup:
- Small website (< 100 visitors/day): Likely free tier
- Medium website (< 1,000 visitors/day): $1-5/month
- Large website (> 1,000 visitors/day): $5-20/month

*Note: These are estimates. Actual costs depend on usage patterns.*

---

## Quick Reference

### Important Files
- **Knowledge Base**: `willowKnowledge.ts`
- **Chatbot Component**: `components/WillowChat.tsx`
- **Environment Variables**: `.env` (don't commit!)

### Important Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Important Links
- [Google AI Studio](https://aistudio.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Gemini API Pricing](https://ai.google.dev/pricing)

---

## Support

If you encounter issues not covered in this guide:

1. **Check Browser Console**: Press F12 and look for errors
2. **Check Google Cloud Console**: Verify API is enabled and key is valid
3. **Check Knowledge Base**: Ensure `willowKnowledge.ts` is properly formatted
4. **Contact**: parkinsonspark@gmail.com

---

## Next Steps

Once Willow is set up:

1. ✅ Test thoroughly with various questions
2. ✅ Update the knowledge base with current information
3. ✅ Set up monitoring and budget alerts
4. ✅ Share feedback with your team
5. ✅ Promote Willow to park visitors!

---

**Congratulations!** You've successfully set up Willow, your AI park guide. Visitors can now chat with Willow to learn about Parkinson's Park 24/7!
