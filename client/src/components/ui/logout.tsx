import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi";
import api from "@/context/utils/api";
import { useAuth } from "@/context/AuthContext";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      await logout();
      navigate("/login");
    } catch (error) {
      alert("Erro ao fazer logout");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Sair"
      onClick={handleLogout}
      className="cursor-pointer focus:outline-none focus:ring-0"
    >
      <FiLogOut className="h-5 w-5 text-muted-foreground" />
    </Button>
  );
};

export default LogoutButton;
