import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { initials, type Woman } from "@/data/women";
import { cn } from "@/lib/utils";

export function Portrait({ woman, className, large }: { woman: Woman; className?: string; large?: boolean }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setImgFailed(true);
    } else {
      setImgFailed(false);
    }
  }, [woman.portrait?.src]);

  return (
    <motion.div
      layoutId={`portrait-${woman.slug}`}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className={cn("relative overflow-hidden bg-sand portrait-texture", className)}
    >
      {woman.portrait && !imgFailed ? (
        <img
          ref={imgRef}
          src={woman.portrait.src}
          alt={woman.portrait.alt}
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display italic text-terracotta/80", large ? "text-[9rem] md:text-[13rem]" : "text-6xl md:text-7xl")}>
            {initials(woman.name)}
          </span>
          <span className="eyebrow absolute bottom-4 text-ink/50">Retrato a ser inserido</span>
        </div>
      )}
    </motion.div>
  );
}