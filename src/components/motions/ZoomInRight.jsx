"use client";

import { motion } from "framer-motion";

export default function ZoomInRight({
  className,
  children,
  delay = 0.3,
  duration = 0.6,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
