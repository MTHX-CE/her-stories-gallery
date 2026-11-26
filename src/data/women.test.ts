import { describe, expect, it } from "vitest";
import { women, getNeighbors } from "./women";

describe("dados da exposição", () => {
  it("tem exatamente 5 personalidades oficiais com slugs únicos", () => {
    expect(women).toHaveLength(5);
    expect(new Set(women.map((w) => w.slug)).size).toBe(5);
    expect(women.map((w) => w.name)).toEqual([
      "Rosana Paulino",
      "Daiane dos Santos",
      "Rebeca Andrade",
      "Serena Williams",
      "Marielle Franco",
    ]);
  });
  it("cada personalidade tem um retrato diferente", () => {
    const srcs = women.map((w) => w.portrait?.src);
    expect(srcs.every(Boolean)).toBe(true);
    expect(new Set(srcs).size).toBe(women.length);
  });
  it("conquistas seguem o padrão de item único, sem rótulo em coluna", () => {
    for (const w of women) {
      for (const a of w.achievements ?? []) {
        expect(a.label).toBeUndefined();
        expect(a.text.trim().length).toBeGreaterThan(0);
      }
    }
  });
  it("navegação é circular", () => {
    expect(getNeighbors(women[0]!.slug).prev.slug).toBe(women[4]!.slug);
    expect(getNeighbors(women[4]!.slug).next.slug).toBe(women[0]!.slug);
  });
  it("preenche as três seções dos novos perfis sem criar cordéis ou imagens", () => {
    for (const slug of ["rosana-paulino", "serena-williams", "marielle-franco"]) {
      const woman = women.find((w) => w.slug === slug);
      expect(woman?.biography).toHaveLength(2);
      expect(woman?.achievements).toHaveLength(3);
      expect(woman?.impact).toHaveLength(2);
      expect(woman?.cordel).toBeUndefined();
      expect(woman?.gallery).toBeUndefined();
      expect(woman?.portrait?.src).toContain(`${woman?.slug}.jpg`);
    }
  });
  it("registra a formação e o nascimento de Rosana sem confundir exposição com obra", () => {
    const woman = women.find((w) => w.slug === "rosana-paulino");
    expect(woman?.biography?.[0]).toContain("São Paulo, em 1967");
    expect(woman?.biography?.[0]).toContain("doutorado em Poéticas Visuais");
    expect(woman?.achievements?.[1]?.text).toContain("Exposição individual Rosana Paulino: A Costura da Memória");
  });
  it("registra os 23 títulos e os quatro ouros de Serena", () => {
    const woman = women.find((w) => w.slug === "serena-williams");
    expect(woman?.biography?.[0]).toContain("26 de setembro de 1981");
    expect(woman?.achievements?.[0]?.text).toContain("23 títulos de Grand Slam em simples");
    expect(woman?.achievements?.[1]?.text).toContain("Quatro medalhas de ouro olímpicas");
  });
  it("registra a formação, eleição e assassinato de Marielle", () => {
    const woman = women.find((w) => w.slug === "marielle-franco");
    expect(woman?.biography?.[0]).toContain("27 de julho de 1979");
    expect(woman?.biography?.[0]).toContain("Ciências Sociais pela PUC-Rio");
    expect(woman?.biography?.[0]).toContain("Administração Pública pela Universidade Federal Fluminense");
    expect(woman?.achievements?.[0]?.text).toContain("em 2016");
    expect(woman?.impact?.[1]).toContain("14 de março de 2018");
  });
  it("preenche Daiane dos Santos sem atribuir medalhas olímpicas", () => {
    const woman = women.find((w) => w.slug === "daiane-dos-santos");
    expect(woman?.biography).toHaveLength(2);
    expect(woman?.impact).toHaveLength(2);
    expect(woman?.achievements).toHaveLength(3);
    expect(woman?.biography?.[0]).toContain("10 de fevereiro de 1983");
    expect(woman?.biography?.[0]).toContain("descoberta aos 11 anos");
    expect(woman?.biography?.[1]).toContain("Atenas 2004, Pequim 2008 e Londres 2012");
    expect(woman?.achievements?.[0]?.text).toContain("Campeonato Mundial de Anaheim, em 2003");
    expect(woman?.achievements?.[0]?.text).toContain("primeira brasileira a conquistar um título mundial");
    expect(woman?.achievements?.[1]?.text.replace(/\u00A0/g, " ")).toContain("Dos Santos I e Dos Santos II");
    expect(woman?.achievements?.[2]?.text).toContain("Hall da Fama do Comitê Olímpico do Brasil");
    for (const a of woman?.achievements ?? []) {
      expect(a.text).not.toContain("Jogos Olímpicos");
      expect(a.text).not.toContain("medalha olímpica");
    }
    expect(woman?.cordel).toBeUndefined();
    expect(woman?.gallery).toBeUndefined();
  });
  it("preenche Rebeca Andrade com as seis medalhas e os títulos mundiais", () => {
    const woman = women.find((w) => w.slug === "rebeca-andrade");
    expect(woman?.biography).toHaveLength(2);
    expect(woman?.impact).toHaveLength(2);
    expect(woman?.achievements).toHaveLength(4);
    expect(woman?.biography?.[0]).toContain("8 de maio de 1999");
    expect(woman?.biography?.[0]).toContain("projeto social");
    expect(woman?.biography?.[1]).toContain("lesões e cirurgias no joelho");
    expect(woman?.biography?.[1]).toContain("Inspirada por Daiane dos Santos");
    expect(woman?.achievements?.[0]?.text).toContain("Tóquio 2020, realizados em 2021");
    expect(woman?.achievements?.[1]?.text).toContain("ouro no solo, pratas no salto e no individual geral");
    expect(woman?.achievements?.[2]?.text).toContain("maior medalhista olímpica da história do Brasil, com seis medalhas");
    expect(woman?.achievements?.[3]?.text).toContain("ouro no salto em 2021, 2023 e 2026");
    expect(woman?.achievements?.[3]?.text).toContain("ouro no individual geral em 2022");
    expect(woman?.cordel).toBeUndefined();
    expect(woman?.gallery).toBeUndefined();
  });
  it("mantém as duas ginastas com quantidade equilibrada de informações", () => {
    const daiane = women.find((w) => w.slug === "daiane-dos-santos");
    const rebeca = women.find((w) => w.slug === "rebeca-andrade");
    expect(Math.abs((daiane?.achievements?.length ?? 0) - (rebeca?.achievements?.length ?? 0))).toBeLessThanOrEqual(1);
    expect(daiane?.biography?.length).toBe(rebeca?.biography?.length);
    expect(daiane?.impact?.length).toBe(rebeca?.impact?.length);
  });
});