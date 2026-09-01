"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, Loader2, X } from "lucide-react";

export default function CloudinaryUpload({ onUploadSuccess, defaultImage }) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(defaultImage || null);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "nasiruddin_img"
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setPreview(data.secure_url);
        onUploadSuccess(data.secure_url);
      } else {
        setError(data.error?.message || "Upload failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-zinc-700 group">
          <Image src={preview} alt="Upload preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onUploadSuccess("");
            }}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer bg-zinc-900/50 hover:bg-zinc-800 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-zinc-400 mb-2" />
                <p className="mb-2 text-sm text-zinc-400">
                  <span className="font-semibold">Click to upload</span> image
                </p>
              </>
            )}
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
        </label>
      )}
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
