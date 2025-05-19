import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, authSchema } from "../validations/authSchema";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { GoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from "react";
import api from '../context/utils/api';
import ThemeSwitch from "@/components/ui/ThemeSwitch";

const Login = () => {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(!document.documentElement.classList.contains("light"));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(!document.documentElement.classList.contains("light"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

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

  const GoogleLoginButton = () => {
    const handleGoogleLogin = async (credentialResponse: any) => {
      try {
        await api.post('/auth/google/register', {
          credential: credentialResponse.credential,
        }, { withCredentials: true });
        navigate('/dashboard');
      } catch (err) {
        alert('Erro ao logar com Google');
      }
    };
    return (
      <div className="flex justify-center mt-2">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert('Erro ao logar com Google')}
          useOneTap
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <ThemeSwitch />
      </div>
      <Card className="w-[400px] border-none shadow-none">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img 
              src={isDark ? "/logo.png" : "/logoLight.png"} 
              alt="Logo" 
              className="w-68 h-auto" 
            />
          </div>
          <GoogleLoginButton />
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
