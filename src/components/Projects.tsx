import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import axios from "axios";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
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

  useEffect(() => {
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
    fetchGitHubRepoData();
  }, []);

  const targetRepos = ["KrishakMart", "siddhartha-web-portal", "Chess.com-Clone"];
  const selectedRepos = repoData.filter((repo) => targetRepos.includes(repo.name));

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Projects
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {selectedRepos.map((repo) => (
            <motion.div
              key={repo.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="flex"
            >
              <Card className="glass p-4 w-full flex flex-col justify-between h-auto max-h-[360px] hover:shadow-lg transition-all duration-300">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground truncate">
                    {repo.name}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm line-clamp-3">
                    {repo.description ?? "No description provided."}
                  </p>

                  {repo.language && (
                    <span className="inline-block mb-3 px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-md">
                      {repo.language}
                    </span>
                  )}
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                >
                  <Button
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </a>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
