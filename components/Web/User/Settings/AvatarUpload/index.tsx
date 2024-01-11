import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { UserApiType } from '@/service/webApi/user';
import { LoginResponse } from '@/service/webApi/user/type';
import { useUserStore } from '@/store/zustand/userStore';

import { Upload, message } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import { FC } from 'react';
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
  const setUserInfo = useUserStore((state) => state.setUserInfo);
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
            BurialPoint.track('头像上传');
            try {
              const res = await webApi.userApi.uploadAvatar(formData);
              setUserInfo({ ...userInfo, avatar: res.avatar || '' });
              message.success('Updated avatar successfully');
              BurialPoint.track('头像上传成功');
            } catch (e: any) {
              console.log(e);
              message.error(e?.msg);
              BurialPoint.track('头像上传失败', { message: e?.msg });
            }
          }}
        >
          <div
            type="file"
            className="text-[0.875rem] font-next-book leading-[120%] text-setting-drop-setting-change-color border border-solid border-setting-drop-user-name-color px-[2.5rem] py-[1rem] rounded-[2.5rem]"
          >
            Change
          </div>
        </Upload>
      </div>
    </div>
  );
};

export default AvatarUpload;
