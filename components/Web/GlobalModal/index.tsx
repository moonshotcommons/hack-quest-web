import { FC } from 'react';
import AuthModal from '../Business/AuthModal';
import PlaygroundSelectModal from '../Business/PlaygroudSelectModal';
import TipsModal from '../Business/TipsModal';
import { DocumentationPortal } from '../Documentation';

interface GlobalModalProps {}

const GlobalModal: FC<GlobalModalProps> = (props) => {
  return (
    <>
      <AuthModal />
      <PlaygroundSelectModal />
      <TipsModal />
      <DocumentationPortal />
    </>
  );
};

export default GlobalModal;
