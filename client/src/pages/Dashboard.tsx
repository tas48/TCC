import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainSidebar from "../components/layouts/Sidebar";
import MainHeader from "../components/layouts/MainHeader";
import CenterBox from "../components/CenterBox";
import { useAuth } from "../context/AuthContext";
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
      default:
        return <Reports />;
    }
  };

  return (
    <Box h="100dvh" w="100vw" overflow="hidden">
      <MainHeader onSelectContent={setSelectedContent} />
      <MainSidebar onSelectContent={setSelectedContent} />
      <CenterBox p={6}>
        {renderContent()}
      </CenterBox>
    </Box>
  );
};

export default Dashboard;
