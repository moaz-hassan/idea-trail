"use client";
import { useState, useRef } from "react";
import {
  UploadCloud,
  CheckCircle,
  XCircle,
  Loader2,
  Upload,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function ImageUploader({
  onUploadSuccess,
  label = "Upload Image",
  required = false,
  className = "",
  previewClassName = "h-48 w-full object-cover",
  accept = "image/*",
  maxSizeMB = 5,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle' | 'uploading' | 'success' | 'error'
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image size should be less than ${maxSizeMB}MB`);
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);

    setUploadStatus("idle");
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    setUploadStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setUploadProgress(percentComplete);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            setUploadStatus("success");
            toast.success("Image uploaded successfully!");
            onUploadSuccess({
              url: response.secure_url,
              publicId: response.public_id,
              width: response.width,
              height: response.height,
              format: response.format,
            });
          } else {
            setUploadStatus("error");
            toast.error("Upload failed. Please try again.");
          }
        }
      };

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        true
      );
      xhr.send(formData);
    } catch (error) {
      setUploadStatus("error");
      toast.error("Upload failed. Please try again.");
      console.error("Upload error:", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadStatus("idle");
    setUploadProgress(0);
    onUploadSuccess(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Preview Area */}
      {previewUrl ? (
        <div className="relative group border rounded-lg overflow-hidden">
          <Image
            src={previewUrl}
            alt="Preview"
            width={400}
            height={400}
            className={`${previewClassName} ${
              uploadStatus === "uploading" ? "opacity-70" : ""
            }`}
          />

          {/* Upload Status Overlay */}
          {uploadStatus === "uploading" && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          )}

          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none transition-colors"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <UploadCloud className="h-10 w-10 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select an image to upload
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={triggerFileInput}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <UploadCloud className="h-4 w-4" />
          Select Image
        </button>

        {selectedFile && (
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploadStatus === "uploading"}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
              uploadStatus === "uploading"
                ? "bg-blue-300 dark:bg-blue-700 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
            }`}
          >
            {uploadStatus === "uploading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Now
              </>
            )}
          </button>
        )}
      </div>

      {/* Progress and Status Indicators */}
      {uploadStatus === "uploading" && (
        <div className="space-y-1">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-center text-blue-600 dark:text-blue-400">
            Uploading: {uploadProgress}%
          </p>
        </div>
      )}

      {uploadStatus === "success" && (
        <p className="text-xs text-center text-green-600 dark:text-green-400">
          ✓ Upload completed successfully!
        </p>
      )}

      {uploadStatus === "error" && (
        <p className="text-xs text-center text-red-600 dark:text-red-400">
          ✗ Upload failed. Please try again.
        </p>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={accept}
        className="hidden"
      />
    </div>
  );
}
