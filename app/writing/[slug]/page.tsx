import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiExternalLink, FiClock, FiCalendar, FiTag } from "react-icons/fi";
import { BlogData, BlogSectionData } from "@/data/blog";
import { BlogArticleBlock } from "@/components/blog-article-block";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const instant = false;

export async function generateStaticParams() {
  return BlogData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();

  const article = BlogData.find(
    (b) => b.slug.toLowerCase() === decodedSlug
  );

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | Pratik Sharma`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
      authors: article.author?.name ? [article.author.name] : ["Pratik Sharma"],
    },
  };
}

export default async function DynamicArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();

  const article = BlogData.find(
    (b) => b.slug.toLowerCase() === decodedSlug
  );

  if (!article) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-neutral dark:bg-primary py-12 sm:py-16 md:py-20 font-mono transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/#writing"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-tertiary hover:text-primary dark:hover:text-neutral transition-colors group cursor-pointer"
          >
            <FiArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            <span>{"Back to Writing"}</span>
          </Link>
        </div>

        {/* Article Masthead / Header */}
        <header className="pb-8 border-b border-secondary/30 dark:border-secondary/60 flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-tertiary">
            {article.category && (
              <span className="inline-flex items-center gap-1.5 border border-secondary/40 dark:border-secondary bg-secondary/10 dark:bg-secondary/20 px-2.5 py-1 text-primary dark:text-neutral text-[10px] sm:text-xs tracking-wider">
                <FiTag className="size-3" />
                <span>{article.category}</span>
              </span>
            )}

            {article.date && (
              <span className="inline-flex items-center gap-1.5 text-tertiary text-[10px] sm:text-xs">
                <FiCalendar className="size-3" />
                <span>{article.date}</span>
              </span>
            )}

            {article.readTime && (
              <span className="inline-flex items-center gap-1.5 text-tertiary text-[10px] sm:text-xs">
                <FiClock className="size-3" />
                <span>{article.readTime}</span>
              </span>
            )}
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary dark:text-neutral leading-[1.15]">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="font-sans text-base sm:text-lg text-tertiary leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Telemetry metadata bar */}
          {(article.author || article.relatedProject?.codeUrl) && (
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-tertiary border-t border-secondary/20 dark:border-secondary/40 mt-1">
              {article.author && (
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-primary dark:text-neutral font-semibold">
                    AUTHOR: {article.author.name.toUpperCase()}
                  </span>
                  {article.author.role && (
                    <>
                      <span>{"//"}</span>
                      <span>{article.author.role.toUpperCase()}</span>
                    </>
                  )}
                </div>
              )}

              {article.relatedProject?.codeUrl && (
                <div className="flex items-center gap-4">
                  <Link
                    href={article.relatedProject.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-tertiary hover:text-primary dark:hover:text-neutral transition-colors"
                  >
                    <span>PROJECT REPO</span>
                    <FiExternalLink className="size-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Quick Jump Table of Contents */}
          {article.sections.length > 0 && (
            <div className="pt-3">
              <span className="text-[10px] uppercase tracking-widest text-tertiary block mb-2 font-mono">
                {"TABLE OF CONTENTS // JUMP TO SECTION:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {article.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-[11px] font-mono border border-secondary/40 dark:border-secondary bg-secondary/10 dark:bg-secondary/20 px-2.5 py-1 text-primary dark:text-neutral hover:bg-secondary/30 transition-colors cursor-pointer"
                  >
                    #{sec.id}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Article Body: Rendered with BlogArticleBlock */}
        <section className="flex flex-col gap-10 sm:gap-14 py-8 sm:py-10">
          {article.sections.map((section: BlogSectionData, sIdx: number) => {
            const topic =
              section.topic || `SECTION // ${String(sIdx + 1).padStart(2, "0")}`;

            return (
              <BlogArticleBlock
                key={section.id || sIdx}
                id={section.id}
                index={String(sIdx + 1).padStart(2, "0")}
                topic={topic}
                heading={section.heading}
                headingLevel="h2"
                paragraphs={section.paragraphs}
                list={section.list}
                image={section.image || undefined}
                imageCaption={section.imageCaption || undefined}
                layout="stacked"
                withDivider={false}
              />
            );
          })}
        </section>

        {/* Article Footer & Related Links */}
        <footer className="mt-16 pt-8 border-t border-secondary/30 dark:border-secondary/60 flex flex-col gap-6">
          {article.relatedProject && (
            <div className="p-6 border border-secondary/40 dark:border-secondary bg-secondary/10 dark:bg-secondary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-wider text-tertiary">
                  RELATED PROJECT
                </span>
                <h4 className="font-sans text-base font-bold text-primary dark:text-neutral">
                  {article.relatedProject.title}
                </h4>
                {article.relatedProject.description && (
                  <p className="font-sans text-xs sm:text-sm text-tertiary">
                    {article.relatedProject.description}
                  </p>
                )}
              </div>
              {article.relatedProject.demoUrl && (
                <Link
                  href={article.relatedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-primary text-neutral dark:bg-neutral dark:text-primary px-4 py-2 text-xs font-medium hover:opacity-90 transition-opacity shrink-0"
                >
                  <span>View Live Demo</span>
                  <FiExternalLink className="size-3" />
                </Link>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <Link
              href="/#writing"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary dark:text-neutral border border-secondary/50 dark:border-secondary px-3.5 py-1.5 hover:bg-secondary/20 transition-colors cursor-pointer"
            >
              <FiArrowLeft className="size-3.5" />
              <span>Back to All Writing</span>
            </Link>

            <span className="text-[11px] font-mono text-tertiary">
              {"END OF ESSAY"}
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
