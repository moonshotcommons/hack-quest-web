import React, { useRef, useState } from 'react';
import Badge from '@/components/Common/Badge';
import Image from 'next/image';
import ChestImg from '@/public/images/mission-center/chest_img.png';
import { UserTreasuresType } from '@/service/webApi/missionCenter/type';
import { BurialPoint } from '@/helper/burialPoint';
import TreasureModal, {
  TreasureType,
  TreasureModalRef
} from '@/components/v2/TreasureModal';

interface TreasuresProp {
  userTreasure: UserTreasuresType[];
}
const Treasures: React.FC<TreasuresProp> = ({ userTreasure }) => {
  const treasureModalRef = useRef<TreasureModalRef>(null);

  const openChest = (i: number) => {
    // if (i >= userTreasure.length) return;
    BurialPoint.track(`mission-center-开宝箱`);
    console.info(userTreasure[i]);
    treasureModalRef.current?.open('123');
  };
  return (
    <div className="w-full">
      <div className="leading-[23px] text-[#000] flex mt-[40px]">
        <div className="relative">
          Your undug treasures
          <Badge count={userTreasure.length} />
        </div>
      </div>
      <div className="flex gap-[5px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-[60px] h-[60px] rounded-[10px] ${
              userTreasure.length <= i
                ? 'border border-[#8C8C8C]'
                : 'cursor-pointer'
            }`}
            onClick={() => openChest(i)}
          >
            {userTreasure.length > i && (
              <Image src={ChestImg} width={60} alt="chestImg"></Image>
            )}
          </div>
        ))}
      </div>

      <TreasureModal ref={treasureModalRef} />
    </div>
  );
};

export default Treasures;
