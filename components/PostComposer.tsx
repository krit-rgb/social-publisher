// components/PostComposer.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectSelectedPlatformIds, selectSafeCharacterLimit } from '@/selectors/platformSelectors';
import { buildPostSchema, type PostFormValues } from '@/validators/postSchema';
import { useImageUpload } from '@/hooks/useImageUpload';
import { fileToBase64 } from '@/utils/fileToBase64';
import { addPost } from '@/store/postSlice';
import { addToast } from '@/store/uiSlice';
import type { Post, PostImage } from '@/types/post';
import { PlatformSelector } from './PlatformSelector';
import { CharacterCounter } from './CharacterCounter';
import { ImageUploader } from './ImageUploader';

export function PostComposer() {
  const dispatch = useAppDispatch();
  const selectedPlatformIds = useAppSelector(selectSelectedPlatformIds);
  const safeLimit = useAppSelector(selectSafeCharacterLimit);
  const [isPublishing, setIsPublishing] = useState(false);

  const schema = useMemo(() => buildPostSchema(safeLimit), [safeLimit]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { content: '', platforms: [] },
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('platforms', selectedPlatformIds, { shouldValidate: true });
  }, [selectedPlatformIds, setValue]);

  const contentValue = watch('content');

  const { images, uploadErrors, addFiles, removeImage, clearImages, maxImages } = useImageUpload();

  const onSubmit = async (data: PostFormValues) => {
    setIsPublishing(true);
    try {
      const postImages: PostImage[] = await Promise.all(
        images.map(async (img) => ({
          id: img.id,
          fileName: img.file.name,
          sizeBytes: img.file.size,
          mimeType: img.file.type,
          previewUrl: await fileToBase64(img.file),
        }))
      );

      const now = new Date().toISOString();
      const post: Post = {
        id: crypto.randomUUID(),
        content: data.content,
        platforms: data.platforms,
        images: postImages,
        status: 'published', // simulated — no real API integration per project scope
        createdAt: now,
        updatedAt: now,
      };

      dispatch(addPost(post));
      dispatch(addToast({ message: 'Post published successfully', type: 'success' }));

      reset({ content: '', platforms: [] });
      clearImages();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to publish post', type: 'error' }));
    } finally {
      setIsPublishing(false);
    }
  };

  // components/PostComposer.tsx — update the return block

return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5"
  >
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Platforms
      </label>
      <PlatformSelector />
      {errors.platforms && (
        <span className="text-sm text-red-600 mt-1.5 block">{errors.platforms.message}</span>
      )}
    </div>

    <div>
      <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
        What's on your mind?
      </label>
      <textarea
        id="content"
        {...register('content')}
        rows={5}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-none"
        placeholder="What do you want to share?"
      />
      <div className="flex justify-between items-center mt-1.5">
        {errors.content ? (
          <span className="text-sm text-red-600">{errors.content.message}</span>
        ) : (
          <span />
        )}
        <CharacterCounter current={contentValue?.length ?? 0} max={safeLimit} />
      </div>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
      <ImageUploader
        images={images}
        uploadErrors={uploadErrors}
        maxImages={maxImages}
        onAddFiles={addFiles}
        onRemoveImage={removeImage}
      />
    </div>

    <button
      type="submit"
      disabled={isPublishing}
      className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
    >
      {isPublishing ? 'Publishing…' : 'Publish'}
    </button>
  </form>
);
}