import FadeUp from "@/components/motions/FadeUp";
import { Sparkles } from "lucide-react";

export default function ImsakiyahHero() {
  return (
    <FadeUp className="text-center max-w-3xl mx-auto mb-4">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-amber-100 mb-4">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-medium text-amber-700">Imsakiyah</span>
      </div>

      <h1 className="font-gravitas-one text-3xl  font-bold mb-3 bg-linear-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
        Jadwal Imsakiyah
      </h1>

      <p className="text-sm text-foreground md:text-base">
        Tentukan provinsi dan kabupaten/kota Anda untuk mendapatkan jadwal
        imsakiyah lengkap selama bulan berjalan sesuai lokasi setempat.
      </p>
    </FadeUp>
  );
}
