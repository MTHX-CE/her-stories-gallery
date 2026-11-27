import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { women, pad } from "@/data/women";
import { cn } from "@/lib/utils";
import groupPhoto from "@/assets/home/cinco-mulheres.jpg.asset.json";
import filmPhoto from "@/assets/home/filme.jpg.asset.json";
import posterPhoto from "@/assets/home/cartaz-grupo.jpg.asset.json";
import doorPhoto from "@/assets/home/porta-isolada.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulheres Negras: Histórias que Transformam — Exposição digital" },
      { name: "description", content: site.tagline },
      { property: "og:title", content: "Mulheres Negras: Histórias que Transformam" },
      { property: "og:description", content: site.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const blocks = [
  {
    title: "Sobre o filme",
    src: filmPhoto.url,
    alt: "Cena do filme",
    wrap: "",
    img: "w-full h-auto aspect-[3/2] object-cover",
    fallback: "w-full aspect-[3/2]",
    text: site.film.description,
  },
  {
    title: "Sobre o grupo",
    src: posterPhoto.url,
    alt: "Cartaz oficial do grupo de teatro Mulheres Negras",
    wrap: "flex justify-center",
    img: "w-full max-w-[17rem] h-auto",
    fallback: "w-full max-w-[17rem] aspect-[3/4]",
    text: site.group.description,
  },
  {
    title: "Sobre a exposição",
    src: doorPhoto.url,
    alt: "Porta de madeira",
    wrap: "flex justify-center",
    img: "w-full max-w-[8rem] md:max-w-[10rem] h-auto",
    fallback: "w-full max-w-[10rem] aspect-[2/3]",
    text: site.exhibition.description,
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

function ExhibitImage({
  src,
  alt,
  className,
  fallbackClassName,
  dark = false,
  loading,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  dark?: boolean;
  loading?: "lazy" | "eager";
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setFailed(true);
    } else {
      setFailed(false);
    }
  }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center gap-2 border border-dashed p-6 text-center",
          dark ? "border-sand/30 bg-paper/5 text-sand/80" : "portrait-texture border-ink/20 bg-sand/60 text-ink/70",
          fallbackClassName,
        )}
      >
        <span className="eyebrow">{alt}</span>
        <span className="text-xs opacity-70">Imagem pendente de envio</span>
      </div>
    );
  }

  return <img ref={imgRef} src={src} alt={alt} loading={loading} onError={() => setFailed(true)} className={className} />;
}

function Index() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 md:px-10 pt-14 md:pt-24 pb-20 grid md:grid-cols-12 gap-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow text-terracotta md:col-span-12">
          Exposição digital · 5 trajetórias
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}
          className="md:col-span-6 md:row-span-2 font-display font-light leading-[0.88] tracking-tight text-[clamp(3.5rem,12vw,11rem)]"
        >
          Mulheres<br /><span className="italic text-terracotta md:pl-[12vw]">Negras</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }}
          className="md:col-start-7 md:col-span-6"
        >
          <ExhibitImage
            src={groupPhoto.url}
            alt="Cinco mulheres negras sorrindo juntas"
            className="w-full h-auto"
            fallbackClassName="w-full aspect-[4/3]"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="md:col-start-7 md:col-span-6 space-y-8">
          <p className="font-display text-3xl md:text-4xl leading-tight">{site.subtitle}</p>
          <p className="text-lg text-muted-foreground max-w-md">{site.tagline}</p>
          <Link to="/galeria" className="link-arrow eyebrow">Entrar na exposição <span>→</span></Link>
        </motion.div>
      </section>

      <section className="bg-ink text-paper">
        {blocks.map((bl) => (
          <div key={bl.title} className="mx-auto max-w-7xl px-5 md:px-10 py-14 md:py-20">
            <h2 className="eyebrow text-sand/80">{bl.title}</h2>
            <span aria-hidden className="mt-3 block h-px w-24 bg-gold" />
            <div className="mt-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={bl.wrap}>
                <ExhibitImage
                  src={bl.src}
                  alt={bl.alt}
                  loading="lazy"
                  dark
                  className={bl.img}
                  fallbackClassName={bl.fallback}
                />
              </div>
              {bl.text?.length ? (
                <div className="space-y-5">
                  {bl.text.map((p, i) => (
                    <p key={i} className="text-lg md:text-xl leading-relaxed text-paper/90">{p}</p>
                  ))}
                </div>
              ) : (
                <p className="font-display text-2xl md:text-4xl leading-snug text-paper text-center">Informações a serem inseridas</p>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-10 py-20">
        <p className="eyebrow text-terracotta mb-8">Salas da exposição</p>
        <ol className="border-t border-ink/15">
          {women.map((w, i) => (
            <li key={w.slug}>
              <Link to="/mulheres/$slug" params={{ slug: w.slug }} className="group flex items-baseline gap-5 md:gap-10 py-5 border-b border-ink/15 transition-colors hover:bg-sand/40 px-2">
                <span className="eyebrow text-muted-foreground w-8">{pad(i + 1)}</span>
                <span className="font-display text-2xl md:text-4xl flex-1 transition-transform duration-500 group-hover:translate-x-3">{w.name}</span>
                {w.area && <span className="eyebrow text-muted-foreground hidden md:inline">{w.area}</span>}
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
