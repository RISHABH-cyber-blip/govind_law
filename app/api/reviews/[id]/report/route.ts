import { NextRequest, NextResponse } from "next/server";
import { incrementReportCount, getReview } from "@/lib/kv";
import { checkReportRateLimit } from "@/lib/ratelimit";
import { sendAutoFlaggedEmail } from "@/lib/resend";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Check rate limit (5 reports per 24h)
    const rateLimit = await checkReportRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many reports submitted from your connection. Please try again later." },
        { status: 429 }
      );
    }

    const initialReview = await getReview(id);
    if (!initialReview) {
      return NextResponse.json(
        { error: "Review not found." },
        { status: 404 }
      );
    }

    const wasApproved = initialReview.status === "approved";
    const updated = await incrementReportCount(id);

    if (updated && wasApproved && updated.status === "pending") {
      // Review crossed threshold (>=3 reports) and auto-flipped back to pending
      sendAutoFlaggedEmail(updated).catch((err) => {
        console.error("Error sending auto-flagged notification email:", err);
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reporting. Our team will inspect this review.",
    });
  } catch (error) {
    console.error("Error reporting review:", error);
    return NextResponse.json(
      { error: "Failed to report review." },
      { status: 500 }
    );
  }
}
