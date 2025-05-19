import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { GrDocumentConfig } from "react-icons/gr";
import { MdOutlineCreate } from "react-icons/md";
import { FiTerminal } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface SidebarProps {
  onSelectContent: (content: string) => void;
}

const sidebarItems = [
  { icon: <HiOutlineDocumentReport className="h-5 w-5" />, label: "Relatórios" },
  { icon: <FaRegClock className="h-5 w-5" />, label: "Agendamento" },
  { icon: <GrDocumentConfig className="h-5 w-5" />, label: "PreMande Scans" },
  { icon: <GrConfigure className="h-5 w-5" />, label: "Nmap" },
  { icon: <GrConfigure className="h-5 w-5" />, label: "SqlMap" },
  { icon: <GrConfigure className="h-5 w-5" />, label: "MitmProxy" },
  { icon: <GrConfigure className="h-5 w-5" />, label: "Dalfox" },
  { icon: <GrConfigure className="h-5 w-5" />, label: "Metasploit"},
  { icon: <MdOutlineCreate className="h-5 w-5" />, label: "Scan Personalizado" },
  { icon: <FiTerminal className="h-5 w-5" />, label: "Terminal"}
];

const MainSidebar = ({ onSelectContent }: SidebarProps) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Verifica o tema inicial
    setIsDark(!document.documentElement.classList.contains("light"));

    // Adiciona listener para mudanças no tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(!document.documentElement.classList.contains("light"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-[250px] h-screen bg-[var(--card)] text-sidebar-foreground p-4 fixed left-0 top-0">
      <div className="flex justify-center mb-8">
        <img
          src={isDark ? "/logo.png" : "/logoLight.png"}
          alt="Logo"
          className="w-32 h-12 object-contain justify-start"
        />
      </div>

      <div className="flex flex-col space-y-1 w-full">
        {sidebarItems.map((item, idx) => (
          <div
            key={idx}
            role="button"
            tabIndex={0}
            className={cn(
              "w-full flex items-center px-3 py-2 text-sidebar-foreground hover:text-sidebar-primary",
              "transition-all duration-200 cursor-pointer",
            )}
            onClick={() => onSelectContent(item.label)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectContent(item.label);
              }
            }}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSidebar;
