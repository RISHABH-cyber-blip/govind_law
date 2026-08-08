"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { ReviewStats } from "@/lib/types/review";

interface ReviewsSummaryProps {
  showSeeAllLink?: boolean;
}

export default function ReviewsSummary({ showSeeAllLink = false }: ReviewsSummaryProps) {
  const [stats, setStats] = useState<ReviewStats>({
    average: 4.9,
    total: 150,
    breakdown: { 5: 140, 4: 8, 3: 2, 2: 0, 1: 0 },
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [displayRating, setDisplayRating] = useState("4.9");
  const [displayTotal, setDisplayTotal] = useState(150);

  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      try {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const res = await fetch(`${origin}/api/reviews?status=approved`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.stats && data.stats.total > 0) {
            setStats(data.stats);
          }
        }
      } catch (err) {
        console.error("Failed to load review stats:", err);
      }
    }
    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      // Animate rating count up
      const controlsRating = animate(0, stats.average, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayRating(value.toFixed(1));
        },
      });

      // Animate total count up
      const controlsTotal = animate(0, stats.total, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayTotal(Math.floor(value));
        },
      });

      return () => {
        controlsRating.stop();
        controlsTotal.stop();
      };
    }
  }, [isInView, stats]);

  return (
    <div
      ref={containerRef}
      className="bg-black/80 border border-gold/30 rounded-2xl p-5 md:p-6 backdrop-blur-md shadow-2xl relative overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Rating count & calculated stars */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif text-4xl md:text-5xl font-bold text-gold leading-none tracking-tight">
              {displayRating}
            </span>
            <span className="text-[11px] text-gray-400 mt-1 font-sans">Out of 5.0</span>
          </div>

          <div className="border-l border-[#262626] pl-4">
            <div className="flex items-center gap-1 text-gold text-lg mb-0.5">
              {"★".repeat(Math.round(stats.average || 5))}
              <span className="text-gray-700 font-light">
                {"★".repeat(5 - Math.round(stats.average || 5))}
              </span>
            </div>
            <p className="text-gray-200 font-serif text-base font-medium">
              Verified Client Rating
            </p>
            <p className="text-gray-400 text-xs font-sans mt-0.5">
              Based on <strong className="text-white">{displayTotal}+</strong> approved client reviews
            </p>
          </div>
        </div>

        {/* Optional Action link */}
        {showSeeAllLink && (
          <div className="flex items-center gap-3">
            <Link
              href="/reviews"
              className="text-gold hover:text-gold-light text-sm font-sans font-medium inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>See All Reviews</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
