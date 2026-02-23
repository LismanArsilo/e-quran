"use client";

import { motion } from "framer-motion";

export default function ZoomInLeft({
  className,
  children,
  delay = 0.3,
  duration = 0.6,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: -40 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
