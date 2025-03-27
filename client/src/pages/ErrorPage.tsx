import { Box, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ErrorPage = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate(); 

  const handleRedirect = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box color="white" height="50vh" width="40vw" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Heading>Erro, a página solicitada não foi encontrada, 
        clique no botão abaixo para retornar a segurança.
      </Heading>
      <Button 
        mt={4} 
        onClick={handleRedirect} 
        bg="whiteAlpha.800" 
        color="gray.800" 
        _hover={{ bg: ".400" }}
      >
        Ir para a {user ? "Dashboard" : "Tela de Login"}
      </Button>
    </Box>
  );
};

export default ErrorPage;
