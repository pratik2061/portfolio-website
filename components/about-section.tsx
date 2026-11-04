"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { GoLink } from "react-icons/go";

export function AboutSection() {
  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL;
  const githubUsername =
    githubUrl?.replace(/\/+$/, "").split("/").pop() || "pratik2061";
  const githubAvatarUrl = `https://github.com/${githubUsername}.png`;

  const [imageSrc, setImageSrc] = useState("/profile.jpg");
  return (
    <section
      id="about"
      className="relative w-full  flex items-center justify-center min-h-dvh"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono text-[11px] sm:text-xs">
              <div className="inline-flex items-center gap-1.5 border border-secondary/40 dark:border-secondary bg-secondary/10 dark:bg-secondary/20 px-2.5 py-1 text-primary dark:text-neutral">
                <span className="tracking-wide">SYS.STATUS: AVAILABLE</span>
              </div>

              <div className="inline-flex items-center border border-secondary/40 dark:border-secondary bg-secondary/10 dark:bg-secondary/20 px-2.5 py-1 text-primary dark:text-neutral tracking-wide">
                BUTWAL, NEPAL [UTC+5:45]
              </div>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary dark:text-neutral leading-[1.08]">
              FullStack Engineer building distributed backends and high performance web interfaces.
            </h1>

            <p className="max-w-xl font-sans text-base sm:text-lg leading-relaxed text-tertiary">Over 2 years of experience building backend-focused web applications. I work with Node.js, NestJS, Express, and React to build fast, secure APIs and clean interfaces. I design microservices based architectures and build AI agents and workflow automation with n8n. For data and infrastructure, I use PostgreSQL, MongoDB, Redis, Prisma, and Docker, with CI/CD pipelines through GitHub Actions.</p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 font-mono text-xs sm:text-sm">
              <a
                href="#writing"
                className="inline-flex items-center justify-center bg-primary text-neutral dark:bg-neutral dark:text-primary px-4 py-2.5 font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                View Case Studies
              </a>

              <a
                href="/resume/pratikResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-secondary/50 dark:border-secondary bg-transparent px-4 py-2.5 text-primary dark:text-neutral hover:bg-secondary/20 transition-colors cursor-pointer"
              >
                Read Resume (PDF)
              </a>


              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com/pratik2061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary dark:text-neutral hover:text-tertiary transition-colors"
                >
                  <FaGithub className="size-4" />
                  <span>GitHub</span>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/pratik-sharma-937909290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary dark:text-neutral hover:text-tertiary transition-colors"
                >
                  <GoLink className="size-4" />
                  <span>LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Dev Telemetry Card */}
          <div className="w-full lg:col-span-5">
            <div className="relative aspect-4/3 w-full rounded-xl border border-secondary/40 dark:border-secondary bg-secondary/15 dark:bg-secondary/25 overflow-hidden flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0  bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-size-[20px_20px]" />
              <Image
                src={imageSrc}
                alt="Profile portrait"
                fill
                className="object-cover rounded-xl"
                priority
                onError={() => setImageSrc(githubAvatarUrl)}
              />
            </div>

            {/* Telemetry Specs Table */}
            <div className="lg:mt-20 md:mt-10 mt-5 flex flex-col divide-y divide-secondary/30 dark:divide-secondary/60 text-[11px] sm:text-xs">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-tertiary tracking-wider">CORE STACK</span>
                <span className="font-medium text-primary dark:text-neutral tracking-wider">
                  Node js / Nest js / React js
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-tertiary tracking-wider">INFRASTRUCTURE</span>
                <span className="font-medium text-primary dark:text-neutral tracking-wider">
                  Docker / Jenkins / Kubernetes
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-tertiary tracking-wider">EXPERIENCE</span>
                <span className="font-medium text-primary dark:text-neutral tracking-wider">
                  2 YEARS
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-tertiary tracking-wider">PRIMARY FOCUS</span>
                <span className="font-medium text-primary dark:text-neutral tracking-wider">
                  Microservices &amp; Agentic AI workflows
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

