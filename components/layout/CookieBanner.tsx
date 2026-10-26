"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const tryShow = () => {
      try {
        const disclaimerAccepted =
          localStorage.getItem("disclaimer_accepted") === "true";
        const cookieHandled = localStorage.getItem("cookie_accepted") !== null;
        if (disclaimerAccepted && !cookieHandled) {
          setTimeout(() => setShow(true), 700);
        }
      } catch {
        // storage disabled or unavailable
      }
    };

    tryShow();

    const onDisclaimerAccepted = () => {
      try {
        const cookieHandled = localStorage.getItem("cookie_accepted") !== null;
        if (!cookieHandled) {
          setTimeout(() => setShow(true), 700);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("disclaimer_accepted", onDisclaimerAccepted);
    return () =>
      window.removeEventListener("disclaimer_accepted", onDisclaimerAccepted);
  }, []);

  const accept = () => {
    try {
      localStorage.setItem("cookie_accepted", "true");
    } catch {}
    setShow(false);
  };

  const decline = () => {
    try {
      localStorage.setItem("cookie_accepted", "false");
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[900] bg-dark-gray border-t border-[#2a2a2a] shadow-2xl"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="site-container py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300 flex-1">
              This website uses cookies to ensure the best user experience and
              to improve our services. By continuing to use this website, you
              agree to our use of cookies.
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={accept}
                className="bg-gold text-black font-bold py-2 px-6 rounded hover:bg-gold-light transition-colors text-sm"
              >
                Accept
              </button>
              <button
                onClick={decline}
                className="border border-white/30 text-white py-2 px-6 rounded hover:border-white transition-colors text-sm"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
