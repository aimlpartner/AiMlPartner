<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/853934ed-123e-4ee2-93ac-6f96c7fdd809

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Hostinger (Static Hosting)

This app is built with Vite, so deploy the generated `dist` files.

1. Build the app locally:
   `npm install`
   `npm run build`
2. In Hostinger hPanel (File Manager), upload the contents of `dist/` into `public_html/`.
3. Keep the generated `.htaccess` file from `dist/` in `public_html/` (required for React Router refresh/deep links).
4. If your domain uses a subfolder, update Vite `base` in `vite.config.ts` before build.
5. Clear Hostinger cache/CDN after uploading a new build.

### Common post-deploy issues

- `404` on route refresh: `.htaccess` is missing in `public_html`.
- Blank page: old cached JS/CSS is being served; clear cache and hard refresh.
- Firebase auth popup errors: add your Hostinger domain to Firebase Authorized domains.
