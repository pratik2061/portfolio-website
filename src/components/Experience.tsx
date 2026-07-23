import { Briefcase, ExternalLink, Calendar } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  time: string;
  description: string;
  highlights: string[];
  link: string;
  skills: string[];
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    title: "DevOps Engineer",
    company: "Synthbit Group",
    time: "Feb 2026 — Present",
    description:
      "Engineered containerization and cloud infrastructure workflows for client projects and production services.",
    highlights: [
      "Deployed and configured virtual server environments on Azure VPS and Hostinger VPS (KVM)",
      "Containerized microservices and web application dependencies using Docker and Docker Compose",
      "Automated CI/CD build and deployment pipelines using GitHub Actions to streamline continuous integration",
      "Managed DNS, SSL certificates, and server security configurations on cPanel web hosting platforms",
    ],
    link: "https://www.synthbitgroup.com/",
    skills: ["Azure VPS", "Docker", "GitHub Actions", "Hostinger KVM", "cPanel", "Linux Shell"],
    current: true,
  },
  {
    title: "Backend Developer",
    company: "Synthbit Group",
    time: "Dec 2025 — Present",
    description:
      "Architected server-side APIs, database models, and application infrastructure for high performance and scalability.",
    highlights: [
      "Designed RESTful endpoints and optimized database query performance with PostgreSQL and Prisma ORM",
      "Built asynchronous message workflows, session handling, and secure authentication handlers in Node.js",
      "Collaborated closely with client-side engineers to establish strict JSON schemas and API documentation",
    ],
    link: "https://www.synthbitgroup.com/",
    skills: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "REST APIs"],
    current: true,
  },
  {
    title: "Frontend Developer Intern",
    company: "Refobe",
    time: "2 Months",
    description:
      "Developed responsive client web interface components and integrated REST backend services.",
    highlights: [
      "Built responsive, accessible UI modules using React and Tailwind CSS framework",
      "Integrated state management and consumed RESTful server endpoints",
      "Participated in agile code reviews, Git branching strategies, and sprint planning",
    ],
    link: "https://www.refobe.com",
    skills: ["React", "TypeScript", "Tailwind CSS", "Git"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-16 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10 flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider block mb-1">
              03. Career History
            </span>
            <h2 className="text-2xl font-bold text-stone-900 font-sans tracking-tight">
              Work Experience & Technical Roles
            </h2>
          </div>
          <Briefcase className="w-5 h-5 text-stone-600 hidden sm:block" />
        </div>

        {/* Experience Document List */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="doc-card p-6 sm:p-8 bg-white space-y-5">
              
              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold text-stone-900 font-sans">
                      {exp.title}
                    </h3>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        CURRENT ROLE
                      </span>
                    )}
                  </div>

                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-stone-600 hover:text-stone-900 hover:underline mt-1"
                  >
                    <span>{exp.company}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 border border-stone-200 font-mono text-xs text-stone-700 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-stone-600" />
                  <span>{exp.time}</span>
                </div>
              </div>

              {/* Overview & Deliverables */}
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                {exp.description}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-600 block">
                  Key Technical Impact & Deliverables:
                </span>
                <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-stone-800 font-sans">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used Tags */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span key={skill} className="mono-tag">
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;