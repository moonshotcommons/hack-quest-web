import Button from '@/components/Common/Button';
import webApi from '@/service';
import { Input, message } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

interface PreviewWorkspaceProps {}

const PreviewWorkspace: FC<PreviewWorkspaceProps> = (props) => {
  const router = useRouter();
  const [previewLessonUrl, setPreviewLessonUrl] = useState<string>();
  const [previewCourseUrl, setPreviewCourseUrl] = useState<string>();

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-2">
        <h1 style={{ fontSize: '20px' }}>输入lesson的url预览lesson页面</h1>

        <Input
          size="large"
          required
          className="w-1/2"
          onChange={(e) => setPreviewLessonUrl(e.target.value as string)}
        ></Input>

        <Button
          type="primary"
          size="medium-x"
          className="py-3"
          onClick={() => {
            if (
              !previewLessonUrl ||
              !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(
                previewLessonUrl.trim()
              )
            ) {
              message.error('无效的url，请检查url链接是否正确');
              return;
            }

            router.push(`/preview/lesson?previewUrl=${previewLessonUrl}`);
          }}
        >
          Preview
        </Button>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 style={{ fontSize: '20px' }}>输入course的url预览course页面</h1>

        <Input
          size="large"
          required
          className="w-1/2"
          onChange={(e) => setPreviewCourseUrl(e.target.value as string)}
        ></Input>

        <Button
          type="primary"
          size="medium-x"
          className="py-3"
          onClick={() => {
            if (
              !previewCourseUrl ||
              !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(
                previewCourseUrl.trim()
              )
            ) {
              message.error('无效的url，请检查url链接是否正确');
              return;
            }

            webApi.previewApi
              .createPreviewCourse(previewCourseUrl)
              .then((res) => {
                message.success({
                  content:
                    'Uploading course to dev environment. Please check notifications on Lark.',
                  duration: 3
                });
              })
              .catch((error) => {
                message.error({
                  content: error?.msg || 'An unexpected error occurs!',
                  duration: 3
                });
              });
          }}
        >
          Preview
        </Button>
      </div>
    </div>
  );
};

export default PreviewWorkspace;
