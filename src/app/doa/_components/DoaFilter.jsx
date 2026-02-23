"use client";

import ZoomIn from "@/components/motions/ZoomIn";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const groups = [
  {
    key: 1,
    value: "Doa Sebelum Dan Sesudah Tidur",
    label: "Doa Sebelum Dan Sesudah Tidur",
  },
  { key: 2, value: "Doa di Kamar Mandi", label: "Doa di Kamar Mandi" },
  { key: 3, value: "Doa Saat Wudhu", label: "Doa Saat Wudhu" },
];

const tags = [
  { key: 1, value: "kamar mandi", label: "Kamar Mandi" },
  { key: 2, value: "tidur", label: "Tidur" },
  { key: 3, value: "malam", label: "Malam" },
];

export default function DoaFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const grupParam = searchParams.get("grup") || "";
  const tagParam = searchParams.get("tag") || "";

  const [selectedGrup, setSelectedGrup] = useState(grupParam);
  const [selectedTag, setSelectedTag] = useState(tagParam);

  const [isOpen, setIsOpen] = useState(false);
  const [tempGrup, setTempGrup] = useState(grupParam || "all");
  const [tempTag, setTempTag] = useState(tagParam || "all");

  // Sync state jika user navigasi manual (back/forward)
  useEffect(() => {
    setSelectedGrup(grupParam);
    setSelectedTag(tagParam);
  }, [grupParam, tagParam]);

  // Update URL ketika filter berubah
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedGrup) params.set("grup", selectedGrup);
    if (selectedTag) params.set("tag", selectedTag);

    router.replace(`/doa?${params.toString()}`, { scroll: false });
  }, [selectedGrup, selectedTag, router]);

  // Sync temp ketika modal dibuka
  useEffect(() => {
    if (isOpen) {
      setTempGrup(selectedGrup || "all");
      setTempTag(selectedTag || "all");
    }
  }, [isOpen, selectedGrup, selectedTag]);

  const handleApply = () => {
    setSelectedGrup(tempGrup === "all" ? "" : tempGrup);
    setSelectedTag(tempTag === "all" ? "" : tempTag);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedGrup("");
    setSelectedTag("");
    setTempGrup("all");
    setTempTag("all");
    setIsOpen(false);
  };

  const activeCount = [selectedGrup, selectedTag].filter(Boolean).length;

  return (
    <ZoomIn className="container mx-auto px-4 my-6">
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative hover:cursor-pointer active:scale-95 transition-transform"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filter
        {activeCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Doa</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4 w-full">
            <div className="space-y-6 w-full">
              <label className="text-sm font-medium">Grup</label>
              <Select value={tempGrup} onValueChange={setTempGrup}>
                <SelectTrigger
                  id="grup-select"
                  className="w-full hover:cursor-pointer mt-3"
                >
                  <SelectValue placeholder="Pilih grup" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 w-full">
              <label className="text-sm font-medium">Tag</label>
              <Select value={tempTag} onValueChange={setTempTag}>
                <SelectTrigger
                  id="tag-select"
                  className="w-full hover:cursor-pointer mt-3"
                >
                  <SelectValue placeholder="Pilih tag" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((tag) => (
                    <SelectItem key={tag.value} value={tag.value}>
                      {tag.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="hover:cursor-pointer active:scale-95 transition-transform"
            >
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className="hover:cursor-pointer active:scale-95 transition-transform"
            >
              Terapkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ZoomIn>
  );
}
