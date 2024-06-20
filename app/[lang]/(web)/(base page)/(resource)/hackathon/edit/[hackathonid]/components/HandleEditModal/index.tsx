import React, { useContext } from 'react';
import { HackathonEditContext, HackathonEditModalType } from '../../constants/type';
import Modal from '@/components/Common/Modal';
import { FiX } from 'react-icons/fi';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import ListModal from './ListModal';
import PartnersBoxModal from './PartnersBoxModal';
import SpeakersSponsorsBoxModal from './SpeakersSponsorsBoxModal';
import ScheduleModal from './ScheduleModal';
import FAQsModal from './FAQsModal';
import CoverModal from './CoverModal';
import BaseEditModal from './BaseEditModal';

interface HandleEditModalProp {
  hackathon: HackathonType;
}

const HandleEditModal: React.FC<HandleEditModalProp> = ({ hackathon }) => {
  const { modalType, setModalType } = useContext(HackathonEditContext);
  const modalContent = () => {
    switch (modalType) {
      case HackathonEditModalType.LIST:
        return <ListModal hackathon={hackathon} />;
      case HackathonEditModalType.COVER:
        return <CoverModal hackathon={hackathon} />;
      case HackathonEditModalType.MEDIA_PARTNERS:
      case HackathonEditModalType.COMMUNITY_PARTNERS:
      case HackathonEditModalType.PARTNERS:
        return <PartnersBoxModal hackathon={hackathon} />;
      case HackathonEditModalType.SPEAKERS_JUDGES:
      case HackathonEditModalType.SPONSORS:
        return <SpeakersSponsorsBoxModal hackathon={hackathon} />;
      case HackathonEditModalType.SCHEDULE:
        return <ScheduleModal hackathon={hackathon} />;
      case HackathonEditModalType.FAQS:
        return <FAQsModal hackathon={hackathon} />;
      case HackathonEditModalType.TIMELINE:
      case HackathonEditModalType.REWARDS:
      case HackathonEditModalType.JUDGING:
      case HackathonEditModalType.APPLICATION:
      case HackathonEditModalType.SUBMISSION:
      case HackathonEditModalType.LINKS:
      case HackathonEditModalType.INFO:
        return <BaseEditModal hackathon={hackathon} />;
      default:
        return null;
    }
  };

  const test = () => {
    return <CoverModal hackathon={hackathon} />;
  };

  const onClose = () => {
    setModalType(HackathonEditModalType.NULL);
  };
  return (
    <Modal
      open={modalType !== HackathonEditModalType.NULL}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={34} />}
    >
      {modalType !== HackathonEditModalType.NULL && (
        <div className="w-[888px] rounded-[16px] bg-neutral-white py-[40px] pt-[60px] [&>div]:flex [&>div]:max-h-[80vh] [&>div]:w-full [&>div]:flex-col [&>div]:gap-[24px]">
          {modalContent()}
        </div>
      )}
    </Modal>
  );
};

export default HandleEditModal;
