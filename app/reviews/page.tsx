"use client";

import { useEffect, useState, useCallback } from "react";
import { Metadata } from "next";
import { motion, AnimatePresence } from "framer-motion";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewForm from "@/components/reviews/ReviewForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { Review, ReviewStats } from "@/lib/types/review";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Sorting state
  const [starFilter, setStarFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("newest");

  // Toggle review submission form drawer
  const [showForm, setShowForm] = useState(false);

  const fetchApprovedReviews = useCallback(async () => {
    setLoading(true);
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const url = `${origin}/api/reviews?status=approved&stars=${starFilter}&sort=${sortOption}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [starFilter, sortOption]);

  useEffect(() => {
    fetchApprovedReviews();
  }, [fetchApprovedReviews]);

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gold/5 blur-[120px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
            <i className="fas fa-star text-gold text-xs" aria-hidden="true" />
            <span className="text-gold text-xs font-sans tracking-[2px] uppercase font-semibold">
              Verified Client Feedback
            </span>
          </div>
          <h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
            Client Reviews & Testimonials
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Read transparent, verified reviews from clients across Delhi NCR. Every submission undergoes manual moderation before publication.
          </p>

          {/* Aggregate Rating Banner */}
          {stats && stats.total > 0 && (
            <div className="mt-8 inline-flex items-center gap-4 bg-dark-card border border-gold/30 rounded-2xl px-6 py-3.5 shadow-xl">
              <div className="font-serif text-gold text-3xl font-bold">
                {stats.average.toFixed(1)}
              </div>
              <div className="text-left border-l border-[#2c2c2c] pl-4">
                <div className="text-gold text-sm tracking-wider">
                  {"★".repeat(Math.round(stats.average))}
                </div>
                <div className="text-xs text-gray-400 font-sans mt-0.5">
                  Based on <strong className="text-white">{stats.total}</strong> approved client experiences
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Write Review Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="btn-primary text-base py-3.5 px-8 rounded-xl flex items-center gap-3 mx-auto cursor-pointer shadow-lg hover:shadow-gold/20 transition-all"
          >
            <i className={`fas ${showForm ? "fa-times" : "fa-pen-to-square"}`} aria-hidden="true" />
            <span>{showForm ? "Close Review Form" : "Write a Review"}</span>
          </button>
        </div>

        {/* Collapsible Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto mb-16 overflow-hidden"
            >
              <ReviewForm
                onSuccess={() => {
                  fetchApprovedReviews();
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter and Sorting Controls Bar */}
        <div className="bg-dark-card border border-[#252525] rounded-2xl p-4 sm:p-6 mb-10 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Star Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-center lg:justify-start">
              <span className="text-xs uppercase tracking-widest text-gold font-sans font-semibold mr-2 hidden sm:inline">
                Filter:
              </span>
              {[
                { label: "All Reviews", value: "all" },
                { label: "5 ★", value: "5" },
                { label: "4 ★", value: "4" },
                { label: "3 ★", value: "3" },
                { label: "2 ★", value: "2" },
                { label: "1 ★", value: "1" },
              ].map((pill) => {
                const isActive = starFilter === pill.value;
                const count =
                  pill.value === "all"
                    ? stats?.total || 0
                    : stats?.breakdown[parseInt(pill.value, 10) as keyof typeof stats.breakdown] || 0;

                return (
                  <button
                    key={pill.value}
                    onClick={() => setStarFilter(pill.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-sans transition-all cursor-pointer ${
                      isActive
                        ? "bg-gold text-black font-semibold shadow-md"
                        : "bg-black/60 text-gray-300 border border-[#2c2c2c] hover:border-gold/50"
                    }`}
                  >
                    {pill.label} {count > 0 && <span className="opacity-75">({count})</span>}
                  </button>
                );
              })}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-end border-t lg:border-t-0 border-[#222222] pt-4 lg:pt-0">
              <label htmlFor="sort-select" className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium whitespace-nowrap">
                Sort By:
              </label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-black border border-[#2c2c2c] focus:border-gold rounded-xl px-4 py-2 text-white text-xs font-sans focus:outline-none transition-colors cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-20">
            <i className="fas fa-circle-notch fa-spin text-gold text-3xl mb-4" aria-hidden="true" />
            <p className="text-gray-400 text-sm font-sans">Loading verified reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ReviewCard review={rev} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-dark-card border border-[#252525] rounded-2xl p-12 text-center max-w-lg mx-auto my-12">
            <div className="w-14 h-14 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4 text-xl">
              <i className="fas fa-comment-slash" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-white text-xl font-semibold mb-2">
              No Reviews Match Selected Criteria
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {starFilter !== "all"
                ? `There are currently no approved ${starFilter}-star reviews.`
                : "No approved client reviews found yet."}
            </p>
            {starFilter !== "all" && (
              <button
                onClick={() => setStarFilter("all")}
                className="btn-outline text-xs py-2 px-5"
              >
                View All Approved Reviews
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
