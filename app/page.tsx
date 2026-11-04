import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { GithubContributions } from "@/components/github-contributions";
import { ProjectsSection } from "@/components/projects-section";
import { StackSection } from "@/components/stack-section";
import { WritingSection } from "@/components/writing-section";

export default function Home() {
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-neutral dark:bg-primary transition-colors">
      <AboutSection />
      <GithubContributions githubUrl={githubUrl} />
      <ExperienceSection />
      <ProjectsSection />
      <StackSection />
      <WritingSection />
      <ContactSection />
    </main>
  );
}
