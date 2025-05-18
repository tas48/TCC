import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, authSchema } from "../validations/authSchema";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] border-none shadow-none">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-48 h-auto" />
          </div>

        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Digite seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-white text-foreground hover:bg-white/90"
              >
                Entrar
              </Button>
              <div className="flex flex-col items-center space-y-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/cadastro");
                  }}
                  className="text-muted-foreground text-sm cursor-pointer"
                >
                  Não tem conta? Cadastre-se
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
