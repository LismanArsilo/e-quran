"use client";

import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function NotFound({
  title = "Tidak Ada Data",
  description = "Data yang kamu cari tidak ditemukan.",
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleAction = () => {
    router.replace("/");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-in fade-in duration-300">
      <div className="mb-6 rounded-full bg-muted p-6">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight mb-2">{title}</h2>

      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {description}
      </p>

      <Button
        variant="outline"
        onClick={handleAction}
        className="hover:cursor-pointer active:scale-95 transition-transform"
      >
        Reset Filter
      </Button>
    </div>
  );
}
