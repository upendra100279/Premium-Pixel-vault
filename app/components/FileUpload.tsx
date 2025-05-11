"use client";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function FileUpload({
  onSuccess,
}: {
  onSuccess: (res: IKUploadResponse) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2">
      <IKUpload
        fileName="product-image.jpg"
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        className="file-input file-input-bordered file-input-primary w-full"
        validateFile={(file: File) => {
          const validTypes = ["image/jpeg", "image/png", "image/webp"];
          if (!validTypes.includes(file.type)) {
            setError("Please upload a valid image file (JPEG, PNG, or WebP)");
            return false;
          }
          if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB");
            return false;
          }
          return true;
        }}
      />

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading...</span>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 border border-red-200 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
