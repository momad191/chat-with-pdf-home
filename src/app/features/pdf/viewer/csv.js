"use client"
import React, { useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";

const Csv = ({ filePath }) => {
  const { readString } = usePapaParse();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAndParseCSV = async () => {
      try {
        if (!filePath) {
          setError("No file path provided.");
          return;
        }

        // Fetch the CSV file
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error("Failed to load the CSV file.");
        }

        const text = await response.text();

        // Parse CSV
        readString(text, {
          complete: (result) => setData(result.data),
          header: false, // Change to true if the CSV has headers
        });
      } catch (err) {
        setError("Error parsing CSV file.");
        console.error(err);
      }
    };

    fetchAndParseCSV();
  }, [filePath]);

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">📊 CSV File Viewer</h1>

      {error && <div className="text-red-600 text-center mb-2">{error}</div>}

      <div className="overflow-x-auto max-h-[500px] border border-gray-300 rounded-lg shadow-lg bg-white p-4">
        <table className="w-full border-collapse text-left min-w-[600px]">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-50`}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-gray-800 font-medium">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Csv;
