import { z } from "zod";

export const schemaAddOrder = z.object({
  id: z.string().optional(),
  name: z.string().nonempty("O nome é obrigatório"),
  observation: z.string().nonempty("A observação é obrigatório"),
});

export type ISchemaCrudOrder = z.infer<typeof schemaAddOrder>;
