"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload, X, Check, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    {
      id: string;
      progress: number;
      status: "uploading" | "success" | "error";
      name: string;
    }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      addFiles(newFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      addFiles(newFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress for each file
    newFiles.forEach((file) => {
      const fileId = Math.random().toString(36).substring(2, 9);

      setUploadStatus((prev) => [
        ...prev,
        { id: fileId, progress: 0, status: "uploading", name: file.name },
      ]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;

        if (progress >= 100) {
          clearInterval(interval);
          progress = 100;

          setUploadStatus((prev) =>
            prev.map((item) =>
              item.id === fileId
                ? { ...item, progress, status: "success" }
                : item,
            ),
          );
        } else {
          setUploadStatus((prev) =>
            prev.map((item) =>
              item.id === fileId ? { ...item, progress } : item,
            ),
          );
        }
      }, 200);
    });
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newUploadStatus = [...uploadStatus];
    newUploadStatus.splice(index, 1);
    setUploadStatus(newUploadStatus);
  };

  const handleButtonClick = () => {
    attachmentInputRef.current?.click();
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-10 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        } transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          ref={attachmentInputRef}
        />

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">
              Drag and drop your files here
            </h3>
            <p className="text-muted-foreground mt-1">
              or click to browse files
            </p>
          </div>
          <Button onClick={handleButtonClick} className="mt-2">
            Select Files
          </Button>
        </div>
      </div>

      {uploadStatus.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Uploaded Files</h2>
          <div className="space-y-4">
            {uploadStatus.map((file, index) => (
              <div key={file.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 truncate pr-4">
                    {file.status === "uploading" ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : file.status === "success" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="font-medium truncate">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
                <Progress value={file.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{file.progress}%</span>
                  <span>
                    {file.status === "uploading"
                      ? "Uploading..."
                      : file.status === "success"
                      ? "Upload complete"
                      : "Upload failed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
