import { FC, useState } from 'react';
import { Upload, message, type UploadProps, UploadFile } from 'antd';
import LoadingIcon from '@/components/Common/LoadingIcon';
import { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';
import { FormSchema } from '../../constants';

type GetProp<T, Key> = Key extends keyof T ? Exclude<T[Key], undefined> : never;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface LogoUploadProps {
  form: UseFormReturn<FormSchema, any, undefined>;
  onFileChange: (file: UploadFile) => void;
}

const LogoUpload: FC<LogoUploadProps> = ({ form, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        onFileChange(info.file);
        form.setValue('projectLogo', url);
        form.trigger('projectLogo');
      });
    }
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? (
        <LoadingIcon />
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition group-hover:scale-110 "
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 12C2 6.47715 6.47715 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM13 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13Z"
            fill="#8C8C8C"
          />
        </svg>
      )}
    </button>
  );

  return (
    <div className="w-[120px] text-left">
      <span className="body-m leading-[160%]">Project Logo</span>
      <Upload
        name="avatar"
        accept="image/*"
        listType="picture-card"
        className="group my-[1px] mt-1 [&>div]:flex [&>div]:!h-12 [&>div]:!w-12 [&>div]:items-center [&>div]:justify-center [&>div]:!rounded-[8px] [&>div]:border [&>div]:border-dashed [&>div]:!border-neutral-medium-gray [&>div]:!bg-neutral-off-white [&>div]:hover:!border-yellow-primary"
        showUploadList={false}
        // customRequest={() => {}}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {form.getValues('projectLogo') ? (
          <Image src={form.getValues('projectLogo')} alt="logo" width={48} height={48} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default LogoUpload;
