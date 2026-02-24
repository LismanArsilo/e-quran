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
      <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-amber-200 dark:bg-slate-900/90">
        <Calendar className="w-16 h-16 text-amber-300 mx-auto mb-4" />
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

  //create date object from masehi string and format it to "D MMMM YYYY" and transform month example 1,2,3 to date start 19-02-2026
  const ramadanStart = new Date(`${masehi}-02-19`);
  const today = new Date();

  const diffTime = today - ramadanStart;
  const ramadanToday = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100 dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-linear-to-b from-amber-400 to-amber-600 rounded-full" />
          <h2 className="text-xl font-semibold text-foreground">{lokasi}</h2>
        </div>
        <p className="text-slate-600 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span className="text-foreground">
            Ramadan {hijriah} H / {masehi} M
          </span>
        </p>
      </div>

      <div className="bg-background rounded-xl shadow-md border border-slate-100 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-amber-700">
              <TableHead className="w-20">No</TableHead>
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
                className={`hover:bg-amber-900/90 transition-colors ${
                  Number(day.tanggal) === ramadanToday
                    ? "bg-amber-600/70 font-semibold"
                    : ""
                }`}
              >
                <TableCell className="dark:text-white">{day.tanggal}</TableCell>
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
