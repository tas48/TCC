import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
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
      });
    }
  }, [user?.id]);

  const avatarUrl = userData?.imagem;
  const nome = userData?.nome_completo || userData?.email || "";
  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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
          <Avatar className="h-8 w-8">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                {getInitials(nome)}
              </div>
            )}
          </Avatar>
        </Button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default MainHeader;
