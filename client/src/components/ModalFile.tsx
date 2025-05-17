import { Box, IconButton, Flex, Text, HStack } from "@chakra-ui/react";
import { FaDownload, FaTimes, FaChevronLeft, FaChevronRight, FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configurar o worker do PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface ModalFileProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
}

const ModalFile = ({ isOpen, onClose, fileUrl, fileName }: ModalFileProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  useEffect(() => {
    if (isOpen) {
      setPageNumber(1);
      setScale(1.0);
    }
  }, [isOpen, fileUrl]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && pageNumber > 1) {
      setPageNumber(prev => prev - 1);
    } else if (direction === 'next' && pageNumber < numPages) {
      setPageNumber(prev => prev + 1);
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.8)"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        bg="gray.800"
        borderRadius="xl"
        width="80vw"
        height="85vh"
        position="relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <Flex
          bg="gray.700"
          p={3}
          borderTopRadius="xl"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="white" fontSize="md" fontWeight="medium">
            {fileName}
          </Text>
          <Flex gap={2}>
            <IconButton
              aria-label="Download file"
              onClick={handleDownload}
              colorScheme="blue"
              variant="ghost"
              color="white"
              size="sm"
              _hover={{ bg: 'blue.500' }}
            >
              <FaDownload />
            </IconButton>
            <IconButton
              aria-label="Close modal"
              onClick={onClose}
              colorScheme="red"
              variant="ghost"
              color="white"
              size="sm"
              _hover={{ bg: 'red.500' }}
            >
              <FaTimes />
            </IconButton>
          </Flex>
        </Flex>

        {/* PDF Controls */}
        <Flex
          bg="gray.700"
          p={2}
          borderBottom="1px solid"
          borderColor="gray.600"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <HStack gap={2}>
            <IconButton
              aria-label="Previous page"
              onClick={() => handlePageChange('prev')}
              disabled={pageNumber === 1}
              size="sm"
              colorScheme="blue"
              variant="ghost"
              color="white"
              _hover={{ bg: 'blue.500' }}
            >
              <FaChevronLeft />
            </IconButton>
            <Text color="white" fontSize="sm">
              Página {pageNumber} de {numPages}
            </Text>
            <IconButton
              aria-label="Next page"
              onClick={() => handlePageChange('next')}
              disabled={pageNumber === numPages}
              size="sm"
              colorScheme="blue"
              variant="ghost"
              color="white"
              _hover={{ bg: 'blue.500' }}
            >
              <FaChevronRight />
            </IconButton>
          </HStack>
          <HStack gap={2}>
            <IconButton
              aria-label="Zoom out"
              onClick={handleZoomOut}
              size="sm"
              colorScheme="blue"
              variant="ghost"
              color="white"
              _hover={{ bg: 'blue.500' }}
            >
              <FaSearchMinus />
            </IconButton>
            <Text color="white" fontSize="sm">
              {Math.round(scale * 100)}%
            </Text>
            <IconButton
              aria-label="Zoom in"
              onClick={handleZoomIn}
              size="sm"
              colorScheme="blue"
              variant="ghost"
              color="white"
              _hover={{ bg: 'blue.500' }}
            >
              <FaSearchPlus />
            </IconButton>
          </HStack>
        </Flex>

        {/* PDF Content */}
        <Box 
          position="relative" 
          height="calc(100% - 96px)" 
          overflow="auto"
          bg="white"
        >
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <Flex
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="gray.500"
              >
                Carregando...
              </Flex>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={
                <Flex
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  color="gray.500"
                >
                  Carregando página...
                </Flex>
              }
            />
          </Document>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalFile;
