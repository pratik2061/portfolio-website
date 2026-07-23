import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "about", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { num: "01", name: "About", href: "#home", id: "home" },
    { num: "02", name: "Skills", href: "#about", id: "about" },
    { num: "03", name: "Experience", href: "#experience", id: "experience" },
    { num: "04", name: "Projects", href: "#projects", id: "projects" },
    { num: "05", name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-300 shadow-sm"
          : "bg-[#FAF8F5] border-b border-stone-200/80"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Name */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="font-bold text-slate-900 tracking-tight text-base font-sans group-hover:text-stone-600 transition-colors">
            PRATIK SHARMA
          </span>
        </a>

        {/* Desktop Numbered Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`text-xs font-medium transition-colors flex items-center gap-1.5 py-1 ${
                  isActive
                    ? "text-stone-900 font-semibold border-b-2 border-stone-900"
                    : "text-stone-700 hover:text-stone-950"
                }`}
              >
                <span className="font-mono text-[11px] text-stone-600">{item.num}.</span>
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Contact CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:pratiksharma2061@gmail.com"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded text-xs font-medium text-stone-900 bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 transition-all shadow-xs"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-700" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-stone-300 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm text-stone-800 hover:text-stone-950 font-medium"
            >
              <span className="font-mono text-xs text-stone-600">{item.num}.</span>
              <span>{item.name}</span>
            </a>
          ))}
          <div className="pt-2 border-t border-stone-200">
            <a
              href="mailto:pratiksharma2061@gmail.com"
              className="inline-flex items-center gap-1.5 w-full justify-center px-4 py-2 rounded text-xs font-semibold bg-stone-900 text-white"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
