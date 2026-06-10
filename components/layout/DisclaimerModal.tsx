"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DisclaimerModal() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const accepted = localStorage.getItem("disclaimer_accepted");
    setShow(accepted !== "true");
  }, []);

  const handleAgree = () => {
    localStorage.setItem("disclaimer_accepted", "true");
    setShow(false);
    window.dispatchEvent(new Event("disclaimer_accepted"));
  };

  const handleDisagree = () => {
    window.location.href = "https://www.google.com";
  };

  if (show === null) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black" aria-hidden="true" />
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 bg-white text-gray-900 w-[90%] max-w-[640px] max-h-[88vh] rounded-xl overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="p-8 md:p-10">
              <div className="w-1 h-8 bg-red-500 mb-4" />

              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 tracking-wide uppercase">
                Disclaimer &amp; Confirmation
              </h2>

              <p className="text-sm leading-relaxed mb-4 text-gray-700">
                As per the rules of the Bar Council of India, advocates and law
                firms are prohibited from soliciting work or advertising in any
                manner. This website is, therefore, strictly for informational
                purposes only and should not be construed as solicitation,
                advertisement, or legal advice. No lawyer-client relationship is
                established through this website.
              </p>

              <p className="text-sm leading-relaxed mb-4 text-gray-700">
                This website is intended solely for informational purposes and
                is not to be construed as a solicitation, advertisement, or
                legal advice. Access to this website is provided only upon the
                user&apos;s specific request.
              </p>

              <p className="text-sm font-semibold mb-3 text-gray-800">
                By clicking on the &quot;I AGREE&quot; button below, the user
                acknowledges and confirms that:
              </p>

              <ol className="text-sm leading-loose text-gray-700 list-decimal pl-5 mb-4 space-y-1">
                <li>
                  The user is seeking information voluntarily and of their own
                  accord, without any solicitation, advertisement, or inducement
                  by the Firm or any of its members.
                </li>
                <li>
                  The information provided on this website is for general
                  informational purposes only and does not constitute legal
                  advice.
                </li>
                <li>
                  No lawyer-client relationship is created through access to or
                  use of this website.
                </li>
                <li>
                  The Firm shall not be responsible or liable for any actions
                  taken by the user relying on the information contained herein.
                </li>
                <li>
                  The contents of this website are the intellectual property of
                  the Firm and are protected under applicable laws.
                </li>
                <li>
                  The user has read and understood this disclaimer in its
                  entirety and agrees to be bound by it.
                </li>
              </ol>

              <p className="text-sm text-gray-700 mb-6">
                If the user does not agree to the above terms, they are advised
                to click on &quot;I DISAGREE&quot; and exit the website.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDisagree}
                  className="flex-1 py-3 px-8 border-2 border-gray-800 text-gray-800 rounded font-semibold hover:bg-gray-50 transition-colors"
                >
                  I Disagree
                </button>
                <button
                  onClick={handleAgree}
                  className="flex-1 py-3 px-8 bg-gold text-black rounded font-bold hover:bg-gold-light transition-colors"
                >
                  I Agree
                </button>
              </div>

              <p className="text-xs text-center text-gray-500 mt-6">
                By entering this website you are agreeing to our terms of use
                and privacy policy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
