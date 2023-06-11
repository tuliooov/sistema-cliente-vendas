import { z } from "zod";

export const schemaAddOrder = z.object({
  order: z.object({
    id: z.string().optional(),
    observation: z.string().nonempty("A observação é obrigatório"),
    sellerId: z.string().nonempty("O representante é obrigatório"),
    clientId: z.string().nonempty("O cliente é obrigatório"),
  }),
  products: z
    .array(
      z.object({
        id: z.string().optional(),
        productId: z.string().nonempty("O produto é obrigatório"),
        quantidity: z.number().min(0, "A quantidade é obrigatória"),
        value: z.number().min(0, "O valor é obrigatório"),
      })
    )
    .min(1, "É necessário adicionar pelo menos um produto"),
  deliveryAddress: z.object({
    id: z.string().optional(),
    street: z.string().nonempty("A rua é obrigatório"),
    number: z.string().nonempty("O numero é obrigatório"),
    district: z.string().nonempty("O bairro é obrigatório"),
    city: z.string().nonempty("A cidade é obrigatório"),
    state: z.string().nonempty("O estado é obrigatório"),
    country: z.string().default("Brasil"),
  }),
});

export type ISchemaCrudOrder = z.infer<typeof schemaAddOrder>;
