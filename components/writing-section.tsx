import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";
import { BlogData } from "@/data/blog";

export function WritingSection() {
  return (
    <section id="writing" className="w-full py-16 md:py-20 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-tertiary">
            <span className="tracking-widest">{"INDEX // 05"}</span>
            <span className="tracking-wider">LONG-FORM ESSAYS &amp; NOTES</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary dark:text-neutral">
            Technical Notes &amp; Articles
          </h2>
          <p className="font-sans text-xs sm:text-sm text-tertiary max-w-2xl mt-1">
            Deep-dives into distributed backends, real-time protocols, and system architecture lessons learned while building production systems.
          </p>
        </div>

        {/* Article Index / List */}
        <div className="w-full border border-secondary/40 dark:border-secondary bg-neutral/40 dark:bg-primary/50 divide-y divide-secondary/30 dark:divide-secondary/60 transition-colors">
          {BlogData.map((article, index) => {
            const articleHref = `/writing/${article.slug}`;

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 p-4 sm:p-6 md:p-7 group hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-colors"
              >
                {/* Left Column: Metadata, Title & Subtitle */}
                <div className="flex flex-col gap-2 flex-1">
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-tertiary">
                    {article.category && (
                      <span className="inline-flex items-center border border-secondary/40 dark:border-secondary bg-secondary/10 dark:bg-secondary/20 px-2 py-0.5 text-primary dark:text-neutral tracking-widest text-[10px] sm:text-xs">
                        {article.category}
                      </span>
                    )}
                    {article.date && (
                      <span className="tracking-wider text-[10px] sm:text-xs text-tertiary">
                        {article.date}
                      </span>
                    )}
                    {article.readTime && (
                      <span className="text-tertiary tracking-wider text-[10px] sm:text-xs">
                        • {article.readTime.toUpperCase()} READ
                      </span>
                    )}
                  </div>

                  {/* Article Title Link */}
                  <h3 className="font-sans text-lg sm:text-2xl font-bold text-primary dark:text-neutral transition-colors">
                    <Link
                      href={articleHref}
                      className="hover:underline underline-offset-4 decoration-secondary/60 cursor-pointer"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  {/* Subtitle / Overview */}
                  {article.subtitle && (
                    <p className="font-sans text-xs sm:text-sm text-tertiary leading-relaxed max-w-3xl">
                      {article.subtitle}
                    </p>
                  )}
                </div>

                {/* Right Column: Direct Navigation Link */}
                <div className="shrink-0 pt-1 md:pt-0">
                  <Link
                    href={articleHref}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium border border-secondary/50 dark:border-secondary bg-secondary/10 dark:bg-secondary/25 px-3.5 py-2 text-primary dark:text-neutral hover:bg-secondary/20 dark:hover:bg-secondary/35 transition-all cursor-pointer group/btn"
                  >
                    <FiBookOpen className="size-3.5" />
                    <span>Read Post{article.readTime ? ` (${article.readTime})` : ""}</span>
                    <span className="text-sm transition-transform group-hover/btn:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section Divider */}
        <div className="mt-16 h-px w-full bg-secondary/30 dark:bg-secondary/60" />
      </div>
    </section>
  );
}
