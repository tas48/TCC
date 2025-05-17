import { Box, Text, VStack, Image, HStack } from "@chakra-ui/react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { GrDocumentConfig } from "react-icons/gr";
import { MdOutlineCreate } from "react-icons/md";
import { FiTerminal } from "react-icons/fi";

interface SidebarProps {
  onSelectContent: (content: string) => void;
}

const sidebarItems = [
  { icon: <HiOutlineDocumentReport />, label: "Relatórios" },
  { icon: <FaRegClock />, label: "Agendamento" },
  { icon: <GrDocumentConfig />, label: "PreMande Scans" },
  { icon: <GrConfigure />, label: "Nmap" },
  { icon: <GrConfigure />, label: "SqlMap" },
  { icon: <GrConfigure />, label: "MitmProxy" },
  { icon: <GrConfigure />, label: "Dalfox" },
  { icon: <GrConfigure />, label: "Metasploit"},
  { icon: <MdOutlineCreate />, label: "Scan Personalizado" },
  { icon: <FiTerminal />, label: "Terminal"}
];

const MainSidebar = ({ onSelectContent }: SidebarProps) => {
  return (
    <Box
      w="250px"
      h="100vh"
      bg="gray.800"
      color="white"
      p={4}
      position="fixed"
      left={0}
      top={0}
    >
      <Image
        src="../public/logo.png"
        alt=" Logo"
        width="18"
        height="8"
        marginStart={3}
        mb={8}
        align={"center"}
        objectFit="contain"
      />

      <VStack align="start" mt={1} w="100%">
        {sidebarItems.map((item, idx) => (
          <HStack
            key={idx}
            w="100%"
            px={3}
            py={2}
            borderRadius="md"
            transition="all 0.2s"
            cursor="pointer"
            onClick={() => onSelectContent(item.label)}
          >
            {item.icon}
            <Text
              transition="all 0.2s"
              _hover={{
                color: "gray.300",
              }}
            >
              {item.label}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default MainSidebar;
