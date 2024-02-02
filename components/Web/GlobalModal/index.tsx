import { FC } from 'react';
import AuthModal from '../Business/AuthModal';
import PlaygroundSelectModal from '../Business/PlaygroudSelectModal';

interface GlobalModalProps {}

const GlobalModal: FC<GlobalModalProps> = (props) => {
  return (
    <>
      <AuthModal />
      <PlaygroundSelectModal />
    </>
  );
};

export default GlobalModal;
