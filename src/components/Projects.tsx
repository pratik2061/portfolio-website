import { useEffect, useState } from "react";
import { FolderGit2, ExternalLink, Github, Star, Code2 } from "lucide-react";
import axios from "axios";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count?: number;
}

interface TechnicalProject {
  name: string;
  title: string;
  tag: string;
  summary: string;
  highlights: string[];
  tech: string[];
  githubUrl: string;
}

const projectsList: TechnicalProject[] = [
  {
    name: "KrishakMart",
    title: "KrishakMart — Agritech E-Commerce Platform",
    tag: "FULL-STACK WEB APP",
    summary: "Digital marketplace connecting local agricultural producers directly with buyers, featuring real-time inventory management and dynamic order workflows.",
    highlights: [
      "Built resilient client interface using React, Tailwind CSS, and optimized state management",
      "Designed Express.js REST APIs with MongoDB document schemas for flexible product listing cataloging",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/pratik2061/KrishakMart",
  },
  {
    name: "MoodTune-AI",
    title: "MoodTune AI — Intelligent Music Recommendation Engine",
    tag: "AI & WEB INTEGRATION",
    summary: "AI-assisted audio matching application analyzing user mood state and preference telemetry to curate tailored audio playlists.",
    highlights: [
      "Integrated machine learning API endpoints with TypeScript React client architecture",
      "Implemented responsive UI state management and seamless background audio metadata fetching",
    ],
    tech: ["TypeScript", "React", "Node.js", "AI API Integration", "Tailwind CSS"],
    githubUrl: "https://github.com/pratik2061/MoodTune-AI",
  },
  {
    name: "siddhartha-web-portal",
    title: "Siddhartha Institutional Web Portal",
    tag: "ENTERPRISE PORTAL",
    summary: "Institutional administrative portal supporting event publishing, news release workflows, and staff management directories.",
    highlights: [
      "Structured relational PostgreSQL database schemas managed with Prisma ORM",
      "Created modular TypeScript React dashboard components for content administrators",
    ],
    tech: ["React", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/pratik2061/siddhartha-web-portal",
  },
];

const Projects = () => {
  const [repoData, setRepoData] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const fetchGitHubRepoData = async () => {
      try {
        const res = await axios.get<GitHubRepo[]>(
          "https://api.github.com/users/pratik2061/repos"
        );
        setRepoData(res.data);
      } catch (error) {
        console.log("GitHub API fallback for repo metrics");
      }
    };
    fetchGitHubRepoData();
  }, []);

  return (
    <section id="projects" className="py-16 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10 flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider block mb-1">
              04. Technical Projects
            </span>
            <h2 className="text-2xl font-bold text-stone-900 font-sans tracking-tight">
              Featured Software Repositories
            </h2>
          </div>
          <FolderGit2 className="w-5 h-5 text-stone-600 hidden sm:block" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsList.map((project) => {
            const fetched = repoData.find(
              (r) => r.name.toLowerCase() === project.name.toLowerCase()
            );
            const stars = fetched?.stargazers_count ?? 0;
            const repoUrl = fetched?.html_url || project.githubUrl;

            return (
              <div
                key={project.name}
                className="doc-card p-6 bg-white flex flex-col justify-between doc-card-hover space-y-4"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      {project.tag}
                    </span>

                    {stars > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-stone-600">
                        <Star className="w-3.5 h-3.5 fill-stone-400 text-stone-500" />
                        <span>{stars} stars</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Overview */}
                  <h3 className="text-lg font-bold text-stone-900 font-sans mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans mb-4">
                    {project.summary}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-stone-600 block">
                      Technical Details:
                    </span>
                    <ul className="space-y-1 pl-3.5 list-disc text-xs text-stone-700 font-sans">
                      {project.highlights.map((h, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Link & Tech Tags */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="mono-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-stone-900 hover:text-stone-600 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Repository on GitHub</span>
                      <ExternalLink className="w-3 h-3 text-stone-600" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* GitHub Link CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://github.com/pratik2061?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-stone-700 hover:text-stone-950 underline"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Browse all repositories on GitHub (@pratik2061)</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
