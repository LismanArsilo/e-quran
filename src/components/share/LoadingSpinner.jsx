"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  size = 36,
  text = "Memuat...",
  fullScreen = false,
  className = "",
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4
        ${fullScreen ? "min-h-80" : "py-16"}
        animate-in fade-in duration-300
        ${className}
      `}
    >
      {/* Spinner */}
      <Loader2
        className="animate-spin text-primary"
        style={{ width: size, height: size }}
      />

      {/* Optional Text */}
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}
