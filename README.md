# Portfolio

My personal portfolio site, built with Next.js. Includes an AI chat assistant, a contact form, and a project showcase.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Database:** PostgreSQL via Prisma
- **Rate Limiting:** Upstash Redis
- **Email:** Resend
- **AI:** Groq (chat assistant)

## Features

- AI-powered chat assistant that answers questions about me
- Contact form with email delivery and rate limiting
- Project showcase with detail pages
- GitHub contributions calendar

## Getting Started

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root with the following variables:

   ```bash
   DATABASE_URL=
   GROQ_API_KEY=
   RESEND_API_KEY=
   CONTACT_EMAIL_TO=
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   ```

3. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it.

## Build

```bash
npm run build
npm run start
```

## License

This project is for personal use.
