// // // // // PdfPageViewer.jsx
// // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import { getDocument } from "pdfjs-dist";
// // // // // If you're on pdf.js v3+, use:
// // // // // import "pdfjs-dist/legacy/build/pdf.worker.entry";4
// // // // import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

// // // // import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker?url"; // Vite/Webpack bundling the worker as a URL

// // // // // Tell pdf.js where to find the worker
// // // // GlobalWorkerOptions.workerSrc = pdfjsWorker;

// // // // const PdfPageViewer = ({ fileUrl }) => {
// // // //   const [pdf, setPdf] = useState(null);
// // // //   const [numPages, setNumPages] = useState(0);
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const canvasRef = useRef(null);

// // // //   // Load the PDF
// // // //   useEffect(() => {
// // // //     if (!fileUrl) return;
// // // //     (async () => {
// // // //       const loadingTask = getDocument(fileUrl);
// // // //       const loadedPdf = await loadingTask.promise;
// // // //       setPdf(loadedPdf);
// // // //       setNumPages(loadedPdf.numPages);
// // // //       setCurrentPage(1);
// // // //     })();
// // // //   }, [fileUrl]);

// // // //   //   Render the current page to <canvas>
// // // //   useEffect(() => {
// // // //     if (!pdf) return;
// // // //     (async () => {
// // // //       const page = await pdf.getPage(currentPage);
// // // //       const scale = 1.5; // adjust for zoom
// // // //       const viewport = page.getViewport({ scale });

// // // //       const canvas = canvasRef.current;
// // // //       const ctx = canvas.getContext("2d");
// // // //       canvas.height = viewport.height;
// // // //       canvas.width = viewport.width;

// // // //       await page.render({
// // // //         canvasContext: ctx,
// // // //         viewport,
// // // //       }).promise;
// // // //     })();
// // // //   }, [pdf, currentPage]);
// // // //   //   useEffect(() => {
// // // //   //     if (!pdf) return;
// // // //   //     (async () => {
// // // //   //       const page = await pdf.getPage(currentPage);
// // // //   //       // Get the container's width (you could use a ref for the container)
// // // //   //       const containerWidth = containerRef.current.offsetWidth;
// // // //   //       const viewport = page.getViewport({ scale: 1 });
// // // //   //       const scale = containerWidth / viewport.width; // adjust scale to fit container
// // // //   //       const scaledViewport = page.getViewport({ scale });

// // // //   //       const canvas = canvasRef.current;
// // // //   //       const ctx = canvas.getContext("2d");
// // // //   //       canvas.height = scaledViewport.height;
// // // //   //       canvas.width = scaledViewport.width;

// // // //   //       await page.render({
// // // //   //         canvasContext: ctx,
// // // //   //         viewport: scaledViewport,
// // // //   //       }).promise;
// // // //   //     })();
// // // //   //   }, [pdf, currentPage]);

// // // //   const handlePrev = () => {
// // // //     setCurrentPage((p) => Math.max(p - 1, 1));
// // // //   };

// // // //   const handleNext = () => {
// // // //     setCurrentPage((p) => Math.min(p + 1, numPages));
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col items-center p-2 text-white">
// // // //       <canvas ref={canvasRef} className="border border-gray-300 rounded" />
// // // //       <div className="flex items-center gap-4 mb-2">
// // // //         <button
// // // //           onClick={handlePrev}
// // // //           disabled={currentPage <= 1}
// // // //           className="bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700"
// // // //         >
// // // //           Prev
// // // //         </button>
// // // //         <span>
// // // //           Page {currentPage} of {numPages}
// // // //         </span>
// // // //         <button
// // // //           onClick={handleNext}
// // // //           disabled={currentPage >= numPages}
// // // //           className="bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700"
// // // //         >
// // // //           Next
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PdfPageViewer;
// // // // PdfPageViewer.jsx
// // // import React, { useState, useEffect, useRef } from "react";
// // // import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
// // // import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker?url";
// // // import axios from "axios";

