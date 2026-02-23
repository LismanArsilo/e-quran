import FadeUp from "@/components/motions/FadeUp";
import { Sparkles } from "lucide-react";
import React from "react";

export default function SurahHero() {
  return (
    <FadeUp className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-amber-100 mb-4">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-medium text-amber-700">
          Al-Qur'an Digital
        </span>
      </div>

      <h1 className="font-gravitas-one text-3xl  font-bold mb-3 bg-linear-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
        Daftar Surah
      </h1>

      <p className="text-slate-600 text-sm md:text-base">
        Pilih surah untuk mulai membaca Al-Qur'an dengan terjemahan dan tafsir
        dan audio.
      </p>
    </FadeUp>
  );
}
