// utils/imageValidation.ts

export interface ImageValidationParams {
  files: File[];
  existingCount: number;
  maxImages: number;
  maxSizeMB: number;
  acceptedMimeTypes: string[];
}

export interface ImageValidationResult {
  validFiles: File[];
  errors: string[];
}

export function validateImageFiles({
  files,
  existingCount,
  maxImages,
  maxSizeMB,
  acceptedMimeTypes,
}: ImageValidationParams): ImageValidationResult {
  const errors: string[] = [];
  const validFiles: File[] = [];

  const remainingSlots = Number.isFinite(maxImages) ? maxImages - existingCount : Infinity;

  if (remainingSlots <= 0) {
    errors.push(`Maximum of ${maxImages} images already reached for selected platforms`);
    return { validFiles, errors };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  for (const file of files) {
    if (validFiles.length >= remainingSlots) {
      errors.push(`Only ${remainingSlots} more image(s) allowed — "${file.name}" skipped`);
      continue;
    }

    if (acceptedMimeTypes.length > 0 && !acceptedMimeTypes.includes(file.type)) {
      errors.push(`"${file.name}" has an unsupported format for the selected platforms`);
      continue;
    }

    if (file.size > maxSizeBytes) {
      errors.push(`"${file.name}" exceeds the ${maxSizeMB}MB limit for selected platforms`);
      continue;
    }

    validFiles.push(file);
  }

  return { validFiles, errors };
}