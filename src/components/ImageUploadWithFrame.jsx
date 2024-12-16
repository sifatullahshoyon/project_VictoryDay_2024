import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";

const ImageWithFrameUploader = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const previewRef = useRef(null);

  // Handle image drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result); // Convert image to base64
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  // Download merged image
  const handleDownload = () => {
    if (previewRef.current) {
      html2canvas(previewRef.current, {
        backgroundColor: null, // Preserve transparency
        useCORS: true, // Allow cross-origin images
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "merged-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          marginBottom: "20px",
          cursor: "pointer",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <input {...getInputProps()} />
        <p>Click to upload or drag and drop</p>
        <p>PNG, JPG, GIF (Max: 800x400px)</p>
      </div>

      {/* Image Preview with Frame */}
      <div
        ref={previewRef}
        style={{
          position: "relative",
          width: "400px",
          height: "500px",
          margin: "auto",
          border: "2px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        {/* User Uploaded Image */}
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
        )}

        {/* Transparent Frame Overlay */}
        <img
          src="https://i.ibb.co.com/wgmYH01/Pngtree-16-december-bangladesh-independence-day-8802357.png"
          alt="Frame"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "30%",
            height: "30%",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>

      {/* Download Button */}
      {uploadedImage && (
        <button
          onClick={handleDownload}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download Your Photo
        </button>
      )}
    </div>
  );
};

export default ImageWithFrameUploader;
