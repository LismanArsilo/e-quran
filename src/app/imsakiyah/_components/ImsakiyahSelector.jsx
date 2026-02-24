"use client";

import ZoomIn from "@/components/motions/ZoomIn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarClock, Loader2, MapPin, RefreshCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ImsakiyahSelector({ provinces }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedProvince, setSelectedProvince] = useState(
    searchParams.get("provinsi") || "",
  );

  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("kabkota") || "",
  );

  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // FETCH KABUPATEN / KOTA (POST)
  // ==============================
  useEffect(() => {
    async function fetchCities() {
      if (!selectedProvince) {
        setCities([]);
        return;
      }

      setLoadingCities(true);
      setError("");

      try {
        const res = await fetch("https://equran.id/api/v2/imsakiyah/kabkota", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provinsi: selectedProvince,
          }),
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data kabupaten/kota");
        }

        const result = await res.json();
        setCities(result.data || []);
      } catch (err) {
        console.error("Error:", err);
        setError("Gagal memuat data kabupaten/kota");
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    }

    fetchCities();
  }, [selectedProvince]);

  // ==============================
  // HANDLE SUBMIT
  // ==============================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedProvince && selectedCity) {
      router.replace(
        `/imsakiyah?provinsi=${selectedProvince}&kabkota=${selectedCity}`,
      );
    }
  };

  const handleReset = () => {
    setSelectedProvince("");
    setSelectedCity("");
    setError("");
    router.replace("/imsakiyah");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ZoomIn className="grid md:grid-cols-2 gap-4">
        {/* ================= PROVINSI ================= */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500" />
            Provinsi
          </label>

          <Select
            value={selectedProvince}
            onValueChange={(value) => {
              console.info("Selected Province:", value);
              setSelectedProvince(value);
              setSelectedCity("");
              setError("");
            }}
          >
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>

            <SelectContent>
              {provinces?.length > 0 ? (
                provinces.map((province, index) => (
                  <SelectItem key={index} value={province}>
                    {province}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="empty" disabled>
                  Data provinsi tidak tersedia
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* ================= KABUPATEN ================= */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500" />
            Kabupaten / Kota
          </label>

          <Select
            value={selectedCity}
            onValueChange={(value) => setSelectedCity(value)}
            disabled={!selectedProvince || loadingCities}
          >
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue
                placeholder={
                  loadingCities
                    ? "Memuat..."
                    : !selectedProvince
                      ? "Pilih provinsi terlebih dahulu"
                      : "Pilih Kabupaten/Kota"
                }
              />
            </SelectTrigger>

            <SelectContent>
              {loadingCities ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                </div>
              ) : cities.length > 0 ? (
                cities.map((city, index) => (
                  <SelectItem key={index} value={city}>
                    {city}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="empty" disabled>
                  Tidak ada data
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </ZoomIn>

      {/* ================= BUTTON ================= */}
      <ZoomIn delay={0.5} className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={!selectedProvince || !selectedCity || loadingCities}
          className={`flex-1 px-6 py-2 font-medium rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2
      ${
        !selectedProvince || !selectedCity || loadingCities
          ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
          : "bg-linear-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600 hover:shadow-xl hover:-translate-y-0.5 hover:cursor-pointer"
      }
    `}
        >
          {loadingCities ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memuat...</span>
            </>
          ) : (
            <>
              <span>Lihat Jadwal Imsakiyah</span>
              <CalendarClock className="w-4 h-4" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4" />
          <span className="text-sm">Reset</span>
        </button>
      </ZoomIn>
    </form>
  );
}