// // // // Set the workerSrc so pdf.js can load its worker file
// // // GlobalWorkerOptions.workerSrc = pdfjsWorker;

// // // const PdfPageViewer = ({ fileUrl, summary, setSummary }) => {
// // //   const [pdf, setPdf] = useState(null);
// // //   const [numPages, setNumPages] = useState(0);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const containerRef = useRef(null);
// // //   const canvasRef = useRef(null);

// // //   // Load the PDF
// // //   useEffect(() => {
// // //     if (!fileUrl) return;
// // //     (async () => {
// // //       const loadingTask = getDocument(fileUrl);
// // //       const loadedPdf = await loadingTask.promise;
// // //       setPdf(loadedPdf);
// // //       setNumPages(loadedPdf.numPages);
// // //       setCurrentPage(1);
// // //     })();
// // //   }, [fileUrl]);

// // //   // Render the current page with dynamic scaling
// // //   useEffect(() => {
// // //     if (!pdf || !containerRef.current) return;
// // //     (async () => {
// // //       const page = await pdf.getPage(currentPage);
// // //       // Get the container's width. Make sure container has a defined width.
// // //       const containerWidth = containerRef.current.offsetWidth;
// // //       const viewport = page.getViewport({ scale: 1 });
// // //       // Calculate a scale factor so the page fits the container's width.
// // //       const scale = Math.min(containerWidth / viewport.width, 0.8);
// // //       const scaledViewport = page.getViewport({ scale });

// // //       const canvas = canvasRef.current;
// // //       const ctx = canvas.getContext("2d");
// // //       // Set canvas dimensions to the scaled page dimensions.
// // //       canvas.height = scaledViewport.height;
// // //       canvas.width = scaledViewport.width;

// // //       await page.render({
// // //         canvasContext: ctx,
// // //         viewport: scaledViewport,
// // //       }).promise;
// // //     })();
// // //   }, [pdf, currentPage]);
// // //   const summarize = async () => {
// // //     if (!pdf) return;
// // //     try {
// // //       // Get the current page
// // //       const page = await pdf.getPage(currentPage);
// // //       // Extract text content from the page
// // //       const textContent = await page.getTextContent();
// // //       const pageText = textContent.items.map((item) => item.str).join(" ");

// // //       // Send the extracted text to your summarization API
// // //       const response = await axios.post("http://localhost:5000/summarize", {
// // //         text: pageText,
// // //       });

// // //       // Update state with the summary returned by the API
// // //       setSummary(response.data.summary);
// // //     } catch (error) {
// // //       console.error("Error summarizing page:", error);
// // //     }
// // //   };

// // //   const handlePrev = () => {
// // //     setCurrentPage((p) => Math.max(p - 1, 1));
// // //   };

// // //   const handleNext = () => {
// // //     setCurrentPage((p) => Math.min(p + 1, numPages));
// // //   };

// // //   return (
// // //     <div ref={containerRef} className="w-full max-w-3xl mx-auto p-4">
// // //       {/* Canvas for PDF rendering */}
// // //       <canvas ref={canvasRef} className="border border-gray-300 rounded" />

// // //       {/* Navigation Controls */}
// // //       <div className="flex items-center gap-4 mt-4">
// // //         <center>
// // //           <button
// // //             onClick={handlePrev}
// // //             disabled={currentPage <= 1}
// // //             className="bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700 text-white"
// // //           >
// // //             Prev
// // //           </button>
// // //           <span className="text-white">
// // //             Page {currentPage} of {numPages}
// // //           </span>
// // //           <button
// // //             onClick={handleNext}
// // //             disabled={currentPage >= numPages}
// // //             className="bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700 text-white"
// // //           >
// // //             Next
// // //           </button>
// // //           <button
// // //             onClick={summarize}
// // //             disabled={currentPage >= numPages}
// // //             className="bg-indigo-600 ml-12 px-3 py-1 rounded hover:bg-indigo-700 text-white"
// // //           >
// // //             Summarize this page
// // //           </button>
// // //         </center>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PdfPageViewer;
// // // import React, { useState, useEffect, useRef } from "react";
// // // import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
// // // import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker?url";
// // // import axios from "axios";
// // // import { FaArrowLeft, FaArrowRight, FaFileAlt } from "react-icons/fa";

