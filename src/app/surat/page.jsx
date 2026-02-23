import ZoomIn from "@/components/motions/ZoomIn";
import Link from "next/link";
import SurahCard from "./_components/SurahCard";
import SurahHero from "./_components/SurahHero";
import SurahInfoCard from "./_components/SurahInfoCard";

async function getSurah() {
  const res = await fetch("https://equran.id/api/v2/surat", {
    next: { revalidate: 3600 }, // Cache 1 jam
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data surah");
  }

  const data = await res.json();
  return data.data;
}

export default async function SurahPage() {
  const surahs = await getSurah();

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-20" />
      </div>

      <main className="container mx-auto px-10 py-8 md:py-12">
        <div className="relative mb-10 md:mb-12">
          <div className="absolute inset-0 bg-grid-amber-50 [mask-[linear-linear(0deg,white,rgba(255,255,255,0.6))]] -z-10" />
          <SurahHero />

          <SurahInfoCard surahs={surahs} />
        </div>

        <ZoomIn className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {surahs.map((surah, index) => {
            return <SurahCard key={index} surah={surah} />;
          })}
        </ZoomIn>

        <div className="mt-10">
          <h3 className="text-sm font-medium text-slate-400 mb-3">
            LANGSUNG KE JUZ
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
              <Link
                key={juz}
                href={`/juz/${juz}`}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                Juz {juz}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
