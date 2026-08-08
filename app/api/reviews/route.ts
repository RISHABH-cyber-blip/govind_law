import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Review, ReviewStats } from "@/lib/types/review";
import { saveReview, getAllReviews } from "@/lib/kv";
import { sendNewReviewEmail } from "@/lib/resend";
import { checkSubmissionRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Check rate limit (3 submissions / 24h)
    const rateLimit = await checkSubmissionRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many submissions. You can submit up to 3 reviews per 24 hours." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, rating, title, text, attestationConfirmed, website } = body;

    // 1. Honeypot check: reject silently if honeypot field is filled
    if (website && website.trim() !== "") {
      return NextResponse.json(
        { success: true, message: "Thanks! Your review will appear once our team reviews it." },
        { status: 200 }
      );
    }

    // 2. Validation checks
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Please select a star rating between 1 and 5." },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a short headline for your review." },
        { status: 400 }
      );
    }

    if (!text || typeof text !== "string" || text.trim().length < 20) {
      return NextResponse.json(
        { error: "Review body must be at least 20 characters long." },
        { status: 400 }
      );
    }

    if (attestationConfirmed !== true) {
      return NextResponse.json(
        { error: "You must confirm the attestation checkbox before submitting." },
        { status: 400 }
      );
    }

    // 3. Create review with status "pending"
    const newReview: Review = {
      id: uuidv4(),
      name: name && typeof name === "string" && name.trim() !== "" ? name.trim() : "Anonymous Client",
      rating: Math.floor(rating),
      title: title.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      status: "pending",
      attestationConfirmed: true,
      reportCount: 0,
    };

    // Save to KV store
    await saveReview(newReview);

    // Send email notification to admin asynchronously
    sendNewReviewEmail(newReview).catch((err) => {
      console.error("Error in background email notification:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thanks! Your review will appear once our team reviews it.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "newest";
    const stars = searchParams.get("stars") || "all";

    // Fetch all reviews and filter only status: "approved"
    const all = await getAllReviews();
    const approvedReviews = all.filter((r) => r.status === "approved");

    // Calculate aggregate statistics
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalScore = 0;

    approvedReviews.forEach((r) => {
      totalScore += r.rating;
      if (r.rating >= 1 && r.rating <= 5) {
        breakdown[r.rating as keyof typeof breakdown] += 1;
      }
    });

    const total = approvedReviews.length;
    const average = total > 0 ? Number((totalScore / total).toFixed(1)) : 0;

    const stats: ReviewStats = {
      average,
      total,
      breakdown,
    };

    // Apply star filter
    let filtered = [...approvedReviews];
    if (stars !== "all") {
      const starNum = parseInt(stars, 10);
      if (!isNaN(starNum)) {
        filtered = filtered.filter((r) => r.rating === starNum);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sort === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sort === "highest") {
        return b.rating - a.rating;
      }
      if (sort === "lowest") {
        return a.rating - b.rating;
      }
      // default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({
      reviews: filtered,
      stats,
    });
  } catch (error) {
    console.error("Error fetching approved reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews." },
      { status: 500 }
    );
  }
}
