import React from 'react';
import Modal from '@/components/Common/Modal';
type BadgesProps = {
  open: boolean;
  onClose: () => void;
};
const Badges: React.FC<BadgesProps> = ({ open, onClose }) => {
  const badgesList = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true}>
      <div className="w-full h-[686px] rounded-[40px] text-mission-center-basics  bg-mission-center-badge-modal-bg flex-col-center py-[75px] pb-[105px]">
        <div className="w-[592px] flex-col-center">
          <div className="text-[24px] leading-6 mb-9">Achievement Badges</div>
          <div className="w-full text-[16px] flex justify-center relative mb-[77px] text-mission-center-tab before:bg-mission-center-badge-line before:absolute before:w-full before:h-[1px] before:top-[50%] before:left-0">
            <div className="w-[168px] h-[26px] relative z-1 leading-[26px] text-center bg-mission-center-badge-modal-bg">
              You have 5 badges
            </div>
          </div>
          <div className="w-full h-[377px] flex flex-wrap overflow-auto no-scrollbar">
            {badgesList.map((item: any, i: number) => (
              <div
                className={`w-[146px] flex-col-center mb-8 ${
                  i % 3 === 1 ? 'w-[calc(100%-292px)]' : ''
                }`}
                key={item}
              >
                <div className="w-[92px] h-[92px] rounded-[50%] bg-mission-center-rounded"></div>
                <p className="text-[16px] leading-4 mt-[14px]">XXX Leaner</p>
                <p className="mt-[9px] text-mission-center-tab text-[12px] leading-3">
                  Complete 2 more Syntax
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Badges;
