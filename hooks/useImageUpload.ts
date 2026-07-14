// hooks/useImageUpload.ts

import { useState, useCallback } from 'react';
import { useAppSelector } from './redux';
import {
  selectSafeMaxImages,
  selectSafeMaxImageSizeMB,
  selectSafeAcceptedMimeTypes,
} from '@/selectors/platformSelectors';
import { validateImageFiles } from '@/utils/imageValidation';

export interface DraftImage {
  id: string;
  file: File;
  previewUrl: string;
}

export function useImageUpload() {
  const [images, setImages] = useState<DraftImage[]>([]);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const maxImages = useAppSelector(selectSafeMaxImages);
  const maxSizeMB = useAppSelector(selectSafeMaxImageSizeMB);
  const acceptedMimeTypes = useAppSelector(selectSafeAcceptedMimeTypes);

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const { validFiles, errors } = validateImageFiles({
        files,
        existingCount: images.length,
        maxImages,
        maxSizeMB,
        acceptedMimeTypes,
      });

      const newDraftImages: DraftImage[] = validFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newDraftImages]);
      setUploadErrors(errors);
    },
    [images.length, maxImages, maxSizeMB, acceptedMimeTypes]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const clearImages = useCallback(() => {
    setImages((prev) => {
      prev.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      return [];
    });
  }, []);

  return { images, uploadErrors, addFiles, removeImage, clearImages, maxImages };
}