import { Box, Text, VStack, Image } from "@chakra-ui/react";

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
      width="25" 
      height="10" 
      mb={8}
      align={"center"} 
      objectFit="contain" />
   
      <VStack align="start" mt={5} spaceY="2">
        <Text>Relatórios</Text>
        <Text>Agendamento</Text>
        <Text>PreMande Scans</Text>
        <Text>Agendamento</Text>
        <Text>Nmap</Text>
        <Text>SqlMap</Text>
        <Text>MitmProxy</Text>
        <Text>Dalfox</Text>
        <Text>Montar Scan Personalizado</Text>
      </VStack>
    </Box>
  );
};

export default MainSidebar;
