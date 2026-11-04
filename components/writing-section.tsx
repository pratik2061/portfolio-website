interface Article {
  title: string;
  category: string;
  date: string;
  description: string;
  readTime: string;
  url?: string;
}

const ARTICLES: Article[] = [
  {
    title: "Optimizing Postgres for Write-Heavy Multi-Tenant Workloads",
    category: "DATABASE SYSTEMS",
    date: "OCT 2024",
    description:
      "Deep analysis of vacuum tuning, fillfactor optimization, and composite index pruning under high write churn.",
    readTime: "8 min",
    url: "#",
  },
];

export function WritingSection() {
  return (
    <section id="writing" className="w-full py-16 md:py-20 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-tertiary">
            <span className="tracking-widest">INDEX // 05</span>
            <span className="tracking-wider">LONG-FORM ESSAYS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary dark:text-neutral">
            Technical Notes &amp; Articles
          </h2>
        </div>

        {/* Articles Box */}
        <div className="w-full border border-secondary/40 hover:cursor-pointer dark:border-secondary bg-neutral/40 dark:bg-primary/50 divide-y divide-secondary/30 dark:divide-secondary/60 transition-colors">
          {ARTICLES.map((article, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 p-6 sm:p-7 group hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-colors"
            >
              {/* Left Column: Metadata, Title & Summary */}
              <div className="flex flex-col gap-1.5 flex-1">
                {/* Category & Date */}
                <div className="flex items-center gap-3 text-xs text-tertiary">
                  <span className="tracking-widest text-[11px] sm:text-xs">
                    {article.category}
                  </span>
                  <span className="tracking-wider text-[11px] sm:text-xs">
                    {article.date}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="font-sans text-lg sm:text-xl font-bold text-primary dark:text-neutral  transition-colors">
                  <a href={article.url || "#"} className="cursor-pointer">
                    {article.title}
                  </a>
                </h3>

                {/* Summary Description */}
                <p className="font-sans text-xs sm:text-sm text-tertiary leading-relaxed max-w-3xl">
                  {article.description}
                </p>
              </div>

              {/* Right Column: Read Post Link */}
              <div className="shrink-0 pt-2 md:pt-0">
                <a
                  href={article.url || "#"}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary dark:text-neutral underline underline-offset-4 decoration-secondary/60 hover:decoration-primary dark:hover:decoration-neutral transition-colors cursor-pointer"
                >
                  <span>Read Post ({article.readTime})</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section Divider */}
        <div className="mt-16 h-px w-full bg-secondary/30 dark:bg-secondary/60" />
      </div>
    </section>
  );
}

