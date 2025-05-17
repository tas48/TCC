import { Box, Heading, Input, Button, VStack, Text, Stack, Spinner, Wrap, WrapItem, Checkbox } from "@chakra-ui/react";
import { useState } from "react";


const dalfoxFunctions = [
  { key: "detect-xss", label: "Detectar XSS" },
  { key: "bypass-waf", label: "Bypass WAF" },
  { key: "analyze-context", label: "Analisar Contexto" },
  { key: "check-csp", label: "Checar CSP" },
  { key: "discover-hidden-params", label: "Descobrir Parâmetros Ocultos" },
  { key: "detect-reflected-params", label: "Detectar Parâmetros Refletidos" },
  { key: "detect-persistent-xss", label: "Detectar XSS Persistente" },
  { key: "check-input-sanitization", label: "Checar Saneamento de Input" },
  { key: "detect-xss-json", label: "Detectar XSS em JSON" },
];

const Dalfox = () => {
  const [target, setTarget] = useState("");
  const [selectedFuncs, setSelectedFuncs] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckbox = (key: string) => {
    setSelectedFuncs(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    );
  };

  const handleSubmit = async () => {
    if (!target) {
      setError("Informe o target.");
      return;
    }
    if (selectedFuncs.length === 0) {
      setError("Selecione pelo menos uma função.");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);
    setTimeout(() => {
      setResult(`[resposta simulada para ${selectedFuncs.join(", ")} em ${target}]`);
      setLoading(false);
    }, 1200);
    // Exemplo de chamada real:
    // const res = await fetch(`/api/dalfox`, { method: 'POST', body: JSON.stringify({ target, funcs: selectedFuncs }) });
    // const data = await res.json();
    // setResult(JSON.stringify(data, null, 2));
  };

  return (
    <Box bg="gray.900" color="white" display="flex" alignItems="center" justifyContent="center" p={4}>
      <Box bg="gray.800" color="white" p={8} borderRadius="lg" boxShadow="lg" minW="350px" maxW="700px" w="100%" mx="auto">
        <VStack align="center" gap={6}>
          <Heading size="lg" textAlign="center">Dalfox</Heading>
          <Box w="100%">
            <Text mb={1} textAlign="center">Target</Text>
            <Input
              placeholder="https://exemplo.com"
              value={target}
              onChange={e => setTarget(e.target.value)}
              bg="gray.900"
              color="white"
              borderColor="gray.700"
              _placeholder={{ color: "gray.400" }}
              textAlign="center"
            />
          </Box>
          <Box w="100%">
            <Text mb={1} textAlign="center">Funções</Text>
            <Wrap gap={4} justify="center">
              {dalfoxFunctions.map(f => (
                <WrapItem key={f.key}>
                  <Checkbox.Root
                    checked={selectedFuncs.includes(f.key)}
                    onCheckedChange={() => handleCheckbox(f.key)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{f.label}</Checkbox.Label>
                  </Checkbox.Root>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
          <Button colorScheme="teal" variant="solid" onClick={handleSubmit} loading={loading} w="100%" color="white">
            Executar
          </Button>
          {error && <Text color="red.300" textAlign="center">{error}</Text>}
          <Box bg="gray.900" borderRadius="md" p={4} minH="80px" w="100%" mt={2}>
            {loading && <Spinner color="teal.200" />}
            {result && <Text whiteSpace="pre-wrap">{result}</Text>}
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dalfox; 