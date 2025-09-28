# Timeslot Seeker — Frontend (Next.js)

Brief frontend GUI for the Timeslot Seeker application. This Next.js app provides a simple interface for users to view and reserve available timeslots served by a FastAPI backend.

## Tech

-   Next.js (React + TypeScript)
-   Tailwind / PostCSS (configured in project)

## Quick start

1. Install dependencies

    ```bash
    npm install
    # or: pnpm install
    # or: yarn
    ```

2. Create environment file

    Copy or create `.env.local` at the project root and set the backend URL used by the frontend. Example:

    ```env
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
    ```

    Replace with the production backend URL when deploying.

3. Run the dev server

    ```bash
    npm run dev
    # or: pnpm dev
    # or: yarn dev
    ```

4. Build for production

    ```bash
    npm run build
    npm start
    # or: pnpm build && pnpm start
    ```

## Environment variables

-   `NEXT_PUBLIC_BACKEND_URL` — base URL for the FastAPI backend (used by the client to make API requests). The frontend expects the backend to expose the API endpoints for listing and booking timeslots.

## Connecting to the backend

This frontend pairs with the Timeslot Seeker FastAPI backend. Add the backend repo URL here or update `NEXT_PUBLIC_BACKEND_URL` to point at your backend server.

Example placeholder for the backend repo (replace with the real URL):

```
https://github.com/<your-org>/timeslot-seeker-fastapi
```

## Deployment notes

-   Ensure `NEXT_PUBLIC_BACKEND_URL` points to the production API.
-   If deploying to Vercel, add the env var to the project settings.

## Contributing

Small changes are welcome. Open an issue or PR and include a short description of the change.

## License

Include your preferred license here.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
