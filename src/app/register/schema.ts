import { z } from "zod";

export const schemaRegister = z.object({
  business: z.string().nonempty("Nome da empresa é obrigatória"),
  userName: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email().nonempty("o email é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
  urlLogo: z.string().optional(),
});

export type ISchemaRegisterBusiness = z.infer<typeof schemaRegister>;
