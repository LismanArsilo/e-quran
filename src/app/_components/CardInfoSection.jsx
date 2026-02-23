import StaggerFadeUp from "@/components/motions/StaggerFadeUp";
import StaggerFadeUpItem from "@/components/motions/StaggerFadeUpItem";
import { BookMarked, BookOpen, Heart, Library } from "lucide-react";

const stats = [
  {
    label: "114 Surat",
    value: "114",
    icon: Library,
    color: "text-emerald-600",
  },
  {
    label: "6.236 Ayat",
    value: "6.236",
    icon: BookOpen,
    color: "text-blue-600",
  },
  { label: "30 Juz", value: "30", icon: BookMarked, color: "text-purple-600" },
  { label: "Doa Harian", value: "40+", icon: Heart, color: "text-rose-600" },
];

export default function CardInfoSection() {
  return (
    <StaggerFadeUp
      stagger={0.1}
      delay={0.1}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <StaggerFadeUpItem
            key={index}
            delay={index * 0.1}
            className="bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 text-center border border-white/50 
            shadow-sm hover:shadow-md transition-all dark:bg-slate-900/70 dark:border-slate-700/50 dark:hover:border-slate-600/50 dark:hover:shadow-md"
          >
            <div className="flex justify-center mb-2 md:mb-3">
              <div
                className={`p-2 md:p-3 rounded-xl bg-linear-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 ${stat.color} bg-clip-text text-transparent`}
              >
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-xl md:text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm text-foreground/80">
              {stat.label}
            </div>
          </StaggerFadeUpItem>
        );
      })}
    </StaggerFadeUp>
  );
}
