'use client';
import Button from '@/components/Common/Button';
import { useRequest } from 'ahooks';
import { FC, useState } from 'react';
import { URLDownloadType, dataMap } from './constants';
import { errorMessage } from '@/helper/ui';

interface UrlDownloadProps {}

async function getURLData(type: { api: string; route: string }) {
  const response = await fetch('https://api.hackquest.io/v1/' + type.api);
  if (!response.ok) return [];
  const json = await response.json();
  const data = json.data || [];

  return data.map((item: { alias: string }) => {
    const { alias } = item;
    return 'https://www.hackquest.io/' + type.route + '/' + alias;
  });
}

const UrlDownload: FC<UrlDownloadProps> = (props) => {
  const [indexType, setIndexType] = useState<URLDownloadType | null>(null);

  const { runAsync, loading } = useRequest(
    async (type: URLDownloadType) => {
      return getURLData(dataMap[type]);
    },
    {
      manual: true,
      onError(e) {
        errorMessage(e);
      }
    }
  );

  const download = async (jsonData: object, type: URLDownloadType) => {
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloads = [URLDownloadType.BLOG, URLDownloadType.HACKATHON, URLDownloadType.GLOSSARY, URLDownloadType.PROJECT];

  return (
    <div className="gap- flex flex-col gap-3">
      <h3 className="text-h3">数据url链接下载</h3>
      <div className="flex gap-4">
        {downloads.map((item, index) => {
          return (
            <Button
              key={index}
              type="primary"
              loading={loading && indexType === item}
              disabled={loading}
              className="rounded-md py-2"
              onClick={async () => {
                setIndexType(item);
                const data = await runAsync(item);
                download(data, item);
              }}
            >
              {item}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default UrlDownload;
