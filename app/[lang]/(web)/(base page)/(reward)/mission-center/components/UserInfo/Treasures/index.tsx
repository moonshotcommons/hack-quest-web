import React, { useRef, useState } from 'react';
import Badge from '@/components/Common/Badge';
import Image from 'next/image';
import ChestImg from '@/public/images/mission-center/chest_img.png';
import { UserTreasuresType } from '@/service/webApi/missionCenter/type';
import { BurialPoint } from '@/helper/burialPoint';
import TreasureModal, { TreasureModalRef } from '@/components/Web/Business/TreasureModal';
import Loading from '@/public/images/other/loading.png';

interface TreasuresProp {
  userTreasure: UserTreasuresType[];
}
const Treasures: React.FC<TreasuresProp> = ({ userTreasure }) => {
  const treasureModalRef = useRef<TreasureModalRef>(null);
  const [curId, setCurId] = useState('');
  const openChest = (i: number) => {
    if (i >= userTreasure.length) return;
    BurialPoint.track(`mission-center-开宝箱`);
    setCurId(userTreasure[i].id);
    treasureModalRef.current?.open(userTreasure[i].id, true, () => {
      setCurId('');
    });
  };
  return (
    <div className="w-full">
      <div className="mt-[40px] flex leading-[23px] text-neutral-black">
        <div className="relative">
          Your treasures
          <Badge count={userTreasure.length} />
        </div>
      </div>
      <div className="flex gap-[5px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex-center h-[60px] w-[60px] rounded-[10px] ${
              curId === userTreasure[i]?.id
                ? 'border border-neutral-medium-gray'
                : userTreasure.length <= i
                  ? 'border-[rgba(218, 218, 218, 0.8)] border'
                  : 'cursor-pointer'
            }`}
            onClick={() => openChest(i)}
          >
            {curId === userTreasure[i]?.id ? (
              <Image src={Loading} width={40} alt="loading" className="animate-spin object-contain opacity-100"></Image>
            ) : userTreasure.length > i ? (
              <Image src={ChestImg} width={60} alt="chestImg"></Image>
            ) : null}
          </div>
        ))}
      </div>

      <TreasureModal ref={treasureModalRef} />
    </div>
  );
};

export default Treasures;
