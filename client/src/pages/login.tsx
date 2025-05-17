import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, authSchema } from "../validations/authSchema";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Input, Heading, VStack, Link } from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
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
    <Box 
      color="white"
      minH="100vh"
      minWidth="40vw"
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
      <VStack as="form" gap={4} onSubmit={handleSubmit(onSubmit)} w="sm">
        <Image src="/logo.png" alt="Logo" width="100" height="auto" mb={10} objectFit="contain" />
        <Heading size="lg" textAlign="center">Login</Heading>

        <FormControl isInvalid={!!errors.email} width="100%"> 
          <Input placeholder="E-mail" {...register("email")} bg="gray.700" color="white" borderRadius="lg"/>
          <FormErrorMessage color={"crimson"} fontSize="13px">{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} width="100%">
          <Input type="password" placeholder="Senha" {...register("password")} bg="gray.700" color="white" borderRadius="lg"/>
          <FormErrorMessage color={"crimson"} fontSize="13px">{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" bg="whiteAlpha.800" width="60%">
          Entrar
        </Button>
        <Link color="gray.400" onClick={() => navigate("/cadastro")} cursor="pointer" _hover={{ color: "gray.300" }}>
          Não tem conta? Cadastre-se
        </Link>
        <Link color="green.400" onClick={() => navigate("/dashboard")} cursor="pointer" _hover={{ color: "gray.300" }}>
          ir pro dashboard TESTE[dev mode]
        </Link>
      </VStack>
    </Box>
  );
};

export default Login;
