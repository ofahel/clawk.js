# Clawk.js — TikTok Info Extractor

Clawk.js is a small Node.js module and CLI to fetch public TikTok user info by username — no login or API key required.

**Features**
- Fetch public user info by TikTok username
- Works as CLI: `npx clawk.js {username}`
- Works as module: `import { getUserInfo } from 'clawk.js'`

**Install (local / testing)**
```bash
git clone <repo>
cd clawk-js
npm install
chmod +x bin/clawk.js
node bin/clawk.js username
