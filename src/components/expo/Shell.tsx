import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Início" },
  { to: "/galeria", label: "Galeria" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-5 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-lg leading-none">
            Mulheres Negras<span className="text-terracotta">.</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="nav-link eyebrow" activeOptions={{ exact: n.to === "/" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <button className="md:hidden eyebrow" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
        {open && (
          <nav className="md:hidden flex flex-col border-t border-ink/10 bg-background">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-5 py-4 font-display text-2xl border-b border-ink/10 hover:text-terracotta">
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-10 flex flex-col md:flex-row justify-between gap-4">
          <p className="font-display text-xl">Mulheres Negras: Histórias que Transformam</p>
          <p className="eyebrow text-sand/70">Exposição digital · conteúdo em curadoria</p>
        </div>
      </footer>
    </div>
  );
}