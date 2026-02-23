"use client";

import { motion } from "framer-motion";

export default function StaggerFadeUp({
  className = "",
  children,
  stagger = 0.1,
  delay = 0,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
