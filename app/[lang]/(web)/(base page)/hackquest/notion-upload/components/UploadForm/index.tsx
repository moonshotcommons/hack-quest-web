'use client';
import Input from '@/components/Common/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import UploadButton from '../UploadButton';
import { useNotionUploadContext } from '../NotionUploadProvider';
const formSchema = z.object({
  notionUrl: z.string().url()
});

interface UploadFormProps {}

const UploadForm: FC<UploadFormProps> = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const [notionUrl, setNotionUrl] = useState('');
  // const router = useRouter();

  // const [logs, setLogs] = useState({ status: 'default', message: '' });

  // const onSubmit = (notionUrl: string) => {
  //   const token = getToken();
  //   setLogs({ status: 'pending', message: '' });

  //   const eventSource = new EventSource(
  //     `${process.env.BACKEND_BASE_URL}admin/parse-notion?token=${token}&notionUrl=${notionUrl}`
  //   );

  //   eventSource.addEventListener('message', (event) => {
  //     setLogs((l) => ({ status: 'pending', message: l.message + '\n' + event.data }));
  //     router.refresh();
  //     console.log(event);
  //   });

  //   eventSource.addEventListener('error', (event) => {
  //     console.log(event);
  //     // setLogs({ status: 'error', message: 'event' });
  //     router.refresh();
  //     eventSource.close();
  //   });
  // };

  // const { logs, onSubmit } = useSubmitNotionUrl();

  const { logs } = useNotionUploadContext();

  return (
    <div className="flex flex-col gap-6 pb-20 pt-10">
      {/* <Form {...form}>
        <form className="flex items-center gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput form={form} name="notionUrl" label="" placeholder="请输入notion链接" />
          <Button htmlType="submit" type="primary" className="whitespace-nowrap rounded-lg px-6 py-3">
            上传
          </Button>
        </form>
      </Form> */}
      <div className="container flex items-center gap-4">
        <div className="flex-1">
          <Input
            name="notionUrl"
            className="flex-1 rounded-lg"
            placeholder="请输入notion链接"
            onChange={(e) => {
              setNotionUrl(e.target.value);
            }}
            value={notionUrl}
          />
        </div>
        {/* <Button
          htmlType="submit"
          type="primary"
          className="whitespace-nowrap rounded-lg px-6 py-3"
          onClick={() => {
            onSubmit(notionUrl);
          }}
        >
          上传
        </Button> */}
        <UploadButton notionUrl={notionUrl} />
      </div>
      <div className="h-[20rem] overflow-auto whitespace-pre-line rounded-md border bg-neutral-white px-10">
        {logs.message}
      </div>
    </div>
  );
};

export default UploadForm;
