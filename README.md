# Pratik Sharma — Developer Portfolio

A developer telemetry-inspired, high-performance portfolio engineered with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. Designed with a minimalist, terminal-grade aesthetic featuring dynamic live telemetry, responsive theme shifting, and comprehensive SEO optimization.

---

## ⚡ Highlights & Features

- **Live GitHub Contribution Heatmap**: Directly queries and renders GitHub activity with caching, tooltips, responsive grid scaling, and fallback resilience.
- **Venom Elastic Nav Indicator**: Custom spring-overshoot (`cubic-bezier(0.22, 1.5, 0.36, 1)`) active underline with automatic live scroll-spy section tracking.
- **Zero-FOUC Theme Engine (`useTheme`)**: Custom, provider-less React 19 hook using `useSyncExternalStore` for synchronized light/dark mode with anti-flash hydration script.
- **Production Experience & System Specs**: Structured telemetry cards detailing production backend, real-time media, and DevOps achievements.
- **Technical Competency Matrix**: Multi-column breakdown of languages, systems, databases, cloud, and security frameworks.
- **Architectural Case Studies**: Highlighting distributed system designs, WebRTC SFU migrations, multi-tenant databases, and microservices.
- **Interactive Dispatch Form**: Monospace contact terminal with clipboard copy for direct email and interactive transmission state.
- **Search Engine & Social Optimization**:
  - Dynamic Edge OpenGraph card (`/opengraph-image`)
  - Automated XML Sitemap (`/sitemap.xml`)
  - Web crawler directives (`/robots.txt`)
  - Google Schema.org `Person`, `WebSite`, and `ProfilePage` JSON-LD structured data.
  - Vercel security headers (`X-Frame-Options`, `nosniff`, `Permissions-Policy`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: [Geist](https://vercel.com/font) (Geist Sans & Geist Mono)
- **Icons**: React Icons
- **Deployment**: [Vercel](https://vercel.com/) with custom `vercel.json`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pratik2061/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_GITHUB_URL=https://github.com/pratik2061
NEXT_PUBLIC_SITE_URL=https://pratiksharma.dev
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```text
├── app/
│   ├── api/
│   │   └── github-contributions/    # Cached GitHub contributions proxy
│   ├── globals.css                  # Tailwind v4 theme variables
│   ├── layout.tsx                   # Root layout, metadata & JSON-LD
│   ├── opengraph-image.tsx          # Dynamic 1200x630 social share card
│   ├── page.tsx                     # Single-page portfolio composition
│   ├── robots.ts                    # Dynamic robots.txt
│   └── sitemap.ts                   # Dynamic sitemap.xml
├── components/
│   ├── about-section.tsx            # Hero, bio & dev telemetry card
│   ├── contact-section.tsx          # Direct credentials & dispatch form
│   ├── experience-section.tsx       # Professional experience cards
│   ├── footer.tsx                   # Monospace footer with links
│   ├── github-contributions.tsx     # Dynamic full-width activity heatmap
│   ├── navbar.tsx                   # Sticky nav with stretchy scroll spy
│   ├── projects-section.tsx         # Featured system architecture cards
│   ├── stack-section.tsx            # Technical stack & competency matrix
│   └── writing-section.tsx          # Technical articles & long-form notes
├── hooks/
│   └── use-theme.ts                 # Standalone React 19 theme hook
├── public/
│   ├── profile.jpg                  # Seeded portrait image
│   └── resume/                      # PDF resume downloads
└── vercel.json                      # Edge headers & caching rules
```

---

## 📜 Available Scripts

- `pnpm dev` — Starts local Turbopack development server.
- `pnpm build` — Creates an optimized production build.
- `pnpm start` — Runs the production server locally.
- `pnpm lint` — Runs ESLint checks.

---

## 📄 License

MIT © [Pratik Sharma](https://github.com/pratik2061)
