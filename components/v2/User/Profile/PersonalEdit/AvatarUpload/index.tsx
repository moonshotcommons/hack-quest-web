import Image from 'next/image';
import { FC, ReactNode, useRef, useState } from 'react';
import EditButton from '../EditButton';
import { cn, errorMessage } from '@/helper/utils';
import PopBox from '@/components/v2/Home/InviteCodeCard/PopBox';
import Tooltip from '@/components/v2/Common/Tooltip';
import ImageCrop, { ImageCropRef } from '@/components/v2/Common/ImageCrop';
import { Upload, UploadFile, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useDispatch } from 'react-redux';
import webApi from '@/service';
import { setUserInfo } from '@/store/redux/modules/user';

interface AvatarUploadProps {
  edit?: boolean;
}

const AvatarUpload: FC<AvatarUploadProps> = (props) => {
  const { edit = false } = props;
  const [showEditIcon, setShowEditIcon] = useState(false);
  const imageCropRef = useRef<ImageCropRef>(null);
  const userInfo = useGetUserInfo();

  const dispatch = useDispatch();

  return (
    <>
      <div
        className="relative w-full h-full"
        onMouseEnter={() => {
          if (edit) {
            setShowEditIcon(true);
          }
        }}
        onMouseLeave={() => setShowEditIcon(false)}
      >
        <div className="relative w-full h-full bg-[#8d8d8d] overflow-hidden rounded-full flex justify-center items-center">
          {userInfo?.avatar && (
            <Image
              fill
              alt="avatar"
              src={userInfo?.avatar || ''}
              className="object-cover"
            ></Image>
          )}
        </div>
        <div
          className={cn(
            'absolute w-full h-full top-0 left-0 bg-black/50 rounded-full flex justify-center items-center transition-opacity duration-200',
            showEditIcon ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Tooltip title="Edit profile photo">
            <EditButton
              className="bg-[#DADADA]"
              color="#231F20"
              opacity={0.5}
              onClick={() => {
                imageCropRef.current?.onEdit({
                  imageUrl: userInfo?.avatar
                });
              }}
            ></EditButton>
          </Tooltip>
        </div>
      </div>
      <ImageCrop
        ref={imageCropRef}
        title="Profile Photo"
        cropShape="round"
        quality={1}
        maxZoom={10}
        onModalOk={async (res) => {
          if (!res) return;
          const file = res as RcFile;
          const fileName = file.name;
          const formData = new FormData();
          formData.append('file', file);
          formData.append('fileName', fileName);
          try {
            const res = await webApi.userApi.uploadAvatar(formData);
            dispatch(setUserInfo({ ...userInfo, avatar: res.avatar || '' }));
            message.success('Updated avatar successfully');
          } catch (e: any) {
            errorMessage(e);
          }
        }}
        cropperProps={{
          cropSize: {
            width: 450,
            height: 450
          },
          zoomSpeed: 0.4,
          restrictPosition: false,
          mediaProps: {},
          style: {
            containerStyle: {
              height: '450px'
            }
          }
        }}
      >
        <Upload showUploadList={false}></Upload>
      </ImageCrop>
    </>
  );
};

export default AvatarUpload;
