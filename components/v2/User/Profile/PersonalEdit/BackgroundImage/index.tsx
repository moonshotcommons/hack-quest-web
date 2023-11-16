import { cn, errorMessage } from '@/helper/utils';
import Image from 'next/image';
import { FC, ReactNode, useContext, useRef, useState } from 'react';
import EditButton from '../EditButton';
import ImageCrop, { ImageCropRef } from '@/components/v2/Common/ImageCrop';
import { Upload, message } from 'antd';
import { ProfileContext } from '../../type';
import webApi from '@/service';
import { RcFile } from 'antd/es/upload';
import Tooltip from '@/components/v2/Common/Tooltip';

interface BackgroundImageProps {
  edit?: boolean;
}

const BackgroundImage: FC<BackgroundImageProps> = (props) => {
  const { edit = false } = props;
  const [showEditIcon, setShowEditIcon] = useState(false);
  const imageCropRef = useRef<ImageCropRef>(null);

  const { profile, refresh } = useContext(ProfileContext);

  return (
    <div className="w-full z-50">
      <div
        className="w-full h-[210px] relative"
        onMouseEnter={() => {
          if (edit) {
            setShowEditIcon(true);
          }
        }}
        onMouseLeave={() => setShowEditIcon(false)}
      >
        <div className="w-full h-full overflow-hidden">
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
              src={profile.backgroundImage}
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
              <Tooltip
                title="Edit your background image"
                placement="bottomRight"
              >
                <EditButton
                  onClick={() =>
                    imageCropRef.current?.onEdit({
                      imageUrl:
                        profile.backgroundImage ||
                        '/images/user/test_background.png'
                    })
                  }
                ></EditButton>
              </Tooltip>
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
            message.success('Updated avatar successfully');
          } catch (e: any) {
            errorMessage(e);
          }
        }}
        quality={1}
        maxZoom={10}
        cropperProps={{
          cropSize: {
            width: 800,
            height: 124
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
    </div>
  );
};

export default BackgroundImage;
