"use client";

import { IKUpload } from "imagekitio-react";
import { useState } from "react";

export default function UploadButton() {
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <IKUpload
        fileName="product-image.jpg"
        onError={(err: Error) => setError("Upload error: " + err.message)}
        onSuccess={(res: any) => setUploadUrl(res.url)}
        folder="/uploads"
      />
      {uploadUrl && (
        <div className="mt-2">
          <span className="text-success">Upload successful!</span>
          <br />
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            View Image
          </a>
        </div>
      )}
      {error && (
        <div className="mt-2 text-error">
          {error}
        </div>
      )}
    </div>
  );
}