import { Code2, Server, Cloud, Cpu } from "lucide-react";

interface SkillCategory {
  num: string;
  category: string;
  icon: any;
  skills: { name: string; detail: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    num: "01",
    category: "Frontend Engineering",
    icon: Code2,
    skills: [
      { name: "React", detail: "UI Library & Component Architecture" },
      { name: "TypeScript", detail: "Static Type Safety" },
      { name: "Tailwind CSS", detail: "Utility Design System" },
      { name: "Redux", detail: "Global State Management" },
      { name: "Zustand", detail: "Lightweight State" },
    ],
  },
  {
    num: "02",
    category: "Backend & Database Systems",
    icon: Server,
    skills: [
      { name: "Node.js", detail: "Event-driven Runtime" },
      { name: "Express.js", detail: "RESTful API Framework" },
      { name: "Nest.js", detail: "Enterprise Architecture" },
      { name: "PostgreSQL", detail: "Relational Database Engine" },
      { name: "MongoDB", detail: "Document NoSQL Store" },
      { name: "Prisma", detail: "ORM & Migration Tool" },
      { name: "Socket.IO", detail: "Real-Time WebSocket Engine" },
    ],
  },
  {
    num: "03",
    category: "DevOps & Cloud Infrastructure",
    icon: Cloud,
    skills: [
      { name: "Docker", detail: "Containerization & Docker Compose" },
      { name: "Azure", detail: "VPS Cloud Infrastructure" },
      { name: "GitHub Actions", detail: "Automated CI/CD Pipelines" },
      { name: "Hostinger", detail: "VPS (KVM) Server Management" },
      { name: "cPanel", detail: "Web Hosting Administration" },
      { name: "Git", detail: "Distributed Version Control" },
    ],
  },
];

const TechStack = () => {
  return (
    <section id="about" className="py-16 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="mb-10 flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider block mb-1">
              02. Technical Competencies
            </span>
            <h2 className="text-2xl font-bold text-stone-900 font-sans tracking-tight">
              Skills & Core Technologies
            </h2>
          </div>
          <Cpu className="w-5 h-5 text-stone-600 hidden sm:block" />
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.num} className="doc-card p-6 sm:p-8 bg-white">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-200">
                  <span className="font-mono text-xs font-bold text-stone-600 bg-stone-100 px-2 py-1 rounded border border-stone-200">
                    SECTION {cat.num}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 font-sans">
                    {cat.category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-lg bg-[#FAF8F5] border border-stone-200/90 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-stone-900 font-sans">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-stone-600 font-mono">
                        {skill.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TechStack;