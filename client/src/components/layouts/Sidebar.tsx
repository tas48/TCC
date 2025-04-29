import { Box, Text, VStack, Image, HStack} from "@chakra-ui/react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { GrDocumentConfig } from "react-icons/gr";
import { MdOutlineCreate } from "react-icons/md";

const MainSidebar = () => { 
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
      alt="Logo" 
      width="18" 
      height="8" 
      mb={8}
      align={"center"} 
      objectFit="contain" />
   
      <VStack align="start" mt={5} spaceY="2">
        <HStack>
          <HiOutlineDocumentReport />
          <Text>Relatórios</Text>
        </HStack>
        <HStack>
          <FaRegClock />
          <Text>Agendamento</Text>
        </HStack>
        <HStack>
          <GrDocumentConfig />
          <Text>PreMande Scans</Text>
        </HStack>
        <HStack>
          <GrConfigure />
          <Text>Nmap</Text>
        </HStack>
        <HStack>
          <GrConfigure />
          <Text>SqlMap</Text>
        </HStack>
        <HStack>
          <GrConfigure />
          <Text>MitmProxy</Text>
        </HStack>
        <HStack>
          <GrConfigure />
          <Text>Dalfox</Text>
        </HStack>
        <HStack>
          <MdOutlineCreate />
          <Text>Scan Personalizado</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MainSidebar;
