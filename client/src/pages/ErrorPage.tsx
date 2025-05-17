import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="w-[40vw] h-[50vh] flex justify-center items-center">
      <CardContent className="flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl font-bold mb-4">
          Erro, a página solicitada não foi encontrada, 
          clique no botão abaixo para retornar a segurança.
        </h1>
        <Button 
          onClick={handleRedirect}
          variant="default"
          className="mt-4"
        >
          Ir para a {user ? "Dashboard" : "Tela de Login"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ErrorPage;
