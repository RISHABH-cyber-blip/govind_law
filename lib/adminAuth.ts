import { NextRequest } from "next/server";
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
