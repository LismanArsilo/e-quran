import LoadingSpinner from "@/components/share/LoadingSpinner";
import { Suspense } from "react";
import DoaFilter from "./_components/DoaFilter";
import DoaHero from "./_components/DoaHero";
import DoaList from "./_components/DoaList";

async function getDoa({ grup = "", tag = "" }) {
  const params = new URLSearchParams();

  if (grup) params.append("grup", grup);
  if (tag) params.append("tag", tag);

  const res = await fetch(`https://equran.id/api/doa?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data doa");
  }

  return res.json();
}

export default async function DoaPage({ searchParams }) {
  const params = await searchParams;
  const grup = params.grup || "";
  const tag = params.tag || "";

  const data = await getDoa({ grup, tag });
  let doaList = data.data || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <DoaHero />

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-10 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">📖</span>
            <span>{doaList.length} Doa</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500">📚</span>
            <span>8 Kategori</span>
          </div>
        </div>

        <DoaFilter />
        <Suspense
          fallback={<LoadingSpinner fullScreen text="Memuat halaman..." />}
        >
          <DoaList grup={grup} tag={tag} />
        </Suspense>
      </div>
    </div>
  );
}
