import { FC } from 'react';
import AuthModal from '../Business/AuthModal';
import TipsModal from '../Business/TipsModal';

interface GlobalModalProps {}

const GlobalModal: FC<GlobalModalProps> = (props) => {
  return (
    <>
      <AuthModal />
      <TipsModal />
    </>
  );
};

export default GlobalModal;
