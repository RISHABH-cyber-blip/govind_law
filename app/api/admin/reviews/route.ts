import { NextRequest, NextResponse } from "next/server";
import { getAllReviews } from "@/lib/kv";
import { verifyAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized access. Valid admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const reviews = await getAllReviews();

    // Sort: Pending reviews first, then by createdAt descending
    reviews.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching admin reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch review queue." },
      { status: 500 }
    );
  }
}
