"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiCheckCircle, FiInfo, FiAlertTriangle, FiBookOpen } from "react-icons/fi";

export interface BlogSubtopicItem {
  id?: string;
  badge?: string;
  title: string;
  description?: React.ReactNode;
  points?: string[];
}

export interface BlogImageConfig {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  aspectRatio?: "16/9" | "4/3" | "21/9" | "square" | "auto";
  priority?: boolean;
  className?: string;
  allowZoom?: boolean;
}

export interface BlogCalloutConfig {
  title?: string;
  text: React.ReactNode;
  type?: "insight" | "warning" | "note" | "tip";
}

export interface BlogListConfig {
  type: "bullet" | "numbered";
  items: string[];
}

export interface BlogArticleBlockProps {
  /** Optional anchor ID for in-page navigation (e.g. 'architecture-overview') */
  id?: string;
  /** Topic kicker or category tag (e.g. 'DATABASE INTERNALS', 'SYSTEM DESIGN') */
  topic?: string;
  /** Monospace index or step number (e.g. '01', 'SECTION // 02') */
  index?: string | number;
  /** Main section topic heading */
  heading?: React.ReactNode;
  /** Heading HTML tag level (default: 'h2') */
  headingLevel?: "h1" | "h2" | "h3" | "h4";
  /** Primary description / summary paragraphs */
  description?: React.ReactNode;
  /** List of paragraphs for long-form content */
  paragraphs?: string[];
  /** Structured list (bullet or numbered) */
  list?: BlogListConfig | null;
  /** Image configuration object or image URL string */
  image?: BlogImageConfig | string;
  /** Image caption if image is provided as string */
  imageCaption?: string;
  /** Image layout style: 'stacked' (full-width), 'split' (side-by-side with text), or 'image-first' */
  layout?: "stacked" | "split" | "image-first";
  /** Single subtopic title */
  subtopic?: string;
  /** Single subtopic description */
  subtopicDescription?: React.ReactNode;
  /** Multiple structured subtopics */
  subtopics?: BlogSubtopicItem[];
  /** Optional highlight, key takeaway or technical callout */
  callout?: BlogCalloutConfig | string;
  /** Additional custom children or markdown-like content */
  children?: React.ReactNode;
  /** Additional custom classes */
  className?: string;
  /** Optional divider line beneath section */
  withDivider?: boolean;
}

/**
 * Technical Topic Badge / Kicker
 */
