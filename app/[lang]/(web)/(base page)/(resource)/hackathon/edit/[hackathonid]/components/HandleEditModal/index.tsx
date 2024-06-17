import React, { useContext } from 'react';
import { HackathonEditContext, HackathonEditModalType } from '../../constants/type';
import Modal from '@/components/Common/Modal';
import { FiX } from 'react-icons/fi';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import ListModal from './ListModal';
import PartnersBoxModal from './PartnersBoxModal';

interface HandleEditModalProp {
  hackathon: HackathonType;
}

const HandleEditModal: React.FC<HandleEditModalProp> = ({ hackathon }) => {
  const { modalType, setModalType } = useContext(HackathonEditContext);
  const modalContent = () => {
    switch (modalType) {
      case HackathonEditModalType.LIST:
        return <ListModal hackathon={hackathon} />;
      case HackathonEditModalType.MEDIA_PARTNERS:
        return <PartnersBoxModal hackathon={hackathon} type="mediaPartners" />;
      case HackathonEditModalType.COMMUNITY_PARTNERS:
        return <PartnersBoxModal hackathon={hackathon} type="communityPartners" />;
      case HackathonEditModalType.PARTNERS:
        return <PartnersBoxModal hackathon={hackathon} type="partners" />;
      default:
        return null;
    }
  };

  const test = () => {
    return <PartnersBoxModal hackathon={hackathon} type="communityPartners" />;
  };

  const onClose = () => {
    setModalType(HackathonEditModalType.NULL);
  };
  return (
    <Modal open={true} onClose={onClose} showCloseIcon={true} icon={<FiX size={34} />}>
      <div className="scroll-wrap-y max-h-[85vh] w-[888px] rounded-[16px] bg-neutral-white p-[40px] pt-[60px]">
        {test()}
      </div>
    </Modal>
  );
};

export default HandleEditModal;
