import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignFormData, signSchema } from "../validations/signSchema";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState, useEffect } from "react";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Signup = () => {
  const { register: registerUser } = useAuth();
  const form = useForm<SignFormData>({
    resolver: zodResolver(signSchema),
  });

  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
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

  const onSubmit = async (data: SignFormData) => {
    try {
      await registerUser(data.username, data.email, data.password);
      alert("Cadastro realizado! Agora você pode fazer login.");
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar");
    }
  };

  const GoogleSignUpButton = () => {
    const handleGoogleSignUp = async (credentialResponse: any) => {
      try {
        await axios.post('/auth/google/signup', {
          credential: credentialResponse.credential,
        }, { withCredentials: true });
        alert("Cadastro realizado com Google! Agora você pode fazer login.");
        navigate('/login');
      } catch (err) {
        alert('Erro ao cadastrar com Google');
      }
    };

    return (
      <div className="flex justify-center mt-2">
        <GoogleLogin
          onSuccess={handleGoogleSignUp}
          onError={() => alert('Erro ao cadastrar com Google')}
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
              className="w-48 h-auto" 
            />
          </div>
          <GoogleSignUpButton />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome de usuário"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua senha"
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
                Cadastrar
              </Button>
              <div className="flex flex-col items-center space-y-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  className="text-muted-foreground text-sm cursor-pointer"
                >
                  Já tem uma conta? Faça login
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
