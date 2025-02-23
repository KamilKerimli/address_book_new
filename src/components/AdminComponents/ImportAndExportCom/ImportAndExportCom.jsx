import React, { useState, useRef } from "react";

const sampleData = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  ],
  addresses: [
    { id: 1, city: "New York", zip: "10001" },
    { id: 2, city: "Los Angeles", zip: "90001" },
  ],
};

const ImportAndExportCom = () => {
  const [importType, setImportType] = useState("users");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateFile(selectedFile);
    }
  };

  const validateFile = (file) => {
    const validTypes = ["application/json", "text/csv", "application/xml"];
    const maxSize = 5 * 1024 * 1024;
    const fileType = getFileType(file);

    if (!validTypes.includes(fileType)) {
      setError("Invalid file type. Please upload a JSON, CSV, or XML file.");
      setFile(null);
      return;
    }

    if (file.size > maxSize) {
      setError("File size exceeds 5MB limit.");
      setFile(null);
      return;
    }

    setError("");
    setFile(file);
  };

  const getFileType = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    switch (extension) {
      case "json":
        return "application/json";
      case "csv":
        return "text/csv";
      case "xml":
        return "application/xml";
      default:
        return "unknown";
    }
  };

  const handleImport = () => {
    if (!file) {
      setError("Please select a file to import.");
      return;
    }

    setIsImporting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          alert("File imported successfully!");
          setFile(null);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleExport = () => {
    const exportType = document.getElementById("exportType").value;
    const data = sampleData[exportType];

    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${exportType}_export.json`;
      a.click();
      URL.revokeObjectURL(url);
      alert(`${exportType} exported successfully!`);
    } else {
      alert("No data available for export.");
    }
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 w-full text-center">Import/Export Data</h1>

      <div className="bg-white dark:bg-blue-500 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Import</h2>
        <div className="mb-4">
          <label htmlFor="importType" className="block text-sm font-medium text-gray-700 dark:text-white">Select Import Type</label>
          <select
            id="importType"
            className="mt-1 block w-full p-2 border border-black dark:bg-blue-400 dark:text-white rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black"
            value={importType}
            onChange={(e) => setImportType(e.target.value)}>
            <option value="users">Users</option>
            <option value="addresses">Addresses</option>
          </select>
        </div>
        <div
          className="border-2 border-dashed border-gray-300 dark:border-white p-6 text-center relative"
          style={{ position: "static", zIndex: 1, overflow: "hidden" }} // Düzəliş burada
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add("border-blue-500");
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("border-blue-500");
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("border-blue-500");
            if (e.dataTransfer.files.length > 0) {
              const selectedFile = e.dataTransfer.files[0];
              validateFile(selectedFile);
              fileInputRef.current.files = e.dataTransfer.files;
            }
          }}
        >
          <p className="text-gray-500 dark:text-white">
            Drag & drop your file here or{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              browse
            </span>
          </p>
          <input
            type="file"
            className="hidden"
            id="importFile"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {file && (
            <div className="mt-4 text-center">
              <img
                src={getFileIcon(getFileType(file))}
                alt="File Icon"
                className="w-12 h-12 mx-auto"
              />
              <p className="text-sm text-gray-700 mt-2">{file.name}</p>
            </div>
          )}
          {isImporting && (
            <div className="mt-2">
              <div className="w-full bg-green-600 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          className="mt-4 w-full bg-blue-500 text-white dark:bg-white dark:text-blue-500 p-2 rounded-md hover:bg-blue-400"
          onClick={handleImport}
          disabled={isImporting}>Import</button>
      </div>

      {/* Export Section */}
      <div className="bg-white dark:bg-blue-500 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Export</h2>
        <div className="mb-4">
          <label htmlFor="exportType" className="block text-sm font-medium text-gray-700 dark:text-white">Select Export Type</label>
          <select
            id="exportType"
            className="mt-1 block w-full p-2 border border-black dark:bg-blue-400 dark:text-white rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black">
            <option value="users">Users</option>
            <option value="addresses">Addresses</option>
          </select>
        </div>
        <button
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          onClick={handleExport}>Export</button>
      </div>
    </div>
  );
};

const getFileIcon = (fileType) => {
  if (fileType === "application/json") return "https://cdn-icons-png.flaticon.com/512/136/136525.png";
  if (fileType === "text/csv") return "https://cdn-icons-png.flaticon.com/512/136/136528.png";
  if (fileType === "application/xml") return "https://cdn-icons-png.flaticon.com/512/136/136527.png";
  return "https://cdn-icons-png.flaticon.com/512/136/136524.png"; 
};

export default ImportAndExportCom;