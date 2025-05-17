import { 
  Box, 
  Heading, 
  Icon,
  Text,
  Flex,
  Button,
  HStack,
  VStack
} from "@chakra-ui/react";
import { FaFilePdf, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import ModalFile from "../ModalFile";

// Mock data - replace with actual data from your backend
const reports = [
  { 
    id: 1, 
    name: "Ficha de Cadastro", 
    date: "01/01/2024",
    generatedBy: "Sistema Automático",
    size: "2.4 MB",
    status: "Concluído",
    url: "/lista.pdf"
  },
  { 
    id: 2, 
    name: "Relatório Mensal - Fevereiro 2024", 
    date: "01/02/2024",
    generatedBy: "Sistema Automático",
    size: "2.1 MB",
    status: "Concluído",
    url: "/pdf/Beoccaficha.pdf"
  },
  { 
    id: 3, 
    name: "Relatório Trimestral Q1 2024", 
    date: "01/03/2024",
    generatedBy: "Sistema Automático",
    size: "3.5 MB",
    status: "Concluído",
    url: "/pdf/Beoccaficha.pdf"
  },
  { 
    id: 4, 
    name: "Relatório Anual 2023", 
    date: "31/12/2023",
    generatedBy: "Sistema Automático",
    size: "5.2 MB",
    status: "Concluído",
    url: "/pdf/Beoccaficha.pdf"
  },
  // Add more mock data to test pagination
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 5,
    name: `Relatório de Teste ${i + 1}`,
    date: new Date(2024, 0, i + 1).toLocaleDateString('pt-BR'),
    generatedBy: "Sistema Automático",
    size: `${(Math.random() * 5).toFixed(1)} MB`,
    status: "Concluído",
    url: "/pdf/Beoccaficha.pdf"
  }))
];

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState<{ url: string; name: string } | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = reports.slice(startIndex, endIndex);

  const handleFileClick = (report: typeof reports[0]) => {
    setSelectedFile({
      url: report.url,
      name: report.name
    });
  };

  return (
    <Box p={2} h="100%" overflow="hidden">
      <VStack gap={4} align="stretch" h="100%">
        <Heading size="lg" px={2}>Relatórios</Heading>
        
        <Box flex="1" overflow="hidden">
          {/* Header */}
          <Flex 
            bg="gray.700" 
            p={3} 
            fontWeight="bold" 
            borderBottom="1px solid" 
            borderColor="gray.600"
          >
            <Box flex="3" color="white">Nome</Box>
            <Box flex="1" color="white">Data</Box>
            <Box flex="2" color="white">Gerado por</Box>
            <Box flex="1" color="white">Tamanho</Box>
            <Box flex="1" color="white">Status</Box>
          </Flex>

          {/* Rows */}
          {currentReports.map((report) => (
            <Flex
              key={report.id}
              bg="gray.800"
              p={3}
              _hover={{ bg: 'gray.600' }}
              cursor="pointer"
              transition="all 0.2s"
              borderBottom="1px solid"
              borderColor="gray.600"
              onClick={() => handleFileClick(report)}
            >
              <Box flex="3">
                <Flex align="center" gap={3}>
                  <Icon as={FaFilePdf} w={5} h={5} color="red.400" />
                  <Text color="white" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {report.name}
                  </Text>
                </Flex>
              </Box>
              <Box flex="1" color="white">{report.date}</Box>
              <Box flex="2" color="white" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {report.generatedBy}
              </Box>
              <Box flex="1" color="white">{report.size}</Box>
              <Box flex="1" color="white">{report.status}</Box>
            </Flex>
          ))}
        </Box>

        <Flex justify="center" mt={2}>
          <HStack gap={2}>
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              size="sm"
              color="white"
            >
              <FaChevronLeft />
            </Button>
            <Text color="white">
              Página {currentPage} de {totalPages}
            </Text>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              size="sm"
              color="white"
            >
              <FaChevronRight />
            </Button>
          </HStack>
        </Flex>
      </VStack>

      {selectedFile && (
        <ModalFile
          isOpen={!!selectedFile}
          onClose={() => setSelectedFile(null)}
          fileUrl={selectedFile.url}
          fileName={selectedFile.name}
        />
      )}
    </Box>
  );
};

export default Reports; 