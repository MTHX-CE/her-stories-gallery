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
