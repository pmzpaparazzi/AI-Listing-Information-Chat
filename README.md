
# FIXED AI LISTING BOT — READY FOR RAILWAY

### IMPORTANT:
Railway uses Node.js CJS.  
Do NOT use `import OpenAI from "openai"`.

This project uses:
`const OpenAI = require("openai")`

### ENV VARIABLE REQUIRED:
OPENAI_API_KEY = your real OpenAI key

### RUN LOCALLY:
npm install
npm start
open http://localhost:8080

### RAILWAY DEPLOY:
1. Upload this ZIP or push to GitHub
2. Railway → Variables → Add:
   OPENAI_API_KEY = your key
3. Deploy
4. Visit your public URL
