// export default PdfUpload;
import { Button } from "@radix-ui/themes";
import React, { useState } from "react";
import axios from "axios";
import { FaUpload, FaFileAlt } from "react-icons/fa";
import PdfPageViewer from "./PdfPageViewer";
import NotesEditor from "./NotesEditor"; // Import the separate NotesEditor component

const PdfUpload = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please upload a PDF");

    // setIsLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Failed to summarize. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-800 min-h-screen">
      {/* PDF Viewer Section */}
      <div className="w-full lg:w-3/5 flex flex-col">
        <div className="bg-gray-900 rounded-xl shadow-md p-6 mb-4 flex-grow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-200">
              {file ? file.name : "PDF Analyzer"}
            </h2>
            {file && (
              <Button
                onClick={handleUpload}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Summarize"}
              </Button>
            )}
          </div>

          {!file ? (
            <div className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-gray-700 rounded-lg bg-gray-800">
              <FaFileAlt className="text-gray-400 text-5xl mb-4" />
              <p className="mb-4 text-gray-400 text-center">
                Upload a PDF document to analyze and summarize
              </p>
              <label className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
                <FaUpload className="mr-2" />
                <span>Select PDF</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="w-full border border-gray-700 rounded-lg shadow-md h-[70vh] overflow-hidden">
              <PdfPageViewer
                fileUrl={fileUrl}
                summary={summary}
                setSummary={setSummary}
              />
            </div>
          )}
        </div>

        {summary && (
          <div className="bg-gray-900 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">
              Summary
            </h3>
            <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
              <p className="text-gray-300 whitespace-pre-line">{summary}</p>
            </div>
          </div>
        )}
      </div>

      {/* Notes Section - Now using the separate component */}
      <div className="w-full lg:w-2/5 bg-gray-900 rounded-xl shadow-md overflow-hidden flex flex-col ">
        {file ? (
          <NotesEditor />
        ) : (
          <div>
            <div className="bg-gray-800 text-white p-4">
              <h3 className="text-xl font-semibold">Notes</h3>
              <p className="text-gray-300 text-sm">
                Capture your thoughts about the document
              </p>
            </div>
            <div className="flex items-center justify-center h-64 text-gray-400 italic p-4">
              Upload a PDF to start taking notes
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfUpload;
