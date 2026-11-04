"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/pratik2061";
  const linkedinUrl = "https://www.linkedin.com/in/pratik-sharma-937909290/";

  return (
    <footer className="w-full border-t border-secondary/30 dark:border-secondary bg-neutral dark:bg-primary font-mono text-[11px] sm:text-xs text-tertiary transition-colors">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="text-center sm:text-left tracking-wider">
          <span>
            © {year} PRATIK SHARMA. ALL RIGHTS RESERVED.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 tracking-wider">
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary dark:hover:text-neutral transition-colors"
          >
            GITHUB
          </Link>

          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary dark:hover:text-neutral transition-colors"
          >
            LINKEDIN
          </Link>
        </div>
      </div>
    </footer>
  );
}
