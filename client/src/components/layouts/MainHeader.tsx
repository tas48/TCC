import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { FiMoon, FiSettings } from "react-icons/fi";
import { NotificationPopover } from "./Notifications";

interface MainHeaderProps {
  onSelectContent: (content: string) => void;
}

const MainHeader = ({ onSelectContent }: MainHeaderProps) => {
  const toggleTheme = () => {
    setTimeout(() => {
      document.documentElement.classList.toggle("light");
    }, 100);
  };

  return (
    <div className="w-full h-[8%] bg-[var(--card)] text-foreground p-4 fixed top-0 left-0 flex items-center justify-end">
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" aria-label="Tema" onClick={toggleTheme} className="focus:outline-none focus:ring-0">
          <FiMoon className="h-5 w-5 text-muted-foreground" />
        </Button>

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
            <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
              JJ
            </div>
          </Avatar>
        </Button>
      </div>
    </div>
  );
};

export default MainHeader;