// // // // Set the workerSrc so pdf.js can load its worker file
// // // GlobalWorkerOptions.workerSrc = pdfjsWorker;

// // // const PdfPageViewer = ({ fileUrl, summary, setSummary }) => {
// // //   const [pdf, setPdf] = useState(null);
// // //   const [numPages, setNumPages] = useState(0);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [pageLoading, setPageLoading] = useState(true);
// // //   const containerRef = useRef(null);
// // //   const canvasRef = useRef(null);

// // //   // Load the PDF
// // //   useEffect(() => {
// // //     if (!fileUrl) return;

// // //     setPageLoading(true);
// // //     (async () => {
// // //       try {
// // //         const loadingTask = getDocument(fileUrl);
// // //         const loadedPdf = await loadingTask.promise;
// // //         setPdf(loadedPdf);
// // //         setNumPages(loadedPdf.numPages);
// // //         setCurrentPage(1);
// // //       } catch (error) {
// // //         console.error("Error loading PDF:", error);
// // //       }
// // //     })();
// // //   }, [fileUrl]);

// // //   // Render the current page with dynamic scaling
// // //   useEffect(() => {
// // //     if (!pdf || !containerRef.current) return;

// // //     setPageLoading(true);
// // //     (async () => {
// // //       try {
// // //         const page = await pdf.getPage(currentPage);

// // //         // Get the container's width
// // //         const containerWidth = containerRef.current.offsetWidth;
// // //         const viewport = page.getViewport({ scale: 1 });

// // //         // Calculate a scale factor so the page fits the container's width
// // //         const scale = Math.min(containerWidth / viewport.width, 1.2);
// // //         const scaledViewport = page.getViewport({ scale });

// // //         const canvas = canvasRef.current;
// // //         const ctx = canvas.getContext("2d");

// // //         // Set canvas dimensions to the scaled page dimensions
// // //         canvas.height = scaledViewport.height;
// // //         canvas.width = scaledViewport.width;

// // //         await page.render({
// // //           canvasContext: ctx,
// // //           viewport: scaledViewport,
// // //         }).promise;

// // //         setPageLoading(false);
// // //       } catch (error) {
// // //         console.error("Error rendering page:", error);
// // //         setPageLoading(false);
// // //       }
// // //     })();
// // //   }, [pdf, currentPage]);

// // //   const summarize = async () => {
// // //     if (!pdf) return;

// // //     setIsLoading(true);
// // //     try {
// // //       // Get the current page
// // //       const page = await pdf.getPage(currentPage);

// // //       // Extract text content from the page
// // //       const textContent = await page.getTextContent();
// // //       const pageText = textContent.items.map((item) => item.str).join(" ");

// // //       // Send the extracted text to your summarization API
// // //       const response = await axios.post("http://localhost:5000/summarize", {
// // //         text: pageText,
// // //       });

// // //       // Update state with the summary returned by the API
// // //       setSummary(response.data.summary);
// // //     } catch (error) {
// // //       console.error("Error summarizing page:", error);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handlePrev = () => {
// // //     setCurrentPage((p) => Math.max(p - 1, 1));
// // //   };

// // //   const handleNext = () => {
// // //     setCurrentPage((p) => Math.min(p + 1, numPages));
// // //   };

