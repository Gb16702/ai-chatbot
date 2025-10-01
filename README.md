# Personal AI Chatbot - Project Documentation

> ChatGPT-like AI assistant built with Next.js 15, deployed on Vercel

## 📚 Documentation Index

This project has comprehensive documentation split across multiple files:

### 🚀 Getting Started
- **[QUICK-START.md](./QUICK-START.md)** - TL;DR guide, start here
- **[VERCEL-DEPLOYMENT-GUIDE.md](./VERCEL-DEPLOYMENT-GUIDE.md)** - Complete Vercel deployment guide

### 📖 Deep Dives
- **[DEPENDENCIES-ANALYSIS.md](./DEPENDENCIES-ANALYSIS.md)** - Every dependency explained
- **[CHATBOT-PROJECT-PLAN.md](./CHATBOT-PROJECT-PLAN.md)** - Original project plan (includes Docker setup)

---

## 🎯 Project Overview

**Goal:** Build a production-ready ChatGPT clone

**Features:**
- ✅ Real-time streaming AI responses
- ✅ Persistent chat history
- ✅ User authentication
- ✅ Modern, clean UI
- ✅ Deployed on Vercel

---

## 🛠️ Tech Stack (Recommended)

```
Framework:    Next.js 15 (App Router, React Server Components)
Database:     Vercel Postgres + Drizzle ORM
Auth:         Better Auth (recommended over NextAuth)
AI:           OpenAI API (direct OR via Vercel AI SDK)
UI:           shadcn/ui + Tailwind CSS
State:        SWR (data fetching)
Deployment:   Vercel (serverless, auto-deploy)
```

---

## 🔑 Key Decisions

### 1. Vercel Deployment (No Docker)
Since you're deploying on Vercel:
- ❌ No Docker needed (serverless)
- ✅ Use Vercel Postgres (managed database)
- ✅ Auto-deploy on `git push`
- ✅ Free tier available

### 2. Better Auth > NextAuth
Use Better Auth instead of NextAuth because:
- Modern TypeScript-first design
- Auto-generates database schema
- Better plugin ecosystem
- Recommended by Auth.js team themselves

### 3. Vercel Blob (Optional)
**What it is:** S3-backed file storage for uploads

**When you need it:**
- User profile pictures
- File attachments in chat
- Image uploads

**Recommendation:** Skip initially, add later when you need file uploads

### 4. AI SDK vs Vanilla

| Approach | Pros | Cons |
|----------|------|------|
| **AI SDK** | Fast to build, handles edge cases, multi-provider | Adds dependencies, less control |
| **Vanilla** | Full control, learn deeply, minimal deps | More code to write (~300 lines) |

**Recommendation:** AI SDK for speed, or vanilla for learning - both work great on Vercel

---

## 📦 Minimal Dependencies

```json
{
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "@vercel/postgres": "^0.10.0",
    "drizzle-orm": "^0.34.0",
    "better-auth": "latest",
    "openai": "^4.x",              // OR "ai": "5.x" for AI SDK
    "swr": "^2.2.5",
    "zod": "^3.x",
    "lucide-react": "^0.446.0",
    "react-markdown": "^9.x",
    "use-stick-to-bottom": "^1.x"
  }
}
```

Plus shadcn/ui components (installed as needed)

---

## 🗄️ Database Schema

```typescript
// Using Drizzle ORM

users
  - id (uuid)
  - email (varchar)
  - password (varchar, hashed)
  - createdAt (timestamp)

chats
  - id (uuid)
  - userId (uuid, foreign key)
  - title (text)
  - createdAt (timestamp)

messages
  - id (uuid)
  - chatId (uuid, foreign key)
  - role (varchar: 'user' | 'assistant')
  - content (text)
  - createdAt (timestamp)
```

---

## 📁 Project Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (chat)/
│   ├── page.tsx              # New chat
│   └── chat/[id]/page.tsx    # Existing chat
└── api/
    ├── chat/route.ts         # Streaming endpoint
    └── auth/[...all]/route.ts

components/
├── chat/
│   ├── chat-interface.tsx
│   ├── message-list.tsx
│   └── chat-input.tsx
└── ui/                       # shadcn components

lib/
├── db/
│   ├── index.ts              # Drizzle client
│   └── schema.ts             # Database schema
├── auth.ts                   # Better Auth config
└── utils/
```

---

## 🚀 Quick Start

```bash
# 1. Create Next.js app
npx create-next-app@latest personal-ai --typescript --tailwind --app

# 2. Install dependencies
cd personal-ai
npm install @vercel/postgres drizzle-orm better-auth openai swr zod

# 3. Setup Vercel
npm i -g vercel
vercel login
vercel link

# 4. Create Postgres database
vercel postgres create
vercel env pull .env.local

# 5. Setup shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button input scroll-area

# 6. Setup database schema
# (Create lib/db/schema.ts, then:)
npx drizzle-kit generate
npx drizzle-kit push

# 7. Run development
npm run dev

# 8. Deploy
git push origin main  # Auto-deploys to Vercel
```

---

## 💰 Estimated Costs

### Hobby (Free Tier)
- Vercel hosting: **Free**
- Postgres: **256MB free** (~100k messages)
- OpenAI: **~$0.03 per chat** with GPT-4

**Total: $0-5/month**

### Production (Pro)
- Vercel: **$20/month** (included in Pro plan)
- Postgres: **~$2-5/month**
- OpenAI: **~$20-100/month** (usage-based)

**Total: $25-150/month**

---

## 📋 Implementation Timeline

**Day 1:** Setup + Vercel + Database (3 hours)
**Day 2:** Basic chat streaming (4 hours)
**Day 3:** Authentication with Better Auth (3 hours)
**Day 4:** Chat history + UI (4 hours)
**Day 5:** Polish + deploy (2 hours)

**Total: ~2-3 days for MVP**

---

## 🔗 Key Resources

- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Better Auth Docs](https://www.better-auth.com/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [OpenAI Streaming API](https://platform.openai.com/docs/api-reference/streaming)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## 🎓 What You Learned from Vercel's Chatbot

### ✅ Patterns to Adopt
- Database schema design (User → Chat → Message)
- Drizzle ORM over Prisma (better edge support)
- SWR for data fetching
- Edge runtime for API routes
- Auto-scroll to bottom pattern
- Message streaming implementation

### ❌ Features to Skip (Initially)
- Artifacts system (complex, code execution)
- Resumable streams (needs Redis)
- CodeMirror/ProseMirror (rich text editing)
- Token tracking (add later)
- Multi-part messages (start simple)

### ⚠️ Modified Approaches
- Use Better Auth instead of NextAuth
- Skip Vercel Blob initially
- Direct OpenAI vs AI Gateway (simpler)
- Consider AI SDK (good on Vercel)

---

## ⏭️ Next Steps

1. **Choose your approach:**
   - Fast: Use AI SDK
   - Learning: Build vanilla streaming

2. **Read the guides:**
   - [QUICK-START.md](./QUICK-START.md) for overview
   - [VERCEL-DEPLOYMENT-GUIDE.md](./VERCEL-DEPLOYMENT-GUIDE.md) for details

3. **Start building:**
   - I can help scaffold the project
   - Generate starter code
   - Answer specific questions

---

## 💬 Questions?

Ask me:
- "Help me setup the project structure"
- "Show me the streaming implementation"
- "How do I integrate Better Auth?"
- "Explain the database setup"
- "AI SDK or vanilla - which should I choose?"

Ready when you are! 🚀
