import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { women, pad } from "@/data/women";
import { Portrait } from "@/components/expo/Portrait";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Mulheres Negras: Histórias que Transformam" },
      { name: "description", content: "Conheça as cinco personalidades da exposição." },
      { property: "og:title", content: "Galeria — Mulheres Negras" },
      { property: "og:description", content: "Conheça as cinco personalidades da exposição." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

// Composição assimétrica: cada posição tem largura, proporção e deslocamento próprios.
const layout = [
  "md:col-span-7 aspect-[4/5]",
  "md:col-span-5 md:mt-40 aspect-[3/4]",
  "md:col-span-4 aspect-square",
  "md:col-span-4 md:mt-24 aspect-[3/4]",
  "md:col-span-4 md:-mt-10 aspect-[4/5]",
];

function Gallery() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10 py-14 md:py-20">
      <div className="grid md:grid-cols-12 gap-6 mb-16">
        <h1 className="md:col-span-8 font-display font-light text-6xl md:text-8xl leading-none">
          A <span className="italic text-terracotta">galeria</span>
        </h1>
        <p className="md:col-span-4 self-end text-muted-foreground">Cinco salas, cinco trajetórias. Selecione uma personalidade para entrar em seu perfil.</p>
      </div>
      <div className="grid md:grid-cols-12 gap-x-6 gap-y-14">
        {women.map((w, i) => {
          const [span = "", ...rest] = (layout[i] ?? "md:col-span-6 aspect-[4/5]").split(" ");
          const aspect = rest.find((c) => c.startsWith("aspect"));
          const offsets = rest.filter((c) => !c.startsWith("aspect"));
          return (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              className={cn(span, offsets)}
            >
              <Link to="/mulheres/$slug" params={{ slug: w.slug }} className="group block">
                <div className="overflow-hidden">
                  <Portrait woman={w} className={cn(aspect, "transition-transform duration-700 group-hover:scale-[1.03]")} />
                </div>
                <div className="mt-4 flex items-baseline gap-4">
                  <span className="eyebrow text-terracotta">{pad(i + 1)}</span>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-terracotta transition-colors">{w.name}</h2>
                    {w.area && <p className="eyebrow text-muted-foreground mt-1">{w.area}</p>}
                  </div>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}