// // //   return (
// // //     <div className="flex flex-col h-full">
// // //       {/* PDF Canvas Container */}
// // //       <div
// // //         ref={containerRef}
// // //         className="flex-grow flex items-center justify-center bg-gray-100 overflow-auto p-2"
// // //       >
// // //         {pageLoading ? (
// // //           <div className="flex flex-col items-center justify-center text-gray-400 p-8">
// // //             <div className="animate-pulse mb-4">
// // //               <FaFileAlt size={48} />
// // //             </div>
// // //             <p>Loading page {currentPage}...</p>
// // //           </div>
// // //         ) : (
// // //           <div className="flex items-center justify-center min-h-full">
// // //             <canvas ref={canvasRef} className="shadow-lg rounded bg-white" />
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Navigation Controls */}
// // //       <div className="bg-gray-800 text-white p-3 rounded-b-lg">
// // //         <div className="flex items-center justify-between">
// // //           <div className="flex items-center space-x-2">
// // //             <button
// // //               onClick={handlePrev}
// // //               disabled={currentPage <= 1 || pageLoading}
// // //               className={`p-2 rounded-full ${
// // //                 currentPage <= 1 || pageLoading
// // //                   ? "bg-gray-600 cursor-not-allowed"
// // //                   : "bg-indigo-600 hover:bg-indigo-700"
// // //               } transition-colors`}
// // //               aria-label="Previous page"
// // //             >
// // //               <FaArrowLeft size={14} />
// // //             </button>

// // //             <span className="text-sm font-medium">
// // //               Page {currentPage} of {numPages}
// // //             </span>

// // //             <button
// // //               onClick={handleNext}
// // //               disabled={currentPage >= numPages || pageLoading}
// // //               className={`p-2 rounded-full ${
// // //                 currentPage >= numPages || pageLoading
// // //                   ? "bg-gray-600 cursor-not-allowed"
// // //                   : "bg-indigo-600 hover:bg-indigo-700"
// // //               } transition-colors`}
// // //               aria-label="Next page"
// // //             >
// // //               <FaArrowRight size={14} />
// // //             </button>
// // //           </div>

// // //           <button
// // //             onClick={summarize}
// // //             disabled={!pdf || isLoading || pageLoading}
// // //             className={`px-4 py-2 rounded ${
// // //               !pdf || isLoading || pageLoading
// // //                 ? "bg-gray-600 cursor-not-allowed"
// // //                 : "bg-indigo-600 hover:bg-indigo-700"
// // //             } transition-colors text-sm font-medium flex items-center`}
// // //           >
// // //             {isLoading ? "Summarizing..." : "Summarize Page"}
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PdfPageViewer;
// // import React, { useState, useEffect, useRef } from "react";
// // import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
// // import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker?url";
// // import axios from "axios";
// // import { FaArrowLeft, FaArrowRight, FaFileAlt } from "react-icons/fa";

// // // Set the workerSrc so pdf.js can load its worker file
// // GlobalWorkerOptions.workerSrc = pdfjsWorker;

// // const PdfPageViewer = ({ fileUrl, summary, setSummary }) => {
// //   const [pdf, setPdf] = useState(null);
// //   const [numPages, setNumPages] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [pageLoading, setPageLoading] = useState(true);
// //   const [renderError, setRenderError] = useState(false);
// //   const containerRef = useRef(null);
// //   const canvasRef = useRef(null);

// //   // Load the PDF
// //   useEffect(() => {
// //     if (!fileUrl) return;

// //     setPageLoading(true);
// //     setRenderError(false);

// //     (async () => {
// //       try {
// //         const loadingTask = getDocument(fileUrl);
// //         const loadedPdf = await loadingTask.promise;
// //         setPdf(loadedPdf);
// //         setNumPages(loadedPdf.numPages);
// //         setCurrentPage(1);
// //       } catch (error) {
// //         console.error("Error loading PDF:", error);
// //         setRenderError(true);
// //       }
// //     })();
// //   }, [fileUrl]);

// //   // Render the current page with dynamic scaling
// //   useEffect(() => {
// //     console.log("rrr");
// //     console.log(pdf, " ", containerRef.current, " ", canvasRef.current);

// //     if (!pdf || !containerRef.current || !canvasRef.current) return;

// //     setPageLoading(true);
// //     setRenderError(false);

// //     (async () => {
// //       try {
// //         const page = await pdf.getPage(currentPage);

// //         // Get the container's width
// //         const containerWidth = containerRef.current.offsetWidth;
// //         const containerHeight = containerRef.current.offsetHeight;
// //         const viewport = page.getViewport({ scale: 1.5 });

