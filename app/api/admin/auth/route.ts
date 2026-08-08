import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export function getAdminToken(): string {
  const password = process.env.ADMIN_PASSWORD || "govind123";
  return crypto.createHash("sha256").update(password + "_admin_salt").digest("hex");
}

export function verifyAdmin(req: NextRequest): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || "govind123";
  const headerPassword = req.headers.get("x-admin-password");

  if (headerPassword && headerPassword === expectedPassword) {
    return true;
  }

  const authCookie = req.cookies.get("admin_auth")?.value;
  if (authCookie && authCookie === getAdminToken()) {
    return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "govind123";

    if (password !== expectedPassword) {
      return NextResponse.json(
        { error: "Incorrect admin password." },
        { status: 401 }
      );
    }

    const token = getAdminToken();
    const response = NextResponse.json({ success: true, message: "Authenticated successfully." });

    response.cookies.set("admin_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in admin authentication:", error);
    return NextResponse.json(
      { error: "Authentication failed." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out." });
  response.cookies.delete("admin_auth");
  return response;
}
