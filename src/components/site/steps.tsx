"use client";

import { CreditCard, MessageCircle, Timer, Wrench } from "lucide-react";

const STEPS = [
  {
    icon: Wrench,
    title: "Você diz o que precisa",
    body: "Tipo de serviço, região e o que o aparelho está fazendo. Leva menos de um minuto.",
  },
  {
    icon: MessageCircle,
    title: "A conversa abre no WhatsApp",
    body: "A mensagem chega pronta no nosso número, com os seus dados já preenchidos.",
  },
  {
    icon: Timer,
    title: "Triagem na hora",
    body: "Lemos o pedido, conferimos a região e chamamos o técnico mais próximo.",
  },
  {
    icon: CreditCard,
    title: "Orçamento antes do conserto",
    body: "O técnico avalia, explica o problema e só começa depois do seu aceite.",
  },
];

export function Steps() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step) => (
        <li key={step.title} className="flex flex-col gap-3">
          <step.icon
            aria-hidden
            className="h-6 w-6 text-ciano-500"
            strokeWidth={1.9}
          />
          <h3 className="text-base font-semibold text-gelo-50">{step.title}</h3>
          <p className="text-sm leading-relaxed text-gelo-300">{step.body}</p>
        </li>
      ))}
    </ul>
  );
}
