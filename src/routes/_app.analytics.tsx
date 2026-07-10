import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Users,
  Globe2,
  FileText,
  Clock,
  Target,
  Sparkles,
} from "lucide-react";
import { LockedModulePreview } from "@/features/dashboard/locked-module";
import { AnalyticsMockup } from "@/features/dashboard/product-mockups";

export const Route = createFileRoute("/_app/analytics")({
  component: AnalyticsPreview,
});

function AnalyticsPreview() {
  return (
    <LockedModulePreview
      eyebrow="Analytics"
      title="Descubra como seu site está performando e tome decisões melhores."
      subtitle="Um Analytics simples, feito para quem quer entender o que importa: quem visita, de onde vem, o que lê e quantos viram clientes."
      heroIcon={BarChart3}
      visual={<AnalyticsMockup />}
      benefits={[
        "Dados apresentados em linguagem clara, sem jargão",
        "Recomendações práticas geradas para você toda semana",
        "Sem precisar configurar Google Analytics",
      ]}
      features={[
        { icon: Users, title: "Visitantes", description: "Quantas pessoas visitam seu site, quando e com que frequência." },
        { icon: Globe2, title: "Fontes de tráfego", description: "Google, Instagram, WhatsApp, direto — descubra o que traz mais gente." },
        { icon: FileText, title: "Páginas mais visitadas", description: "Veja quais conteúdos estão realmente ganhando atenção." },
        { icon: Clock, title: "Tempo médio no site", description: "Entenda se seus visitantes estão engajando ou saindo rápido." },
        { icon: Target, title: "Conversões", description: "Acompanhe visitantes que viraram leads e clientes." },
        { icon: Sparkles, title: "Recomendações", description: "Sugestões práticas de conteúdo e melhorias, semana a semana." },
      ]}
      insight={{
        title: "Seu site recebeu 246 visitantes este mês. Descubra quantos deles se tornaram clientes.",
        description: "Com Analytics você vê a jornada completa: da primeira visita até o contato que fecha.",
      }}
    />
  );
}
