import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, authSchema } from "../validations/authSchema";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Login = () => {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: AuthFormData) => {
    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      alert(error.response?.data?.detail || "Erro ao fazer login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-[400px] bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-24 h-auto" />
          </div>
          <CardTitle className="text-2xl text-center text-white">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Button
                type="submit"
                className="w-full bg-white/80 hover:bg-white/90 text-gray-900"
              >
                Entrar
              </Button>
              <div className="flex flex-col items-center space-y-2">
                <button
                  type="button"
                  onClick={() => navigate("/cadastro")}
                  className="text-gray-400 hover:text-gray-300 text-sm"
                >
                  Não tem conta? Cadastre-se
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
