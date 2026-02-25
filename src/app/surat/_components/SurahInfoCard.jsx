import StaggerFadeUp from "@/components/motions/StaggerFadeUp";
import StaggerFadeUpItem from "@/components/motions/StaggerFadeUpItem";

export default function SurahInfoCard({ surahs }) {
  // Stats
  const totalAyat = surahs.reduce((acc, surah) => acc + surah.jumlahAyat, 0);
  const makkiyahCount = surahs.filter((s) => s.tempatTurun === "Mekah").length;
  const madaniyahCount = surahs.filter(
    (s) => s.tempatTurun === "Madinah",
  ).length;

  return (
    <StaggerFadeUp
      stagger={0.2}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 max-w-3xl mx-auto"
    >
      {/* Total Surah */}
      <StaggerFadeUpItem
        delay={0.2}
        className="group relative bg-linear-to-br from-white to-emerald-50/50 dark:from-emerald-950/30 dark:to-emerald-900/20 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center border border-emerald-200/50 dark:border-emerald-800/50 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {surahs.length}
          </div>
          <div className="text-xs md:text-sm text-emerald-700 dark:text-emerald-300 font-medium">
            Total Surah
          </div>
          <div className="text-[10px] text-emerald-500/60 dark:text-emerald-400/40 mt-0.5">
            jumlah surat
          </div>
        </div>
      </StaggerFadeUpItem>

      {/* Total Ayat */}
      <StaggerFadeUpItem
        delay={0.4}
        className="group relative bg-linear-to-br from-white to-blue-50/50 dark:from-blue-950/30 dark:to-blue-900/20 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalAyat.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm text-blue-700 dark:text-blue-300 font-medium">
            Total Ayat
          </div>
          <div className="text-[10px] text-blue-500/60 dark:text-blue-400/40 mt-0.5">
            keseluruhan ayat
          </div>
        </div>
      </StaggerFadeUpItem>

      {/* Makkiyah */}
      <StaggerFadeUpItem
        delay={0.6}
        className="group relative bg-linear-to-br from-white to-purple-50/50 dark:from-purple-950/30 dark:to-purple-900/20 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center border border-purple-200/50 dark:border-purple-800/50 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/5 dark:bg-purple-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
            {makkiyahCount}
          </div>
          <div className="text-xs md:text-sm text-purple-700 dark:text-purple-300 font-medium">
            Makkiyah
          </div>
          <div className="text-[10px] text-purple-500/60 dark:text-purple-400/40 mt-0.5">
            turun di Mekkah
          </div>
        </div>
      </StaggerFadeUpItem>

      {/* Madaniyah */}
      <StaggerFadeUpItem
        delay={0.8}
        className="group relative bg-linear-to-br from-white to-amber-50/50 dark:from-amber-950/30 dark:to-amber-900/20 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center border border-amber-200/50 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500/5 dark:bg-amber-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-xl md:text-2xl font-bold text-amber-600 dark:text-amber-400">
            {madaniyahCount}
          </div>
          <div className="text-xs md:text-sm text-amber-700 dark:text-amber-300 font-medium">
            Madaniyah
          </div>
          <div className="text-[10px] text-amber-500/60 dark:text-amber-400/40 mt-0.5">
            turun di Madinah
          </div>
        </div>
      </StaggerFadeUpItem>
    </StaggerFadeUp>
  );
}
