interface StackCategory {
  title: string;
  description: string;
  skills: string[];
}

const STACK_CATEGORIES: StackCategory[] = [
  {
    title: "Languages & Core",
    description: "Type-Safe Foundations & Querying",
    skills: ["TYPESCRIPT", "JAVASCRIPT", "PYTHON", "SQL"],
  },
  {
    title: "Backend & Systems",
    description: "Distributed Microservices & AI Agent Workflows",
    skills: [
      "AI AGENTS",
      "MICROSERVICES",
      "NODE.JS",
      "NESTJS",
      "EXPRESS.JS",
      "FASTAPI",
      "REST APIS",
    ],
  },
  {
    title: "Real-Time & Media",
    description: "Low-Latency Media & Streaming",
    skills: [
      "LIVEKIT SFU",
      "WEBRTC",
      "SOCKET.IO",
      "WEBSOCKETS",
      "AUDIO/VIDEO TRACKS",
      "SCREEN SHARING",
    ],
  },
  {
    title: "Security & Auth",
    description: "Zero-Trust Boundary & Defensive Architecture",
    skills: [
      "JWT",
      "GOOGLE OAUTH 2.0",
      "DOUBLE SUBMIT CSRF",
      "RATE LIMITING",
      "HELMET",
      "RBAC",
    ],
  },
  {
    title: "Frontend & State",
    description: "Design Systems & High Performance Web",
    skills: [
      "REACT 19",
      "VITE",
      "TANSTACK QUERY",
      "ZUSTAND",
      "REDUX",
      "TAILWIND CSS V4",
      "HTML5 / CSS3",
    ],
  },
  {
    title: "Databases & DevOps",
    description: "Storage Topologies & Containerized CI/CD",
    skills: [
      "POSTGRESQL",
      "MONGODB",
      "REDIS",
      "PRISMA ORM",
      "TYPEORM",
      "DOCKER",
      "GITHUB ACTIONS",
      "CLOUDFLARE R2",
    ],
  },

];

export function StackSection() {
  return (
    <section id="stack" className="w-full py-16 md:py-20 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-tertiary">
            <span className="tracking-widest">INDEX // 04</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary dark:text-neutral">
            Technical Stack &amp; Competency Matrix
          </h2>
        </div>

        {/* Matrix Box */}
        <div className="w-full border border-secondary/40 dark:border-secondary bg-neutral/40 dark:bg-primary/50 divide-y divide-secondary/30 dark:divide-secondary/60 transition-colors">
          {STACK_CATEGORIES.map((category, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 lg:gap-8 p-4 sm:p-6 lg:p-7"
            >
              {/* Category Name Column */}
              <div className="flex flex-col gap-1 lg:w-64 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="inline-block h-2 w-2 bg-primary/70 dark:bg-neutral/70 shrink-0" />
                  <h3 className="text-sm sm:text-base font-semibold text-primary dark:text-neutral tracking-wide">
                    {category.title}
                  </h3>
                </div>
                {/* Mobile-visible description */}
                <span className="xl:hidden text-[11px] text-tertiary font-sans pl-4.5">
                  {category.description}
                </span>
              </div>

              {/* Skills Tags Column */}
              <div className="flex-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="border border-secondary/50 dark:border-secondary bg-secondary/15 dark:bg-secondary/30 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono text-primary dark:text-neutral tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Competency Note Column (Desktop xl) */}
              <div className="hidden xl:block text-right shrink-0 lg:w-72">
                <span className="text-xs text-tertiary font-sans">
                  {category.description}
                </span>
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

