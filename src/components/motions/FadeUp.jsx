// components/motion/FadeUp.jsx
"use client";

import { motion } from "framer-motion";

export default function FadeUp({
  className = "",
  children,
  delay = 0,
  duration = 0.6,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
