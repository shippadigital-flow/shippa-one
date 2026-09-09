import { createFileRoute } from "@tanstack/react-router";
import {
  Target,
  MousePointerClick,
  ShoppingBag,
  TrendingUp,
  Route as RouteIcon,
  Filter,
} from "lucide-react";
import { LockedModulePreview } from "@/features/dashboard/locked-module";
import { ConversionsMockup } from "@/features/dashboard/product-mockups";
import { PlanGate } from "@/features/plan/plan-gate";
import { ProModuleView, type ProFeature } from "@/features/plan/pro-module-view";

export const Route = createFileRoute("/_app/conversoes")({
  component: ConversoesRoute,
});

const features: ProFeature[] = [
  {
    icon: MousePointerClick,
    title: "Metas personalizadas",
    description: "Marque qualquer ação como conversão: clique, formulário, agendamento.",
  },
  {
    icon: RouteIcon,
    title: "Jornada do cliente",
    description: "Veja o caminho percorrido antes de cada conversão.",
  },
  {
    icon: TrendingUp,
    title: "Taxa de conversão",
    description: "Acompanhe a evolução mês a mês em uma visão simples.",
  },
  {
    icon: Filter,
    title: "Funil visual",
    description: "Enxergue onde as pessoas param e por quê.",
  },
  {
    icon: ShoppingBag,
    title: "Valor por lead",
    description: "Estime quanto vale cada oportunidade que chega.",
  },
  {
    icon: Target,
    title: "Metas assistidas",
    description: "Receba sugestões de otimização baseadas nos seus resultados.",
  },
];

function ConversoesRoute() {
  return (
    <PlanGate feature="conversions" locked={<ConversoesLocked />}>
      <ProModuleView
        eyebrow="Conversões"
        title="O que transforma visita em cliente"
        description="Acompanhe cada ação importante do seu site e o caminho até a venda."
        visual={<ConversionsMockup />}
        features={features}
      />
    </PlanGate>
  );
}

function ConversoesLocked() {
  return (
    <LockedModulePreview
      eyebrow="Conversões"
      title="Descubra exatamente o que transforma visita em cliente."
      subtitle="Meça cada ação importante no seu site: cliques em contato, envios de formulário, agendamentos e ligações — e entenda o caminho até a venda."
      heroIcon={Target}
      visual={<ConversionsMockup />}
      benefits={[
        "Saiba qual canal traz mais clientes reais, não só visitas",
        "Configure metas em minutos, sem código",
        "Compare campanhas e páginas lado a lado",
      ]}
      features={features}
      insight={{
        title: "246 visitantes este mês. Quantos você acha que se tornaram clientes?",
        description:
          "Ative Conversões e pare de adivinhar. Descubra exatamente quais páginas geram negócio.",
      }}
    />
  );
}
