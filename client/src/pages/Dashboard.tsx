import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainSidebar from "../components/layouts/Sidebar";
import MainHeader from "../components/layouts/MainHeader";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Box minH="100vh" minW={"100vw"}>
      <MainHeader />
      <MainSidebar />
    </Box>
  );
};

export default Dashboard;
