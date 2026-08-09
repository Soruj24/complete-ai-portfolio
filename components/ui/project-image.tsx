"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProjectImage({ src, alt, className }: ProjectImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-surface text-text-tertiary ${className ?? ""}`}>
        <ImageOff className="w-6 h-6" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${className ?? ""}`}
      onError={() => setError(true)}
      unoptimized={src.startsWith("data:")}
    />
  );
}
