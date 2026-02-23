"use client";

import { motion } from "framer-motion";

export default function ZoomOut({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{
        scale: 1.1,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      viewport={{ once: true, margin: "-80px" }}
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
