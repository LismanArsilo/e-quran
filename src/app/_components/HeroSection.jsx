import FadeUp from "@/components/motions/FadeUp";
import ZoomIn from "@/components/motions/ZoomIn";
import { Search, Sparkles } from "lucide-react";
import React from "react";

export default function HeroSection() {
  return (
    <FadeUp className="text-center mb-12 md:mb-14">
      <ZoomIn className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-emerald-100 mb-6">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-medium text-amber-700">
          Selamat Datang di Al-Quran Digital
        </span>
      </ZoomIn>

      <h1 className="font-gravitas-one text-4xl md:text-6xl font-bold mb-4 bg-linear-to-r from-amber-400 via-yellow-600 to-orange-500 bg-clip-text text-transparent">
        E-Quran
      </h1>

      <p className="text-lg text-foreground max-w-4xl mx-auto">
        Aplikasi Al-Qur'an Digital modern dengan fitur lengkap seperti
        terjemahan, tafsir, audio murottal, pencarian ayat cepat, dan bookmark
        favorit untuk membantu kamu membaca, memahami, serta mengamalkan
        Al-Qur'an dengan lebih mudah kapan saja dan di mana saja.
      </p>
    </FadeUp>
  );
}
