'use client';
import Button from '@/components/Common/Button';
import { useRequest } from 'ahooks';
import { FC, useState } from 'react';

interface UrlDownloadProps {}

async function getUrlJsonData(type = 'projects') {
  const res = await fetch(
    `http://localhost:3000/api/utils/url-download?type=${type}`
  );
  return res.json();
}

export enum URLDownloadType {
  BLOG = 'blog',
  HACKATHON = 'hackathon',
  GLOSSARY = 'glossary',
  PROJECT = 'project'
}

const UrlDownload: FC<UrlDownloadProps> = (props) => {
  const [indexType, setIndexType] = useState<URLDownloadType | null>(null);

  const { runAsync, loading } = useRequest(
    async (type: any) => {
      return getUrlJsonData(type);
    },
    {
      manual: true
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

  const downloads = [
    URLDownloadType.BLOG,
    URLDownloadType.HACKATHON,
    URLDownloadType.GLOSSARY,
    URLDownloadType.PROJECT
  ];

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
