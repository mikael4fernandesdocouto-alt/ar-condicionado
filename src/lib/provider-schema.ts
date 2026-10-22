import { z } from "zod";

export const providerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome")
    .max(80, "Use no máximo 80 caracteres"),
  company: z
    .string()
    .trim()
    .max(120, "Use no máximo 120 caracteres")
    .default(""),
  region: z
    .string()
    .trim()
    .min(5, "Informe a cidade e os bairros que você atende")
    .max(160, "Use no máximo 160 caracteres"),
  whatsapp: z
    .string()
    .trim()
    .min(10, "Informe seu WhatsApp com DDD")
    .max(30, "Use no máximo 30 caracteres")
    .refine(
      (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 13;
      },
      "Informe um WhatsApp válido com DDD",
    ),
  email: z
    .string()
    .trim()
    .max(160, "Use no máximo 160 caracteres")
    .default("")
    .refine(
      (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Informe um e-mail válido",
    ),
  services: z
    .array(z.string())
    .min(1, "Escolha pelo menos um serviço")
    .max(4),
  message: z
    .string()
    .trim()
    .max(400, "Use no máximo 400 caracteres")
    .default(""),
  terms: z.boolean().refine((value) => value, {
    message: "Para continuar, aceite os termos do cadastro",
  }),
});

export type ProviderForm = z.infer<typeof providerSchema>;
