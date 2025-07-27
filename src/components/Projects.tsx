import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import axios from "axios";

export interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [repoData, setRepoData] = useState<GitHubRepo[]>([]);

  const fetchGitHubRepoData = async () => {
    try {
      const res = await axios.get<GitHubRepo[]>(
        "https://api.github.com/users/pratik2061/repos"
      );
      setRepoData(res.data);
    } catch (error) {
      console.error("Failed to fetch GitHub repos:", error);
    }
  };

  useEffect(() => {
    fetchGitHubRepoData();
  }, []);

  const targetRepos = [
    "KrishakMart",
    "siddhartha-web-portal",
    "Chess.com-Clone",
  ];

  const selectedRepos = repoData.filter((repo) =>
    targetRepos.includes(repo.name)
  );

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent GitHub projects
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {selectedRepos.map((repo) => (
            <motion.div
              key={repo.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="glass overflow-hidden h-full hover:neon-glow transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {repo.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {repo.description ?? "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.language && (
                      <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-md">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        View on GitHub
                      </Button>
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Site
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
