import Link from "next/link";

// Group surah by juz (approximate)
const getJuzGroup = (surahNumber) => {
  if (surahNumber <= 2) return "Juz 1-2";
  if (surahNumber <= 4) return "Juz 3-4";
  if (surahNumber <= 6) return "Juz 5-6";
  if (surahNumber <= 9) return "Juz 7-8";
  if (surahNumber <= 11) return "Juz 9-10";
  if (surahNumber <= 13) return "Juz 11-12";
  if (surahNumber <= 16) return "Juz 13-14";
  if (surahNumber <= 18) return "Juz 15-16";
  if (surahNumber <= 22) return "Juz 17-18";
  if (surahNumber <= 25) return "Juz 19-20";
  if (surahNumber <= 29) return "Juz 21-22";
  if (surahNumber <= 33) return "Juz 23-24";
  if (surahNumber <= 36) return "Juz 25-26";
  if (surahNumber <= 41) return "Juz 27-28";
  if (surahNumber <= 45) return "Juz 29";
  return "Juz 30";
};

export default function SurahCard({ index, surah }) {
  const juzGroup = getJuzGroup(surah.nomor);

  return (
    <Link
      href={`/surat/${surah.nomor}`}
      className="group p-3 rounded-lg border border-transparent shadow-xl active:scale-95 hover:border-amber-200 dark:bg-slate-900 dark:hover:border-amber-800 hover:bg-amber-50/50 dark:hover:bg-amber-900/20 transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              #{surah.nomor}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {juzGroup}
            </span>
          </div>

          <h2 className="font-medium text-slate-800 dark:text-slate-200 truncate">
            {surah.namaLatin}
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-500 truncate">
            {surah.arti}
          </p>

          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 dark:text-slate-600">
            <span>{surah.jumlahAyat} ayat</span>
            <span>•</span>
            <span>{surah.tempatTurun}</span>
          </div>
        </div>

        {/* Right Section - Arabic */}
        <div className="text-right ml-3">
          <p className="text-base font-arabic text-slate-600 dark:text-slate-400">
            {surah.nama}
          </p>
        </div>
      </div>
    </Link>
  );
}
