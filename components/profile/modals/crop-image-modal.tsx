'use client';

import * as React from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { create } from 'zustand';
import { wait } from '@/helper/utils';
import { Slider } from '@/components/ui/slider';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Store = {
  open: boolean;
  imageUrl: string;
  onOpen: (imageUrl: string) => void;
  onClose: () => void;
};

export const useCropImage = create<Store>((set) => ({
  open: false,
  imageUrl: '',
  onOpen: async (imageUrl: string) => {
    // Delay for animation
    await wait(500);
    set({ open: true, imageUrl });
  },
  onClose: () => set({ open: false, imageUrl: '' })
}));

export function CropImageModal() {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedArea, setCroppedArea] = React.useState<any>(null);
  const { open, imageUrl, onClose } = useCropImage();

  function onCropComplete(_croppedArea: any, _croppedAreaPixels: any) {
    console.log(_croppedArea, _croppedAreaPixels);
    setCroppedArea(_croppedAreaPixels);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex max-w-xl flex-col gap-8 p-12">
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="text-[22px]">Crop Image</DialogTitle>
        </DialogHeader>
        <div className="relative h-60 w-full rounded-[8px] bg-neutral-off-white">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={setCroppedArea}
            onZoomChange={setZoom}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                backgroundColor: 'var(--neutral-off-white)'
              }
            }}
          />
        </div>
        <section className="flex gap-4 px-14">
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
        <div className="flex gap-4 self-end">
          <Button variant="outline" className="w-[165px]" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-[165px]">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
