import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL
  const requestedUser = searchParams.get("username");

  let username = "pratik2061";
  if (requestedUser) {
    username = requestedUser;
  } else if (githubUrl) {
    const clean = githubUrl.replace(/\/+$/, "");
    const parts = clean.split("/");
    username = parts[parts.length - 1] || "pratik2061";
  }

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ ...data, username });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch";
    return NextResponse.json(
      { error: message, username, total: { lastYear: 0 }, contributions: [] },
      { status: 502 }
    );
  }
}

