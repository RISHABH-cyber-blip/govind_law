"use client";

import { useState, useEffect, useCallback } from "react";
import { Review } from "@/lib/types/review";

export default function AdminReviewsPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Fetch reviews using cookie or stored password
  const fetchQueue = useCallback(async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch("/api/admin/reviews", {
        headers: {
          "x-admin-password": passwordInput || "",
        },
      });

      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        setAuthenticated(true);
      }
    } catch (err) {
      console.error("Error loading review queue:", err);
      setAuthenticated(false);
    } finally {
      setLoadingReviews(false);
    }
  }, [passwordInput]);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid password");
      }

      setAuthenticated(true);
      fetchQueue();
    } catch (err: any) {
      setAuthError(err.message || "Failed to authenticate.");
      setAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAction = async (id: string, newStatus: "approved" | "rejected" | "pending") => {
    setActionMessage(null);

    // Optimistic update
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );

    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": passwordInput || "",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update review status.");
      }

      setActionMessage(`Review successfully updated to ${newStatus}.`);
    } catch (err: any) {
      alert(err.message || "Failed to update review.");
      // Revert on error
      fetchQueue();
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setPasswordInput("");
  };

  const pendingList = reviews.filter((r) => r.status === "pending");
  const approvedList = reviews.filter((r) => r.status === "approved");
  const rejectedList = reviews.filter((r) => r.status === "rejected");

  const displayedList =
    activeTab === "pending"
      ? pendingList
      : activeTab === "approved"
      ? approvedList
      : rejectedList;

  // Password Lock Screen
  if (authenticated === false || authenticated === null) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-4 pt-24">
        <div className="bg-dark-card border border-gold/30 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
          <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4 text-xl">
            <i className="fas fa-lock" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-white text-center mb-2">
            Owner Moderation Gate
          </h1>
          <p className="text-gray-400 text-xs text-center mb-6">
            Private administration portal for Govind & Nikita Advocates. Please enter the site master password to continue.
          </p>

          {authError && (
            <div className="bg-red-950/80 border border-red-500/50 rounded-xl p-3 text-red-200 text-xs mb-4 text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-pass" className="block text-xs uppercase tracking-widest text-gold font-sans font-medium mb-1">
                Admin Master Password
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter ADMIN_PASSWORD..."
                className="w-full bg-black border border-[#2c2c2c] focus:border-gold rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={authLoading || !passwordInput}
              className="w-full btn-primary text-sm py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {authLoading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin text-xs" aria-hidden="true" />
                  Verifying...
                </>
              ) : (
                <>
                  <i className="fas fa-key text-xs" aria-hidden="true" />
                  Unlock Moderation Dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#252525] pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-2">
              <i className="fas fa-shield-halved text-gold text-xs" aria-hidden="true" />
              <span className="text-gold text-[11px] uppercase tracking-widest font-semibold">
                Private Moderation Panel
              </span>
            </div>
            <h1 className="font-serif text-white text-3xl md:text-4xl font-semibold">
              Review Moderation Queue
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="btn-outline text-xs py-2 px-4 flex items-center gap-2 cursor-pointer"
          >
            <i className="fas fa-arrow-right-from-bracket" aria-hidden="true" />
            Lock Panel & Exit
          </button>
        </div>

        {actionMessage && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs rounded-xl p-3 mb-6 flex items-center justify-between">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage(null)} className="text-emerald-400 font-bold">×</button>
          </div>
        )}

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "pending"
                ? "bg-gold text-black shadow-lg"
                : "bg-dark-card text-gray-300 border border-[#252525] hover:border-gold/40"
            }`}
          >
            <i className="fas fa-clock text-xs" aria-hidden="true" />
            Pending Queue ({pendingList.length})
          </button>

          <button
            onClick={() => setActiveTab("approved")}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "approved"
                ? "bg-gold text-black shadow-lg"
                : "bg-dark-card text-gray-300 border border-[#252525] hover:border-gold/40"
            }`}
          >
            <i className="fas fa-check-circle text-xs" aria-hidden="true" />
            Approved ({approvedList.length})
          </button>

          <button
            onClick={() => setActiveTab("rejected")}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "rejected"
                ? "bg-gold text-black shadow-lg"
                : "bg-dark-card text-gray-300 border border-[#252525] hover:border-gold/40"
            }`}
          >
            <i className="fas fa-ban text-xs" aria-hidden="true" />
            Rejected ({rejectedList.length})
          </button>
        </div>

        {/* Queue Items */}
        {loadingReviews ? (
          <div className="text-center py-20">
            <i className="fas fa-circle-notch fa-spin text-gold text-3xl mb-4" aria-hidden="true" />
            <p className="text-gray-400 text-xs">Loading reviews...</p>
          </div>
        ) : displayedList.length === 0 ? (
          <div className="bg-dark-card border border-[#252525] rounded-2xl p-12 text-center max-w-md mx-auto my-8">
            <i className="fas fa-inbox text-gray-600 text-3xl mb-3" aria-hidden="true" />
            <p className="text-gray-300 text-sm font-medium">No reviews in the {activeTab} list.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedList.map((review) => (
              <div
                key={review.id}
                className="bg-dark-card border border-[#262626] rounded-2xl p-6 transition-all hover:border-gold/30"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1f1f1f] pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-gold text-lg">
                        {"★".repeat(review.rating)}
                        <span className="text-gray-700 font-light">
                          {"★".repeat(5 - review.rating)}
                        </span>
                      </span>
                      <span className="font-semibold text-white text-sm">
                        {review.name || "Anonymous Client"}
                      </span>
                      <span className="text-xs text-gray-500">
                        • {new Date(review.createdAt).toLocaleString("en-IN")}
                      </span>
                      {review.reportCount > 0 && (
                        <span className="bg-red-950/80 border border-red-500/50 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {review.reportCount} Reports
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {review.status !== "approved" && (
                      <button
                        onClick={() => handleAction(review.id, "approved")}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <i className="fas fa-check" aria-hidden="true" />
                        Approve & Publish
                      </button>
                    )}

                    {review.status === "approved" && (
                      <button
                        onClick={() => handleAction(review.id, "pending")}
                        className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <i className="fas fa-eye-slash" aria-hidden="true" />
                        Unpublish to Pending
                      </button>
                    )}

                    {review.status !== "rejected" && (
                      <button
                        onClick={() => handleAction(review.id, "rejected")}
                        className="bg-red-900/80 hover:bg-red-800 text-red-100 border border-red-700/50 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <i className="fas fa-times" aria-hidden="true" />
                        Reject Review
                      </button>
                    )}
                  </div>
                </div>

                {/* Review Body */}
                <div>
                  <h3 className="font-serif text-white text-lg font-semibold mb-2">
                    {review.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap bg-black/40 border border-[#1e1e1e] p-4 rounded-xl">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
