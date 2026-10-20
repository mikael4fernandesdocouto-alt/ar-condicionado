export const WHATSAPP_NUMBER = "5535991201792";

export type ServiceId =
  | "instalacao"
  | "manutencao-preventiva"
  | "conserto"
  | "higienizacao";

export type Service = {
  id: ServiceId;
  label: string;
  whatsappLabel: string;
  summary: string;
  priceFrom: string;
};

export const SERVICES: Service[] = [
  {
    id: "instalacao",
    label: "Instalação",
    whatsappLabel: "Instalação",
    summary:
      "Aparelho novo no lugar certo, com vácuo na linha, suporte firme e teste de vazamento.",
    priceFrom: "a partir de R$ 250",
  },
  {
    id: "manutencao-preventiva",
    label: "Manutenção preventiva",
    whatsappLabel: "Manutenção preventiva",
    summary:
      "Revisão antes do verão: filtro, serpentina, gás e contatos elétricos conferidos.",
    priceFrom: "a partir de R$ 180",
  },
  {
    id: "conserto",
    label: "Conserto",
    whatsappLabel: "Conserto / manutenção corretiva",
    summary:
      "Não está gelando, pinga água ou desliga sozinho: diagnóstico do defeito e orçamento na hora.",
    priceFrom: "diagnóstico a partir de R$ 120",
  },
  {
    id: "higienizacao",
    label: "Higienização",
    whatsappLabel: "Higienização",
    summary:
      "Limpeza completa da evaporadora e da condensadora, contra cheiro de mofo e alergia.",
    priceFrom: "a partir de R$ 200",
  },
];

export function getService(id: string): Service | undefined {
  return SERVICES.find((service) => service.id === id);
}

export function buildWhatsAppLink(input: {
  service: string;
  location: string;
  name: string;
  details: string;
}): string {
  const message = [
    `Olá! Vim pelo site. Gostaria de atendimento para *${input.service}*.`,
    "",
    `📍 *Localização:* ${input.location}`,
    `👤 *Nome:* ${input.name}`,
    `📝 *Detalhes:* ${input.details}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
