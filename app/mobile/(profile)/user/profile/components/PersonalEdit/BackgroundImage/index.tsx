import HoverIcon from '@/components/Web/Business/HoverIcon';
import { IconType } from '@/components/Web/Business/HoverIcon/type';
import ImageCrop, { ImageCropRef } from '@/components/Common/ImageCrop';
import { cn, errorMessage } from '@/helper/utils';
import webApi from '@/service';
import { Upload, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import Image from 'next/image';
import { FC, useContext, useRef, useState } from 'react';
import { ProfileContext } from '../../../constants/type';

interface BackgroundImageProps {
  edit?: boolean;
}

const BackgroundImage: FC<BackgroundImageProps> = (props) => {
  const { edit = false } = props;
  const [showEditIcon, setShowEditIcon] = useState(false);
  const imageCropRef = useRef<ImageCropRef>(null);

  const { profile, refresh } = useContext(ProfileContext);

  return (
    <div className="w-full z-50 overflow-hidden rounded-t-[10px]">
      <div
        className="w-full h-[210px] relative"
        onMouseEnter={() => {
          if (edit) {
            setShowEditIcon(true);
          }
        }}
        onMouseLeave={() => setShowEditIcon(false)}
      >
        <div className="w-full h-full">
          {Object.keys(profile).includes('backgroundImage') &&
            !profile?.backgroundImage && (
              <Image
                fill
                alt="background image"
                src={'/images/user/test_background.png'}
              ></Image>
            )}
          {profile?.backgroundImage && (
            <Image
              fill
              alt="background image"
              src={profile.backgroundImage || ''}
              // src={'/images/user/test_background.png'}
            ></Image>
          )}
        </div>
        <div
          className={cn(
            'absolute w-full h-full  left-0 top-0 transition-all duration-200 rounded-t-[10px]',
            showEditIcon ? 'bg-black/50' : 'bg-black/0'
          )}
        >
          {showEditIcon && (
            <div className="absolute right-[30px] top-[25px] w-[45px]">
              <HoverIcon
                type={IconType.EDIT}
                tooltip="Edit your background image"
                tooltipProps={{
                  placement: 'bottomRight'
                }}
                onClick={() =>
                  imageCropRef.current?.onEdit({
                    imageUrl:
                      profile.backgroundImage ||
                      '/images/user/test_background.png'
                  })
                }
              ></HoverIcon>
            </div>
          )}
        </div>
      </div>
      <ImageCrop
        ref={imageCropRef}
        title="Background Image"
        onModalOk={async (res) => {
          if (!res) return;
          const file = res as RcFile;
          const fileName = file.name;
          const formData = new FormData();
          formData.append('file', file);
          formData.append('fileName', fileName);
          try {
            const res = await webApi.userApi.uploadBackgroundImage(formData);
            refresh();
            message.success('Updated background image successfully');
          } catch (e: any) {
            errorMessage(e);
          }
        }}
        aspect={6.451612903225806}
        quality={1}
        cropperProps={{
          zoomSpeed: 0.1,
          restrictPosition: true,
          mediaProps: {},
          objectFit: 'horizontal-cover',
          style: {
            containerStyle: {
              height: '450px'
            }
          }
        }}
      >
        <Upload showUploadList={false}></Upload>
      </ImageCrop>
    </div>
  );
};

export default BackgroundImage;
