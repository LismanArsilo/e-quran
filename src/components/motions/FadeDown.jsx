// components/motion/FadeDown.jsx
"use client";

import { motion } from "framer-motion";

export default function FadeDown({
  children,
  className = "", // ⬅️ supaya wrapper ini fleksibel dikasih class dari luar
  delay = 0, // ⬅️ default delay = 0, tapi bisa dioverride per pemakaian
  duration = 0.5, // ⬅️ durasi animasi default
}) {
  return (
    <motion.div
      className={className}
      // 🔹 kondisi AWAL sebelum elemen terlihat di viewport
      initial={{
        opacity: 0,
        y: -24, // ⬅️ negatif = dari ATAS ke posisi asli (fade down)
      }}
      // 🔹 kondisi SAAT elemen masuk viewport
      whileInView={{
        opacity: 1,
        y: 0, // ⬅️ kembali ke posisi normal DOM
      }}
      // 🔹 pengaturan viewport
      viewport={{
        once: false, // ⬅️ false = animasi akan terulang
        // (scroll keluar → masuk lagi → animasi ulang)
        margin: "-80px",
        // ⬅️ animasi dipicu sedikit lebih awal sebelum benar-benar terlihat
      }}
      // 🔹 transisi animasi
      transition={{
        duration, // ⬅️ lama animasi
        delay, // ⬅️ delay animasi (mirip data-aos-delay)
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
