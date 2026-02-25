import FadeUp from "@/components/motions/FadeUp";
import NotFound from "@/components/share/NotFound";
import { MoveRight } from "lucide-react";
import Link from "next/link";

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

export default async function DoaList({ grup = "", tag = "" }) {
  const data = await getDoa({ grup, tag });
  let doaList = data.data || [];

  if (doaList.length === 0) {
    return (
      <NotFound
        title="Doa Tidak Ditemukan"
        description="Coba ubah filter atau cari dengan kata kunci lain."
      />
    );
  }

  return (
    <FadeUp className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {doaList.map((doa, index) => (
        <div
          key={doa.id}
          className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-lg  hover:-translate-y-1 hover:border-amber-200 dark:hover:border-amber-800 dark:hover:bg-amber-900/20"
        >
          <div className="flex flex-col justify-between h-full">
            <span className="text-xs px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
              #{doa.id}
            </span>

            <h2 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 my-3 min-h-12">
              {doa.nama}
            </h2>

            <p className="text-lg text-right font-arabic text-slate-700 dark:text-slate-300 leading-loose line-clamp-2 mb-3">
              {doa.ar}
            </p>

            <p
              className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3"
              dangerouslySetInnerHTML={{ __html: doa.tentang }}
            />

            <Link
              href={`/doa/${doa.id}`}
              className="text-xs text-amber-600 dark:text-amber-400 active:scale-95 transition-transform flex items-end gap-1 w-fit pr-4"
            >
              Lihat Detail
              <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
    </FadeUp>
  );
}
