import MainSidebar from "../components/layouts/Sidebar";
import MainHeader from "../components/layouts/MainHeader";
import { CenterBox } from "../components/ui/CenterBox";
import Reports from "../components/layouts/Reports";
import Scheduling from "../components/layouts/Scheduling";
import PreMandeScans from "../components/layouts/PreMandeScans";
import Nmap from "../components/layouts/Nmap";
import SqlMap from "../components/layouts/SqlMap";
import MitmProxy from "../components/layouts/MitmProxy";
import Dalfox from "../components/layouts/Dalfox";
import Metasploit from "../components/layouts/Metasploit";
import CustomScan from "../components/layouts/CustomScan";
import Terminal from "../components/layouts/Terminal";
import Profile from "../components/layouts/Profile";
import Config from "../components/layouts/Config";
import { useState } from "react";

const Dashboard = () => {
  const [selectedContent, setSelectedContent] = useState("Relatórios");

  const renderContent = () => {
    switch (selectedContent) {
      case "Relatórios":
        return <Reports />;
      case "Agendamento":
        return <Scheduling />;
      case "PreMande Scans":
        return <PreMandeScans />;
      case "Nmap":
        return <Nmap />;
      case "SqlMap":
        return <SqlMap />;
      case "MitmProxy":
        return <MitmProxy />;
      case "Dalfox":
        return <Dalfox />;
      case "Metasploit":
        return <Metasploit />;
      case "Scan Personalizado":
        return <CustomScan />;
      case "Terminal":
        return <Terminal />;
      case "Profile":
        return <Profile />;
      case "Config":
        return <Config />;
      default:
        return <Reports />;
    }
  };

  return (
    <div className="h-[100dvh] w-[100vw] overflow-hidden">
      <MainHeader onSelectContent={setSelectedContent} />
      <MainSidebar onSelectContent={setSelectedContent} />
      <CenterBox className="p-6">
        {renderContent()}
      </CenterBox>
    </div>
  );
};

export default Dashboard;
