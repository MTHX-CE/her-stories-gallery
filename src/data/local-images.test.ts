import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { women } from "./women";
import { site } from "./site";

describe("fotografias independentes da hospedagem", () => {
  it("usa oito arquivos reais locais sem depender do CDN do Lovable", () => {
    const paths = [site.images.group, site.images.film, site.images.door, ...women.map((woman) => woman.portrait?.src)];
    expect(paths).toHaveLength(8);
    for (const path of paths) {
      expect(path).toMatch(/^\/images\/(home|portraits)\//);
      if (!path) throw new Error("Fotografia sem caminho");
      const file = resolve("public", path.slice(1));
      expect(existsSync(file)).toBe(true);
      expect(readFileSync(file).byteLength).toBeGreaterThan(1000);
    }
  });

  it("preserva exatamente os bytes das três fotos da home e das duas ginastas", () => {
    for (const path of [site.images.group, site.images.film, site.images.door, "/images/portraits/daiane-dos-santos.png", "/images/portraits/rebeca-andrade.jpg"]) {
      expect(readFileSync(resolve("public", path.slice(1))).equals(readFileSync(resolve("archive", path.slice(1))))).toBe(true);
    }
  });

  it("mantém o cartaz ausente sem URL quebrada", () => {
    expect(site.images.poster).toBeNull();
  });
});