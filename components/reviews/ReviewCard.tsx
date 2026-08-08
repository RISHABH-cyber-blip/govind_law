"use client";

import { useState } from "react";
import { Review } from "@/lib/types/review";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [reporting, setReporting] = useState(false);
  const [confirmReport, setConfirmReport] = useState(false);
  const [reportedMessage, setReportedMessage] = useState<string | null>(null);

  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return isoStr;
    }
  };

  const handleReport = async () => {
    setReporting(true);
    try {
      const res = await fetch(`/api/reviews/${review.id}/report`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to report.");
      setReportedMessage(data.message || "Report submitted.");
    } catch (err: any) {
      setReportedMessage(err.message || "Could not report review.");
    } finally {
      setReporting(false);
      setConfirmReport(false);
    }
  };

  return (
    <div className="bg-dark-card border border-[#252525] hover:border-gold/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-full shadow-lg group">
      <div>
        {/* Rating stars & Date Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-gold text-lg tracking-wider">
            {"★".repeat(review.rating)}
            <span className="text-gray-700 font-light">
              {"★".repeat(5 - review.rating)}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-sans">
            {formatDate(review.createdAt)}
          </span>
        </div>

        {/* Title & Body */}
        <h4 className="font-serif text-white text-xl font-semibold mb-3 leading-snug group-hover:text-gold-light transition-colors">
          {review.title}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Author & Report action */}
      <div className="border-t border-[#1f1f1f] pt-4 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center text-xs font-semibold">
            {review.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            {review.name || "Anonymous Client"}
          </span>
        </div>

        {/* Report link */}
        <div className="relative">
          {reportedMessage ? (
            <span className="text-[11px] text-gray-500 italic">
              {reportedMessage}
            </span>
          ) : confirmReport ? (
            <div className="flex items-center gap-2 bg-black border border-gold/40 rounded-lg p-2 text-xs">
              <span className="text-gray-300">Flag this?</span>
              <button
                onClick={handleReport}
                disabled={reporting}
                className="text-red-400 hover:underline font-semibold"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmReport(false)}
                className="text-gray-400 hover:text-white"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReport(true)}
              className="text-gray-600 hover:text-gray-400 text-xs flex items-center gap-1 transition-colors py-1"
              title="Report inappropriate or fake review"
            >
              <i className="fas fa-flag text-[10px]" aria-hidden="true" />
              <span>Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
