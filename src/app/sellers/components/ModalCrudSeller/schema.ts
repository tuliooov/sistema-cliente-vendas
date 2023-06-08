import { z } from "zod";

export const schemaAddSeller = z.object({
  id: z.string().optional(),
  name: z.string().nonempty("O nome é obrigatório"),
  observation: z.string().nonempty("A observação é obrigatório"),
});

export type ISchemaCrudSeller = z.infer<typeof schemaAddSeller>;
