import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-stone-300 bg-[#FAF8F5] py-12 text-stone-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Brand & Rights */}
          <div>
            <span className="font-bold text-stone-900 font-sans">PRATIK SHARMA</span>
            <span className="font-mono text-stone-600 ml-2">© {currentYear} </span>
          </div>

          {/* Socials & Top Button */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <a
              href="https://github.com/pratik2061"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/pratik-sharma-937909290/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:pratiksharma2061@gmail.com"
              className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
