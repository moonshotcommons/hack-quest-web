import { LoginResponse } from '@/service/webApi/user/type';
import { Upload, message } from 'antd';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { basename, extname } from 'path';
import webApi from '@/service';
import { UserApiType } from '@/service/webApi/user';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/redux/modules/user';
// import sanitize from 'sanitize-filename';
// import { generate } from 'shortid';
interface AvatarUploadProps {
  userInfo: LoginResponse | null;
}

const validImageType = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/svg+xml'
];

const beforeUpload = (file: RcFile) => {
  if (!validImageType.includes(file.type)) {
    let validFileTypeString = validImageType
      .map((item) => item.replace('image/', ''))
      .join(',');
    message.error(
      `Unsupported image types. Currently supported image types are ${validFileTypeString}!`,
      3
    );
    return false;
  }

  return true;
};

// export const getUniqueName = (filename: string) => {
//   const ext = extname(filename);
//   const fileName = basename(filename, ext);
//   const sanitizedFilename = sanitize(fileName)
//     .replace(/[^a-z0-9]/gi, '_')
//     .toLowerCase();
//   const uid = generate();
//   return `${sanitizedFilename}_${uid}${ext}`;
// };

const AvatarUpload: FC<AvatarUploadProps> = (props) => {
  const { userInfo } = props;
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row gap-[1.5rem] items-center">
      <div className="relative w-[5rem] h-[5rem] bg-[#8d8d8d] rounded-full overflow-hidden flex justify-center items-center">
        <Image
          src={userInfo?.avatar || ''}
          alt="avatar"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div>
        <Upload
          accept="image/*"
          showUploadList={false}
          action={UserApiType.UploadAvatar}
          beforeUpload={beforeUpload}
          customRequest={async (option) => {
            const { onProgress, onSuccess, onError } = option;
            const file = option.file as RcFile;
            const fileName = file.name;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', fileName);
            try {
              const res = await webApi.userApi.uploadAvatar(formData);
              dispatch(setUserInfo({ ...userInfo, avatar: res.avatar || '' }));
              message.success('Updated avatar successfully');
            } catch (e: any) {
              console.log(e);
              message.error(e?.msg);
            }
          }}
        >
          <div
            type="file"
            className="text-[0.875rem] font-next-book leading-[120%] text-setting-upload-button-text-color bg-setting-upload-button-bg border border-solid border-setting-upload-button-border-color px-[2.5rem] py-[1rem] rounded-[2.5rem]"
          >
            Upload
          </div>
        </Upload>
      </div>
    </div>
  );
};

export default AvatarUpload;
