import React, { useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";

function DocxViewer({ filePath }) {
  const [error, setError] = useState("");
  const viewerRef = useRef(null);

  useEffect(() => {
    const fetchAndRenderDocx = async () => {
      try {
        if (!filePath) {
          setError("No file path provided.");
          return;
        }

        // Fetch the file as a binary blob
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error("Failed to load the document.");
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        await renderAsync(arrayBuffer, viewerRef.current);
      } catch (err) {
        setError("An error occurred while rendering the document.");
        console.error(err);
      }
    };

    fetchAndRenderDocx();
  }, [filePath]);

  return (
    <div className="mt-4 ">
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div
        ref={viewerRef}
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          height: "750px",
          overflow: "scroll",
        }}
      ></div>
    </div>
  );
}

export default DocxViewer;
