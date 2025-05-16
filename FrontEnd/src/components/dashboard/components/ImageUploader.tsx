import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, ImagePlus, XCircle, FilePlus, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  title?: string;
  description?: string;
  onUpload: (file: File) => Promise<void>;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  className?: string;
}

export default function ImageUploader({
  title = "Upload Image",
  description = "Upload a histopathology slide image for analysis",
  onUpload,
  acceptedFileTypes = "image/*",
  maxSizeMB = 10,
  className = "",
}: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (!file) return;

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${maxSizeMB}MB.`);
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB.`,
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.match(acceptedFileTypes.replace("*", ""))) {
      setError("Invalid file type. Please upload an image file.");
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    setError(null);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

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
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      await onUpload(selectedFile);
      toast({
        title: "Upload successful",
        description: "Your image has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Upload error:", error);
      setError("An error occurred while uploading the image. Please try again.");
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading your image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 w-full object-contain rounded-md"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-neutral-100 transition-colors"
              aria-label="Remove image"
            >
              <XCircle className="h-5 w-5 text-red-500" />
            </button>
          </div>
        ) : (
          <div
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-neutral-300 bg-neutral-50 hover:bg-neutral-100"
            } transition-colors duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 text-neutral-400 mb-3" />
              <p className="mb-2 text-sm text-neutral-700">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-neutral-500">
                {acceptedFileTypes.replace("image/", "").toUpperCase().replace("*", "All image formats")} (Max. {maxSizeMB}MB)
              </p>
              {error && (
                <p className="mt-2 text-xs text-red-500">{error}</p>
              )}
            </div>
            <input
              ref={fileInputRef}
              id="dropzone-file"
              type="file"
              className="hidden"
              accept={acceptedFileTypes}
              onChange={handleFileChange}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {preview && (
          <>
            <Button variant="outline" onClick={handleRemove} disabled={isUploading}>
              Remove
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </>
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
