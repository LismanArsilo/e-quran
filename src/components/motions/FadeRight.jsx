// components/motion/FadeRight.jsx
"use client";

import { motion } from "framer-motion";

export default function FadeRight({
  className = "",
  children,
  delay = 0,
  duration = 0.6,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
