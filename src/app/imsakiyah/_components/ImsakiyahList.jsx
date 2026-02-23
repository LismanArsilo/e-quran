// app/imsakiyah/components/ImsakiyahList.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";

async function getImsakiyahSchedule(provinsi, kabkota) {
  try {
    const res = await fetch(`https://equran.id/api/v2/imsakiyah`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provinsi: provinsi,
        kabkota: kabkota,
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch schedule");
    return res.json();
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return { data: [] };
  }
}

export default async function ImsakiyahList({ searchParams }) {
  const { provinsi, kabkota } = await searchParams;

  if (!provinsi || !kabkota) {
    return (
      <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-emerald-200">
        <Calendar className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
        <p className="text-slate-500 text-lg">
          Silakan pilih provinsi dan kabupaten/kota terlebih dahulu
        </p>
      </div>
    );
  }

  const schedule = await getImsakiyahSchedule(provinsi, kabkota);

  if (!schedule.data || schedule.data.length === 0) {
    return (
      <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-red-200">
        <p className="text-red-500">Maaf, data jadwal tidak tersedia</p>
      </div>
    );
  }

  const { hijriah, masehi, imsakiyah, ...other } = schedule.data;
  const lokasi = `${kabkota}, ${provinsi}`;

  return (
    <div className="space-y-6">
      {/* Location Info */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-emerald-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-linear-to-b from-emerald-400 to-teal-400 rounded-full" />
          <h2 className="text-xl font-semibold text-slate-800">{lokasi}</h2>
        </div>
        <p className="text-slate-600 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-500" />
          Ramadan {hijriah} H / {masehi} M
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-emerald-50">
              <TableHead className="w-20">Tanggal</TableHead>
              <TableHead>Imsak</TableHead>
              <TableHead>Subuh</TableHead>
              <TableHead>Terbit</TableHead>
              <TableHead>Dhuha</TableHead>
              <TableHead>Dzuhur</TableHead>
              <TableHead>Ashar</TableHead>
              <TableHead>Maghrib</TableHead>
              <TableHead>Isya</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {imsakiyah.map((day, index) => (
              <TableRow
                key={day.tanggal}
                className="hover:bg-emerald-50/50 transition-colors"
              >
                <TableCell className="font-medium">{day.tanggal}</TableCell>
                <TableCell>{day.imsak}</TableCell>
                <TableCell>{day.subuh}</TableCell>
                <TableCell>{day.terbit}</TableCell>
                <TableCell>{day.dhuha}</TableCell>
                <TableCell>{day.dzuhur}</TableCell>
                <TableCell>{day.ashar}</TableCell>
                <TableCell className="text-red-600 font-semibold">
                  {day.maghrib}
                </TableCell>
                <TableCell>{day.isya}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
