"use client";

import { useState } from "react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [returnEmail, setReturnEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "fallback" | "error"
  >("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const email = "pratiksharma2061@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openMailtoFallback = (n = name, re = returnEmail, msg = message) => {
    const subject = encodeURIComponent(
      `[Portfolio Dispatch] From ${n.trim() || "Visitor"}`
    );
    const bodyText = encodeURIComponent(
      `Name / Organization: ${n.trim()}\nReturn Email: ${re.trim()}\n\nEngineering Brief:\n${msg.trim()}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${bodyText}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !returnEmail.trim() || !message.trim()) return;

    setStatus("sending");
    setFeedbackMsg("");

    try {
      const res = await fetch("/api/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: returnEmail.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMsg("✓ Dispatch sent successfully to Pratik.");
        setName("");
        setReturnEmail("");
        setMessage("");
        setTimeout(() => {
          setStatus("idle");
          setFeedbackMsg("");
        }, 6000);
      } else if (data.notConfigured) {
        // Direct server SMTP not yet configured in .env -> draft in user's email client
        openMailtoFallback(name, returnEmail, message);
        setStatus("fallback");
        setFeedbackMsg("✓ Opened email client with your prefilled dispatch.");
        setTimeout(() => {
          setStatus("idle");
          setFeedbackMsg("");
        }, 6000);
      } else {
        throw new Error(data.error || "Failed to transmit dispatch.");
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Transmission failed.";
      setStatus("error");
      setFeedbackMsg(errMsg);
    }
  };

  return (
    <section id="contact" className="w-full py-16 md:py-20 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-tertiary">
            <span className="tracking-widest">INDEX // 06</span>
            <span className="tracking-wider">ENCRYPTED / VERIFIED</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary dark:text-neutral">
            Initiate Communication
          </h2>
        </div>

        {/* 2-Column Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Credentials & Status */}
          <div className="lg:col-span-7 border border-secondary/40 dark:border-secondary bg-neutral/40 dark:bg-primary/50 p-4 sm:p-6 md:p-8 transition-colors">
            {/* Mission / Positioning */}
            <p className="font-sans text-sm sm:text-base lg:text-lg text-primary dark:text-neutral leading-relaxed">
              Open to Backend and Full-Stack engineering roles, contract opportunities, and collaborating on scalable web applications, APIs, or AI agent workflows.
            </p>

            {/* Divider */}
            <div className="my-5 sm:my-6 h-px w-full bg-secondary/30 dark:bg-secondary/60" />

            {/* Direct Email Field */}
            <div>
              <span className="block text-[10px] sm:text-[11px] text-tertiary tracking-widest uppercase mb-1.5">
                DIRECT EMAIL
              </span>
              <div className="flex items-center justify-between gap-2 border border-secondary/50 dark:border-secondary bg-secondary/15 dark:bg-secondary/25 px-3 py-2 text-xs sm:text-sm text-primary dark:text-neutral min-w-0">
                <span className="truncate">{email}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="border border-secondary/50 dark:border-secondary bg-secondary/20 dark:bg-secondary/40 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] text-primary dark:text-neutral hover:bg-secondary/30 transition-colors cursor-pointer shrink-0"
                >
                  {copied ? "COPIED!" : "COPY"}
                </button>
              </div>
            </div>

            {/* Office Locations */}
            <div className="mt-5">
              <span className="block text-[10px] sm:text-[11px] text-tertiary tracking-widest uppercase mb-1.5">
                LOCATIONS
              </span>
              <p className="text-xs sm:text-sm text-primary dark:text-neutral leading-relaxed">
                Butwal, Nepal • Remote • Open to Relocation &amp; Global Hybrid
              </p>
            </div>
          </div>

          {/* Right Column: Direct Dispatch Form */}
          <div className="lg:col-span-5 border border-secondary/40 dark:border-secondary bg-neutral/40 dark:bg-primary/50 p-4 sm:p-6 md:p-8 transition-colors">
            <span className="block text-[10px] sm:text-[11px] text-tertiary tracking-widest uppercase mb-4">
              DIRECT DISPATCH
            </span>

            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Name / Organization */}
              <div>
                <label
                  htmlFor="dispatch-name"
                  className="block text-[10px] text-tertiary tracking-widest uppercase mb-1.5"
                >
                  NAME / ORGANIZATION
                </label>
                <input
                  id="dispatch-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Acme Corp / Alex"
                  className="w-full border border-secondary/50 dark:border-secondary bg-secondary/15 dark:bg-secondary/25 px-3 py-2 text-base sm:text-sm text-primary dark:text-neutral placeholder:text-tertiary/40 focus:outline-none focus:border-tertiary transition-colors"
                />
              </div>

              {/* Return Email */}
              <div className="mt-4">
                <label
                  htmlFor="dispatch-email"
                  className="block text-[10px] text-tertiary tracking-widest uppercase mb-1.5"
                >
                  RETURN EMAIL
                </label>
                <input
                  id="dispatch-email"
                  type="email"
                  required
                  value={returnEmail}
                  onChange={(e) => setReturnEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full border border-secondary/50 dark:border-secondary bg-secondary/15 dark:bg-secondary/25 px-3 py-2 text-base sm:text-sm text-primary dark:text-neutral placeholder:text-tertiary/40 focus:outline-none focus:border-tertiary transition-colors"
                />
              </div>

              {/* Engineering Brief */}
              <div className="mt-4">
                <label
                  htmlFor="dispatch-message"
                  className="block text-[10px] text-tertiary tracking-widest uppercase mb-1.5"
                >
                  ENGINEERING BRIEF
                </label>
                <textarea
                  id="dispatch-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Brief project outline, timeline, or position requirements..."
                  className="w-full border border-secondary/50 dark:border-secondary bg-secondary/15 dark:bg-secondary/25 px-3 py-2 text-base sm:text-sm text-primary dark:text-neutral placeholder:text-tertiary/40 focus:outline-none focus:border-tertiary transition-colors resize-y"
                />
              </div>

              {/* Feedback Alert if present */}
              {feedbackMsg && (
                <div
                  className={`mt-4 border px-3 py-2 text-xs font-mono ${
                    status === "error"
                      ? "border-red-500/50 bg-red-500/10 text-red-500 dark:text-red-400"
                      : "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  <p>{feedbackMsg}</p>
                  {status === "error" && (
                    <button
                      type="button"
                      onClick={() => openMailtoFallback()}
                      className="mt-2 inline-block underline text-[11px] text-primary dark:text-neutral hover:opacity-80 cursor-pointer"
                    >
                      Click here to send via your email client instead →
                    </button>
                  )}
                </div>
              )}

              {/* Send Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-5 w-full bg-primary text-neutral dark:bg-neutral dark:text-primary py-3 text-xs sm:text-sm font-semibold tracking-wider hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {status === "sending" ? (
                  <span>TRANSMITTING...</span>
                ) : status === "success" ? (
                  <span>✓ DISPATCH SENT</span>
                ) : status === "fallback" ? (
                  <span>✓ EMAIL DRAFT OPENED</span>
                ) : (
                  <span>Send Dispatch →</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

