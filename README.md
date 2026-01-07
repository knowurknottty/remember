# Remember (client-side)

Astro static site with localStorage for session tracking.

## Local dev

```bash
npm i
npm run dev
```

## Deploy

- Connect repo to Netlify
- Build: `npm run build`
- Publish dir: `dist`
- No environment variables needed!

## How it works

All session data is stored in the browser's localStorage. No backend, no database, just pure client-side tracking.

## Export your data

Use the Dashboard to view all sessions. You can copy the JSON and save it externally.