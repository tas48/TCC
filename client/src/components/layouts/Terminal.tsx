import { Box, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";

const Terminal = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const historyRef = useRef<HTMLDivElement>(null);

  // Scroll automático para o final
  const scrollToBottom = () => {
    setTimeout(() => {
      if (historyRef.current) {
        historyRef.current.scrollTop = historyRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      sendCommand(input.trim());
    }
  };

  // Placeholder para envio de comando ao backend
  const sendCommand = (cmd: string) => {
    setHistory(prev => [...prev, `> ${cmd}`, "[resposta do backend aqui]"]);
    setInput("");
    scrollToBottom();
    // Aqui você pode implementar a chamada real para a API
    // Exemplo:
    // fetch('/api/terminal', { method: 'POST', body: JSON.stringify({ cmd }) })
    //   .then(res => res.text())
    //   .then(output => setHistory(prev => [...prev, output]));
  };

  // Cores fixas
  const bg = "#18181b";
  const color = "#a3e635";
  const promptColor = "#bef264";

  return (
    <Box bg={bg} color={color} p={0} borderRadius="md" h="100%" display="flex" flexDirection="column">
      <Box bg="#27272a" px={4} py={2} borderTopRadius="md">
        <Heading size="md" color={color}>Terminal</Heading>
      </Box>
      <Box
        ref={historyRef}
        flex="1"
        px={4}
        py={2}
        overflowY="auto"
        fontFamily="monospace"
        fontSize="md"
        bg={bg}
        borderBottom="1px solid #222"
      >
        <VStack align="start" gap={1}>
          {history.map((line, idx) => (
            <Text key={idx} color={line.startsWith('>') ? promptColor : color}>
              {line}
            </Text>
          ))}
        </VStack>
      </Box>
      <Box px={4} py={2} bg="#27272a" borderBottomRadius="md">
        <Input
          placeholder="Digite um comando e pressione Enter..."
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          variant="outline"
          color={color}
          fontFamily="monospace"
          autoFocus
        />
      </Box>
    </Box>
  );
};

export default Terminal; 