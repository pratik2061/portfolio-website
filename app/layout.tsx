import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://pratiksharma.info.np");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pratik Sharma | Full-Stack & Backend Engineer",
    template: "%s | Pratik Sharma",
  },
  description:
    "Portfolio of Pratik Sharma — Full-Stack & Backend Engineer specializing in Node.js, NestJS, React, PostgreSQL, WebRTC/LiveKit SFU, distributed microservices, Docker, and AI agents.",
  keywords: [
    // Name & identity variations
    "Pratik",
    "Sharma",
    "pratik dev",
    "Pratik Dev",
    "pratik.dev",
    "pratiksharma",
    "pratiksharma.dev",
    "pratik2061",
    "Pratik Sharma",
    "Pratik Sharma Developer",
    "Pratik Sharma Software Engineer",
    "Pratik Sharma Nepal",
    "Pratik Sharma Portfolio",

    // Roles & titles
    "Full-Stack Engineer",
    "Full-Stack Developer",
    "Backend Engineer",
    "Backend Developer",
    "Software Engineer",
    "Software Developer",
    "DevOps Engineer",
    "WebRTC Engineer",
    "AI Agent Developer",
    "Hire Backend Engineer",
    "Hire Full Stack Developer",
    "Remote Software Engineer",
    "Software Engineer Nepal",
    "Nepal Developer",
    "Butwal Developer",
    "Kathmandu Developer",

    // Languages & runtimes
    "TypeScript",
    "JavaScript",
    "Python",
    "SQL",
    "Node.js",

    // Backend frameworks & architectures
    "NestJS",
    "Express.js",
    "FastAPI",
    "Microservices",
    "Microservices Architecture",
    "Distributed Systems",
    "REST APIs",
    "RESTful APIs",

    // Real-Time & Media
    "LiveKit SFU",
    "LiveKit",
    "WebRTC",
    "Socket.IO",
    "WebSockets",
    "Audio Video Streaming",
    "Screen Sharing WebRTC",

    // AI & Automation
    "AI Agents",
    "AI Workflows",
    "n8n",
    "n8n automation",
    "TensorFlow",
    "YOLO",
    "CNN",

    // Databases & Cache
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Prisma ORM",
    "TypeORM",
    "ACID Transactions",

    // Frontend & UI
    "React",
    "React 19",
    "Next.js",
    "Next.js 16",
    "Vite",
    "TanStack Query",
    "Zustand",
    "Redux",
    "Tailwind CSS",
    "Tailwind CSS v4",
    "Recharts",

    // DevOps, Cloud & Security
    "Docker",
    "Containerization",
    "GitHub Actions",
    "CI/CD Pipelines",
    "Linux",
    "Hostinger VPS",
    "Azure VMs",
    "Cloudflare R2",
    "JWT Authentication",
    "Google OAuth 2.0",
    "Double Submit CSRF",
    "Rate Limiting",
    "Helmet",
    "RBAC",
    "Zod Validation",
  ],
  authors: [{ name: "Pratik Sharma", url: "https://github.com/pratik2061" }],
  creator: "Pratik Sharma",
  publisher: "Pratik Sharma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  classification: "Portfolio, Software Engineering, Web Development",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Pratik Sharma | Full-Stack & Backend Engineer",
    description:
      "Full-Stack Engineer specializing in Node.js, NestJS, React, PostgreSQL, WebRTC/LiveKit SFU, distributed microservices, and AI agents.",
    siteName: "Pratik Sharma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratik Sharma | Full-Stack & Backend Engineer",
    description:
      "Full-Stack Engineer building distributed backends, real-time media platforms, and high-performance web interfaces.",
    creator: "@pratik2061",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Pratik Sharma",
      alternateName: [
        "Pratik",
        "Sharma",
        "pratik dev",
        "Pratik Dev",
        "pratik.dev",
        "pratiksharma",
        "pratik2061",
      ],
      jobTitle: "Full-Stack Software Engineer",
      url: siteUrl,
      sameAs: [
        "https://github.com/pratik2061",
        "https://www.linkedin.com/in/pratik-sharma-937909290/",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Butwal",
        addressCountry: "NP",
      },
      knowsAbout: [
        "Node.js",
        "NestJS",
        "Express.js",
        "TypeScript",
        "JavaScript",
        "Python",
        "FastAPI",
        "SQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Prisma ORM",
        "TypeORM",
        "WebRTC",
        "LiveKit SFU",
        "Socket.IO",
        "WebSockets",
        "AI Agents",
        "n8n Automation",
        "Docker",
        "GitHub Actions",
        "CI/CD",
        "Linux",
        "Cloudflare R2",
        "React",
        "React 19",
        "Next.js",
        "Vite",
        "TanStack Query",
        "Zustand",
        "Redux",
        "Tailwind CSS",
        "JWT Authentication",
        "RBAC",
        "Microservices Architecture",
        "Distributed Systems",
      ],
      worksFor: {
        "@type": "Organization",
        name: "SynthBit",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Pratik Sharma Portfolio",
      description:
        "Full-Stack & Backend Engineer building distributed backends, real-time media, and high-performance web applications.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Pratik Sharma | Full-Stack & Backend Engineer",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}else{document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="light";}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
