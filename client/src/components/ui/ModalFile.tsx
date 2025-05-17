import { Button } from "@/components/ui/button";
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
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-[1000] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-xl w-[80vw] h-[85vh] relative flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-700 p-3 rounded-t-xl flex justify-between items-center">
          <span className="text-white text-md font-medium">{fileName}</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-500"
              onClick={handleDownload}
              aria-label="Download file"
            >
              <FaDownload />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-red-500"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FaTimes />
            </Button>
          </div>
        </div>

        {/* PDF Controls */}
        <div className="bg-gray-700 p-2 border-b border-gray-600 flex justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-500"
              onClick={() => handlePageChange('prev')}
              disabled={pageNumber === 1}
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </Button>
            <span className="text-white text-sm">
              Página {pageNumber} de {numPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-500"
              onClick={() => handlePageChange('next')}
              disabled={pageNumber === numPages}
              aria-label="Next page"
            >
              <FaChevronRight />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-500"
              onClick={handleZoomOut}
              aria-label="Zoom out"
            >
              <FaSearchMinus />
            </Button>
            <span className="text-white text-sm">{Math.round(scale * 100)}%</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-500"
              onClick={handleZoomIn}
              aria-label="Zoom in"
            >
              <FaSearchPlus />
            </Button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="relative flex-1 overflow-auto bg-white">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
                Carregando...
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
                  Carregando página...
                </div>
              }
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default ModalFile;
