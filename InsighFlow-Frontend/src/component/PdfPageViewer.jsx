import React, { useState, useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker?url";
import axios from "axios";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
  FaSearchPlus,
  FaSearchMinus,
} from "react-icons/fa";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfPageViewer = ({ fileUrl, summary, setSummary }) => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [renderError, setRenderError] = useState(false);
  const [scale, setScale] = useState(1.8);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Load the PDF
  useEffect(() => {
    if (!fileUrl) return;

    setPageLoading(true);
    setRenderError(false);

    (async () => {
      try {
        const loadingTask = getDocument(fileUrl);
        const loadedPdf = await loadingTask.promise;
        setPdf(loadedPdf);
        setNumPages(loadedPdf.numPages);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setRenderError(true);
        setPageLoading(false);
      }
    })();
  }, [fileUrl]);

  useEffect(() => {
    if (!pdf || !containerRef.current || !canvasRef.current) return;

    setPageLoading(true);
    setRenderError(false);

    (async () => {
      try {
        const page = await pdf.getPage(currentPage);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        setPageLoading(false);
      } catch (error) {
        console.error("Error rendering page:", error);
        setRenderError(true);
        setPageLoading(false);
      }
    })();
  }, [pdf, currentPage, scale]);

  const summarize = async () => {
    if (!pdf) return;

    setIsLoading(true);
    try {
      const page = await pdf.getPage(currentPage);

      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");

      const response = await axios.post(`${API_URL}/summarize`, {
        text: pageText,
      });

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error summarizing page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((p) => Math.min(p + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6));
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        className="flex-grow flex items-center justify-center bg-gray-700 overflow-auto p-4"
        style={{
          minHeight: "600px",
          maxHeight: "calc(100vh - 150px)", // Ensure there's room for nav controls
        }}
      >
        <div className="flex items-center justify-center min-h-full">
          <canvas
            ref={canvasRef}
            className="shadow-xl rounded bg-white"
            style={{ display: pageLoading ? "none" : "block" }}
          />
        </div>
        {pageLoading && (
          <div className="flex flex-col items-center justify-center text-gray-300 p-8">
            <div className="animate-pulse mb-4">
              <FaFileAlt size={48} />
            </div>
            <p>Loading page {currentPage}...</p>
          </div>
        )}
        {renderError && (
          <div className="flex flex-col items-center justify-center text-red-400 p-8">
            <FaFileAlt size={48} className="mb-4" />
            <p>Error loading PDF. Please try again with a different file.</p>
          </div>
        )}
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-b-lg sticky bottom-0 left-0 right-0 z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              disabled={currentPage <= 1 || pageLoading}
              className={`p-2 rounded-full ${
                currentPage <= 1 || pageLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition-colors`}
              aria-label="Previous page"
            >
              <FaArrowLeft size={14} />
            </button>

            <span className="text-sm font-medium whitespace-nowrap">
              Page {currentPage} of {numPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage >= numPages || pageLoading}
              className={`p-2 rounded-full ${
                currentPage >= numPages || pageLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition-colors`}
              aria-label="Next page"
            >
              <FaArrowRight size={14} />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={zoomOut}
              disabled={pageLoading}
              className={`p-2 rounded-full ${
                pageLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition-colors`}
              aria-label="Zoom out"
            >
              <FaSearchMinus size={14} />
            </button>

            <span className="text-xs font-medium whitespace-nowrap">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              disabled={pageLoading}
              className={`p-2 rounded-full ${
                pageLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition-colors`}
              aria-label="Zoom in"
            >
              <FaSearchPlus size={14} />
            </button>
          </div>

          <button
            onClick={summarize}
            disabled={!pdf || isLoading || pageLoading}
            className={`px-4 py-2 rounded ${
              !pdf || isLoading || pageLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } transition-colors text-sm font-medium flex items-center whitespace-nowrap`}
          >
            {isLoading ? "Summarizing..." : "Summarize Page"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfPageViewer;
