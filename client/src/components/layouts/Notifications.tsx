import { CenterBox } from "@/components/ui/CenterBox";
import { Button } from "@/components/ui/button";
import { FiBell } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

// Mock de notificações para exemplo
const mockNotifications = [
  {
    id: 1,
    title: "Scan Completo",
    message: "O scan de segurança foi concluído com sucesso. Foram encontradas 3 vulnerabilidades de baixo risco.",
    time: "20s atrás",
    expanded: false
  },
  {
    id: 2,
    title: "Nova Vulnerabilidade",
    message: "Uma nova vulnerabilidade foi detectada no sistema. Recomendamos atualização imediata do sistema.",
    time: "5min atrás",
    expanded: false
  },
  {
    id: 3,
    title: "Backup Concluído",
    message: "O backup automático do sistema foi concluído com sucesso. Todos os dados foram salvos com integridade.",
    time: "1h atrás",
    expanded: false
  },
  {
    id: 4,
    title: "Backup Concluído",
    message: "O backup automático do sistema foi concluído com sucesso. Todos os dados foram salvos com integridade.",
    time: "1h atrás",
    expanded: false
  },
  {
    id: 5,
    title: "Backup Concluído",
    message: "O backup automático do sistema foi concluído com sucesso. Todos os dados foram salvos com integridade.",
    time: "1h atrás",
    expanded: false
  }
];

interface NotificationPopoverProps {
  className?: string;
}

export const NotificationPopover = ({ className }: NotificationPopoverProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(5);
  const [open, setOpen] = useState(false);

  const toggleNotification = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, expanded: !notif.expanded } : notif
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={`relative focus:outline-none focus:ring-0 ${className}`}>
        <div className="flex items-center justify-center rounded-md hover:bg-muted/50 transition-colors">
          <FiBell className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 border-0 shadow-lg bg-[var(--sidebar)] backdrop-blur supports-[backdrop-filter]:bg-background/60 focus:outline-none focus:ring-0" align="end">
        <div className="flex flex-col gap-2">
          <h4 className="font-medium mb-2">Notificações</h4>
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-card rounded-lg p-3 hover:bg-accent/50 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-0"
                onClick={() => toggleNotification(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <BiMessageDetail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium text-sm">{notification.title}</h5>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{notification.time}</span>
                    </div>
                    <p className={`text-sm text-muted-foreground mt-1 ${notification.expanded ? '' : 'line-clamp-2'}`}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-sm text-[var(--destructive)] hover:text-[var(--destructive)]/80 transition-colors mt-2 text-center focus:outline-none focus:ring-0"
            >
              Limpar todas
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Notifications = () => {
  return (
    <CenterBox>
      <span className="text-2xl font-bold text-white">Notificações</span>
    </CenterBox>
  );
};

export default Notifications; 