'use client';

import * as React from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

function createImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });
}

async function getCroppedImage(src: string, pixelCrop: Area) {
  const image = await createImage(src);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<Blob | null>((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(file);
      } else {
        reject();
      }
    }, 'image/jpeg');
  });
}

export function CropImageModal({
  open,
  imageUrl,
  cropShape = 'rect',
  aspect = 16 / 9,
  loading = false,
  onClose,
  onConfirm
}: {
  open: boolean;
  imageUrl: string;
  cropShape?: 'rect' | 'round';
  aspect?: number;
  loading?: boolean;
  onClose?: () => void;
  onConfirm: (blob: Blob) => void;
}) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedArea, setCroppedArea] = React.useState<any>(null);

  function onCropComplete(_: Area, croppedAreaPixels: Area) {
    setCroppedArea(croppedAreaPixels);
  }

  async function onCropDone() {
    try {
      const croppedImage = await getCroppedImage(imageUrl, croppedArea);
      if (croppedImage) {
        onConfirm(croppedImage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex max-w-[92.5%] flex-col gap-8 rounded-xl sm:max-w-xl sm:p-8">
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="text-[22px]">Crop Image</DialogTitle>
        </DialogHeader>
        <div className="relative h-[40vh] w-full rounded-[8px] bg-neutral-off-white">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            restrictPosition={true}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                backgroundColor: '#fff'
              }
            }}
          />
        </div>
        <section className="flex gap-4 sm:px-14">
          <button
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-black outline-none disabled:opacity-50"
            disabled={zoom <= 1}
            onClick={() => setZoom((prev) => prev - 0.01)}
          >
            <MinusIcon size={16} />
          </button>
          <Slider min={1} max={2} step={0.01} value={[zoom]} onValueChange={(val) => setZoom(val[0])} />
          <button
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-black text-neutral-white outline-none disabled:opacity-50"
            disabled={zoom >= 2}
            onClick={() => setZoom((prev) => prev + 0.01)}
          >
            <PlusIcon size={16} />
          </button>
        </section>
        <div className="flex flex-col gap-4 sm:flex-row sm:self-end">
          <Button variant="outline" className="w-full sm:w-[165px]" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-full sm:w-[165px]" isLoading={loading} onClick={onCropDone}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
