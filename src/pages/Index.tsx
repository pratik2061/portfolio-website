import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import { Mail, Github, Linkedin, Phone } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"experience" | "projects">("experience");

  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-xl mx-auto px-4 py-8 min-h-screen flex flex-col justify-between font-sans">
      <div>
        {/* Profile Header */}
        <section className="mb-8">
          <h1 className="text-xl font-medium tracking-tight mb-4 flex items-center justify-between">
            <span>Hey, I'm Pratik</span>
            <ThemeToggle />
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mb-6 leading-relaxed">
            Full Stack Developer &amp; DevOps Engineer from Nepal. Currently working as a DevOps Engineer &amp; Backend Developer at{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-medium underline underline-offset-2 decoration-zinc-300 dark:decoration-zinc-700"
              href="https://www.synthbitgroup.com/"
            >
              Synthbit Group
            </a>
            . Specializing in Node.js/Express backends, PostgreSQL schemas, Docker containerization, and VPS cloud infrastructure.
          </p>

          {/* Social Links Bar */}
          <div className="flex items-center gap-5">
            <div className="flex flex-row gap-4 items-center">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/pratik2061"
                aria-label="GitHub Profile"
                className="text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/pratik-sharma-937909290/"
                aria-label="LinkedIn Profile"
                className="text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:pratiksharma2061@gmail.com"
                aria-label="Send Email"
                className="text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="tel:+9779840697481"
                aria-label="Phone Contact"
                className="text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 mb-6 border-b border-transparent">
            <button
              onClick={() => setActiveTab("experience")}
              type="button"
              className={`text-sm py-1 transition-all duration-200 ease-out bg-transparent border-none outline-none cursor-pointer ${
                activeTab === "experience"
                  ? "font-semibold text-zinc-900 dark:text-zinc-100"
                  : "font-normal text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              type="button"
              className={`text-sm py-1 transition-all duration-200 ease-out bg-transparent border-none outline-none cursor-pointer ${
                activeTab === "projects"
                  ? "font-semibold text-zinc-900 dark:text-zinc-100"
                  : "font-normal text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              Projects
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="flex-1 outline-none">
            {activeTab === "experience" ? <Experience /> : <Projects />}
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="pt-8 pb-4 text-xs text-zinc-400 dark:text-zinc-500 flex justify-between items-center border-t border-zinc-100 dark:border-zinc-800/60 mt-12">
        <div>pratiksharma.info.np</div>
        <div>Built with React &amp; Vite</div>
      </footer>
    </main>
  );
};

export default Index;
