/**
 * Fonte única de conteúdo da exposição.
 * Preencha os campos opcionais quando o conteúdo curado estiver disponível;
 * o site exibe automaticamente cada bloco preenchido.
 * Não inserir informações sem fonte verificada.
 */
export type Portrait = { src: string; alt: string; credit?: string };
export type Achievement = { label?: string; text: string };
export type Cordel = { title?: string; author?: string; stanzas: string[][] };
export type GalleryItem = { src: string; alt: string; caption?: string; credit?: string };

export type Woman = {
  id: string;
  slug: string;
  name: string;
  area?: string;
  portrait?: Portrait;
  intro?: string;
  biography?: string[];
  achievements?: Achievement[];
  impact?: string[];
  cordel?: Cordel;
  gallery?: GalleryItem[];
};

export const womenById: Record<string, Woman> = {
  "rosana-paulino": {
    id: "rosana-paulino",
    slug: "rosana-paulino",
    name: "Rosana Paulino",
    portrait: { src: "/images/portraits/rosana-paulino.jpg", alt: "Retrato de Rosana Paulino" },
    area: "Artes visuais",
    biography: [
      "Rosana Paulino nasceu em São Paulo, em 1967. É artista visual, pesquisadora e educadora, com formação em Gravura e doutorado em Poéticas Visuais pela Escola de Comunicações e Artes da Universidade de São Paulo (ECA-USP).",
      "Em sua produção, combina fotografias, costura, gravura, desenho e outras técnicas para abordar racismo, identidade, memória, ancestralidade e questões de gênero. A experiência das mulheres negras na sociedade brasileira ocupa um lugar central em seu trabalho.",
    ],
    achievements: [
      { text: "Criação de obras como Parede da Memória e Bastidores, que relacionam imagens, costura e experiências da população negra." },
      { text: "Exposição individual Rosana Paulino: A Costura da Memória, na Pinacoteca de São Paulo, entre 2018 e 2019, reunindo mais de 140 obras de sua trajetória." },
      { text: "Reconhecimento no Brasil com o Prêmio Mário Pedrosa da Associação Brasileira de Críticos de Arte, em 2017, e no exterior com o MUNCH Award, na Noruega, em 2024." },
    ],
    impact: [
      "Rosana questiona a pouca presença de pessoas negras na história das artes visuais e valoriza memórias que muitas vezes foram deixadas de lado. Suas obras convidam o público a refletir sobre as marcas da escravidão e as desigualdades que permanecem no Brasil.",
      "Ao colocar mulheres negras no centro de sua produção e ocupar espaços importantes de exposição, amplia a representatividade negra nas artes. Seu trabalho também contribui para debates sobre identidade, pertencimento e a maneira como a história é contada.",
    ],
  },
  "daiane-dos-santos": {
    id: "daiane-dos-santos",
    slug: "daiane-dos-santos",
    name: "Daiane dos Santos",
    portrait: { src: "/images/portraits/daiane-dos-santos.png", alt: "Retrato de Daiane dos Santos" },
    area: "Ginástica artística",
    biography: [
      "Daiane Garcia dos Santos nasceu em 10 de fevereiro de 1983, em Porto Alegre, Rio Grande do Sul. Começou na ginástica artística ainda criança, após ser descoberta aos 11 anos.",
      "Desenvolveu sua carreira na ginástica brasileira e conquistou reconhecimento internacional. Participou dos Jogos Olímpicos de Atenas 2004, Pequim 2008 e Londres 2012.",
    ],
    achievements: [
      { text: "Conquistou a medalha de ouro no solo no Campeonato Mundial de Anaheim, em 2003, tornando-se a primeira brasileira a conquistar um título mundial na ginástica artística." },
      { text: "Teve dois movimentos reconhecidos internacionalmente com seu nome: Dos Santos I e Dos Santos\u00A0II." },
      { text: "Foi a primeira atleta da ginástica artística, entre homens e mulheres, a entrar no Hall da Fama do Comitê Olímpico do Brasil." },
    ],
    impact: [
      "Abriu caminhos para novas gerações de ginastas brasileiras e tornou-se uma referência para a representatividade negra no esporte.",
      "Ajudou a aumentar a visibilidade da ginástica artística no Brasil. Seu trabalho e sua trajetória também contribuíram para incentivar crianças e jovens a praticarem esportes.",
    ],
  },
  "rebeca-andrade": {
    id: "rebeca-andrade",
    slug: "rebeca-andrade",
    name: "Rebeca Andrade",
    portrait: { src: "/images/portraits/rebeca-andrade.jpg", alt: "Retrato de Rebeca Andrade" },
    area: "Ginástica artística",
    biography: [
      "Rebeca Rodrigues de Andrade nasceu em 8 de maio de 1999, em Guarulhos, São Paulo. Começou na ginástica artística aos quatro anos, por meio de um projeto social.",
      "Desde pequena, enfrentou desafios durante sua trajetória, incluindo lesões e cirurgias no joelho. Inspirada por Daiane dos Santos, construiu uma carreira de destaque internacional.",
    ],
    achievements: [
      { text: "Nos Jogos Olímpicos de Tóquio 2020, realizados em 2021, conquistou ouro no salto e prata no individual geral." },
      { text: "Nos Jogos Olímpicos de Paris 2024, conquistou ouro no solo, pratas no salto e no individual geral, além de bronze por equipes." },
      { text: "Tornou-se a maior medalhista olímpica da história do Brasil, com seis medalhas." },
      { text: "Também conquistou importantes títulos em Campeonatos Mundiais, incluindo ouro no salto em 2021, 2023 e 2026, além do ouro no individual geral em 2022." },
    ],
    impact: [
      "Tornou-se uma das maiores referências do esporte brasileiro. Sua trajetória inspira jovens atletas, principalmente meninas negras que buscam espaço no esporte.",
      "Representa superação, dedicação e representatividade. Sua presença em competições internacionais contribuiu para ampliar o reconhecimento da ginástica artística brasileira.",
    ],
  },
  "serena-williams": {
    id: "serena-williams",
    slug: "serena-williams",
    name: "Serena Williams",
    portrait: { src: "/images/portraits/serena-williams.jpg", alt: "Retrato de Serena Williams" },
    area: "Tênis",
    biography: [
      "Serena Williams é uma tenista norte-americana, nascida em 26 de setembro de 1981, em Saginaw, nos Estados Unidos. Cresceu em Compton, na Califórnia, onde treinou desde criança ao lado da irmã mais velha, Venus Williams, com o apoio da família.",
      "Tornou-se profissional em 1995 e conquistou seu primeiro título de Grand Slam em simples no US Open de 1999. Ao longo da carreira, destacou-se tanto nas competições individuais quanto nas duplas com Venus, formando uma das parcerias mais vitoriosas do tênis.",
    ],
    achievements: [
      { text: "Conquista de 23 títulos de Grand Slam em simples, o recorde feminino da Era Aberta, período iniciado em 1968." },
      { text: "Quatro medalhas de ouro olímpicas: uma em simples, em Londres 2012, e três em duplas com Venus, em Sydney 2000, Pequim 2008 e Londres 2012." },
      { text: "Conquista de 14 títulos de Grand Slam em duplas femininas com Venus Williams e permanência por 319 semanas no primeiro lugar do ranking mundial de simples." },
    ],
    impact: [
      "Com um jogo potente e resultados em diferentes tipos de quadra, Serena tornou-se uma referência no tênis mundial. Sua parceria com Venus mostrou a força das duas irmãs tanto como adversárias nas competições individuais quanto como companheiras nas duplas.",
      "Sua presença em um esporte historicamente marcado por barreiras raciais ampliou a visibilidade das mulheres negras. Ao enfrentar racismo e sexismo ao longo da carreira, tornou-se uma referência para meninas e mulheres que desejam ocupar espaços no esporte.",
    ],
  },
  "marielle-franco": {
    id: "marielle-franco",
    slug: "marielle-franco",
    name: "Marielle Franco",
    portrait: { src: "/images/portraits/marielle-franco.jpg", alt: "Retrato de Marielle Franco" },
    area: "Política e direitos humanos",
    biography: [
      "Marielle Franco nasceu em 27 de julho de 1979, no Complexo da Maré, no Rio de Janeiro. Socióloga e política brasileira, formou-se em Ciências Sociais pela PUC-Rio e concluiu o mestrado em Administração Pública pela Universidade Federal Fluminense (UFF).",
      "Sua trajetória foi marcada pela defesa dos direitos humanos e pela vivência nas favelas. Antes de ser eleita vereadora, trabalhou na Comissão de Defesa dos Direitos Humanos e Cidadania da Assembleia Legislativa do Rio de Janeiro, acompanhando denúncias de violência e apoiando vítimas e familiares.",
    ],
    achievements: [
      { text: "Eleição para a Câmara Municipal do Rio de Janeiro em 2016, como a quinta vereadora mais votada da cidade." },
      { text: "Presidência da Comissão da Mulher da Câmara Municipal, com atuação em defesa dos direitos das mulheres." },
      { text: "Atuação parlamentar voltada aos direitos humanos, à população negra e aos moradores de favelas, denunciando a violência e as desigualdades sociais." },
    ],
    impact: [
      "Marielle levou para o debate político demandas de mulheres, pessoas negras e moradores de favelas. Sua atuação combatia o racismo, o machismo e a violência, defendendo o direito de todas as pessoas a viver com dignidade e participar das decisões públicas.",
      "Em 14 de março de 2018, foi assassinada no Rio de Janeiro, junto com o motorista Anderson Gomes. Sua morte provocou manifestações e pedidos de justiça. Seu legado permanece como referência na defesa dos direitos humanos e na mobilização por maior participação de mulheres negras na política.",
    ],
  },
};

export const women: Woman[] = Object.values(womenById);

export function getWoman(slug: string) {
  return womenById[slug];
}

export function getNeighbors(slug: string) {
  const i = women.findIndex((w) => w.slug === slug);
  const n = women.length;
  return { index: i, prev: women[(i - 1 + n) % n]!, next: women[(i + 1) % n]! };
}

export function initials(name: string) {
  const parts = name.split(" ").filter((p) => p.length > 2);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase();
}

export const pad = (n: number) => String(n).padStart(2, "0");