import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FiSettings } from "react-icons/fi";
import { NotificationPopover } from "./Notifications";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import LogoutButton from "../ui/logout";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import api from "@/context/utils/api";

interface MainHeaderProps {
  onSelectContent: (content: string) => void;
}

const MainHeader = ({ onSelectContent }: MainHeaderProps) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (user?.id) {
      api.get(`/auth/users/${user.id}`).then((res) => {
        setUserData(res.data);
      }).catch(error => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [user?.id]);

  const avatarUrl = userData?.imagem || "/default-avatar.png";
  const nome = userData?.nome_completo || userData?.email || "";

  return (
    <div className="w-full h-[8%] bg-[var(--card)] text-foreground p-4 fixed top-0 left-0 flex items-center justify-end">
      <div className="flex items-center space-x-1">
        <ThemeSwitch />
        <NotificationPopover />
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Abrir configurações"
          onClick={() => onSelectContent("Config")}
          className="cursor-pointer focus:outline-none focus:ring-0"
        >
          <FiSettings className="h-5 w-5 text-muted-foreground" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onSelectContent("Profile")}
          className="cursor-pointer focus:outline-none focus:ring-0"
        >
          <Avatar>
            <AvatarImage src={avatarUrl} alt="Avatar" />
            <AvatarFallback name={nome} />
          </Avatar>
        </Button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default MainHeader;
