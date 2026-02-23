import FadeUp from "@/components/motions/FadeUp";
import ZoomIn from "@/components/motions/ZoomIn";
import {
  BookOpenCheck,
  Calendar,
  ChevronRight,
  Clock,
  Compass,
} from "lucide-react";
import Link from "next/link";
import CardFeatSection from "./_components/CardFeatSection";
import CardInfoSection from "./_components/CardInfoSection";
import HeroSection from "./_components/HeroSection";

const dailyHadith = {
  text: "Bacalah Al-Qur'an, karena ia akan menjadi syafaat bagi pembacanya di hari kiamat",
  source: "HR. Muslim",
  narrator: "Abu Umamah Al-Bahili",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-16 relative">
        <HeroSection />

        <ZoomIn className="flex justify-center mb-10">
          <Link
            href={"/surat"}
            className="flex items-center text-foreground bg-amber-50 px-4 py-2  gap-3 text-sm rounded-full shadow-sm border border-amber-100 text-center justify-center active:scale-95 transition-all"
          >
            <BookOpenCheck className="w-5 h-5 text-amber-600" />
            <span className="font-medium text-black">Mulai Membaca</span>
          </Link>
        </ZoomIn>

        <CardInfoSection />

        <FadeUp className="mb-12 md:mb-16">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                Fitur Utama
              </h2>
            </div>
            <CardFeatSection />
          </div>
        </FadeUp>

        <FadeUp className="relative overflow-hidden bg-linear-to-r from-amber-600 via-amber-500 to-teal-500 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl">
          <div
            className="absolute inset-0 bg-white/5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  Hadits Hari Ini
                </span>
              </div>

              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-relaxed">
                "{dailyHadith.text}"
              </h3>

              <div className="flex items-center gap-3 text-white/80 text-sm">
                <span>{dailyHadith.source}</span>
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                <span>{dailyHadith.narrator}</span>
              </div>
            </div>

            <Link
              href="/jadwal"
              className="bg-white text-amber-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all hover:shadow-xl whitespace-nowrap flex items-center gap-2 group"
            >
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              <span>Atur Pengingat</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeUp>

        <FadeUp className="mt-12 text-center text-sm text-slate-400">
          <p>© 2024 E-Quran. Aplikasi Al-Qur'an Digital</p>
        </FadeUp>
      </main>
    </div>
  );
}
