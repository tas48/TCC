import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignFormData, signSchema } from "../validations/signSchema";
import { Box, Button, Input, Heading, VStack, Link } from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<SignFormData>({
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
    <Box 
      color="white"
      minH="50vh"
      minWidth="40vw"
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
      <VStack as="form" gap={4} onSubmit={handleSubmit(onSubmit)} w="sm">
        <Image src="../public/logo.png" alt="Logo" width="100" height="auto" mb={10} objectFit="contain" />
        <Heading size="lg" textAlign="center">Cadastro</Heading>

        {/* Campo Nome de Usuário */}
        <FormControl isInvalid={!!errors.username} width="100%">
          <Input placeholder="Nome de Usuário" {...register("username")} bg="gray.700" color="white" borderRadius="lg" />
          <FormErrorMessage color={"crimson"} fontSize="12.5px">{errors.username?.message}</FormErrorMessage>
        </FormControl>

        {/* Campo E-mail */}
        <FormControl isInvalid={!!errors.email} width="100%"> 
          <Input placeholder="E-mail" {...register("email")} bg="gray.700" color="white" borderRadius="lg"/>
          <FormErrorMessage color={"crimson"} fontSize="12.5px">{errors.email?.message}</FormErrorMessage>
        </FormControl>

        {/* Campo Senha */}
        <FormControl isInvalid={!!errors.password} width="100%">
          <Input type="password" placeholder="Senha" {...register("password")} bg="gray.700" color="white" borderRadius="lg"/>
          <FormErrorMessage color={"crimson"} fontSize="12.5px">{errors.password?.message}</FormErrorMessage>
        </FormControl>

        {/* Campo Confirmar Senha */}
        <FormControl isInvalid={!!errors.confirmPassword} width="100%">
          <Input type="password" placeholder="Confirmar Senha" {...register("confirmPassword")} bg="gray.700" color="white" borderRadius="lg"/>
          <FormErrorMessage color={"crimson"} fontSize="12.5px">{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" bg="whiteAlpha.800" width="60%">
          Cadastrar
        </Button>
        <Link color="gray.400" 
              onClick={() => navigate("/login")} 
              cursor="pointer" 
              _hover={{ color: "gray.300" }}>
          Já tem uma conta? Faça login
        </Link>
      </VStack>
    </Box>
  );
};

export default Signup;
