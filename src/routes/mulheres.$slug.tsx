import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { getWoman, getNeighbors, women, pad } from "@/data/women";
import { Portrait } from "@/components/expo/Portrait";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mulheres/$slug")({
  loader: ({ params }) => {
    const woman = getWoman(params.slug);
    if (!woman) throw notFound();
    return { woman };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.woman.name ?? "Perfil";
    const areaSuffix = loaderData?.woman.area ? ` — ${loaderData.woman.area}` : "";
    const desc = loaderData ? `${name}${areaSuffix}. Perfil na exposição Mulheres Negras: Histórias que Transformam.` : "Perfil da exposição.";
    return {
      meta: [
        { title: `${name} — Mulheres Negras: Histórias que Transformam` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — Mulheres Negras` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Profile,
});

const ease = [0.2, 0.7, 0.2, 1] as const;

const sections = [
  { id: "biografia", n: "01", label: "Biografia" },
  { id: "conquistas", n: "02", label: "Principais conquistas" },
  { id: "impacto", n: "03", label: "Contribuições e impacto" },
  { id: "cordel", n: "04", label: "Cordel" },
  { id: "galeria", n: "05", label: "Galeria" },
] as const;

function Pending({ children }: { children: ReactNode }) {
  return (
    <div className="border border-dashed border-ink/25 p-6 text-muted-foreground">
      <p className="eyebrow text-terracotta mb-2">Conteúdo em curadoria</p>
      <p>{children}</p>
    </div>
  );
}

function Block({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <motion.section id={id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}
      className="scroll-mt-24 grid md:grid-cols-12 gap-6 py-12 border-t border-ink/15">
      <div className="md:col-span-4"><p className="eyebrow text-muted-foreground">{n}</p><h2 className="font-display text-3xl mt-2">{title}</h2></div>
      <div className="md:col-span-8">{children}</div>
    </motion.section>
  );
}

function Profile() {
  const { woman: w } = Route.useLoaderData();
  const { index, prev, next } = getNeighbors(w.slug);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate({ to: "/mulheres/$slug", params: { slug: prev.slug } });
      if (e.key === "ArrowRight") navigate({ to: "/mulheres/$slug", params: { slug: next.slug } });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev.slug, next.slug, navigate]);

  return (
    <article key={w.slug}>
      <div className="mx-auto max-w-7xl px-5 md:px-10 pt-8 flex justify-between items-center">
        <Link to="/galeria" className="link-arrow eyebrow"><span>←</span> Voltar à galeria</Link>
        <span className="eyebrow text-muted-foreground">Sala {pad(index + 1)} / {pad(women.length)}</span>
      </div>

      <header className="mx-auto max-w-7xl px-5 md:px-10 py-10 md:py-16 grid md:grid-cols-12 gap-8 items-end">
        <Portrait woman={w} large className="md:col-span-5 aspect-[4/5]" />
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.8, ease }} className="md:col-span-7 md:pl-6">
          <p className="font-display italic text-terracotta text-[clamp(5rem,14vw,12rem)] leading-none">{pad(index + 1)}</p>
          <h1 className="font-display font-light text-5xl md:text-7xl leading-[0.95] tracking-tight mt-2">{w.name}</h1>
          {w.area && <p className="eyebrow mt-6 text-muted-foreground">{w.area}</p>}
          {w.intro && <p className="mt-8 text-xl max-w-lg">{w.intro}</p>}
          {w.portrait?.credit && <p className="mt-6 text-xs text-muted-foreground">Retrato: {w.portrait.credit}</p>}
        </motion.div>
      </header>

      <nav aria-label="Seções do perfil" className="mx-auto max-w-7xl px-5 md:px-10 pb-8">
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-ink/15 pt-5">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="nav-link eyebrow text-muted-foreground hover:text-terracotta transition-colors">
              <span className="text-terracotta mr-1.5">{s.n}</span>{s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Block id="biografia" n="01" title="Biografia">
          {w.biography?.length ? <div className="space-y-5 text-lg leading-relaxed">{w.biography.map((p, i) => <p key={i}>{p}</p>)}</div>
            : <Pending>Aguardando o recebimento do conteúdo biográfico.</Pending>}
        </Block>
        <Block id="conquistas" n="02" title="Principais conquistas">
          {w.achievements?.length ? (
            <ol className="space-y-6">{w.achievements.map((a, i) => (
              <li key={i} className={cn("grid gap-4", a.label ? "grid-cols-[6rem_1fr]" : "grid-cols-1")}>
                {a.label && <span className="font-display text-terracotta text-xl">{a.label}</span>}
                <span className="text-lg leading-relaxed">{a.text}</span>
              </li>
            ))}</ol>
          ) : <Pending>Aguardando o recebimento das principais conquistas.</Pending>}
        </Block>
        <Block id="impacto" n="03" title="Contribuições e impacto">
          {w.impact?.length ? <div className="space-y-5 text-lg leading-relaxed">{w.impact.map((p, i) => <p key={i}>{p}</p>)}</div>
            : <Pending>Aguardando o recebimento do texto sobre contribuições e impacto.</Pending>}
        </Block>
      </div>

      <section id="cordel" className="scroll-mt-24 bg-ink text-paper my-6">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20">
          <p className="eyebrow text-sand/60 mb-2">04</p>
          <h2 className="font-display text-3xl md:text-4xl mb-8">Cordel — Um canto para cada mulher</h2>
          {w.cordel?.stanzas.length ? (
            <div className="space-y-8 max-w-2xl">
              {w.cordel.title && <p className="font-display italic text-2xl text-sand">{w.cordel.title}</p>}
              {w.cordel.stanzas.map((stanza, i) => (
                <p key={i} className="font-display text-xl md:text-2xl leading-relaxed text-paper/95">
                  {stanza.map((line, j) => <span key={j} className="block">{line}</span>)}
                </p>
              ))}
              {w.cordel.author && <p className="eyebrow text-sand/70 pt-2">{w.cordel.author}</p>}
            </div>
          ) : <p className="font-display italic text-2xl md:text-3xl text-sand/55 max-w-3xl">Espaço reservado para o cordel exclusivo desta personalidade.</p>}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Block id="galeria" n="05" title="Galeria">
          {w.gallery?.length ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {w.gallery.map((item, i) => (
                <figure key={i} className="space-y-2">
                  <img src={item.src} alt={item.alt} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  {(item.caption || item.credit) && (
                    <figcaption className="text-sm text-muted-foreground">
                      {item.caption}{item.caption && item.credit && " · "}{item.credit}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : <Pending>Aguardando o recebimento de fotografias, documentos, obras e registros históricos.</Pending>}
        </Block>
      </div>

      <nav className="border-t border-ink/15 mt-10 grid grid-cols-2">
        {[{ w: prev, label: "Anterior", dir: "←" }, { w: next, label: "Próxima", dir: "→" }].map(({ w: x, label, dir }, i) => (
          <Link key={label} to="/mulheres/$slug" params={{ slug: x.slug }}
            className={cn("group p-6 md:p-12 transition-colors hover:bg-terracotta hover:text-paper", i === 1 && "text-right border-l border-ink/15")}>
            <p className="eyebrow opacity-70">{i === 0 && `${dir} `}{label}{i === 1 && ` ${dir}`}</p>
            <p className="font-display text-xl md:text-4xl mt-2">{x.name}</p>
          </Link>
        ))}
      </nav>

      <div className="mx-auto max-w-7xl px-5 md:px-10 py-8 flex flex-wrap gap-2 justify-center">
        {women.map((x, i) => (
          <Link key={x.slug} to="/mulheres/$slug" params={{ slug: x.slug }} aria-label={x.name}
            className={cn("eyebrow w-10 h-10 grid place-items-center border border-ink/20 transition-colors hover:border-terracotta hover:text-terracotta", x.slug === w.slug && "bg-ink text-paper border-ink")}>
            {pad(i + 1)}
          </Link>
        ))}
      </div>
    </article>
  );
}