# Appleville

Appleville is a small Next.js 16 app for helping users compare towns in Himachal Pradesh, take a fit quiz, and explore practical relocation guides.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Run Locally

1. Install a recent Node.js version. This project was verified with Node `24.13.1`.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Useful Commands

```bash
npm run lint
npm run build
```

## Project Structure

- `src/app` contains the App Router pages.
- `src/components` contains shared UI components.
- `src/lib/towns.ts` contains the town dataset.
- `src/lib/quiz.ts` contains quiz questions, validation, and scoring.

The main landing page lives at `src/app/page.tsx`.
