import Button from '@/components/Common/Button';
import { Input, Typography, message } from 'antd';
import { useRouter } from 'next/router';
import { FC, ReactNode, useState } from 'react';

interface PreviewWorkspaceProps {}

const PreviewWorkspace: FC<PreviewWorkspaceProps> = (props) => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string>();

  return (
    <>
      <Typography.Title style={{ fontSize: '20px' }}>
        输入url预览lesson页面
      </Typography.Title>

      <Input
        size="large"
        required
        onChange={(e) => setPreviewUrl(e.target.value as string)}
      ></Input>

      <Button
        type="primary"
        size="medium-x"
        className="py-3"
        onClick={() => {
          if (
            !previewUrl ||
            !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(previewUrl)
          ) {
            message.error('无效的url，请检查url链接是否正确');
            return;
          }

          router.push(`/preview/lesson?previewUrl=${previewUrl}`);
        }}
      >
        Preview
      </Button>
    </>
  );
};

export default PreviewWorkspace;
