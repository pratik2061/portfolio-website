import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are all required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    const recipient = "pratiksharma2061@gmail.com";
    const emailUser = process.env.EMAIL_USER || "pratiksharma2061@gmail.com";
    const emailPass = process.env.EMAIL_PASS;
    const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
    const emailPort = Number(process.env.EMAIL_PORT) || 465;

    // If SMTP credentials aren't configured in environment
    if (!emailPass) {
      return NextResponse.json(
        {
          success: false,
          notConfigured: true,
          message:
            "EMAIL_PASS not configured in environment. Fallback to client mailto.",
        },
        { status: 200 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailPort === 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const formattedTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kathmandu",
      dateStyle: "full",
      timeStyle: "long",
    });

    // Send the email
    await transporter.sendMail({
      from: `"${name} (via Portfolio)" <${emailUser}>`,
      to: recipient,
      replyTo: email,
      subject: `[Portfolio Dispatch] From ${name}`,
      text: `// INCOMING ENGINEERING DISPATCH
----------------------------------------
Name / Organization: ${name}
Return Email: ${email}
Received: ${formattedTime}
----------------------------------------

ENGINEERING BRIEF:
${message}
`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #f4f4f5; padding: 28px; border: 1px solid #27272a; border-radius: 6px;">
          <div style="font-family: monospace; font-size: 11px; color: #71717a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">
            // INCOMING ENGINEERING DISPATCH
          </div>
          <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #ffffff; border-bottom: 1px solid #27272a; padding-bottom: 12px;">
            New Message from ${name}
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #71717a; width: 140px; font-family: monospace;">NAME / ORG:</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #71717a; font-family: monospace;">RETURN EMAIL:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #71717a; font-family: monospace;">TIMESTAMP:</td>
              <td style="padding: 6px 0; color: #a1a1aa; font-family: monospace; font-size: 12px;">${formattedTime}</td>
            </tr>
          </table>

          <div style="font-family: monospace; font-size: 11px; color: #71717a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">
            ENGINEERING BRIEF:
          </div>
          <div style="background-color: #18181b; border: 1px solid #27272a; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap;">
${message}
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #27272a; font-size: 11px; color: #71717a; font-family: monospace;">
            Direct reply will be sent to: <span style="color: #d4d4d8;">${email}</span>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Failed to send dispatch email:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while transmitting dispatch.",
      },
      { status: 500 }
    );
  }
}

