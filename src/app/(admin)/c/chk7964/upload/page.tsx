"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { Upload, File, CheckCircle, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { env } from "@/config/env";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setProgress(0);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setProgress(0);
    setErrorMessage("");

    try {
      // Step 1: Get presigned URL
      const res = await fetch(
        `${env.NEXT_PUBLIC_SITE_URL}/api/chk7964/upload`,
        {
          method: "POST",
          body: JSON.stringify({ filename: file.name, type: file.type }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const upload = await res.json();

      // Step 2: Upload file with Axios
      if (upload.success === true) {
        await axios.put(upload.data, file, {
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              setProgress(percent);
            }
          },
        });
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage("Failed to get upload URL.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("error");
      setErrorMessage("Upload failed. Please try again.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const resetUpload = () => {
    setFile(null);
    setProgress(0);
    setStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Upload Area */}
            <div
              className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                <div className="space-y-2">
                  <Upload className="text-muted-foreground mx-auto h-8 w-8" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Drop your file here, or{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Support for all file types
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <File className="text-primary mx-auto h-8 w-8" />
                  <div className="space-y-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  {status === "idle" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetUpload}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  handleFileSelect(selectedFile);
                }
              }}
            />

            {/* Progress Bar */}
            {status === "uploading" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Success Message */}
            {status === "success" && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  File uploaded successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* Error Message */}
            {status === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Upload Button */}
            <div className="flex gap-2">
              <Button
                onClick={handleUpload}
                disabled={!file || status === "uploading"}
                className="flex-1"
              >
                {status === "uploading" ? (
                  <>
                    <div className="border-background mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload File
                  </>
                )}
              </Button>

              {file && status !== "uploading" && (
                <Button variant="outline" onClick={resetUpload}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
