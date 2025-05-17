import { Box, Heading, Input, Button, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const scanConfigs = [
  {
    name: "Scan Leve",
    tools: ["Nmap (scan rápido)", "Dalfox (detect-xss)", "Sqlmap (básico)", "Mitmproxy (headers)"]
  },
  {
    name: "Scan Médio",
    tools: ["Nmap (scan completo)", "Dalfox (todas funções)", "Sqlmap (médio)", "Mitmproxy (headers + intercept)"]
  },
  {
    name: "Scan Profundo",
    tools: ["Nmap (vuln scan)", "Dalfox (todas funções)", "Sqlmap (profundo)", "Mitmproxy (full)"]
  }
];

const PreMandeScans = () => {
  const [targets, setTargets] = useState(["", "", ""]);
  const [loading, setLoading] = useState([false, false, false]);
  const [result, setResult] = useState<(string | null)[]>([null, null, null]);

  const handleInput = (idx: number, value: string) => {
    setTargets(prev => prev.map((t, i) => (i === idx ? value : t)));
  };

  const handleExecute = async (idx: number) => {
    if (!targets[idx]) return;
    setLoading(prev => prev.map((l, i) => (i === idx ? true : l)));
    setResult(prev => prev.map((r, i) => (i === idx ? null : r)));
    // Simulação de execução
    setTimeout(() => {
      setLoading(prev => prev.map((l, i) => (i === idx ? false : l)));
      setResult(prev => prev.map((r, i) => (i === idx ? `[resposta simulada para ${scanConfigs[idx].name} em ${targets[idx]}]` : r)));
    }, 1200);
    // Aqui você pode integrar com a API real
  };

  return (
    <Box p={4}>
      <Box bg="gray.800" p={8} borderRadius="lg" boxShadow="lg" maxW="900px" w="100%" mx="auto">
        <Heading size="lg" textAlign="center" mb={8}>PreMande Scans</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          {scanConfigs.map((scan, idx) => (
            <Box key={scan.name} bg="gray.700" borderRadius="md" p={6} boxShadow="md" display="flex" flexDirection="column" alignItems="center">
              <Heading size="md" mb={4} textAlign="center">{scan.name}</Heading>
              <Text fontWeight="bold" mb={2}>Ferramentas:</Text>
              <ul style={{ marginBottom: 16, width: '100%' }}>
                {scan.tools.map(tool => (
                  <li key={tool} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                    <FaCheckCircle color="#4fd1c5" style={{ marginRight: 8 }} />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
              <Input
                placeholder="Target (ex: dominio.com)"
                value={targets[idx]}
                onChange={e => handleInput(idx, e.target.value)}
                bg="gray.900"
                color="white"
                borderColor="gray.600"
                _placeholder={{ color: "gray.400" }}
                mb={3}
              />
              <Button
                colorScheme="teal"
                w="100%"
                onClick={() => handleExecute(idx)}
                loading={loading[idx]}
                color="white"
              >
                Executar
              </Button>
              {result[idx] && (
                <Box bg="gray.900" borderRadius="md" p={3} mt={3} w="100%">
                  <Text fontSize="sm" whiteSpace="pre-wrap">{result[idx]}</Text>
                </Box>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default PreMandeScans; 