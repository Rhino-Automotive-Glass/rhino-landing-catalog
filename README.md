

# RhinoAGlass

A modern Next.js 16 application built with TypeScript and Tailwind CSS.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Analytics

PostHog initializes through `src/instrumentation-client.ts`, following the
[PostHog Next.js integration](https://posthog.com/docs/libraries/next-js).
Existing Google Tag Manager and Vercel Analytics tracking remain active.

Set these variables in `.env.local` and in your deployment environment:

```dotenv
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_project_token
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Use your project's public project token, not a personal API key. For EU projects,
use `https://eu.i.posthog.com`; self-hosted projects should use their ingestion URL.
Restart development or rebuild/redeploy after changing these public variables.
When the token is blank or missing, PostHog stays disabled.

PostHog captures the initial pageview and client-side route changes, plus these
explicit events through the existing `trackEvent` helper:

- `cta_click`: call, email, directions, and other existing CTA clicks.
- `whatsapp_click`: existing WhatsApp entry points.
- `form_submit`: contact form submission attempted.
- `form_submit_success`: the server accepted the contact form submission.
- `form_submit_error`: the server rejected or failed the submission.

Events retain existing properties such as `button_name`, `button_label`, and
`destination`. Contact form values are never passed to the tracking helper.
DOM autocapture, session recordings, and surveys are disabled.

To verify, start the app with your PostHog variables, visit a page, navigate to
another route, and click a tracked CTA. Check PostHog's live events for
`$pageview` and the corresponding custom event. Without a configured token,
verify that the browser makes no requests to PostHog.

## Features

- ⚡ Next.js 16 with App Router
- 🎨 Tailwind CSS for styling
- 📝 TypeScript for type safety
- 🧹 ESLint for code quality
- 🔥 Fast development with Turbo

## Project Structure

```
rhinoaglass/
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── public/
│   ├── next.svg
│   └── vercel.svg
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
