import FadeUp from "@/components/motions/FadeUp";
import ZoomIn from "@/components/motions/ZoomIn";
import ScrollToTopButton from "@/components/share/ScrollToTopButton";
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  Layers,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import SurahDetailSidebar from "./_components/SurahDetailSidebar";

async function getAllSurah() {
  const res = await fetch("https://equran.id/api/v2/surat", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.data;
}

async function getSurahDetail(nomor) {
  const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`, {
    cache: "no-store", // selalu fresh
  });
  const data = await res.json();
  return data.data;
}

export default async function SurahDetailPage({ params }) {
  const { nomor } = await params;

  const surahs = await getAllSurah();
  const surah = await getSurahDetail(nomor);

  // Cari index surah saat ini untuk navigasi
  const currentIndex = surahs.findIndex((s) => s.nomor == nomor);
  const prevSurah = currentIndex > 0 ? surahs[currentIndex - 1] : null;
  const nextSurah =
    currentIndex < surahs.length - 1 ? surahs[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50/30 via-white to-amber-50/20 dark:from-amber-950/10 dark:via-slate-950 dark:to-amber-950/10">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 dark:bg-amber-900/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
          <Link
            href="/"
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Beranda
          </Link>
          <span>•</span>
          <Link
            href="/surat"
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Daftar Surah
          </Link>
          <span>•</span>
          <span className="text-amber-600 dark:text-amber-400 font-medium">
            {surah.namaLatin}
          </span>
        </div>

        <div className="grid md:grid-cols-5 gap-5 items-start">
          <SurahDetailSidebar surahs={surahs} nomor={nomor} />

          {/* Content - Detail Surah */}
          <main className="md:col-span-4 space-y-4">
            {/* Header Surah */}
            <ZoomIn className="bg-linear-to-br from-white to-amber-50/30 dark:from-slate-900 dark:to-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full">
                      Surah ke-{surah.nomor}
                    </span>
                    {surah.audio && (
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center gap-1">
                        <Headphones className="w-3 h-3" />
                        Audio
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
                    {surah.namaLatin}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    {surah.arti}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl md:text-5xl font-arabic text-amber-600 dark:text-amber-400">
                    {surah.nama}
                  </p>
                </div>
              </div>

              {/* Info Stats */}
              <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center gap-1.5 text-sm">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {surah.jumlahAyat} Ayat
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {surah.tempatTurun}
                  </span>
                </div>
                {surah.deskripsi && (
                  <p
                    className="text-sm text-slate-500 dark:text-slate-500 italic"
                    dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
                  />
                )}
              </div>
            </ZoomIn>

            {/* Navigasi Surah */}
            <div className="flex items-center justify-between gap-3">
              {prevSurah ? (
                <Link
                  href={`/surat/${prevSurah.nomor}`}
                  className="flex items-center gap-1 px-3 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-amber-100 active:scale-95 dark:border-amber-900/30 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-800 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ac">
                    {prevSurah.namaLatin}
                  </span>
                  <span className="sm:hidden">Sebelumnya</span>
                </Link>
              ) : (
                <div />
              )}

              <Link
                href="/surat"
                className="px-3 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-amber-100 dark:border-amber-900/30 rounded-lg text-sm text-slate-600 active:scale-95 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-800 transition-all"
              >
                Semua Surah
              </Link>

              {nextSurah ? (
                <Link
                  href={`/surat/${nextSurah.nomor}`}
                  className="flex items-center gap-1 px-3 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-amber-100 active:scale-95 dark:border-amber-900/30 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-800 transition-all"
                >
                  <span className="hidden sm:inline">
                    {nextSurah.namaLatin}
                  </span>
                  <span className="sm:hidden">Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Daftar Ayat */}
            <FadeUp className="space-y-3">
              {surah.ayat.map((ayat, index) => (
                <div
                  key={ayat.nomorAyat}
                  className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-amber-100/50 dark:border-amber-900/30 rounded-xl p-5 hover:shadow-md transition-all hover:border-amber-200 dark:hover:border-amber-800"
                >
                  {/* Header Ayat */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-amber-100 dark:bg-amber-900/50 rounded-md text-amber-700 dark:text-amber-300 text-xs font-medium">
                        {ayat.nomorAyat}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        Ayat {ayat.nomorAyat}
                      </span>
                    </div>

                    {/* Audio Button */}
                    {surah.audio && (
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800">
                        <Headphones className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Teks Arab */}
                  <p className="text-2xl leading-loose text-right font-arabic text-slate-800 dark:text-slate-200 mb-3">
                    {ayat.teksArab}
                  </p>

                  {/* Teks Latin */}
                  <p className="text-sm text-slate-500 dark:text-slate-500 italic mb-2">
                    {ayat.teksLatin}
                  </p>

                  {/* Teks Indonesia */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 border-t border-amber-100/50 dark:border-amber-900/20 pt-3 mt-2">
                    {ayat.teksIndonesia}
                  </p>

                  {/* Tafsir Button (if available) */}
                  {ayat.tafsir && (
                    <button className="mt-2 text-xs text-amber-600 dark:text-amber-400 hover:underline">
                      Lihat Tafsir →
                    </button>
                  )}
                </div>
              ))}
            </FadeUp>

            {/* Footer Navigasi */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-slate-400 dark:text-slate-600">
                {surah.jumlahAyat} Ayat • {surah.tempatTurun}
              </p>
              <ScrollToTopButton />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
