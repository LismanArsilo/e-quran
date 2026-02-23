"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold text-destructive mb-3">
        Gagal Memuat Data
      </h2>

      <p className="text-muted-foreground max-w-md mb-6">
        Terjadi kendala saat mengambil data. Silakan periksa koneksi internet
        atau coba beberapa saat lagi.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition hover:cursor-pointer"
      >
        Coba Lagi
      </button>
    </div>
  );
}
