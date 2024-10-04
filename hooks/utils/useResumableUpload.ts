import { getDomain } from '@/constants/links';
import webApi from '@/service';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface UploadConfig {
  chunkSize?: number;
  cachePrefix?: string;
  onSuccess: (data: any) => void;
  onError: (error: Error) => void;
}

export const useResumableUpload = (config: UploadConfig) => {
  const { chunkSize = 8 * 1024 * 1024 } = config;
  const [nextChunkIndex, setNextChunkIndex] = useState(0);
  const [percent, setPercent] = useState(0);

  const cacheKey = `${config.cachePrefix}-upload-pending-cache`;

  const optionsInstance = useRef<{
    file: File;
    signedUrl: string;
    sessionUrl: string;
  }>();

  const resumableUpload = async (url: string | null, currentIndex = 0): Promise<any> => {
    const { file, sessionUrl } = optionsInstance.current || {};
    if (!file) {
      return;
    }

    const to = currentIndex + chunkSize;
    const blob = file.slice(currentIndex, to);
    const arrayBuffer = await blob.arrayBuffer();
    const chunk = Buffer.from(arrayBuffer);

    const response = await fetch(url || sessionUrl!, {
      method: 'PUT',
      headers: {
        'X-Upload-Content-Length': chunk.length,
        'Content-Range': `bytes ${currentIndex}-${Math.min(to - 1, file.size - 1)}/${file.size}`,
        'Content-Type': 'application/octet-stream',
        'Access-Control-Allow-Origin': getDomain(process.env.RUNTIME_ENV || 'local')
      } as any,
      body: chunk
    });

    if (response.ok) {
      setPercent(100);
      // sessionStorage.removeItem(cacheKey)
      return webApi.commonApi.getAssetsUrl(optionsInstance.current?.sessionUrl.split('?')[0]!);
    }

    if (response.status === 308) {
      const range = response.headers.get('range');
      if (range) {
        let upperBound: string | number = range.split('=')[1]!.split('-')[1]!;
        upperBound = Number(upperBound);
        setNextChunkIndex(upperBound);
        setPercent(Math.floor((upperBound / file.size) * 100));
        // sessionStorage.setItem(
        //   cacheKey,
        //   JSON.stringify({
        //     percent,
        //     options: optionsInstance.current,
        //     currentChunkIndex: upperBound,
        //   }),
        // )
        return resumableUpload(null, upperBound);
      } else {
        return resumableUpload(null, nextChunkIndex);
      }
    } else {
      throw new Error('Network Error Or Other Scnerios Please Check in docs for other statuses....');
    }
  };

  const upload = async (data: { file: File; path: string }) => {
    const { file, path } = data;
    console.log(file);
    if (!file) {
      message.error('Please select a file');
      return;
    }

    const filename = file.name;
    const { signedUrl } = await webApi.commonApi.getUploadSignedUrl({
      filename,
      filepath: path
    });
    const sessionUrl = await webApi.commonApi.getUploadSessionUrl(signedUrl);
    optionsInstance.current = {
      file,
      sessionUrl,
      signedUrl
    };

    return resumableUpload(sessionUrl);
  };

  const uploadMutationData = useMutation({
    mutationFn: (data: { file: File; path: string }) => upload(data),
    onSuccess: config.onSuccess,
    onError: config.onError
  });

  const retryMutationData = useMutation({
    mutationFn: () =>
      // currentChunkIndex: number | null = null
      {
        return resumableUpload(
          optionsInstance.current?.sessionUrl!,
          // currentChunkIndex ||
          nextChunkIndex
        );
      },
    onSuccess: config.onSuccess,
    onError: config.onError
  });

  // useEffect(() => {
  //   const cache = sessionStorage.getItem(cacheKey)
  //   if (cache) {
  //     const cacheData = JSON.parse(cache)
  //     const { percent, options, currentChunkIndex } = cacheData
  //     setPercent(percent)
  //     optionsInstance.current = options
  //     setNextChunkIndex(currentChunkIndex)
  //     retryMutationData.mutate(currentChunkIndex)
  //     sessionStorage.removeItem(cacheKey)
  //   }
  // }, [cacheKey, retryMutationData.mutate])

  useEffect(() => {
    if (percent >= 100) {
      setTimeout(() => {
        setPercent(0);
        setNextChunkIndex(0);
        optionsInstance.current = undefined;
      }, 3000);
    }
  }, [percent]);

  return {
    percent,
    upload: uploadMutationData,
    retry: retryMutationData
  };
};
