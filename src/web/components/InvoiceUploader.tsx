"use client";

import { useState, useRef, ChangeEvent } from "react";
import { uploadInvoice } from "@/utils/api";

export default function InvoiceUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus("idle");
      setErrorMessage("");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setUploadStatus("idle");
      setErrorMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("idle");
    setErrorMessage("");

    try {
      const result = await uploadInvoice(file);
      setInvoiceData(result);
      setUploadStatus("success");
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
      <div
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {file
            ? `Selected: ${file.name}`
            : "Drag and drop your invoice here, or click to browse"}
        </p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
        />

        <button
          onClick={openFileSelector}
          className="px-4 py-2 bg-[#2463EB] text-white rounded-md hover:bg-[#2463EB]/90 transition-colors"
        >
          Select File
        </button>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Supported formats: PDF, JPG, PNG
        </p>
      </div>

      {file && (
        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={isUploading || !file}
            className={`w-full py-3 bg-[#2463EB] text-white rounded-md hover:bg-[#2463EB]/90 transition-colors font-medium ${
              isUploading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? "Uploading..." : "Upload Invoice"}
          </button>
        </div>
      )}

      {uploadStatus === "success" && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-md">
          <p className="font-medium">Invoice uploaded successfully!</p>
          {invoiceData && (
            <div className="mt-2 text-sm">
              <p>Invoice details extracted:</p>
              <pre className="mt-2 p-2 bg-white dark:bg-gray-800 rounded overflow-x-auto">
                {JSON.stringify(invoiceData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md">
          <p className="font-medium">Error uploading invoice</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
