import { NextRequest, NextResponse } from "next/server";
import { updateReviewStatus } from "@/lib/kv";
import { verifyAdmin } from "@/lib/adminAuth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value. Must be 'approved', 'rejected', or 'pending'." },
        { status: 400 }
      );
    }

    const updated = await updateReviewStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { error: "Review not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      review: updated,
      message: `Review status updated to '${status}'.`,
    });
  } catch (error) {
    console.error("Error updating review status:", error);
    return NextResponse.json(
      { error: "Failed to update review status." },
      { status: 500 }
    );
  }
}
