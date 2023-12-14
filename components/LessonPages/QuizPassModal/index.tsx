import Modal from '@/components/Common/Modal';
import { FC } from 'react';
import PassImage from './pass.svg';
import Image from 'next/image';
interface QuizPassModalProps {
  open: boolean;
  onClose: VoidFunction;
}

const QuizPassModal: FC<QuizPassModalProps> = (props) => {
  const { open, onClose } = props;
  return (
    <Modal open={open} onClose={onClose} markBg="transparent">
      <div className="w-full h-full flex items-center justify-center">
        <Image src={PassImage} alt="good job"></Image>
      </div>
    </Modal>
  );
};

export default QuizPassModal;
