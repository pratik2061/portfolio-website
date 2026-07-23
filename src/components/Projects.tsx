import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import axios from "axios";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count?: number;
}

export interface TechnicalProject {
  name: string;
  title: string;
  summary: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
}

const projectsList: TechnicalProject[] = [
  {
    name: "KrishakMart",
    title: "KrishakMart",
    summary:
      "Agritech e-commerce digital marketplace connecting local agricultural producers directly with buyers, with real-time inventory management.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/pratik2061/KrishakMart",
  },
  {
    name: "MoodTune-AI",
    title: "MoodTune AI",
    summary:
      "Intelligent music recommendation engine analyzing user mood telemetry to curate dynamic playlists via AI API integrations.",
    tech: ["TypeScript", "React", "Node.js", "AI API Integration", "Tailwind CSS"],
    githubUrl: "https://github.com/pratik2061/MoodTune-AI",
  },
  {
    name: "siddhartha-web-portal",
    title: "Siddhartha Web Portal",
    summary:
      "Institutional web portal supporting event publishing, news releases, and staff management directories with PostgreSQL & Prisma.",
    tech: ["React", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/pratik2061/siddhartha-web-portal",
  },
];

const Projects: React.FC = () => {
  const [repoData, setRepoData] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const fetchGitHubRepoData = async () => {
      try {
        const res = await axios.get<GitHubRepo[]>(
          "https://api.github.com/users/pratik2061/repos"
        );
        setRepoData(res.data);
      } catch (error) {
        console.log("GitHub API fallback for repos");
      }
    };
    fetchGitHubRepoData();
  }, []);

  return (
    <section className="mb-12">
      <ul className="space-y-8">
        {projectsList.map((project) => {
          const fetched = repoData.find(
            (r) => r.name.toLowerCase() === project.name.toLowerCase()
          );
          const repoUrl = fetched?.html_url || project.githubUrl;

          return (
            <li
              key={project.name}
              className="group hover:translate-x-1 transition-all duration-300 ease-out"
            >
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-md font-medium text-zinc-900 dark:text-zinc-100">
                  {project.title}
                </h3>
                <div className="flex flex-row gap-3 items-center">
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 leading-relaxed">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                {project.tech.map((t, idx) => (
                  <span
                    key={t}
                    className="text-xs text-zinc-400 dark:text-zinc-500"
                  >
                    {t}
                    {idx < project.tech.length - 1 && " /"}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Projects;
