import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import LightningBackground from "@/components/LightningBackground";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";

const Index = () => {
  // const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LightningBackground />
      <Navigation />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <TechStack />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="relative border-t border-gray-700 py-8 bg-black text-gray-200 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base">
            © {currentYear} Full Stack Developer
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default Index;
