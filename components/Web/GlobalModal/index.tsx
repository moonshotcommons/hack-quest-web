import { FC } from 'react';
import AuthModal from '../Business/AuthModal';
import PlaygroundSelectModal from '../Business/PlaygroudSelectModal';
import TipsModal from '../Business/TipsModal';
import { DocumentationPortal } from '../Documentation';
import NotificationModal from '../Business/NotificationModal';
import { StartModal } from '@/components/hackathon-org/modals/start-modal';

interface GlobalModalProps {}

const GlobalModal: FC<GlobalModalProps> = (props) => {
  return (
    <>
      <AuthModal />
      <PlaygroundSelectModal />
      <TipsModal />
      <DocumentationPortal />
      <StartModal open={false} onClose={() => {}} />
      <NotificationModal />
    </>
  );
};

export default GlobalModal;
