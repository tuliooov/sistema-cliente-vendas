import { z } from "zod";

export const schemaLogin = z.object({
  email: z.string().email().nonempty("o email é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
  business: z.string().nonempty("A empresa é obrigatória"),
});

export type ISchemaLogin = z.infer<typeof schemaLogin>;
