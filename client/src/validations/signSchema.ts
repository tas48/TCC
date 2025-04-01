import { z } from "zod";

export const signSchema = z
  .object({
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/\d/, "A senha deve conter pelo menos um número")
      .regex(/[\W_]/, "A senha deve conter pelo menos um caractere especial"),
    confirmPassword: z.string(),
    username: z
      .string()
      .min(3, "O nome de usuário deve conter no mínimo menos 3 caracteres")
      .max(20, "O nome de usuário deve ter no máximo 20 caracteres")
      .regex(/^[a-zA-Z0-9]+$/, "O nome de usuário pode conter apenas letras e números"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  }); 

export type SignFormData = z.infer<typeof signSchema>;
