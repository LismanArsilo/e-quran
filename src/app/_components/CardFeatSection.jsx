import StaggerFadeUp from "@/components/motions/StaggerFadeUp";
import StaggerFadeUpItem from "@/components/motions/StaggerFadeUpItem";
import { Book, Bookmark, ChevronRight, Heart, ScrollText } from "lucide-react";
import Link from "next/link";

const menu = [
  {
    title: "Al-Qur'an",
    description: "Baca seluruh 114 surat lengkap",
    href: "/surat",
    icon: Book,
    color: "from-amber-500 to-teal-500",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    gradient: "from-amber-500/20 to-teal-500/20",
  },
  {
    title: "Tafsir",
    description: "Tafsir lengkap setiap ayat",
    href: "/tafsir",
    icon: ScrollText,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Doa Harian",
    description: "Kumpulan doa sehari-hari",
    href: "/doa",
    icon: Heart,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Bookmark",
    description: "Ayat yang kamu simpan",
    href: "/bookmark",
    icon: Bookmark,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

export default function CardFeatSection() {
  return (
    <StaggerFadeUp
      stagger={0.08}
      delay={0.1}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {menu.map((item, index) => {
        const Icon = item.icon;

        return (
          <StaggerFadeUpItem key={index}>
            <Link
              href={item.href}
              className="group block rounded-2xl p-6 bg-white/70 backdrop-blur border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 dark:bg-slate-900/70 dark:border-slate-700/50 dark:hover:border-amber-400 dark:hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-amber-50 text-amber-500 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-7 h-7" />
              </div>

              <h2 className="text-lg font-semibold mb-2 text-slate-800 group-hover:text-amber-600 transition-colors dark:text-slate-200 dark:group-hover:text-amber-400">
                {item.title}
              </h2>

              <p className="text-sm text-slate-600 mb-4 dark:text-slate-400">
                {item.description}
              </p>

              <div className="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400">
                <span>Mulai Membaca</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </StaggerFadeUpItem>
        );
      })}
    </StaggerFadeUp>
  );
}
