"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, MapPin } from "lucide-react";
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {/* ================= PROVINSI ================= */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
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
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
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
      </div>

      {/* ================= BUTTON ================= */}
      <button
        type="submit"
        disabled={!selectedProvince || !selectedCity || loadingCities}
        className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
      >
        {loadingCities ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Memuat...
          </>
        ) : (
          "Lihat Jadwal Imsakiyah"
        )}
      </button>
    </form>
  );
}
