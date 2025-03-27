import { Box, Heading, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate(); 

  return (
    <Box color="white" minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <Heading>Bem-vindo ao Dashboard</Heading>
      <Link 
        color="gray.400" 
        onClick={() => navigate("/signup")} 
        cursor="pointer" 
        _hover={{ color: "gray.300" }}
      >
        Ir para Cadastro
      </Link>
    </Box>
  );
};

export default Dashboard;
