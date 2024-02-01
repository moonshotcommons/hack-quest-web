import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { message } from 'antd';
import type CropperRef from 'react-easy-crop';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import {
  MouseEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

import { PREFIX, ROTATION_INITIAL } from './constants';
import type {
  BeforeUpload,
  BeforeUploadReturnType,
  EasyCropRef,
  ImgCropProps
} from './types';
import EasyCrop from './EasyCrop';
import type { CropperProps } from 'react-easy-crop';
import { errorMessage } from '@/helper/ui';
import { urlToBlobAndBase64 } from '@/helper/utils';
import { v4 as uuidV4 } from 'uuid';
interface ImageCropProps {
  title?: string;
  children: ReactNode;
  beforeCrop?: BeforeUpload;
  beforeUpload?: BeforeUpload;
  fillColor?: string;
  quality?: number;
  rotationSlider?: boolean;
  aspect?: number;
  minZoom?: number;
  maxZoom?: number;
  cropShape?: 'rect' | 'round';
  showGrid?: boolean;
  showReset?: boolean;
  resetText?: string;
  onModalOk?: (value: BeforeUploadReturnType) => void;
  onModalCancel?: () => void;
  cropperProps?: Omit<
    CropperProps,
    | 'image'
    | 'crop'
    | 'zoom'
    | 'rotation'
    | 'aspect'
    | 'minZoom'
    | 'maxZoom'
    | 'zoomWithScroll'
    | 'cropShape'
    | 'showGrid'
    | 'onCropChange'
    | 'onZoomChange'
    | 'onRotationChange'
    | 'onCropComplete'
    | 'classes'
  >;
}

export interface ImageCropRef {
  onEdit: (params: Record<string, any>) => void;
  onSava?: () => void;
  onCancel?: () => void;
}

const deprecate = (obj: Record<string, any>, old: string, now: string) => {
  if (old in obj) {
    console.error(`\`${old}\` is deprecated, please use \`${now}\` instead`);
    return obj[old];
  }
  return obj[now];
};

/**
 * @antd-img-crop文档 https://github.com/nanxiaobei/antd-img-crop/blob/main/README.zh-CN.md
 * @react-easy-crop文档 https://github.com/ricardo-ch/react-easy-crop#props
 */
const ImageCrop = forwardRef<ImageCropRef, ImageCropProps>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    title,
    beforeCrop,
    beforeUpload,
    quality = 0.4,
    fillColor = 'white',
    rotationSlider: ROTATION_SLIDER = false,
    // @ts-ignore
    zoomSlider: ZOOM_SLIDER = true,
    // @ts-ignore
    aspectSlider = false,
    showReset = false,
    resetText,
    cropperProps,
    children,
    aspect = 1,
    minZoom = 1,
    maxZoom = 3,
    // @ts-ignore
    cropShape: CROP_SHAPE = 'rect',
    // @ts-ignore
    showGrid: SHOW_GRID = false,
    onModalOk,
    onModalCancel
  } = props;

  const [modalImage, setModalImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onCancel = useRef<VoidFunction>();
  const onOk = useRef<(event: any) => Promise<void>>();

  const rotationSlider = deprecate(props, 'rotate', 'rotationSlider') || false;
  const zoomSlider = deprecate(props, 'zoom', 'zoomSlider') || true;
  const cropShape = deprecate(props, 'shape', 'cropShape') || 'rect';
  const showGrid = deprecate(props, 'grid', 'showGrid') || false;

  const easyCropRef = useRef<EasyCropRef>(null);
  const cropperRef = useRef<CropperRef>(null);

  const cb = useRef<
    Pick<ImgCropProps, 'onModalOk' | 'onModalCancel' | 'beforeCrop'>
  >({});
  cb.current.onModalOk = onModalOk;
  cb.current.onModalCancel = onModalCancel;
  cb.current.beforeCrop = beforeCrop;

  // on modal cancel
  onCancel.current = () => {
    setModalImage('');
    easyCropRef.current!.onReset();
    setOpen(false);
    setFileList([]);
    cb.current.onModalCancel?.();
  };

  // on modal confirm
  onOk.current = async (event: MouseEvent<HTMLElement>) => {
    setLoading(true);
    const canvas = getCropCanvas(event.target as ShadowRoot);
    const { type, name, uid } = fileList[0] as UploadFile;

    canvas.toBlob(
      async (blob) => {
        try {
          const newFile = new File([blob as BlobPart], name, { type });
          await cb.current.onModalOk?.(Object.assign(newFile, { uid }));
          setModalImage('');
          easyCropRef.current!.onReset();
          setOpen(false);
          setFileList([]);
        } catch (err) {
          errorMessage(err);
        } finally {
          setLoading(false);
        }
      },
      type,
      quality
    );
  };

  useImperativeHandle(ref, () => {
    return {
      async onEdit(params) {
        setOpen(true);
        try {
          const res = await urlToBlobAndBase64(params.imageUrl);
          const { base64, blob } = res;
          setModalImage(base64);
          const newFile = new File([blob as BlobPart], 'avatar', {
            type: 'image/png'
          });

          setFileList([Object.assign(newFile, { uid: uuidV4() })]);
        } catch (err) {
          errorMessage(err);
        }
      }
    };
  });

  const getCropCanvas = useCallback(
    (target: ShadowRoot) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const context = (target?.getRootNode?.() as ShadowRoot) || document;

      type ImgSource = CanvasImageSource & {
        naturalWidth: number;
        naturalHeight: number;
      };

      const imgSource = context.querySelector(`.${PREFIX}-media`) as ImgSource;

      const {
        width: cropWidth,
        height: cropHeight,
        x: cropX,
        y: cropY
      } = easyCropRef.current!.cropPixelsRef.current;

      if (
        rotationSlider &&
        easyCropRef.current!.rotation !== ROTATION_INITIAL
      ) {
        const { naturalWidth: imgWidth, naturalHeight: imgHeight } = imgSource;
        const angle = easyCropRef.current!.rotation * (Math.PI / 180);

        // get container for rotated image
        const sine = Math.abs(Math.sin(angle));
        const cosine = Math.abs(Math.cos(angle));
        const squareWidth = imgWidth * cosine + imgHeight * sine;
        const squareHeight = imgHeight * cosine + imgWidth * sine;

        canvas.width = squareWidth;
        canvas.height = squareHeight;
        ctx.fillStyle = fillColor;
        ctx.fillRect(0, 0, squareWidth, squareHeight);

        // rotate container
        const squareHalfWidth = squareWidth / 2;
        const squareHalfHeight = squareHeight / 2;
        ctx.translate(squareHalfWidth, squareHalfHeight);
        ctx.rotate(angle);
        ctx.translate(-squareHalfWidth, -squareHalfHeight);

        // draw rotated image
        const imgX = (squareWidth - imgWidth) / 2;
        const imgY = (squareHeight - imgHeight) / 2;
        ctx.drawImage(
          imgSource,
          0,
          0,
          imgWidth,
          imgHeight,
          imgX,
          imgY,
          imgWidth,
          imgHeight
        );

        // crop rotated image
        const imgData = ctx.getImageData(0, 0, squareWidth, squareHeight);
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.putImageData(imgData, -cropX, -cropY);
      } else {
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.fillStyle = fillColor;
        ctx.fillRect(0, 0, cropWidth, cropHeight);

        ctx.drawImage(
          imgSource,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );
      }

      return canvas;
    },
    [fillColor, rotationSlider]
  );

  const runRawBeforeUpload = useCallback(
    async (
      beforeUpload: BeforeUpload,
      file: RcFile,
      pass: (parsedFile: BeforeUploadReturnType) => void,
      fail: (rejectErr: BeforeUploadReturnType) => void
    ) => {
      const rawFile = file as unknown as File;
      if (typeof beforeUpload !== 'function') {
        pass(rawFile);
        return;
      }

      try {
        // https://ant.design/components/upload-cn#api
        // https://github.com/ant-design/ant-design/blob/master/components/upload/Upload.tsx#L152-L178
        const result = await beforeUpload(file, [file]);
        pass(result !== true ? result : rawFile);
      } catch (err) {
        fail(err as BeforeUploadReturnType);
      }
    },
    []
  );

  const getNewBeforeUpload = useCallback(
    (beforeUpload: BeforeUpload) => {
      return ((file, fileList) => {
        return new Promise(async (resolve, reject) => {
          const validImageType = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
            'image/webp',
            'image/svg+xml'
          ];

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

          if (typeof beforeCrop === 'function') {
            try {
              const result = await beforeCrop(file, fileList);
              if (result === false) {
                return runRawBeforeUpload(beforeUpload, file, resolve, reject);
              }
            } catch (err) {
              return (
                beforeUpload &&
                runRawBeforeUpload(beforeUpload, file, resolve, reject)
              );
            }
          }

          const reader = new FileReader();
          reader.addEventListener('load', () => {
            if (typeof reader.result === 'string') {
              setModalImage(reader.result); // open modal
            }
          });
          reader.readAsDataURL(file as unknown as Blob);

          setFileList([file]);
        });
      }) as BeforeUpload;
    },
    [getCropCanvas, quality, runRawBeforeUpload]
  );

  const getNewUpload = useCallback(
    (children: ReactNode) => {
      const upload = Array.isArray(children) ? children[0] : children;
      const {
        beforeUpload,
        accept,
        children: child,
        ...restUploadProps
      } = upload.props;

      return {
        ...upload,
        props: {
          ...restUploadProps,
          fileList,
          accept: accept || 'image/*',
          children: child ? (
            child
          ) : (
            <Button
              ghost
              className="flex w-[265px] items-center justify-center border-neutral-black py-[12px]"
            >
              Change Image
            </Button>
          ),
          beforeUpload: getNewBeforeUpload(beforeUpload)
        }
      };
    },
    [getNewBeforeUpload]
  );

  return (
    <Modal
      open={open}
      onClose={() => {
        setModalImage('');
        easyCropRef.current!.onReset();
        setOpen(false);
        setFileList([]);
        cb.current.onModalCancel?.();
      }}
      showCloseIcon
      icon={
        <div className="absolute -right-2 -top-2 cursor-pointer">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="22.2734"
              y1="22.2745"
              x2="7.42416"
              y2="7.42521"
              stroke="#0B0B0B"
            />
            <line
              x1="7.42574"
              y1="22.2744"
              x2="22.275"
              y2="7.42513"
              stroke="#0B0B0B"
            />
          </svg>
        </div>
      }
      markBg="black"
    >
      <div className="w-[800px] rounded-[10px] bg-neutral-white pb-[40px] pt-[30px]">
        <div className="text-h3 px-[30px] pb-[40px] leading-[125%] text-neutral-black">
          {title}
        </div>
        <EasyCrop
          ref={easyCropRef}
          cropperRef={cropperRef}
          zoomSlider={zoomSlider}
          rotationSlider={rotationSlider}
          aspectSlider={aspectSlider}
          showReset={showReset}
          resetBtnText={'重置'}
          modalImage={modalImage}
          aspect={aspect}
          minZoom={minZoom}
          maxZoom={maxZoom}
          cropShape={cropShape}
          showGrid={showGrid}
          cropperProps={cropperProps}
        />
        <div className="body-m mt-[30px] flex justify-center gap-x-[15px] text-neutral-black">
          {getNewUpload(children)}
          <Button
            className="flex w-[265px] items-center justify-center py-[12px]"
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={(e) => {
              onOk.current?.(e);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
});

ImageCrop.displayName = 'ImageCrop';

export default ImageCrop;
