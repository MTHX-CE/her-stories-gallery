import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("descrição do filme", () => {
  it("traz a sinopse completa, na ordem ditada", () => {
    expect(site.film.description).toHaveLength(2);
    expect(site.film.description[0]).toContain("três mulheres negras que trabalhavam na NASA");
    expect(site.film.description[0]).toContain("década de 1960");
    expect(site.film.description[0]).toContain("racismo e a desigualdade");
    expect(site.film.description[0]).toContain("Katherine, Dorothy e Mary");
    expect(site.film.description[1]).toContain("igualdade, do respeito e da valorização das mulheres na ciência");
  });
});

describe("descrição do grupo", () => {
  it("traz o texto completo, na ordem ditada", () => {
    expect(site.group.description).toHaveLength(2);
    expect(site.group.description[0]).toContain("cartaz inspirado no filme Estrelas Além do Tempo");
    expect(site.group.description[0]).toContain("ciência, tecnologia e educação");
    expect(site.group.description[0]).toContain("luta contra o racismo e o preconceito");
    expect(site.group.description[1]).toContain("site com um resumo do filme");
    expect(site.group.description[1]).toContain("respeito, da igualdade e da representatividade");
  });
});
