import { z } from "zod";

export const requestSchema = z.object({
  serviceId: z.string().min(1, "Escolha o serviço"),
  location: z
    .string()
    .trim()
    .min(5, "Informe o bairro, a cidade ou o CEP")
    .max(160),
  name: z.string().trim().min(2, "Informe seu nome").max(80),
  details: z
    .string()
    .trim()
    .min(10, "Descreva o aparelho e o que está acontecendo")
    .max(600, "Resumo muito longo: use até 600 caracteres"),
});

export type RequestForm = z.infer<typeof requestSchema>;
