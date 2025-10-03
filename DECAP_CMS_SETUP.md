# Decap CMS Setup Guide

This document explains how to complete the Decap CMS setup for editing TRIKDIS documentation through a web interface at https://docs.trikdis.com/admin/

## What is Decap CMS?

Decap CMS (formerly Netlify CMS) is a Git-based content management system that provides a user-friendly web interface for editing Markdown files. It commits changes directly to your GitHub repository.

## Current Status

✅ **Completed:**
- Admin interface files created (`docs/admin/`)
- Configuration file created (`docs/admin/config.yml`)
- Collections defined for English manuals

⚠️ **Requires Setup:**
- GitHub OAuth App
- Cloudflare Worker for OAuth proxy
- Update `base_url` in config.yml

## Setup Steps

### Step 1: Create GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name:** TRIKDIS Docs CMS
   - **Homepage URL:** https://docs.trikdis.com
   - **Authorization callback URL:** https://YOUR_WORKER_DOMAIN.workers.dev/callback
   - (You'll update the callback URL after creating the Cloudflare Worker)
4. Click "Register application"
5. **Save the Client ID** (you'll need it for the Worker)
6. Click "Generate a new client secret"
7. **Save the Client Secret** (you'll need it for the Worker)

### Step 2: Deploy Cloudflare Worker OAuth Proxy

Since we're using GitHub Pages (not Netlify), we need a separate OAuth proxy to handle GitHub authentication.

#### Option A: Using sterlingwes/decap-proxy (Recommended)

1. **Install Wrangler CLI:**
   ```bash
   npm install -g wrangler
   ```

2. **Clone and setup the proxy:**
   ```bash
   git clone https://github.com/sterlingwes/decap-proxy.git
   cd decap-proxy
   cp wrangler.toml.sample wrangler.toml
   ```

3. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

4. **Configure wrangler.toml:**
   - Edit `wrangler.toml` and set your custom domain (optional)
   - Or use the default `*.workers.dev` domain

5. **Add GitHub OAuth secrets:**
   ```bash
   wrangler secret put GITHUB_OAUTH_ID
   # Paste your Client ID when prompted

   wrangler secret put GITHUB_OAUTH_SECRET
   # Paste your Client Secret when prompted
   ```

6. **Deploy the worker:**
   ```bash
   wrangler deploy
   ```

7. **Note the worker URL** (e.g., `https://decap-proxy.YOUR_NAME.workers.dev`)

#### Option B: Using Cloudflare Pages Functions

See https://github.com/SubhenduX/decap-cms-cloudflare-pages for an alternative approach using Pages Functions.

### Step 3: Update Configuration

1. **Update GitHub OAuth App callback URL:**
   - Go back to your GitHub OAuth App settings
   - Update **Authorization callback URL** to: `https://YOUR_WORKER_DOMAIN.workers.dev/callback`

2. **Update Decap CMS config:**
   ```bash
   cd /Users/local/projects/trikdis-docs/manuals
   nano docs/admin/config.yml
   ```

   Replace this line:
   ```yaml
   base_url: https://YOUR_WORKER_DOMAIN.workers.dev
   ```

   With your actual worker URL:
   ```yaml
   base_url: https://decap-proxy.YOUR_NAME.workers.dev
   ```

3. **Commit and push:**
   ```bash
   git add docs/admin/
   git commit -m "Add Decap CMS admin interface"
   git push
   ```

### Step 4: Access the CMS

After deployment (wait 2-3 minutes for GitHub Pages to update):

1. Visit https://docs.trikdis.com/admin/
2. Click "Login with GitHub"
3. Authorize the OAuth app
4. Start editing documentation!

## CMS Features

### Editorial Workflow

The CMS is configured with `publish_mode: editorial_workflow`, which provides:
- **Drafts** - Save work in progress
- **Review** - Mark content ready for review
- **Ready** - Approve and publish

Each status corresponds to a Pull Request in GitHub.

### Collections

Currently configured collections:
- **English - Alarm Communicators** (`docs/en/alarm-communicators/`)
- **English - Alarm Panels** (`docs/en/alarm-panels/`)
- **Lithuanian - Manuals** (`docs/lt/`) - Ready for future content

### Media Management

- Images upload to the same folder as the manual
- Relative paths used (e.g., `./image1.png`)
- Compatible with existing manual structure

## Important Notes

### DO NOT Use CMS for Converted Manuals

⚠️ **The conversion pipeline is the source of truth for DOCX manuals.**

- DO NOT edit converted manuals in the CMS
- CMS is for manual edits, fixes, and new content written directly in Markdown
- For DOCX updates, re-run the conversion pipeline

### CMS vs. Conversion Pipeline

**Use CMS for:**
- Quick typo fixes
- Adding new Markdown-native content
- Updating homepage content
- Creating new pages not derived from DOCX

**Use Conversion Pipeline for:**
- Initial DOCX conversion
- Updating content from source DOCX files
- Maintaining consistency with source materials

## Troubleshooting

### Cannot login - OAuth error

1. Verify OAuth callback URL matches worker URL exactly
2. Check worker secrets are set correctly: `wrangler secret list`
3. Check browser console for error messages

### Changes not appearing on site

1. Check the "Workflow" tab in CMS - changes may be in Draft/Review
2. Merge the Pull Request in GitHub to publish
3. Wait 2-3 minutes for GitHub Actions to deploy

### CMS not loading

1. Check browser console for errors
2. Verify `docs/admin/config.yml` has correct `base_url`
3. Check worker is deployed: visit worker URL directly

### Private repository access

If you need to edit a private repository, update the OAuth scope in the worker code:
```javascript
// In worker code, change scope from 'public_repo,user' to:
scope: 'repo,user'
```

## Security Notes

- Only users with push access to the repository can use the CMS
- All changes are committed with the user's GitHub identity
- OAuth secrets are stored securely in Cloudflare Workers

## Additional Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Decap Proxy Repository](https://github.com/sterlingwes/decap-proxy)
- [External OAuth Clients](https://decapcms.org/docs/external-oauth-clients/)

---

**Setup Date:** October 3, 2025
**Contact:** Andrius (obsmind)
