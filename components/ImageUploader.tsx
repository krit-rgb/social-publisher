// components/ImageUploader.tsx
'use client';

import { useRef, memo } from 'react';
import type { DraftImage } from '@/hooks/useImageUpload';

interface ImageUploaderProps {
  images: DraftImage[];
  uploadErrors: string[];
  maxImages: number;
  onAddFiles: (files: FileList) => void;
  onRemoveImage: (id: string) => void;
}

function ImageUploaderComponent({
  images,
  uploadErrors,
  maxImages,
  onAddFiles,
  onRemoveImage,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(e.target.files);
      e.target.value = ''; // allow re-selecting the same file after removal
    }
  };

  const isAtLimit = Number.isFinite(maxImages) && images.length >= maxImages;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {images.map((img) => (
          <div key={img.id} className="relative w-20 h-20">
            <img
              src={img.previewUrl}
              alt="Upload preview"
              className="w-full h-full object-cover rounded-md border border-gray-300"
            />
            <button
              type="button"
              onClick={() => onRemoveImage(img.id)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isAtLimit}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAtLimit ? 'Image limit reached' : 'Add images'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {uploadErrors.length > 0 && (
        <ul className="mt-2 space-y-1">
          {uploadErrors.map((err, i) => (
            <li key={i} className="text-sm text-red-600">
              {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const ImageUploader = memo(ImageUploaderComponent);