import { Mail, Github, Linkedin, Phone, MapPin, Briefcase } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export interface GitHubUserData {
  data: {
    name: string | null;
    avatar_url: string;
  };
}

const Hero = () => {
  const [userData, setUserData] = useState<GitHubUserData["data"] | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const res = (await axios.get(
          "https://api.github.com/users/pratik2061"
        )) as GitHubUserData;
        setUserData(res.data);
      } catch (error) {
        console.log("GitHub info fallback");
      }
    };
    fetchGitHubData();
  }, []);

  const avatarSrc = userData?.avatar_url || "/my_image.JPEG";
  const nameDisplay = userData?.name || "Pratik Sharma";

  return (
    <section id="home" className="pt-28 pb-16 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Document Header Card */}
        <div className="doc-card p-6 sm:p-10 bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-stone-200">
            
            {/* Avatar Frame */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-stone-300 bg-stone-100 shrink-0 shadow-xs">
              <img
                src={avatarSrc}
                alt={nameDisplay}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Primary Role */}
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-sans">
                  {nameDisplay}
                </h1>
              </div>

              <p className="text-base sm:text-lg font-semibold text-stone-700">
                Full Stack Developer & DevOps Engineer
              </p>

              {/* Quick Metadata Bar */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-stone-600 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-600" />
                  Butwal, Nepal
                </span>
                <span className="hidden sm:inline text-stone-600">•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-stone-600" />
                  Synthbit Group (DevOps & Backend)
                </span>
              </div>
            </div>

          </div>

          {/* Core Technical Profile Summary */}
          <div className="pt-6 pb-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700">
              Executive Technical Summary
            </h2>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans max-w-3xl">
              Software Engineer with 1+ years of experience engineering production web applications, architecting robust Node.js / Express backends, and managing cloud infrastructure on Azure VPS and Hostinger VPS. Hands-on expertise in containerizing workflows with Docker and configuring automated CI/CD deployment pipelines using GitHub Actions.
            </p>
          </div>

          {/* Direct Communication & Profile Links */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3 text-xs">
            <a
              href="mailto:pratiksharma2061@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>pratiksharma2061@gmail.com</span>
            </a>

            <a
              href="https://github.com/pratik2061"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-white text-stone-800 border border-stone-300 font-medium hover:bg-stone-50 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-stone-600" />
              <span>github.com/pratik2061</span>
            </a>

            <a
              href="https://www.linkedin.com/in/pratik-sharma-937909290/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-white text-stone-800 border border-stone-300 font-medium hover:bg-stone-50 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-stone-600" />
              <span>LinkedIn Profile</span>
            </a>

            <span className="inline-flex items-center gap-1.5 px-3 py-2 text-stone-600 font-mono text-xs">
              <Phone className="w-3.5 h-3.5 text-stone-600" />
              <span>+977-9840697481</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
