import { z } from "zod";

export const schemaAddProduct = z.object({
  id: z.string().optional(),
  name: z.string().nonempty("O nome é obrigatório"),
  stock: z.number().min(0, "A quantidade é obrigatória"),
});

export type ISchemaCrudProduct = z.infer<typeof schemaAddProduct>;