export function BlogTopic({
  index,
  children,
  className = "",
}: {
  index?: string | number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-tertiary uppercase tracking-wider ${className}`}
    >
      {index !== undefined && (
        <span className="inline-flex items-center border border-secondary/40 dark:border-secondary bg-secondary/10 dark:bg-secondary/20 px-2 py-0.5 text-primary dark:text-neutral font-medium">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      )}
      <span className="tracking-widest">{children}</span>
    </div>
  );
}

/**
 * Main Topic Heading
 */
export function BlogHeading({
  children,
  as: Tag = "h2",
  id,
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  id?: string;
  className?: string;
}) {
  const sizeClasses = {
    h1: "text-3xl sm:text-4xl lg:text-5xl",
    h2: "text-2xl sm:text-3xl lg:text-4xl",
    h3: "text-xl sm:text-2xl lg:text-3xl",
    h4: "text-lg sm:text-xl",
  }[Tag];

  return (
    <Tag
      id={id}
      className={`font-sans font-bold tracking-tight text-primary dark:text-neutral leading-[1.2] group scroll-mt-24 ${sizeClasses} ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Description block with crisp typography
 */
export function BlogDescription({
  children,
  className = "",
  size = "base",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "base" | "lg";
}) {
  const sizeClass = {
    sm: "text-xs sm:text-sm leading-relaxed",
    base: "text-sm sm:text-base leading-relaxed",
    lg: "text-base sm:text-lg leading-relaxed",
  }[size];

  return (
    <div className={`font-sans text-tertiary dark:text-neutral/70 space-y-4 ${sizeClass} ${className}`}>
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  );
}

/**
 * Responsive Technical Blog Image with dynamic width/height fitting
 */
export function BlogImage({
  image,
  className = "",
}: {
  image: BlogImageConfig | string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  const config: BlogImageConfig =
    typeof image === "string"
      ? { src: image, alt: "Blog diagram or illustration" }
      : image;

  return (
    <figure className={`my-6 flex flex-col gap-2.5 w-full ${className}`}>
        {/* Technical Corner Bracket / Badge */}

        {hasError ? (
          <div className="flex min-h-45 w-full flex-col items-center justify-center p-6 text-center font-mono text-xs text-tertiary">
            <FiInfo className="size-6 mb-2 opacity-60" />
            <span>[IMAGE_UNAVAILABLE: {config.src}]</span>
            <span className="mt-1 text-[11px] opacity-75">{config.alt}</span>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <Image
              src={config.src}
              alt={config.alt}
              width={config.width || 1200}
              height={config.height || 800}
              priority={config.priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
              className={`w-full h-auto max-w-full object-contain ${
                config.className || ""
              }`}
              onError={() => setHasError(true)}
            />
          </div>
        )}

      {/* Caption */}
      {config.caption && (
        <figcaption className="flex items-start gap-2 font-mono text-[11px] sm:text-xs text-tertiary leading-relaxed px-1">
          <span className="font-semibold text-primary dark:text-neutral shrink-0">
            [DETAIL]
          </span>
          <span>{config.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Subtopic block component
 */
export function BlogSubtopic({
  badge,
  index,
  title,
  description,
  points,
  children,
  className = "",
}: {
  badge?: string;
  index?: string | number;
  title: string;
  description?: React.ReactNode;
  points?: string[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-l-2 border-secondary/50 dark:border-secondary pl-4 sm:pl-5 py-1 flex flex-col gap-2 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {(badge || index !== undefined) && (
          <span className="font-mono text-[10px] sm:text-xs text-tertiary bg-secondary/15 dark:bg-secondary/30 px-1.5 py-0.5 border border-secondary/30">
            {badge || (typeof index === "number" ? String(index).padStart(2, "0") : index)}
          </span>
        )}
        <h3 className="font-sans text-base sm:text-lg font-semibold text-primary dark:text-neutral tracking-tight">
          {title}
        </h3>
      </div>

      {description && (
        <div className="font-sans text-xs sm:text-sm text-tertiary dark:text-neutral/70 leading-relaxed">
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      )}

      {points && points.length > 0 && (
        <ul className="mt-1 space-y-1.5 font-sans text-xs sm:text-sm text-tertiary dark:text-neutral/80">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary dark:text-neutral font-mono text-xs mt-0.5 select-none">
                ▹
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
}

/**
 * List container for multiple subtopics
 */
export function BlogSubtopicsList({
  subtopics,
  className = "",
}: {
  subtopics: BlogSubtopicItem[];
  className?: string;
}) {
  if (!subtopics || subtopics.length === 0) return null;

  return (
    <div className={`mt-6 space-y-5 sm:space-y-6 ${className}`}>
      {subtopics.map((item, idx) => (
        <BlogSubtopic
          key={item.id || idx}
          index={item.badge || idx + 1}
          badge={item.badge}
          title={item.title}
          description={item.description}
          points={item.points}
        />
      ))}
    </div>
  );
}

/**
 * Callout / Key Takeaway box
 */
export function BlogCallout({
  callout,
  className = "",
}: {
  callout: BlogCalloutConfig | string;
  className?: string;
}) {
  const config: BlogCalloutConfig =
    typeof callout === "string" ? { text: callout, type: "insight" } : callout;

  const icons = {
    insight: <FiCheckCircle className="size-4 shrink-0 mt-0.5 text-primary dark:text-neutral" />,
    warning: <FiAlertTriangle className="size-4 shrink-0 mt-0.5 text-amber-500" />,
    note: <FiBookOpen className="size-4 shrink-0 mt-0.5 text-primary dark:text-neutral" />,
    tip: <FiInfo className="size-4 shrink-0 mt-0.5 text-primary dark:text-neutral" />,
  };

  return (
    <div
      className={`my-6 border border-secondary/40 dark:border-secondary bg-neutral/60 dark:bg-primary/60 p-4 sm:p-5 flex items-start gap-3.5 ${className}`}
    >
      {icons[config.type || "insight"]}
      <div className="flex-1 flex flex-col gap-1">
        {config.title && (
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-primary dark:text-neutral">
            {config.title}
          </span>
        )}
        <div className="font-sans text-xs sm:text-sm text-tertiary dark:text-neutral/80 leading-relaxed">
          {typeof config.text === "string" ? <p>{config.text}</p> : config.text}
        </div>
      </div>
    </div>
  );
}

/**
 * Comprehensive Blog Article Section / Block
 * Can be used as a self-contained prop-driven component, or as a container for compound components.
 */
export function BlogArticleBlock({
  id,
  topic,
  index,
  heading,
  headingLevel = "h2",
  description,
  paragraphs,
  list,
  image,
  imageCaption,
  layout = "stacked",
  subtopic,
  subtopicDescription,
  subtopics,
  callout,
  children,
  className = "",
  withDivider = false,
}: BlogArticleBlockProps) {
  const isSplit = layout === "split";
  const isImageFirst = layout === "image-first";

  const renderHeader = () => (
    <header className="flex flex-col gap-2.5">
      {topic && <BlogTopic index={index}>{topic}</BlogTopic>}
      {heading && (
        <BlogHeading as={headingLevel} id={id}>
          {heading}
        </BlogHeading>
      )}
    </header>
  );

  const renderDescription = () => {
    if (!description && (!paragraphs || paragraphs.length === 0)) return null;
    return (
      <BlogDescription>
        {description && (
          typeof description === "string" ? <p>{description}</p> : description
        )}
        {paragraphs &&
          paragraphs.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
      </BlogDescription>
    );
  };

  const renderImage = () => {
    if (!image) return null;
    const imgConfig =
      typeof image === "string"
        ? { src: image, alt: typeof heading === "string" ? heading : "Blog illustration", caption: imageCaption }
        : { caption: imageCaption, ...image };
    if (!imgConfig.src) return null;
    return <BlogImage image={imgConfig} />;
  };

  const renderList = () => {
    if (!list || !list.items || list.items.length === 0) return null;
    const isNumbered = list.type === "numbered";

    return (
      <div className="my-3 space-y-2.5 font-sans text-xs sm:text-sm text-tertiary dark:text-neutral/80">
        {list.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5 leading-relaxed">
            <span className="font-mono text-[11px] sm:text-xs text-primary dark:text-neutral bg-secondary/15 dark:bg-secondary/30 px-1.5 py-0.5 border border-secondary/30 shrink-0 select-none">
              {isNumbered ? `${i + 1}.` : "▹"}
            </span>
            <div className="flex-1">{item}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderSubtopics = () => (
    <>
      {subtopic && (
        <div className="mt-6">
          <BlogSubtopic
            title={subtopic}
            description={subtopicDescription}
          />
        </div>
      )}
      {subtopics && subtopics.length > 0 && (
        <BlogSubtopicsList subtopics={subtopics} />
      )}
    </>
  );

  const renderCallout = () =>
    callout ? <BlogCallout callout={callout} /> : null;

  return (
    <article
      id={id}
      className={`w-full scroll-mt-24 ${className}`}
    >
      {/* Layout Option 1: Split 2-column layout (Text left, Image right) */}
      {isSplit && image ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-5">
            {renderHeader()}
            {renderDescription()}
            {renderList()}
            {renderSubtopics()}
            {renderCallout()}
            {children}
          </div>
          <div className="lg:col-span-5 sticky top-20">
            {renderImage()}
          </div>
        </div>
      ) : isImageFirst ? (
        /* Layout Option 2: Image First (Hero/Diagram-lead block) */
        <div className="flex flex-col gap-6">
          {renderImage()}
          {renderHeader()}
          {renderDescription()}
          {renderList()}
          {renderSubtopics()}
          {renderCallout()}
          {children}
        </div>
      ) : (
        /* Layout Option 3: Stacked (Standard editorial long-form flow) */
        <div className="flex flex-col gap-5 max-w-4xl">
          {renderHeader()}
          {renderDescription()}
          {renderImage()}
          {renderList()}
          {renderSubtopics()}
          {renderCallout()}
          {children}
        </div>
      )}

      {/* Optional divider line */}
      {withDivider && (
        <div className="mt-8 h-px w-full bg-secondary/30 dark:bg-secondary/60" />
      )}
    </article>
  );
}

// Compound component attachments for flexible JSX composition:
export const BlogBlock = Object.assign(BlogArticleBlock, {
  Topic: BlogTopic,
  Heading: BlogHeading,
  Description: BlogDescription,
  Image: BlogImage,
  Subtopic: BlogSubtopic,
  SubtopicsList: BlogSubtopicsList,
  Callout: BlogCallout,
});

export default BlogArticleBlock;

