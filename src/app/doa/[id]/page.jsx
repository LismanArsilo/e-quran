import FadeLeft from "@/components/motions/FadeLeft";
import FadeRight from "@/components/motions/FadeRight";
import FadeUp from "@/components/motions/FadeUp";
import ZoomIn from "@/components/motions/ZoomIn";
import NotFound from "@/components/share/NotFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

async function getDoaDetail(id) {
  const res = await fetch(`https://equran.id/api/doa/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.data;
}

export default async function DoaDetailPage({ params }) {
  const { id } = await params;

  const doa = await getDoaDetail(id);

  if (!doa) {
    return (
      <NotFound
        title="Doa Tidak Ditemukan"
        description="Coba ubah filter atau cari dengan kata kunci lain."
      />
    );
  }

  const prevId = Number(id) - 1;
  const nextId = Number(id) + 1;

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/40">
      <div className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
        {/* Back */}
        <Link href="/doa" className="">
          <Button
            variant="ghost"
            className="mb-8 hover:cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </Link>

        <div className="flex justify-between items-center mb-8">
          <FadeRight>
            <Link href={`/doa/${prevId}`}>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 hover:cursor-pointer active:scale-95 transition-transform"
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </Button>
            </Link>
          </FadeRight>

          <FadeUp className="w-9 h-9 flex items-center justify-center text-xs font-medium bg-background border border-border rounded-full shadow-sm dark:bg-amber-500/20 dark:border-amber-200/50">
            {id}
          </FadeUp>

          <FadeLeft>
            <Link href={`/doa/${nextId}`}>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 hover:cursor-pointer active:scale-95 transition-transform"
              >
                Berikutnya
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </FadeLeft>
        </div>

        <ZoomIn>
          <Card className="border bg-background/80 backdrop-blur shadow-lg rounded-2xl dark:border-l-6 dark:border-l-amber-400">
            <CardContent className="p-8 md:p-10 space-y-10">
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🤲</span>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                      {doa.nama}
                    </h1>
                  </div>
                  <div className="flex gap-5 items-center mt-1 ">
                    <p className="px-4 py-1 rounded-md bg-muted/50 text-sm">
                      {doa.grup}
                    </p>
                    <div>
                      {doa.tag &&
                        doa.tag.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-muted/50 text-muted-foreground text-xs px-3 py-0.5 rounded-full "
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />
              </div>

              {/* Arab */}
              <div className="text-right leading-12 md:leading-14">
                <p className="text-3xl md:text-4xl font-semibold">{doa.ar}</p>
              </div>

              {/* Latin */}
              {doa.tr && (
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
                    Latin
                  </h3>
                  <p className="italic text-base">{doa.tr}</p>
                </div>
              )}

              {/* Arti */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
                  Arti
                </h3>
                <p className="leading-relaxed text-base">{doa.idn}</p>
              </div>

              {/* Tentang */}
              {doa.tentang && (
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
                    Tentang
                  </h3>
                  <div
                    className="leading-relaxed text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: doa.tentang }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </ZoomIn>
      </div>
    </div>
  );
}
