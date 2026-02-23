"use client";

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 border text-sm px-4 py-2 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full shadow-lg hover:bg-amber-200 dark:hover:bg-amber-800 transition-all hover:cursor-pointer active:scale-95 animate-bounce [animation-duration:2s]"
    >
      ↑
    </button>
  );
}
