// components/PostComposer.tsx
'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/hooks/redux';
import { selectSelectedPlatformIds, selectSafeCharacterLimit } from '@/selectors/platformSelectors';
import { buildPostSchema, type PostFormValues } from '@/validators/postSchema';
import { useImageUpload } from '@/hooks/useImageUpload';
import { PlatformSelector } from './PlatformSelector';
import { CharacterCounter } from './CharacterCounter';
import { ImageUploader } from './ImageUploader';

export function PostComposer() {
  const selectedPlatformIds = useAppSelector(selectSelectedPlatformIds);
  const safeLimit = useAppSelector(selectSafeCharacterLimit);

  const schema = useMemo(() => buildPostSchema(safeLimit), [safeLimit]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { content: '', platforms: [] },
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('platforms', selectedPlatformIds, { shouldValidate: true });
  }, [selectedPlatformIds, setValue]);

  const contentValue = watch('content');

  const { images, uploadErrors, addFiles, removeImage, maxImages } = useImageUpload();

  const onSubmit = (data: PostFormValues) => {
    // Wired to postSlice in the next milestone — will include `images`
    console.log('Validated post:', data, 'images:', images);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select platforms
        </label>
        <PlatformSelector />
        {errors.platforms && (
          <span className="text-sm text-red-600 mt-1 block">{errors.platforms.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Post content
        </label>
        <textarea
          id="content"
          {...register('content')}
          rows={5}
          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What do you want to share?"
        />
        <div className="flex justify-between items-center mt-1">
          {errors.content ? (
            <span className="text-sm text-red-600">{errors.content.message}</span>
          ) : (
            <span />
          )}
          <CharacterCounter current={contentValue?.length ?? 0} max={safeLimit} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
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
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Publishing...' : 'Publish'}
      </button>
    </form>
  );
}