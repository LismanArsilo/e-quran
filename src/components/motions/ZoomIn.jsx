"use client";

import { motion } from "framer-motion";

export default function ZoomIn({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{
        scale: 0.9,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
