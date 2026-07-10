import { createFileRoute } from "@tanstack/react-router";
import {
  Plug,
  MessageCircle,
  Mail,
  Calendar,
  BarChart3,
  Zap,
  Webhook,
} from "lucide-react";
import { LockedModulePreview } from "@/features/dashboard/locked-module";
import { ConnectionsMockup } from "@/features/dashboard/product-mockups";

export const Route = createFileRoute("/_app/integracoes")({
  component: IntegracoesPreview,
});

function IntegracoesPreview() {
  return (
    <LockedModulePreview
      eyebrow="Integrações"
      title="Conecte o Shippa One às ferramentas que você já usa."
      subtitle="WhatsApp, Google Calendar, Meta Ads, e-mail marketing e muito mais. Uma única fonte de verdade para o seu negócio digital."
      heroIcon={Plug}
      visual={<ConnectionsMockup />}
      benefits={[
        "Configure em minutos, sem programador",
        "Sincronização automática 24/7",
        "Novas integrações lançadas todo mês",
      ]}
      features={[
        { icon: MessageCircle, title: "WhatsApp Business", description: "Sincronize conversas e leads diretamente com o Shippa One." },
        { icon: Calendar, title: "Google Calendar", description: "Agendamentos aparecem automaticamente na sua agenda." },
        { icon: Mail, title: "E-mail marketing", description: "Conecte com Mailchimp, RD Station ou seu provedor favorito." },
        { icon: BarChart3, title: "Meta e Google Ads", description: "Meça o ROI real de cada campanha em um só painel." },
        { icon: Webhook, title: "Webhooks e API", description: "Conecte com qualquer sistema para automações avançadas." },
        { icon: Zap, title: "Zapier e Make", description: "Milhares de integrações prontas para os fluxos que você quiser." },
      ]}
      insight={{
        title: "Cada ferramenta desconectada é uma oportunidade perdida.",
        description: "Ative Integrações e transforme seu ecossistema digital em uma máquina unificada.",
      }}
    />
  );
}
