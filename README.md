# AI Chatbot

A personal AI chatbot built with Next.js and OpenAI, featuring real-time streaming responses.

## Features

- Real-time AI responses with token-by-token streaming
- Multi-turn conversations with context awareness
- Chat persistence with PostgreSQL database
- Clean, modern UI with dark mode support

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **AI:** OpenAI API (gpt-4o-mini)
- **Database:** Drizzle ORM + Vercel Postgres (Neon)
- **Styling:** Tailwind CSS v4 with custom design system
- **UI Components:** Radix UI primitives

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables (see `.env.example`)
4. Run database migrations: `pnpm drizzle-kit push`
5. Start development server: `pnpm dev`

## Development

Built as a learning project to understand AI chat implementation fundamentals without relying on abstraction layers.
