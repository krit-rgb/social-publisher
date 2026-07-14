// config/platforms.config.ts

import type { PlatformConfigMap } from '@/types/platform';

export const PLATFORM_CONFIG: PlatformConfigMap = {
  x: {
    id: 'x',
    label: 'X (Twitter)',
    characterLimit: 280,
    maxImages: 4,
    maxImageSizeMB: 5,
    supportedMedia: ['image', 'gif', 'video'],
    acceptedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
    colorHex: '#000000',
  },
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    characterLimit: 2200,
    maxImages: 10,
    maxImageSizeMB: 8,
    supportedMedia: ['image', 'video'],
    acceptedMimeTypes: ['image/jpeg', 'image/png'],
    colorHex: '#E1306C',
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    characterLimit: 3000,
    maxImages: 9,
    maxImageSizeMB: 10,
    supportedMedia: ['image', 'video'],
    acceptedMimeTypes: ['image/jpeg', 'image/png'],
    colorHex: '#0A66C2',
  },
  facebook: {
    id: 'facebook',
    label: 'Facebook',
    characterLimit: 63206,
    maxImages: 10,
    maxImageSizeMB: 10,
    supportedMedia: ['image', 'video'],
    acceptedMimeTypes: ['image/jpeg', 'image/png'],
    colorHex: '#1877F2',
  },
};

export const PLATFORM_IDS = Object.keys(PLATFORM_CONFIG) as (keyof typeof PLATFORM_CONFIG)[];

export const ALL_PLATFORMS = Object.values(PLATFORM_CONFIG);