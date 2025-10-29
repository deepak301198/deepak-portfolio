# Deepak Yadav — Portfolio (Sleek Dark Theme)

This project is a Vite + React + Tailwind portfolio pre-configured with:
- Sleek dark UI
- Substack embed and automatic recent-posts display (client-side + Vercel serverless fallback)
- One-file edit area: `src/data.js` for site settings and links

## Download / Run locally
1. Install Node.js (18+ recommended, Node 24 works)
2. Install deps: `npm install`
3. Run dev: `npm run dev`
4. Open: `http://localhost:5173`

## Deploy (recommended): Vercel (free)
1. Create a GitHub repo and push this project OR directly import the ZIP into Vercel.
2. On Vercel, `New Project` → `Import` → select repo/zip.
3. Build settings should be detected (Vite). Click Deploy.
4. The site will be available at `https://<your-project>.vercel.app`

### Substack feed note (CORS)
- The site attempts to fetch `https://deepaklearns.substack.com/feed` client-side.
- If the browser blocks the feed due to CORS when you preview locally, Vercel's serverless function `/api/rss` will fetch and proxy the feed in production automatically.
- The serverless file is `api/rss.js` and works on Vercel deployments.

## Connect your custom domain (e.g., yourdomain.com)
1. In Vercel project → Settings → Domains → Add `yourdomain.com`
2. Vercel will show DNS records to add at your domain registrar (Namecheap/GoDaddy/Google Domains).
   Common setup:
   - Add a `CNAME` record for `www` → `cname.vercel-dns.com`
   - Add an `A` record for the root (`@`) pointing to Vercel IPs if provided (or use ALIAS/ANAME if registrar supports).
3. Wait up to 1 hour for DNS to propagate. Vercel will issue an SSL certificate automatically.

## How to edit content later
- Edit `src/data.js` (name, title, links, Substack URL)
- Edit copy in `src/App.jsx` or components to change layout
- Commit changes to GitHub → Vercel auto-deploys the update.

## If you want me to deploy & connect domain
I can deploy this to your GitHub/Vercel and configure your domain for you — I'll need:
- Your GitHub repository access (or I can create the repo and provide commands)
- Your domain registrar name + permission to edit DNS OR you can paste the DNS records I provide into your registrar console

