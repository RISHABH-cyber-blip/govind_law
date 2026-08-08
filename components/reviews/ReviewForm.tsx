"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewFormProps {
  onSuccess?: () => void;
}

export default function ReviewForm({ onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [attestation, setAttestation] = useState(false);
  const [website, setWebsite] = useState(""); // Honeypot field

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const charCount = text.trim().length;
  const isMinLengthValid = charCount >= 20;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isMinLengthValid) {
      setError("Please write at least 20 characters in your review body.");
      return;
    }

    if (!attestation) {
      setError("Please confirm the self-attestation statement before submitting.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          name: name.trim() || undefined,
          title: title.trim(),
          text: text.trim(),
          attestationConfirmed: attestation,
          website: website.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review.");
      }

      setSubmittedSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/90 border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative top border line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <AnimatePresence mode="wait">
        {submittedSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-8 px-4"
          >
            <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold text-gold flex items-center justify-center mx-auto mb-5 text-2xl">
              <i className="fas fa-check" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-white mb-3">
              Review Submitted for Moderation
            </h3>
            <p className="text-gray-300 text-base max-w-md mx-auto leading-relaxed mb-6">
              Thank you for sharing your experience! Your review will appear publicly on our site once our legal team reviews and approves it.
            </p>
            <button
              onClick={() => {
                setSubmittedSuccess(false);
                setName("");
                setTitle("");
                setText("");
                setRating(5);
                setAttestation(false);
              }}
              className="btn-outline text-sm py-2.5 px-6"
            >
              Submit Another Review
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <h3 className="font-serif text-2xl font-semibold text-white mb-1">
                Share Your Experience
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Your feedback helps future clients make informed decisions. No account or registration required.
              </p>
            </div>

            {error && (
              <div className="bg-red-950/80 border border-red-500/50 rounded-xl p-4 text-red-200 text-sm flex items-start gap-3">
                <i className="fas fa-circle-exclamation text-red-400 mt-0.5" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Hidden Honeypot Field */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Star Selector */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gold font-sans font-medium mb-2">
                Overall Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating !== null ? hoverRating : rating) >= star;
                  return (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="text-2xl sm:text-3xl focus:outline-none transition-colors p-1"
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <span className={active ? "text-gold drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]" : "text-gray-600"}>
                        ★
                      </span>
                    </motion.button>
                  );
                })}
                <span className="text-sm font-sans text-gray-300 ml-3">
                  {rating === 5 && "5.0 - Exceptional"}
                  {rating === 4 && "4.0 - Very Good"}
                  {rating === 3 && "3.0 - Satisfactory"}
                  {rating === 2 && "2.0 - Below Expectations"}
                  {rating === 1 && "1.0 - Poor"}
                </span>
              </div>
            </div>

            {/* Optional Name */}
            <div>
              <label htmlFor="name-input" className="block text-xs uppercase tracking-widest text-gray-400 font-sans font-medium mb-1">
                Your Name <span className="text-gray-500 font-normal">(Optional — defaults to &quot;Anonymous Client&quot;)</span>
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="How you'd like your name to appear (e.g., Ramesh K., Corporate Client)"
                className="w-full bg-dark-card border border-[#2A2A2A] focus:border-gold rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors"
              />
            </div>

            {/* Review Title */}
            <div>
              <label htmlFor="title-input" className="block text-xs uppercase tracking-widest text-gold font-sans font-medium mb-1">
                Headline / Headline Summary *
              </label>
              <input
                id="title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Professional handling of property dispute"
                className="w-full bg-dark-card border border-[#2A2A2A] focus:border-gold rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors"
              />
            </div>

            {/* Review Text Area */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="text-input" className="block text-xs uppercase tracking-widest text-gold font-sans font-medium">
                  Detailed Review *
                </label>
                <span
                  className={`text-xs ${
                    isMinLengthValid ? "text-gray-400" : "text-amber-400"
                  }`}
                >
                  {charCount} / min 20 chars
                </span>
              </div>
              <textarea
                id="text-input"
                required
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share specific details about the legal support, communication, and court representation you received..."
                className="w-full bg-dark-card border border-[#2A2A2A] focus:border-gold rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors"
              />
            </div>

            {/* Self-Attestation Checkbox */}
            <div className="bg-dark-card/60 border border-[#252525] rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={attestation}
                  onChange={(e) => setAttestation(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-600 text-gold focus:ring-gold bg-black cursor-pointer"
                />
                <span className="text-xs text-gray-300 leading-relaxed">
                  I confirm I have consulted with or engaged <strong>Govind & Nikita Advocates</strong> and this review reflects my genuine experience. I understand that submitting a false or malicious review may be considered defamatory.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isMinLengthValid || !attestation}
              className="w-full btn-primary text-base py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin text-sm" aria-hidden="true" />
                  Submitting Review...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane text-sm" aria-hidden="true" />
                  Submit Review for Approval
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