// //         // Calculate scale to fit either width or height (whichever is more constraining)
// //         const widthScale = (containerWidth - 40) / viewport.width;
// //         const heightScale = (containerHeight - 40) / viewport.height;
// //         const scale = Math.min(widthScale, heightScale, 3.0); // Limit max scale

// //         const scaledViewport = page.getViewport({ scale });

// //         const canvas = canvasRef.current;
// //         const ctx = canvas.getContext("2d");

// //         // Set canvas dimensions to the scaled page dimensions
// //         canvas.height = scaledViewport.height;
// //         canvas.width = scaledViewport.width;

// //         // Clear canvas
// //         ctx.fillStyle = "white";
// //         ctx.fillRect(0, 0, canvas.width, canvas.height);
// //         console.log("yayyy11");

// //         // Render the PDF page
// //         await page.render({
// //           canvasContext: ctx,
// //           viewport: scaledViewport,
// //         }).promise;
// //         console.log("yayyy");
// //         setPageLoading(false);
// //       } catch (error) {
// //         console.error("Error rendering page:", error);
// //         setRenderError(true);
// //         setPageLoading(false);
// //       }
// //     })();
// //   }, [pdf, currentPage]);

// //   const summarize = async () => {
// //     if (!pdf) return;

// //     setIsLoading(true);
// //     try {
// //       // Get the current page
// //       const page = await pdf.getPage(currentPage);

// //       // Extract text content from the page
// //       const textContent = await page.getTextContent();
// //       const pageText = textContent.items.map((item) => item.str).join(" ");

// //       // Send the extracted text to your summarization API
// //       const response = await axios.post("http://localhost:5000/summarize", {
// //         text: pageText,
// //       });

// //       // Update state with the summary returned by the API
// //       setSummary(response.data.summary);
// //     } catch (error) {
// //       console.error("Error summarizing page:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handlePrev = () => {
// //     setCurrentPage((p) => Math.max(p - 1, 1));
// //   };

// //   const handleNext = () => {
// //     setCurrentPage((p) => Math.min(p + 1, numPages));
// //   };

// //   return (
// //     <div className="flex flex-col h-full">
// //       {/* PDF Canvas Container */}
// //       <div
// //         ref={containerRef}
// //         className="flex-grow flex items-center justify-center bg-gray-700 overflow-auto p-4"
// //         style={{ minHeight: "500px" }}
// //       >
// //         <div className="flex items-center justify-center min-h-full">
// //           <canvas
// //             ref={canvasRef}
// //             className="shadow-xl rounded bg-white"
// //             style={{ display: pageLoading ? "none" : "block" }}
// //           />
// //         </div>
// //         {pageLoading && (
// //           <div className="flex flex-col items-center justify-center text-gray-300 p-8">
// //             <div className="animate-pulse mb-4">
// //               <FaFileAlt size={48} />
// //             </div>
// //             <p>Loading page {currentPage}...</p>
// //           </div>
// //         )}
// //         {renderError && (
// //           <div className="flex flex-col items-center justify-center text-red-400 p-8">
// //             <FaFileAlt size={48} className="mb-4" />
// //             <p>Error loading PDF. Please try again with a different file.</p>
// //           </div>
// //         )}
// //         //
// //       </div>

// //       {/* Navigation Controls */}
// //       <div className="bg-gray-800 text-white p-3 rounded-b-lg">
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center space-x-2">
// //             <button
// //               onClick={handlePrev}
// //               disabled={currentPage <= 1 || pageLoading}
// //               className={`p-2 rounded-full ${
// //                 currentPage <= 1 || pageLoading
// //                   ? "bg-gray-600 cursor-not-allowed"
// //                   : "bg-indigo-600 hover:bg-indigo-700"
// //               } transition-colors`}
// //               aria-label="Previous page"
// //             >
// //               <FaArrowLeft size={14} />
// //             </button>

// //             <span className="text-sm font-medium">
// //               Page {currentPage} of {numPages}
// //             </span>

