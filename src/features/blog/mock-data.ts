export type ArticleStatus = "published" | "draft" | "scheduled";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: ArticleStatus;
  cover: string;
  metaTitle: string;
  metaDescription: string;
  seoScore: number; // 0-100
  views: number;
  publishedAt: string; // ISO or "—"
  scheduledFor?: string;
  updatedAt: string;
  readingTime: number; // minutes
  featured?: boolean;
};

export const CATEGORIES = [
  "Direito Imobiliário",
  "Sucessões",
  "Família",
  "Empresarial",
  "Trabalhista",
  "Consumidor",
] as const;

const covers = [
  "linear-gradient(135deg,#7c3aed 0%,#2563eb 60%,#0ea5e9 100%)",
  "linear-gradient(135deg,#f59e0b 0%,#ef4444 60%,#7c3aed 100%)",
  "linear-gradient(135deg,#10b981 0%,#0ea5e9 60%,#6366f1 100%)",
  "linear-gradient(135deg,#ec4899 0%,#8b5cf6 60%,#3b82f6 100%)",
  "linear-gradient(135deg,#14b8a6 0%,#22c55e 60%,#eab308 100%)",
  "linear-gradient(135deg,#0ea5e9 0%,#6366f1 60%,#a855f7 100%)",
];

export const articles: Article[] = [
  {
    id: "art_01",
    title: "Regularização de imóveis: guia completo para 2026",
    slug: "regularizacao-de-imoveis-guia-completo-2026",
    excerpt:
      "Entenda passo a passo como regularizar seu imóvel e evitar problemas futuros com escritura, matrícula e tributos.",
    content:
      "<h2>Por que regularizar</h2><p>A regularização de imóveis garante segurança jurídica e permite transações formais.</p><h3>Documentos necessários</h3><ul><li>Escritura pública</li><li>Certidão de matrícula atualizada</li><li>Comprovante de IPTU</li></ul><p>Consulte sempre um advogado especializado antes de iniciar o processo.</p>",
    category: "Direito Imobiliário",
    tags: ["imóveis", "escritura", "regularização"],
    status: "published",
    cover: covers[0],
    metaTitle: "Regularização de imóveis 2026 | Guia completo",
    metaDescription:
      "Guia atualizado para regularizar seu imóvel em 2026. Documentos, prazos e custos explicados por especialistas.",
    seoScore: 92,
    views: 1284,
    publishedAt: "2026-06-12",
    updatedAt: "2026-06-14",
    readingTime: 8,
    featured: true,
  },
  {
    id: "art_02",
    title: "Inventário extrajudicial: quando é possível fazer",
    slug: "inventario-extrajudicial-quando-fazer",
    excerpt:
      "Descubra os requisitos, custos e a economia de tempo em relação ao inventário judicial tradicional.",
    content:
      "<h2>O que é</h2><p>O inventário extrajudicial é feito em cartório e costuma ser mais rápido e barato.</p><p>Ele exige consenso entre herdeiros maiores e capazes.</p>",
    category: "Sucessões",
    tags: ["inventário", "herança"],
    status: "published",
    cover: covers[1],
    metaTitle: "Inventário extrajudicial: quando fazer",
    metaDescription:
      "Saiba quando o inventário extrajudicial é possível e como ele acelera a partilha da herança.",
    seoScore: 84,
    views: 864,
    publishedAt: "2026-06-08",
    updatedAt: "2026-06-08",
    readingTime: 6,
  },
  {
    id: "art_03",
    title: "Usucapião familiar: como funciona na prática",
    slug: "usucapiao-familiar-como-funciona",
    excerpt:
      "Um resumo das condições, prazos e documentos necessários para o reconhecimento do direito.",
    content:
      "<h2>Requisitos</h2><p>Posse mansa e pacífica por 2 anos, imóvel urbano de até 250m², e abandono do lar por parte do ex-cônjuge.</p>",
    category: "Família",
    tags: ["usucapião", "família"],
    status: "draft",
    cover: covers[2],
    metaTitle: "",
    metaDescription: "",
    seoScore: 41,
    views: 0,
    publishedAt: "—",
    updatedAt: "2026-07-02",
    readingTime: 5,
  },
  {
    id: "art_04",
    title: "Contratos digitais têm o mesmo valor jurídico?",
    slug: "contratos-digitais-valor-juridico",
    excerpt:
      "A validade dos contratos eletrônicos, assinaturas digitais e boas práticas para o seu negócio.",
    content:
      "<h2>Validade</h2><p>Contratos eletrônicos são plenamente válidos quando presentes os requisitos legais.</p>",
    category: "Empresarial",
    tags: ["contratos", "assinatura digital"],
    status: "published",
    cover: covers[3],
    metaTitle: "Contratos digitais têm valor jurídico?",
    metaDescription:
      "Entenda a validade jurídica dos contratos eletrônicos e como usá-los com segurança.",
    seoScore: 78,
    views: 542,
    publishedAt: "2026-06-02",
    updatedAt: "2026-06-03",
    readingTime: 4,
  },
  {
    id: "art_05",
    title: "Reforma trabalhista 5 anos depois: o que mudou",
    slug: "reforma-trabalhista-5-anos",
    excerpt:
      "Uma análise dos principais impactos da reforma sobre empregadores e empregados.",
    content: "<p>Conteúdo em desenvolvimento…</p>",
    category: "Trabalhista",
    tags: ["CLT", "trabalho"],
    status: "scheduled",
    cover: covers[4],
    metaTitle: "Reforma trabalhista 5 anos depois",
    metaDescription:
      "Balanço dos efeitos da reforma trabalhista sobre empresas e trabalhadores.",
    seoScore: 88,
    views: 0,
    publishedAt: "—",
    scheduledFor: "2026-07-22T09:00",
    updatedAt: "2026-07-10",
    readingTime: 7,
  },
  {
    id: "art_06",
    title: "Direitos do consumidor em compras online",
    slug: "direitos-consumidor-compras-online",
    excerpt:
      "Prazo de arrependimento, garantia, troca e como agir quando algo dá errado em e-commerces.",
    content: "<p>Conteúdo…</p>",
    category: "Consumidor",
    tags: ["consumidor", "e-commerce"],
    status: "published",
    cover: covers[5],
    metaTitle: "Direitos do consumidor em compras online",
    metaDescription:
      "Conheça seus direitos ao comprar pela internet: arrependimento, garantia e devolução.",
    seoScore: 71,
    views: 1112,
    publishedAt: "2026-05-24",
    updatedAt: "2026-05-24",
    readingTime: 5,
  },
  {
    id: "art_07",
    title: "Como escolher a melhor estrutura societária",
    slug: "estrutura-societaria",
    excerpt: "MEI, EIRELI, LTDA ou S.A.? Um comparativo com casos práticos.",
    content: "<p>Rascunho…</p>",
    category: "Empresarial",
    tags: ["empresarial", "societário"],
    status: "draft",
    cover: covers[0],
    metaTitle: "",
    metaDescription: "",
    seoScore: 22,
    views: 0,
    publishedAt: "—",
    updatedAt: "2026-07-14",
    readingTime: 3,
  },
  {
    id: "art_08",
    title: "Guarda compartilhada: mitos e verdades",
    slug: "guarda-compartilhada-mitos-verdades",
    excerpt: "O que a lei realmente diz sobre a guarda dos filhos após a separação.",
    content: "<p>Conteúdo…</p>",
    category: "Família",
    tags: ["família", "guarda"],
    status: "scheduled",
    cover: covers[3],
    metaTitle: "Guarda compartilhada: mitos e verdades",
    metaDescription: "Entenda o funcionamento real da guarda compartilhada.",
    seoScore: 66,
    views: 0,
    publishedAt: "—",
    scheduledFor: "2026-07-30T10:30",
    updatedAt: "2026-07-12",
    readingTime: 6,
  },
];

export function statusMeta(s: ArticleStatus) {
  switch (s) {
    case "published":
      return { label: "Publicado", tone: "success" as const };
    case "draft":
      return { label: "Rascunho", tone: "muted" as const };
    case "scheduled":
      return { label: "Agendado", tone: "warning" as const };
  }
}

export function seoTone(score: number) {
  if (score >= 80) return "success" as const;
  if (score >= 50) return "warning" as const;
  return "destructive" as const;
}

export function findArticle(id: string | null | undefined) {
  if (!id) return null;
  return articles.find((a) => a.id === id) ?? null;
}