"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full pt-12 sm:pt-16 pb-4 sm:pb-6">
      <div className="max-w-[65rem] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl mx-auto"
        >
          <img
            src="/journey.png"
            alt="Journey from India to Stanford"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-2 mb-2"
        >
          <p className="text-sm text-muted">
            © 2025 Arpandeep Khatua (probably? I'm not a lawyer, don't sue me)
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
