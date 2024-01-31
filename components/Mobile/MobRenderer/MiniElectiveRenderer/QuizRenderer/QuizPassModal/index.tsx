import Modal from '@/components/Common/Modal';
import Image from 'next/image';
import { FC } from 'react';
import PassImage from './pass.svg';
interface QuizPassModalProps {
  open: boolean;
  onClose: VoidFunction;
}

const QuizPassModal: FC<QuizPassModalProps> = (props) => {
  const { open, onClose } = props;
  return (
    <Modal open={open} onClose={onClose} markBg="transparent">
      <div className="flex h-full w-full items-center justify-center">
        <Image src={PassImage} alt="good job"></Image>
      </div>
    </Modal>
  );
};

export default QuizPassModal;
