import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart, Download, Calendar, Mail, BarChart3, Users, PieChart } from "lucide-react";
import { LockedModulePreview } from "@/features/dashboard/locked-module";
import { ReportsMockup } from "@/features/dashboard/product-mockups";
import { PlanGate } from "@/features/plan/plan-gate";
import { ProModuleView, type ProFeature } from "@/features/plan/pro-module-view";

export const Route = createFileRoute("/_app/relatorios")({
  component: RelatoriosRoute,
});

const features: ProFeature[] = [
  {
    icon: Calendar,
    title: "Relatórios recorrentes",
    description: "Configure uma vez, receba todo mês sem lembrar.",
  },
  {
    icon: BarChart3,
    title: "Modelos prontos",
    description: "Tráfego, leads, conversões, blog — tudo em templates elegantes.",
  },
  {
    icon: Download,
    title: "Exportação em PDF",
    description: "Baixe um relatório com identidade Shippa em segundos.",
  },
  {
    icon: Mail,
    title: "Envio automático",
    description: "Programe entregas por e-mail para você e sua equipe.",
  },
  {
    icon: Users,
    title: "Compartilhamento seguro",
    description: "Gere links protegidos por senha para compartilhar externamente.",
  },
  {
    icon: PieChart,
    title: "Comparativos",
    description: "Mês a mês, trimestre a trimestre — veja sua evolução no tempo.",
  },
];

function RelatoriosRoute() {
  return (
    <PlanGate feature="reports" locked={<RelatoriosLocked />}>
      <ProModuleView
        eyebrow="Relatórios"
        title="Seus resultados, prontos para apresentar"
        description="Relatórios mensais elegantes, exportáveis e compartilháveis com um clique."
        visual={<ReportsMockup />}
        features={features}
      />
    </PlanGate>
  );
}

function RelatoriosLocked() {
  return (
    <LockedModulePreview
      eyebrow="Relatórios"
      title="Relatórios claros, prontos para apresentar ou compartilhar."
      subtitle="Chega de planilhas. Gere relatórios mensais bonitos com um clique — ou receba automaticamente no seu e-mail."
      heroIcon={FileBarChart}
      visual={<ReportsMockup />}
      benefits={[
        "Relatórios mensais automáticos no seu e-mail",
        "Exporte em PDF pronto para apresentar",
        "Compartilhe com sócios ou clientes por link seguro",
      ]}
      features={features}
      insight={{
        title: "Escritórios que acompanham resultados mensalmente crescem 4x mais rápido.",
        description: "Ative Relatórios e transforme dados em decisões, sem esforço.",
      }}
    />
  );
}
