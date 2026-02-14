# Birthday Wish 18

[cloudflarebutton]

## Overview

Birthday Wish 18 is a modern, responsive web application for creating and sharing personalized 18th birthday wishes. Built with a full-stack architecture leveraging Cloudflare Workers for the backend API and React for a dynamic frontend, it features stunning animations, dark/light theme support, and a polished UI powered by shadcn/ui and Tailwind CSS.

Perfect for celebrations, this app delivers an engaging user experience with smooth interactions, error handling, and seamless deployment to Cloudflare's global edge network.

## Key Features

- **Responsive Design**: Mobile-first layout with Tailwind CSS and shadcn/ui components.
- **Theme Toggle**: Automatic dark/light mode with persistence.
- **API-First Backend**: Fast, type-safe routes using Hono on Cloudflare Workers.
- **State Management**: TanStack Query for data fetching and caching.
- **Interactive UI**: Animations, sidebars, modals, and toast notifications.
- **Error Reporting**: Built-in client-side error logging to the backend.
- **Production-Ready**: TypeScript, ESLint, optimized builds, and Cloudflare deployment.
- **Customization-Ready**: Modular structure for easy extension.

## Tech Stack

| Category       | Technologies |
|----------------|--------------|
| **Frontend**   | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix UI, Lucide React |
| **Backend**    | Cloudflare Workers, Hono |
| **Data/State** | TanStack React Query, Zustand, Immer, Zod |
| **UI/UX**      | Framer Motion, Sonner (Toasts), React Router |
| **Dev Tools**  | Bun, ESLint, TypeScript 5, Vitest-ready |
| **Deployment** | Cloudflare Pages & Workers, Wrangler |

## Prerequisites

- [Bun](https://bun.sh/) (package manager)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (for Cloudflare deployment)
- Node.js (optional, Bun handles most)

## Quick Start

1. **Clone the repository** (if local):
   ```
   git clone <your-repo-url>
   cd birthday-wish-18--tvgsjomc4osp3nfofkyc
   ```

2. **Install dependencies**:
   ```
   bun install
   ```

3. **Generate Worker types**:
   ```
   bun run cf-typegen
   ```

4. **Start development server**:
   ```
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or your configured port).

## Development Workflow

- **Hot Reload**: `bun dev` enables Vite's fast HMR for frontend and Worker reloading.
- **Linting**: `bun lint` (uses ESLint with TypeScript support).
- **Type Checking**: Handled automatically in editor and builds.
- **Testing**: Add tests in `src/` and run with Vitest (pre-configured).
- **Custom Routes**: Add API endpoints in `worker/userRoutes.ts`.
- **UI Components**: Use/extend shadcn/ui components in `src/components/ui/`.
- **Pages**: Edit `src/pages/` and update `src/main.tsx` router.

## Building for Production

```
bun build
```

Outputs static assets to `dist/` for Pages deployment and Worker bundle.

## Deployment

Deploy to Cloudflare with one command:

```
bun run deploy
```

This builds the app and deploys via Wrangler.

### Manual Deployment Steps

1. **Login to Cloudflare**:
   ```
   npx wrangler login
   ```

2. **Configure Secrets** (if needed, e.g., API keys):
   ```
   npx wrangler secret put YOUR_SECRET
   ```

3. **Deploy**:
   ```
   bun run deploy
   ```

Alternatively, use the instant deploy button:

[cloudflarebutton]

Your app will be live on `*.workers.dev` or a custom domain via Cloudflare Pages.

## Project Structure

```
├── src/              # React frontend
│   ├── components/   # UI components (shadcn/ui + custom)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utilities & error reporting
│   ├── pages/        # Route pages
│   └── main.tsx      # App entry
├── worker/           # Cloudflare Workers backend
│   ├── index.ts      # Main handler (DO NOT EDIT)
│   └── userRoutes.ts # Your API routes
├── public/           # Static assets
└── ...               # Configs (Vite, Tailwind, tsconfig)
```

## Customization

- **Branding**: Update `tailwind.config.js` colors/fonts.
- **Sidebar**: Edit `src/components/app-sidebar.tsx`.
- **API**: Extend `worker/userRoutes.ts`.
- **Theme**: Modify CSS variables in `src/index.css`.
- **Routing**: Update `src/main.tsx` router config.

## Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push and open a PR.

## License

This project is open-source and available under the MIT License. See [LICENSE](LICENSE) for details.

## Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- Report issues via GitHub.

Built with ❤️ for 18th birthday celebrations! 🎉