const STEPS = [
  {
    title: "Você diz o que precisa",
    body: "Tipo de serviço, região e o que o aparelho está fazendo. Leva menos de um minuto.",
  },
  {
    title: "A conversa abre no WhatsApp",
    body: "A mensagem chega pronta no nosso número, com os seus dados já preenchidos.",
  },
  {
    title: "Triagem na hora",
    body: "Lemos o pedido, conferimos a região e chamamos o técnico mais próximo.",
  },
  {
    title: "Orçamento antes do conserto",
    body: "O técnico avalia, explica o problema e só começa depois do seu aceite.",
  },
];

export function Steps() {
  return (
    <ol className="border-t border-azul-200">
      {STEPS.map((step, index) => (
        <li
          key={step.title}
          className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-azul-200 py-6 sm:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)] sm:gap-x-6 sm:py-7"
        >
          <span className="row-span-2 font-display text-sm text-azul-700 sm:row-span-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-medium text-azul-950">{step.title}</h3>
          <p className="text-sm leading-relaxed text-azul-700 sm:col-start-3 sm:row-start-1">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
