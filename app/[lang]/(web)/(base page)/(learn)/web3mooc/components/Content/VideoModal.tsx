import Modal from '@/components/Common/Modal';
import { FC } from 'react';

interface VideoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VideoModal: FC<VideoModalProps> = ({ open, setOpen }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="flex w-[1024px] justify-center bg-red-200">
        <video controls className="h-fit w-full">
          <source src="/images/learn/ntu_video.mp4" />
        </video>
      </div>
    </Modal>
  );
};

export default VideoModal;
