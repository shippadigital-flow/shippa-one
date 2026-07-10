import { createFileRoute } from "@tanstack/react-router";
import {
  Lightbulb,
  TrendingUp,
  Search,
  FileText,
  AlertCircle,
  Sparkles,
  Target,
} from "lucide-react";
import { LockedModulePreview } from "@/features/dashboard/locked-module";
import { InsightsMockup } from "@/features/dashboard/product-mockups";

export const Route = createFileRoute("/_app/insights")({
  component: InsightsPreview,
});

function InsightsPreview() {
  return (
    <LockedModulePreview
      eyebrow="Insights"
      title="Uma IA que estuda seu site todo dia e conta o que fazer amanhã."
      subtitle="Chega de olhar gráficos sem saber o que fazer. Insights transforma cada número do seu site em uma recomendação prática, no seu idioma."
      heroIcon={Lightbulb}
      visual={<InsightsMockup />}
      benefits={[
        "Recomendações semanais entregues no seu painel",
        "Detecta oportunidades antes da concorrência",
        "Sugere o próximo artigo, a próxima campanha, o próximo passo",
      ]}
      features={[
        { icon: TrendingUp, title: "Tendências detectadas", description: "Descubra assuntos ganhando tração no seu público antes de todos." },
        { icon: Search, title: "Palavras-chave em alta", description: "Veja o que as pessoas estão buscando e escreva sobre isso." },
        { icon: FileText, title: "Sugestões de conteúdo", description: "Ideias de artigos baseadas no que já funciona no seu site." },
        { icon: AlertCircle, title: "Alertas inteligentes", description: "Quedas de tráfego, páginas quebradas, oportunidades perdidas." },
        { icon: Target, title: "Metas assistidas", description: "Defina objetivos e receba um plano prático para alcançar." },
        { icon: Sparkles, title: "Resumo semanal", description: "Toda segunda, um panorama claro do que aconteceu e o que fazer." },
      ]}
      insight={{
        title: "Existem 12 assuntos crescendo no seu nicho que seu site ainda não cobre.",
        description: "Ative Insights e descubra exatamente quais conteúdos publicar para capturar essa audiência.",
      }}
    />
  );
}
