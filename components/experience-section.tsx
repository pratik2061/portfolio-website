interface ExperienceItem {
  company: string;
  category: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "SYNTHBIT",
    category: "BACKEND & DEVOPS // PRODUCTION SYSTEMS",
    role: "Backend & DevOps Engineer (Software Engineer)",
    period: "NOV 2025 — PRESENT",
    location: "BUTWAL, NEPAL",
    bullets: [
      "Designed normalized PostgreSQL/Prisma schemas for Attendance (AMS) and Consultancy (CMS) systems serving 500+ students.",
      "Optimized slow REST list/report endpoints with indexes, field selection, and pagination, cutting latency and payload size.",
      "Implemented JWT authentication, RBAC middleware, and Zod validation to reject malformed requests at the API boundary.",
      "Containerized services with Docker; built GitHub Actions CI/CD pipelines that deploy to VPS on merge.",
      "Provisioned and secured production Linux servers (Azure VMs, Hostinger VPS) with reverse proxy, SSL/TLS, and firewall rules.",
    ],
    tags: [
      "TYPESCRIPT",
      "REST APIS",
      "NEST JS",
      'MONGODB',
      "WEBHOOKS",
      "POSTGRESQL",
      "MICROSERVICES",
      "NEXT JS",
      "DOCKER",
      "CI/CD",
    ],
  },
  {
    company: "REFOBE",
    category: "CLIENT PLATFORMS // FRONTEND INTERNSHIP",
    role: "Frontend Developer Intern",
    period: "JAN 2025 — MAR 2025",
    location: "KATHMANDU, NEPAL",
    bullets: [
      "Built responsive, reusable React components with Tailwind CSS for client projects, keeping the UI consistent.",
      "Integrated REST APIs with TanStack Query for caching, avoiding redundant requests and handling loading/error states.",
    ],
    tags: ["REACT JS", "NEXT JS", "TAILWIND CSS", "TANSTACK QUERY", "TYPESCRIPT"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-16 md:py-20 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-tertiary">
            <span className="tracking-widest">INDEX // 02</span>
            <span className="tracking-wider">2025 — PRESENT</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary dark:text-neutral">
            Professional Experience
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-6">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="w-full border-2 sm:border-3 border-secondary/40 dark:border-secondary bg-neutral/40 dark:bg-primary/50 p-4 sm:p-6 md:p-8 transition-colors rounded"
            >
              {/* Card Meta Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-xs text-tertiary pb-1">
                <span className="tracking-widest text-[11px] sm:text-xs">
                  {exp.category}
                </span>
                <span className="tracking-wider text-[10px] sm:text-xs">
                  {exp.period} // {exp.location}
                </span>
              </div>

              {/* Role Title */}
              <h3 className="font-sans text-lg sm:text-2xl font-bold text-primary dark:text-neutral mt-0.5">
                {exp.role}
              </h3>

              {/* Divider */}
              <div className="my-3 sm:my-4 h-px w-full bg-secondary/30 dark:bg-secondary/60" />

              {/* Bullet Points */}
              <ul className="flex flex-col gap-2.5 sm:gap-3 font-sans text-xs sm:text-sm md:text-base text-tertiary">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 sm:gap-2.5">
                    <span className="font-mono text-tertiary select-none pt-0.5">
                      ›
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Tags */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="border border-secondary/50 dark:border-secondary bg-secondary/15 dark:bg-secondary/30 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono text-primary dark:text-neutral tracking-wider"
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

