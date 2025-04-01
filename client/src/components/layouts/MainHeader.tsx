import { Box, HStack, IconButton, Avatar } from "@chakra-ui/react";
import { FiBell, FiMoon, FiSettings } from "react-icons/fi";

const MainHeader = () => {
  return (
    <Box
      w="100%"
      h="8%"
      bg="gray.800"
      color="white"
      p={4}
      position="fixed"
      top={0}
      left={0}
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
    >
      <HStack spaceX={1}>
        
        <IconButton aria-label="Tema">
          <FiMoon color="#EEEEEE"/>
        </IconButton>

        <IconButton aria-label="Notificações">
          <FiBell color="#EEEEEE"/>
        </IconButton>

        <IconButton 
          aria-label="Abrir configurações">
          <FiSettings color="#EEEEEE"/>
        </IconButton>

        <Avatar.Root>
          <Avatar.Fallback name="Teste Jr." />
        </Avatar.Root>
        
      </HStack>
    </Box>
  );
};

export default MainHeader;