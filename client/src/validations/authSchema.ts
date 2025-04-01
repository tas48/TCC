import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type AuthFormData = z.infer<typeof authSchema>;
