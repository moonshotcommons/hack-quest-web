import { FC } from 'react';
import AuthModal from '../Business/AuthModal';
import PlaygroundSelectModal from '../Business/PlaygroudSelectModal';
import TipsModal from '../Business/TipsModal';
import { DocumentationPortal } from '../Documentation';
import NotificationModal from '../Business/NotificationModal';

interface GlobalModalProps {}

const GlobalModal: FC<GlobalModalProps> = (props) => {
  return (
    <>
      <AuthModal />
      <PlaygroundSelectModal />
      <TipsModal />
      <DocumentationPortal />
      <NotificationModal />
    </>
  );
};

export default GlobalModal;
