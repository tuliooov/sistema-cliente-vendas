import { z } from "zod";

export const schemaAddClient = z.object({
  customer: z.object({
    id: z.string().optional(),
    name: z.string().nonempty("O nome é obrigatório"),
    nameFantasy: z.string().nonempty("O nome fantasia é obrigatório"),
    phone: z.string().nonempty("O telefone é obrigatório"),
    email: z.string().email("Insira um endereço de e-mail válido"),
    cnpj: z.string().nonempty("Insira um cnpj válido"),
    responsible: z.string().nonempty("Insira um responsável válido"),
    stateRegistration: z
      .string()
      .nonempty("Insira uma inscrição estadual válida"),
    observation: z.string(),
  }),
  address: z.object({
    id: z.string().optional(),
    street: z.string().nonempty("A rua é obrigatório"),
    number: z.string().nonempty("O numero é obrigatório"),
    district: z.string().nonempty("O bairro é obrigatório"),
    city: z.string().nonempty("A cidade é obrigatório"),
    state: z.string().nonempty("O estado é obrigatório"),
    cep: z.string().nonempty("O CEP é obrigatório"),
    country: z.string().default("Brasil"),
  }),
});

export type ISchemaCrudClient = z.infer<typeof schemaAddClient>;
