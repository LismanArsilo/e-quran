// components/motion/FadeUpItem.jsx
"use client";

import { motion } from "framer-motion";

export default function StaggerFadeUpItem({
  className = "",
  children,
  delay = 0,
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
