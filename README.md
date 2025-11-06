# Welcome to your Convex + Next.js + Convex Auth app

This is a [Convex](https://convex.dev/) project created with [`npm create convex`](https://www.npmjs.com/package/create-convex).

After the initial setup (<2 minutes) you'll have a working full-stack app using:

- Convex as your backend (database, server logic)
- [Convex Auth](https://labs.convex.dev/auth) for your authentication implementation
- [React](https://react.dev/) as your frontend (web page interactivity)
- [Next.js](https://nextjs.org/) for optimized web hosting and page routing
- [Tailwind](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) for building great looking accessible UI fast

## Get started

### Quick Start (Convex Cloud)

If you just cloned this codebase and didn't use `npm create convex`, run:

```bash
npm install
npm run dev
```

If you're reading this README on GitHub and want to use this template, run:

```bash
npm create convex@latest -- -t nextjs-convexauth-shadcn
```

### Self-Hosted Development Setup

To run the Convex backend locally using Docker:

1. **Start Backend Services** (Convex Backend + Dashboard + MailHog):
   ```bash
   docker-compose up -d
   ```

2. **Copy Environment Variables**:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Start Next.js** (runs on host, not in Docker):
   ```bash
   npm install
   npm run dev
   ```

4. **Access Services**:
   - Next.js App: http://localhost:3000
   - Convex Dashboard: http://localhost:6791
   - MailHog UI: http://localhost:8025
   - Convex API: http://localhost:3210

**Why Next.js runs on host:** The official Convex self-hosted pattern runs backend services in Docker while keeping Next.js on the host for faster development, hot reload, and proper environment variable handling.

## The app

The app is a basic multi-user chat. Walkthrough of the source code:

- [convex/auth.ts](./convex/auth.ts) configures the available authentication methods
- [convex/messages.ts](./convex/messages.ts) is the chat backend implementation
- [middleware.ts](./middleware.ts) determines which pages require sign-in
- [app/layout.tsx](./app/layout.tsx) is the main app layout
- [app/(splash)/page.tsx](<./app/(splash)/page.tsx>) is the splash page (doesn't require sign-in)
- [app/product/layout.tsx](./app/product/layout.tsx) is the "product" layout for the [product page](./app/product/page.tsx) (requires sign-in)
- [app/signin/page.tsx](./app/signin/page.tsx) is the sign-in page
- [app/product/Chat/Chat.tsx](./app/product/Chat/Chat.tsx) is the chat frontend

## Configuring other authentication methods

To configure different authentication methods, see [Configuration](https://labs.convex.dev/auth/config) in the Convex Auth docs.

## Learn more

To learn more about developing your project with Convex, check out:

- The [Tour of Convex](https://docs.convex.dev/get-started) for a thorough introduction to Convex principles.
- The rest of [Convex docs](https://docs.convex.dev/) to learn about all Convex features.
- [Stack](https://stack.convex.dev/) for in-depth articles on advanced topics.

## Join the community

Join thousands of developers building full-stack apps with Convex:

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

# Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

- Join the [Convex Discord community](https://convex.dev/community) to get help in real-time.
- Follow [Convex on GitHub](https://github.com/get-convex/), star and contribute to the open-source implementation of Convex.
