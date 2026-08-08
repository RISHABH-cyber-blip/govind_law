import { Resend } from "resend";
import { Review } from "./types/review";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://govind-law.vercel.app";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendNewReviewEmail(review: Review): Promise<void> {
  if (!resend || !adminEmail) {
    console.log("[Resend Dev Fallback] New review notification triggered:", {
      id: review.id,
      title: review.title,
      rating: review.rating,
      author: review.name,
    });
    return;
  }

  const adminLink = `${siteUrl}/admin/reviews`;

  try {
    await resend.emails.send({
      from: "Govind Advocates Reviews <reviews@govind-law.vercel.app>",
      to: [adminEmail],
      subject: `⚖️ New Review Submitted: "${review.title}" (${review.rating}★)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #000000; color: #C9A84C; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 600;">Govind & Nikita Advocates</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #d0d0d0;">New Client Review Moderation Notice</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 15px; margin-bottom: 16px;">A new client review has been submitted and requires your approval before going live:</p>
            
            <div style="background-color: #f9f9f9; border-left: 4px solid #C9A84C; padding: 16px; margin-bottom: 20px; border-radius: 4px;">
              <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)} ${review.title}</p>
              <p style="margin: 0 0 12px 0; font-style: italic; color: #4a4a4a;">"${review.text}"</p>
              <p style="margin: 0; font-size: 12px; color: #777777;">Submitted by: <strong>${review.name}</strong> on ${new Date(review.createdAt).toLocaleDateString()}</p>
            </div>

            <div style="text-align: center; margin-top: 24px;">
              <a href="${adminLink}" style="background-color: #C9A84C; color: #000000; padding: 12px 24px; font-weight: bold; text-decoration: none; border-radius: 6px; display: inline-block;">
                Open Admin Dashboard to Moderate
              </a>
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 12px; color: #888888;">
            Govind & Nikita Advocates — Confidential Legal Review System
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send new review email via Resend:", error);
  }
}

export async function sendAutoFlaggedEmail(review: Review): Promise<void> {
  if (!resend || !adminEmail) {
    console.log("[Resend Dev Fallback] Auto-flagged review email triggered:", {
      id: review.id,
      title: review.title,
      reportCount: review.reportCount,
    });
    return;
  }

  const adminLink = `${siteUrl}/admin/reviews`;

  try {
    await resend.emails.send({
      from: "Govind Advocates Reviews <reviews@govind-law.vercel.app>",
      to: [adminEmail],
      subject: `🚨 Alert: Review Flagged for Re-Review ("${review.title}")`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #8B0000; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 600;">Review Auto-Flagged Notice</h2>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 15px;">The following review received <strong>${review.reportCount} user reports</strong> and has been automatically set back to <strong>Pending</strong> for your re-examination:</p>
            
            <div style="background-color: #fff5f5; border-left: 4px solid #8B0000; padding: 16px; margin-top: 16px; border-radius: 4px;">
              <p style="margin: 0 0 8px 0; font-weight: bold;">"${review.title}"</p>
              <p style="margin: 0 0 8px 0; font-style: italic; color: #4a4a4a;">"${review.text}"</p>
              <p style="margin: 0; font-size: 12px; color: #777777;">Author: ${review.name}</p>
            </div>

            <div style="text-align: center; margin-top: 24px;">
              <a href="${adminLink}" style="background-color: #8B0000; color: #ffffff; padding: 12px 24px; font-weight: bold; text-decoration: none; border-radius: 6px; display: inline-block;">
                Review Flagged Content
              </a>
            </div>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send auto-flagged email via Resend:", error);
  }
}
