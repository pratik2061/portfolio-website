import React from "react";

export interface ExperienceItem {
  title: string;
  company: string;
  time: string;
  description: string;
  link?: string;
  skills: string[];
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    title: "DevOps Engineer",
    company: "Synthbit Group",
    time: "Feb 2026 - Present",
    description:
      "Engineered containerization, VPS hosting configurations, and automated cloud infrastructure workflows for client projects and production services.",
    link: "https://www.synthbitgroup.com/",
    skills: ["Azure VPS", "Docker", "GitHub Actions", "Hostinger KVM", "cPanel", "Linux Shell"],
    current: true,
  },
  {
    title: "Backend Developer",
    company: "Synthbit Group",
    time: "Dec 2025 - Present",
    description:
      "Architected server-side REST APIs, database schemas, and application infrastructure using Node.js, Express, PostgreSQL, and Prisma ORM.",
    link: "https://www.synthbitgroup.com/",
    skills: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "REST APIs"],
    current: true,
  },
  {
    title: "Frontend Developer Intern",
    company: "Refobe",
    time: "Oct 2025 - Nov 2025",
    description:
      "Developed responsive, accessible web user interface modules in React & Tailwind CSS and consumed RESTful server endpoints.",
    link: "https://www.refobe.com",
    skills: ["React", "TypeScript", "Tailwind CSS", "Git"],
  },
];

const Experience: React.FC = () => {
  return (
    <section className="mb-12">
      <ul className="space-y-8">
        {experiences.map((exp, index) => (
          <li
            key={index}
            className="group hover:translate-x-1 transition-all duration-300 ease-out"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
              <h3 className="text-md font-medium text-zinc-900 dark:text-zinc-100">
                {exp.title}{" "}
                <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                  at
                </span>{" "}
                {exp.link ? (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline decoration-zinc-400 underline-offset-2"
                  >
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </h3>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
                {exp.time}
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 leading-relaxed">
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-x-1.5 gap-y-1">
              {exp.skills.map((skill, idx) => (
                <span
                  key={skill}
                  className="text-xs text-zinc-400 dark:text-zinc-500"
                >
                  {skill}
                  {idx < exp.skills.length - 1 && " /"}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Experience;