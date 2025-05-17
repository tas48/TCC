import { Box, BoxProps } from "@chakra-ui/react";

interface CenterBoxProps extends BoxProps {
  children: React.ReactNode;
}

const CenterBox = ({ children, ...props }: CenterBoxProps) => {
  return (
    <Box
      position="fixed"
      top="60px"
      left="250px"
      right="0"
      bottom="0"
      overflow="auto"
      {...props}
    >
      {children}
    </Box>
  );
};

export default CenterBox;
