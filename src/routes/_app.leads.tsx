import { createFileRoute } from "@tanstack/react-router";
import { Users, MessageCircle, Star, Bell, Filter, Inbox } from "lucide-react";
import { LockedModulePreview } from "@/features/dashboard/locked-module";
import { LeadsMockup } from "@/features/dashboard/product-mockups";

export const Route = createFileRoute("/_app/leads")({
  component: LeadsPreview,
});

function LeadsPreview() {
  return (
    <LockedModulePreview
      eyebrow="Leads"
      title="Cada contato do seu site, organizado e pronto para virar cliente."
      subtitle="Uma caixa de entrada inteligente que reúne todos os pedidos que chegam pelo seu site, WhatsApp, formulários e redes sociais — em um só lugar."
      heroIcon={Inbox}
      visual={<LeadsMockup />}
      benefits={[
        "Nunca mais perca um contato importante",
        "Kanban visual: novo, em atendimento, convertido",
        "Histórico completo de cada conversa",
      ]}
      features={[
        { icon: Inbox, title: "Caixa unificada", description: "Formulários, WhatsApp, e-mail e redes sociais em uma inbox só." },
        { icon: Filter, title: "Qualificação automática", description: "Cada lead chega com origem, página e contexto prontos." },
        { icon: Star, title: "Marcadores e prioridades", description: "Destaque os contatos mais promissores em um clique." },
        { icon: Bell, title: "Notificações em tempo real", description: "Receba um aviso assim que alguém quiser falar com você." },
        { icon: MessageCircle, title: "Respostas rápidas", description: "Modelos prontos para responder sem digitar do zero." },
        { icon: Users, title: "Time e atribuição", description: "Distribua leads entre pessoas do seu escritório com um toque." },
      ]}
      insight={{
        title: "Seu site recebeu 246 visitantes este mês. Descubra quantos deles poderiam se tornar clientes.",
        description: "Ative Leads e comece a organizar cada oportunidade que chega até você — sem planilhas, sem esquecimento.",
      }}
    />
  );
}
