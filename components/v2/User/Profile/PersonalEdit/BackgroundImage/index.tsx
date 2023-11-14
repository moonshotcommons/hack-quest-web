import { cn } from '@/helper/utils';
import Image from 'next/image';
import { FC, ReactNode, useRef, useState } from 'react';
import EditButton from '../EditButton';
import ImageCrop, { ImageCropRef } from '@/components/v2/Common/ImageCrop';
import { Upload } from 'antd';

interface BackgroundImageProps {
  edit?: boolean;
}

const BackgroundImage: FC<BackgroundImageProps> = (props) => {
  const { edit = false } = props;
  const [showEditIcon, setShowEditIcon] = useState(false);
  const imageCropRef = useRef<ImageCropRef>(null);
  return (
    <div className="w-full z-50">
      <div
        className="w-full h-[210px] bg-red-300 relative"
        onMouseEnter={() => {
          if (edit) {
            setShowEditIcon(true);
          }
        }}
        onMouseLeave={() => setShowEditIcon(false)}
      >
        <Image
          fill
          alt="background image"
          src={'/images/user/test_background.png'}
        ></Image>
        <div
          className={cn(
            'absolute w-full h-full  left-0 top-0 transition-all duration-200',
            showEditIcon ? 'bg-black/50' : 'bg-black/0'
          )}
        >
          {showEditIcon && (
            <div className="absolute right-[30px] top-[25px] w-[45px]">
              <EditButton
                onClick={() => imageCropRef.current?.onEdit({})}
              ></EditButton>
            </div>
          )}
        </div>
      </div>
      <ImageCrop ref={imageCropRef} title="Background Image">
        <Upload></Upload>
      </ImageCrop>
    </div>
  );
};

export default BackgroundImage;
