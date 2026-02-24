import AppShell from "@/components/layouts/AppShell";
import ScrollToTop from "@/components/share/ScrollToTop";
import { ThemeProvider } from "@/components/share/ThemeProvider";
import { Geist, Geist_Mono, Gravitas_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gravitasOne = Gravitas_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gravitas-one",
  display: "swap",
});

export const metadata = {
  title: {
    default: "E-Quran – Al-Qur'an Digital Modern",
    template: "E-Quran | %s",
  },
  description:
    "Aplikasi E-Quran modern untuk membaca Al-Qur'an lengkap dengan tafsir dan jadwal ibadah.",
  keywords: [
    "E-Quran",
    "Al-Quran Digital",
    "Surah",
    "Tafsir",
    "Jadwal Imsakiyah",
  ],
  authors: [{ name: "E-Quran App" }],
  openGraph: {
    title: "E-Quran – Al-Qur'an Digital Modern",
    description: "Baca Al-Qur'an lengkap dengan tampilan modern dan nyaman.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scroll-smooth antialiased"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gravitasOne.variable}  antialiased min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 ease-in-out`}
      >
        <ScrollToTop />
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