// //             <button
// //               onClick={handleNext}
// //               disabled={currentPage >= numPages || pageLoading}
// //               className={`p-2 rounded-full ${
// //                 currentPage >= numPages || pageLoading
// //                   ? "bg-gray-600 cursor-not-allowed"
// //                   : "bg-indigo-600 hover:bg-indigo-700"
// //               } transition-colors`}
// //               aria-label="Next page"
// //             >
// //               <FaArrowRight size={14} />
// //             </button>
// //           </div>

// //           <button
// //             onClick={summarize}
// //             disabled={!pdf || isLoading || pageLoading}
// //             className={`px-4 py-2 rounded ${
// //               !pdf || isLoading || pageLoading
// //                 ? "bg-gray-600 cursor-not-allowed"
// //                 : "bg-indigo-600 hover:bg-indigo-700"
// //             } transition-colors text-sm font-medium flex items-center`}
// //           >
// //             {isLoading ? "Summarizing..." : "Summarize Page"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PdfPageViewer;
// import React, { useState, useEffect, useRef } from "react";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
// import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker?url";
// import axios from "axios";
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaFileAlt,
//   FaSearchPlus,
//   FaSearchMinus,
// } from "react-icons/fa";

// // Set the workerSrc so pdf.js can load its worker file
// GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const PdfPageViewer = ({ fileUrl, summary, setSummary }) => {
//   const [pdf, setPdf] = useState(null);
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [renderError, setRenderError] = useState(false);
//   const [scale, setScale] = useState(1.8); // Increased default scale
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Load the PDF
//   useEffect(() => {
//     if (!fileUrl) return;

//     setPageLoading(true);
//     setRenderError(false);

//     (async () => {
//       try {
//         const loadingTask = getDocument(fileUrl);
//         const loadedPdf = await loadingTask.promise;
//         setPdf(loadedPdf);
//         setNumPages(loadedPdf.numPages);
//         setCurrentPage(1);
//       } catch (error) {
//         console.error("Error loading PDF:", error);
//         setRenderError(true);
//         setPageLoading(false);
//       }
//     })();
//   }, [fileUrl]);

//   // Render the current page with user-controlled scaling
//   useEffect(() => {
//     if (!pdf || !containerRef.current || !canvasRef.current) return;

//     setPageLoading(true);
//     setRenderError(false);

//     (async () => {
//       try {
//         const page = await pdf.getPage(currentPage);
//         const viewport = page.getViewport({ scale });

//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         // Set canvas dimensions to the scaled page dimensions
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         // Clear canvas
//         ctx.fillStyle = "white";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         // Render the PDF page
//         await page.render({
//           canvasContext: ctx,
//           viewport,
//         }).promise;

//         setPageLoading(false);
//       } catch (error) {
//         console.error("Error rendering page:", error);
//         setRenderError(true);
//         setPageLoading(false);
//       }
//     })();
//   }, [pdf, currentPage, scale]);

//   const summarize = async () => {
//     if (!pdf) return;

//     setIsLoading(true);
//     try {
//       // Get the current page
//       const page = await pdf.getPage(currentPage);

//       // Extract text content from the page
//       const textContent = await page.getTextContent();
//       const pageText = textContent.items.map((item) => item.str).join(" ");

//       // Send the extracted text to your summarization API
//       const response = await axios.post("http://localhost:5000/summarize", {
//         text: pageText,
//       });

//       // Update state with the summary returned by the API
//       setSummary(response.data.summary);
//     } catch (error) {
//       console.error("Error summarizing page:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePrev = () => {
//     setCurrentPage((p) => Math.max(p - 1, 1));
//   };

//   const handleNext = () => {
//     setCurrentPage((p) => Math.min(p + 1, numPages));
//   };

//   const zoomIn = () => {
//     setScale((prevScale) => Math.min(prevScale + 0.2, 3.0));
//   };

