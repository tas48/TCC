import { Box, Heading, Input, Button, VStack, Text, Spinner, Wrap, WrapItem, Checkbox, Select } from "@chakra-ui/react";
import { useState } from "react";

const nmapFunctions = [
  { key: "port_scan", label: "Scan de Portas", hasExtra: true },
  { key: "scan_vulnerabilities", label: "Scan de Vulnerabilidades", hasExtra: true },
  { key: "network_scan", label: "Scan de Rede" },
  { key: "evade_firewall_scan", label: "Evasão de Firewall" },
  { key: "firewall_detection", label: "Detecção de Firewall/WAF" },
];

const Nmap = () => {
  const [target, setTarget] = useState("");
  const [selectedFuncs, setSelectedFuncs] = useState<string[]>([]);
  const [extraParams, setExtraParams] = useState<{ [key: string]: any }>({ port_scan: "fast", scan_vulnerabilities: "1" });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckbox = (key: string) => {
    setSelectedFuncs(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    );
  };

  const handleExtraParam = (key: string, value: any) => {
    setExtraParams(prev => ({ ...prev, [key]: value }));
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
    try {
      const results: string[] = [];
      for (const func of selectedFuncs) {
        let body: any = { target };
        if (func === "port_scan") body.scan_type = extraParams.port_scan;
        if (func === "scan_vulnerabilities") body.vuln_scan_type = Number(extraParams.scan_vulnerabilities);
        const res = await fetch(`/api/nmap/${func}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        results.push(
          `Função: ${func}\n` +
          (data.message ? `Mensagem: ${data.message}\n` : "") +
          (data.data ? JSON.stringify(data.data, null, 2) : "")
        );
      }
      setResult(results.join("\n\n----------------------\n\n"));
    } catch (err) {
      setError("Erro ao se comunicar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="gray.900" color="white" display="flex" alignItems="center" justifyContent="center" p={4}>
      <Box bg="gray.800" color="white" p={8} borderRadius="lg" boxShadow="lg" minW="350px" maxW="700px" w="100%" mx="auto">
        <VStack align="center" gap={6}>
          <Heading size="lg" textAlign="center">Nmap</Heading>
          <Box w="100%">
            <Text mb={1} textAlign="center">Target</Text>
            <Input
              placeholder="192.168.0.1 ou dominio.com"
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
              {nmapFunctions.map(f => (
                <WrapItem key={f.key}>
                  <Checkbox.Root
                    checked={selectedFuncs.includes(f.key)}
                    onCheckedChange={() => handleCheckbox(f.key)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control borderColor="white" _checked={{ bg: "teal.400", borderColor: "white" }} />
                    <Checkbox.Label>{f.label}</Checkbox.Label>
                  </Checkbox.Root>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
          {/* Campos extras dinâmicos */}
          {selectedFuncs.includes("port_scan") && (
            <Box w="100%">
              <Text mb={1} textAlign="center">Tipo de Scan de Portas</Text>
              <Select.Root value={extraParams.port_scan} onValueChange={v => handleExtraParam("port_scan", v)}>
                <Select.Trigger bg="gray.900" color="white" borderColor="gray.700" />
                <Select.Content>
                  <Select.Item value="fast">Rápido</Select.Item>
                  <Select.Item value="full">Completo</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>
          )}
          {selectedFuncs.includes("scan_vulnerabilities") && (
            <Box w="100%">
              <Text mb={1} textAlign="center">Tipo de Scan de Vulnerabilidades</Text>
              <Select.Root value={String(extraParams.scan_vulnerabilities)} onValueChange={v => handleExtraParam("scan_vulnerabilities", v)}>
                <Select.Trigger bg="gray.900" color="white" borderColor="gray.700" />
                <Select.Content>
                  <Select.Item value="1">Scripts Específicos</Select.Item>
                  <Select.Item value="2">Todos os scripts de vulnerabilidade</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>
          )}
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

export default Nmap; 