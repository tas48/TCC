import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignFormData, signSchema } from "../validations/signSchema";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Signup = () => {
  const { register: registerUser } = useAuth();
  const form = useForm<SignFormData>({
    resolver: zodResolver(signSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignFormData) => {
    try {
      await registerUser(data.username, data.email, data.password);
      alert("Cadastro realizado! Agora você pode fazer login.");
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-[400px] bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-24 h-auto" />
          </div>
          <CardTitle className="text-2xl text-center text-white">Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nome de Usuário</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome de usuário"
                        className="bg-gray-700 text-white border-gray-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu e-mail"
                        className="bg-gray-700 text-white border-gray-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        className="bg-gray-700 text-white border-gray-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        className="bg-gray-700 text-white border-gray-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-white/80 hover:bg-white/90 text-gray-900"
              >
                Cadastrar
              </Button>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-gray-400 hover:text-gray-300 text-sm"
                >
                  Já tem uma conta? Faça login
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