//   const zoomOut = () => {
//     setScale((prevScale) => Math.max(prevScale - 0.2, 0.6));
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* PDF Canvas Container */}
//       <div
//         ref={containerRef}
//         className="flex-grow flex items-center justify-center bg-gray-700 overflow-auto p-4"
//         style={{ minHeight: "600px" }} // Increased minimum height
//       >
//         <div className="flex items-center justify-center min-h-full">
//           <canvas
//             ref={canvasRef}
//             className="shadow-xl rounded bg-white"
//             style={{ display: pageLoading ? "none" : "block" }}
//           />
//         </div>
//         {pageLoading && (
//           <div className="flex flex-col items-center justify-center text-gray-300 p-8">
//             <div className="animate-pulse mb-4">
//               <FaFileAlt size={48} />
//             </div>
//             <p>Loading page {currentPage}...</p>
//           </div>
//         )}
//         {renderError && (
//           <div className="flex flex-col items-center justify-center text-red-400 p-8">
//             <FaFileAlt size={48} className="mb-4" />
//             <p>Error loading PDF. Please try again with a different file.</p>
//           </div>
//         )}
//       </div>

//       {/* Navigation Controls */}
//       <div className="bg-gray-800 text-white p-3 rounded-b-lg">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage <= 1 || pageLoading}
//               className={`p-2 rounded-full ${
//                 currentPage <= 1 || pageLoading
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               } transition-colors`}
//               aria-label="Previous page"
//             >
//               <FaArrowLeft size={14} />
//             </button>

//             <span className="text-sm font-medium">
//               Page {currentPage} of {numPages}
//             </span>

//             <button
//               onClick={handleNext}
//               disabled={currentPage >= numPages || pageLoading}
//               className={`p-2 rounded-full ${
//                 currentPage >= numPages || pageLoading
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               } transition-colors`}
//               aria-label="Next page"
//             >
//               <FaArrowRight size={14} />
//             </button>

//             {/* Zoom controls */}
//             <div className="ml-4 flex items-center space-x-2">
//               <button
//                 onClick={zoomOut}
//                 disabled={pageLoading}
//                 className={`p-2 rounded-full ${
//                   pageLoading
//                     ? "bg-gray-600 cursor-not-allowed"
//                     : "bg-indigo-600 hover:bg-indigo-700"
//                 } transition-colors`}
//                 aria-label="Zoom out"
//               >
//                 <FaSearchMinus size={14} />
//               </button>

//               <span className="text-xs font-medium">
//                 {Math.round(scale * 100)}%
//               </span>

//               <button
//                 onClick={zoomIn}
//                 disabled={pageLoading}
//                 className={`p-2 rounded-full ${
//                   pageLoading
//                     ? "bg-gray-600 cursor-not-allowed"
//                     : "bg-indigo-600 hover:bg-indigo-700"
//                 } transition-colors`}
//                 aria-label="Zoom in"
//               >
//                 <FaSearchPlus size={14} />
//               </button>
//             </div>
//           </div>

//           <button
//             onClick={summarize}
//             disabled={!pdf || isLoading || pageLoading}
//             className={`px-4 py-2 rounded ${
//               !pdf || isLoading || pageLoading
//                 ? "bg-gray-600 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700"
//             } transition-colors text-sm font-medium flex items-center`}
//           >
//             {isLoading ? "Summarizing..." : "Summarize Page"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PdfPageViewer;
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

// Set the workerSrc so pdf.js can load its worker file
GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfPageViewer = ({ fileUrl, summary, setSummary }) => {
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

  // Render the current page with user-controlled scaling
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

        // Set canvas dimensions to the scaled page dimensions
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Clear canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render the PDF page
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
      // Get the current page
      const page = await pdf.getPage(currentPage);

      // Extract text content from the page
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");

      // Send the extracted text to your summarization API
      const response = await axios.post("http://localhost:5000/summarize", {
        text: pageText,
      });

      // Update state with the summary returned by the API
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
      {/* PDF Canvas Container */}
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

      {/* Fixed Navigation Controls - Styled to be always visible */}
      <div className="bg-gray-800 text-white p-4 rounded-b-lg sticky bottom-0 left-0 right-0 z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left side controls - Page navigation */}
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

          {/* Middle area - Zoom controls */}
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

          {/* Right side - Summarize button */}
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
