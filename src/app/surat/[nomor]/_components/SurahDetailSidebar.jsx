"use client";

import FadeUp from "@/components/motions/FadeUp";
import { BookOpen, ChevronDown, Headphones } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SurahDetailSidebar({ surahs, nomor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeUp className="md:col-span-1 lg:sticky top-20 self-start">
      <div className="border bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-amber-100/50 dark:border-amber-900/30 rounded-xl shadow-sm border-t-4">
        {/* Header */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 border-b border-amber-100 dark:border-amber-900/30 flex items-center justify-between cursor-pointer md:cursor-default"
        >
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            Daftar Surah
          </h2>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full">
              {surahs.length}
            </span>

            {/* Toggle icon (mobile only) */}
            <ChevronDown
              className={`w-4 h-4 text-amber-500 transition-transform md:hidden ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Content */}
        <div
          className={`
            transition-all duration-300 overflow-hidden
            ${isOpen ? "max-h-[70vh]" : "max-h-0"}
            md:max-h-[70vh]
          `}
        >
          <div className="h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 dark:scrollbar-thumb-amber-800">
            <div className="p-2 space-y-0.5">
              {surahs.map((item) => (
                <Link
                  key={item.nomor}
                  href={`/surat/${item.nomor}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                    item.nomor == nomor
                      ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-medium border-l-2 border-amber-500"
                      : "text-slate-600 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400"
                  }`}
                >
                  <span
                    className={`w-5 h-5 flex items-center justify-center text-xs rounded-md ${
                      item.nomor == nomor
                        ? "bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-300"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {item.nomor}
                  </span>

                  <span className="flex-1 truncate">{item.namaLatin}</span>

                  {item.audio && (
                    <Headphones className="w-3 h-3 text-amber-400" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
