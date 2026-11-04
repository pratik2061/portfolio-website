import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

interface Project {
  title: string;
  category: string;
  bullets: string[];
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
}

export function ProjectsSection() {
  const defaultGithubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL;

  const PROJECTS: Project[] = [
    {
      title: "Meet-Up",
      category: "REAL-TIME MEDIA // SFU INFRASTRUCTURE",
      bullets: [
        "Architected a scalable video conferencing platform, migrating from mesh WebRTC to a LiveKit SFU to eliminate O(N²) client bandwidth bottlenecks; supports HD streaming, dynamic track subscriptions, and screen sharing.",
        "Hardened security with Double Submit CSRF (auto-renewing Axios interceptors), Redis-backed rate limiting, Helmet, and a one-time auth code flow (30s Redis TTL) that fixed cross-domain OAuth cookie drops.",
      ],
      tags: [
        "LIVEKIT SFU",
        "WEBRTC",
        "NESTJS",
        "REACT 19",
        "REDIS",
        "MONGODB",
      ],
      demoUrl: "https://meetup.pratiksharma.info.np",
      codeUrl: defaultGithubUrl + "/meet-up",
    },
    {
      title: "SynthBit PTE Pro",
      category: "EDTECH // MULTI-TENANT ARCHITECTURE",
      bullets: [
        "Architected a multi-tenant PTE preparation platform, preventing cross-tenant data leakage with tenant-scoped PostgreSQL schemas and RBAC; serves 300+ active students.",
        "Kept the Node.js API responsive during heavy AI speech/writing evaluation by decoupling it from Python inference pipelines.",
      ],
      tags: [
        "REACT",
        "NODE.JS",
        "EXPRESS",
        "PYTHON",
        "POSTGRESQL",
        "REST APIS",
      ],
      demoUrl: "https://www.synthbitpte.com/",
    },
    {
      title: "KrishakMart",
      category: "E-COMMERCE // DISTRIBUTED TRANSACTIONS",
      bullets: [
        "Built an agricultural marketplace that removes middleman margins, with normalized PostgreSQL/Prisma schemas for products, orders, inventory, and dual-role portals.",
        "Prevented stock race conditions in concurrent orders with ACID transactions; used TanStack Query caching to reduce mobile network payloads for rural users.",
      ],
      tags: [
        "REACT",
        "NODE.JS",
        "EXPRESS",
        "POSTGRESQL",
        "PRISMA",
        "TAILWIND CSS",
      ],
      // demoUrl: "https://krishak-mart.vercel.app",
      codeUrl: defaultGithubUrl + "/KrishakMart",
    },
    {
      title: "MoodTune AI",
      category: "COMPUTER VISION & AI // MICROSERVICES",
      bullets: [
        "Reduced real-time emotion recognition latency by pairing YOLO face detection with a custom CNN trained on FER-2013, reaching 70% validation accuracy across 7 emotions.",
        "Served inference via FastAPI microservices that deliver mood-matched music recommendations with low overhead.",
      ],
      tags: [
        "REACT",
        "PYTHON",
        "FASTAPI",
        "TENSORFLOW",
        "CNN",
        "YOLO",
      ],
      codeUrl: defaultGithubUrl + "/MoodTune-AI",
    },
  ];

  return (
    <section id="projects" className="w-full py-16 md:py-20 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-tertiary">
            <span className="tracking-widest">INDEX // 03</span>
            <span className="tracking-wider">FEATURED SYSTEMS &amp; ARCHITECTURE</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary dark:text-neutral">
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <div
              key={index}
              className="flex flex-col hover:bg-secondary/15 hover:cursor-pointer  justify-between border border-secondary/40 dark:border-secondary bg-neutral/40 dark:bg-primary/50 p-6 sm:p-7 transition-colors hover:border-tertiary/70"
            >
              <div>
                {/* Card Meta & Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-tertiary">
                    <span className="inline-block h-1.5 w-1.5 bg-tertiary" />
                    <span className="tracking-widest">{project.category}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target={project.demoUrl !== "#" ? "_blank" : undefined}
                        rel={project.demoUrl !== "#" ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 border border-secondary/50 dark:border-secondary bg-secondary/10 dark:bg-secondary/30 px-2.5 py-1 text-[11px] text-primary dark:text-neutral hover:bg-secondary/20 transition-colors cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <GoArrowUpRight className="text-[12px]" />
                      </a>
                    )}
                    {project.codeUrl && (
                      <Link
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 border border-secondary/50 dark:border-secondary bg-secondary/10 dark:bg-secondary/30 px-2.5 py-1 text-[11px] text-primary dark:text-neutral hover:bg-secondary/20 transition-colors"
                      >
                        <FaGithub className="text-[11px]" />
                        <span>Code</span>
                        <GoArrowUpRight className="text-[11px]" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-primary dark:text-neutral mt-1">
                  {project.title}
                </h3>

                {/* Divider */}
                <div className="my-4 h-px w-full bg-secondary/30 dark:bg-secondary/60" />

                {/* Architectural Bullet Points */}
                <ul className="flex flex-col gap-3 font-sans text-sm text-tertiary">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="font-mono text-tertiary select-none pt-0.5">
                        ›
                      </span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-secondary/20 dark:border-secondary/40">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="border border-secondary/50 dark:border-secondary bg-secondary/15 dark:bg-secondary/30 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-primary dark:text-neutral tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section Divider */}
        <div className="mt-16 h-px w-full bg-secondary/30 dark:bg-secondary/60" />
      </div>
    </section>
  );
}

