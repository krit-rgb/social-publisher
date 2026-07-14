// types/platform.ts

export type PlatformId = 'x' | 'instagram' | 'linkedin' | 'facebook';

export type MediaType = 'image' | 'video' | 'gif';

export interface PlatformConfig {
  id: PlatformId;
  label: string;
  characterLimit: number;
  maxImages: number;
  maxImageSizeMB: number;
  supportedMedia: MediaType[];
  /** Accepted MIME types for upload validation */
  acceptedMimeTypes: string[];
  colorHex: string; // for UI badges/icons
}

export type PlatformConfigMap = Record<PlatformId, PlatformConfig>;