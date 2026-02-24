// app/imsakiyah/page.jsx
import { Suspense } from "react";
import ImsakiyahHero from "./_components/ImsakiyahHero";
import ImsakiyahList from "./_components/ImsakiyahList";
import ImsakiyahSelector from "./_components/ImsakiyahSelector";
import LoadingSkeleton from "./_components/LoadingSkeleton";

async function getProvinces() {
  try {
    const res = await fetch("https://equran.id/api/v2/imsakiyah/provinsi", {
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    return { data: [] };
  }
}

export const metadata = {
  title: "Jadwal Imsakiyah",
  description:
    "Lihat jadwal imsakiyah untuk berbagai kota di Indonesia dengan mudah dan cepat.",
};

export default async function ImsakiyahPage({ searchParams }) {
  const provincesData = await getProvinces();
  const provinces = provincesData.data || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <ImsakiyahHero />

        {/* Selector Component */}
        <div className=" backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-amber-100 bg-background">
          <ImsakiyahSelector provinces={provinces} />
        </div>

        {/* Schedule Display */}
        <Suspense fallback={<LoadingSkeleton />}>
          <ImsakiyahList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
