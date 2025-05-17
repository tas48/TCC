import { Box, Heading, Input, Button, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { FaGripVertical } from "react-icons/fa";

const scanOptions = [
  {
    key: "nmap",
    label: "Nmap",
    types: [
      { value: "fast", label: "Scan Rápido" },
      { value: "full", label: "Scan Completo" },
      { value: "vuln", label: "Scan de Vulnerabilidades" }
    ],
    params: [
      { key: "timeout", label: "Timeout (segundos)", type: "number", default: 60 },
      { key: "threads", label: "Threads", type: "number", default: 4 },
      { key: "verbose", label: "Modo Verboso", type: "boolean", default: false },
      { key: "output", label: "Formato de Saída", type: "select", options: [
        { value: "text", label: "Texto" },
        { value: "xml", label: "XML" },
        { value: "json", label: "JSON" }
      ]}
    ]
  },
  {
    key: "dalfox",
    label: "Dalfox",
    types: [
      { value: "detect-xss", label: "Detectar XSS" },
      { value: "bypass-waf", label: "Bypass WAF" },
      { value: "analyze-context", label: "Analisar Contexto" }
    ],
    params: [
      { key: "timeout", label: "Timeout (segundos)", type: "number", default: 30 },
      { key: "blind", label: "Modo Blind", type: "boolean", default: false },
      { key: "mining", label: "Data Mining", type: "boolean", default: true },
      { key: "format", label: "Formato", type: "select", options: [
        { value: "plain", label: "Texto" },
        { value: "json", label: "JSON" }
      ]}
    ]
  },
  {
    key: "sqlmap",
    label: "Sqlmap",
    types: [
      { value: "detect", label: "Detectar SQLi" },
      { value: "dump", label: "Dump de Dados" },
      { value: "blind", label: "Blind SQLi" }
    ],
    params: [
      { key: "timeout", label: "Timeout (segundos)", type: "number", default: 30 },
      { key: "threads", label: "Threads", type: "number", default: 1 },
      { key: "level", label: "Nível de Teste", type: "select", options: [
        { value: "1", label: "Básico" },
        { value: "2", label: "Intermediário" },
        { value: "3", label: "Avançado" },
        { value: "4", label: "Completo" },
        { value: "5", label: "Agressivo" }
      ]},
      { key: "risk", label: "Nível de Risco", type: "select", options: [
        { value: "1", label: "Baixo" },
        { value: "2", label: "Médio" },
        { value: "3", label: "Alto" }
      ]}
    ]
  },
  {
    key: "mitmproxy",
    label: "Mitmproxy",
    types: [
      { value: "headers", label: "Análise de Headers" },
      { value: "full", label: "Interceptação Completa" }
    ],
    params: [
      { key: "timeout", label: "Timeout (segundos)", type: "number", default: 60 },
      { key: "ssl", label: "SSL/TLS", type: "boolean", default: true },
      { key: "filter", label: "Filtro", type: "select", options: [
        { value: "all", label: "Todos" },
        { value: "headers", label: "Apenas Headers" },
        { value: "body", label: "Apenas Body" }
      ]},
      { key: "output", label: "Formato de Saída", type: "select", options: [
        { value: "text", label: "Texto" },
        { value: "json", label: "JSON" },
        { value: "har", label: "HAR" }
      ]}
    ]
  }
];

const CustomScan = () => {
  const [target, setTarget] = useState("");
  const [selected, setSelected] = useState<{ key: string; type: string; params: Record<string, any> }[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Adiciona scan ao fluxo
  const addScan = (key: string) => {
    const tool = scanOptions.find(opt => opt.key === key);
    if (!tool) return;
    
    // Inicializa parâmetros com valores padrão
    const defaultParams = tool.params.reduce((acc, param) => ({
      ...acc,
      [param.key]: param.default
    }), {});

    setSelected(prev => [...prev, { 
      key, 
      type: tool.types[0].value,
      params: defaultParams
    }]);
  };

  // Remove scan do fluxo
  const removeScan = (idx: number) => {
    setSelected(prev => prev.filter((_, i) => i !== idx));
  };

  // Atualiza tipo de scan
  const updateType = (idx: number, type: string) => {
    setSelected(prev => prev.map((s, i) => i === idx ? { ...s, type } : s));
  };

  // Atualiza parâmetro
  const updateParam = (idx: number, paramKey: string, value: any) => {
    setSelected(prev => prev.map((s, i) => i === idx ? {
      ...s,
      params: { ...s.params, [paramKey]: value }
    } : s));
  };

  // Drag and drop simples (swap)
  const moveScan = (from: number, to: number) => {
    if (from === to) return;
    setSelected(prev => {
      const arr = [...prev];
      const [removed] = arr.splice(from, 1);
      arr.splice(to, 0, removed);
      return arr;
    });
  };

  const handleExecute = async () => {
    if (!target || selected.length === 0) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(`[resposta simulada para scan personalizado em ${target} com: ${selected.map(s => 
        `${s.key}:${s.type}(${Object.entries(s.params).map(([k, v]) => `${k}=${v}`).join(',')})`
      ).join(', ')}]`);
      setLoading(false);
    }, 1200);
    // Aqui você pode integrar com a API real
  };

  const renderParamInput = (param: any, value: any, onChange: (value: any) => void) => {
    switch (param.type) {
      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={1}
            max={100}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#1a202c',
              color: 'white',
              border: '1px solid #4a5568',
              borderRadius: '0.375rem'
            }}
          />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            style={{
              width: '1rem',
              height: '1rem',
              accentColor: '#319795'
            }}
          />
        );
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#1a202c',
              color: 'white',
              border: '1px solid #4a5568',
              borderRadius: '0.375rem'
            }}
          >
            {param.options.map((opt: any) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <Box bg="gray.800" color="white" p={8} borderRadius="lg" boxShadow="lg" maxW="800px" w="100%" mx="auto">
      <Heading size="lg" textAlign="center" mb={6}>Scan Personalizado</Heading>
      <VStack gap={4} align="stretch">
        <Input
          placeholder="Target (ex: dominio.com)"
          value={target}
          onChange={e => setTarget(e.target.value)}
          bg="gray.900"
          color="white"
          borderColor="gray.600"
          _placeholder={{ color: "gray.400" }}
        />
        <Text fontWeight="bold">Adicionar etapas ao scan:</Text>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={2} mb={2}>
          {scanOptions.map(opt => (
            <Button
              key={opt.key}
              colorScheme="teal"
              variant="outline"
              onClick={() => addScan(opt.key)}
              size="sm"
            >
              {opt.label}
            </Button>
          ))}
        </SimpleGrid>
        <Text fontWeight="bold">Fluxo do scan (arraste para reordenar):</Text>
        <VStack gap={4} align="stretch">
          {selected.map((scan, idx) => {
            const tool = scanOptions.find(opt => opt.key === scan.key);
            return (
              <Box key={idx} bg="gray.700" borderRadius="md" p={4}>
                <Box display="flex" alignItems="center" gap={3} mb={3}>
                  <Box
                    as="span"
                    cursor={idx > 0 ? "grab" : "default"}
                    onClick={() => idx > 0 && moveScan(idx, idx - 1)}
                    title="Arrastar para cima"
                    fontSize="xl"
                    color="teal.300"
                  >
                    <FaGripVertical />
                  </Box>
                  <Text minW={90} fontWeight="bold">{tool?.label}</Text>
                  <select
                    value={scan.type}
                    onChange={e => updateType(idx, e.target.value)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: '#1a202c',
                      color: 'white',
                      border: '1px solid #4a5568',
                      borderRadius: '0.375rem',
                      maxWidth: '180px'
                    }}
                  >
                    {tool?.types.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <Button colorScheme="red" size="xs" onClick={() => removeScan(idx)}>
                    Remover
                  </Button>
                  {idx < selected.length - 1 && (
                    <Button size="xs" onClick={() => moveScan(idx, idx + 1)} title="Mover para baixo">↓</Button>
                  )}
                </Box>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                  {tool?.params.map(param => (
                    <Box key={param.key}>
                      <Text fontSize="sm" mb={1}>{param.label}</Text>
                      {renderParamInput(param, scan.params[param.key], (value) => updateParam(idx, param.key, value))}
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            );
          })}
        </VStack>
        <Button 
          colorScheme="teal" 
          w="100%" 
          onClick={handleExecute} 
          loading={loading}
          color="white"
        >
          Executar
        </Button>
        {result && (
          <Box bg="gray.900" borderRadius="md" p={4} mt={2}>
            <Text fontSize="sm" whiteSpace="pre-wrap">{result}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CustomScan;
