import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-stone-200 selection:text-stone-900">
      {/* Document Navigation */}
      <Navigation />

      <main>
        {/* Document Header / Hero */}
        <Hero />

        {/* Technical Skills & Competencies */}
        <TechStack />

        {/* Work Experience & Roles */}
        <Experience />

        {/* Technical Projects & Repositories */}
        <Projects />

        {/* Communication Channels / Contact */}
        <Contact />
      </main>

      {/* Document Footer */}
      <Footer />
    </div>
  );
};

export default Index;
