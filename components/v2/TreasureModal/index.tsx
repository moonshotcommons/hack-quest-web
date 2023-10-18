import React from 'react';
import Modal from '@/components/Common/Modal';
import MoonFace from '@/public/images/mission-center/moon_face.png';
import BannerBg from '@/public/images/landing/banner_bg.png';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import Pit from '@/public/images/mission-center/pit.png';
import PitM from '@/public/images/mission-center/pit_m.png';
import Flag from '@/public/images/mission-center/flag.png';
import Qmark from '@/public/images/mission-center/q_mark.png';
import Mperson from '@/public/images/mission-center/m_person.png';
import Image from 'next/image';
import Button from '@/components/Common/Button';

export enum TreasureType {
  OPEN = 'open',
  SHOW = 'show'
}
interface TreasureModalProp {
  type: TreasureType;
  open: boolean;
  onClose: () => void;
  treasureId?: string;
  treasureXp?: number;
  treasureCoin?: number;
  openTreasure?: (id: string) => void;
}
const TreasureModal: React.FC<TreasureModalProp> = ({
  type,
  open,
  onClose,
  treasureId,
  treasureXp = 0,
  treasureCoin = 0,
  openTreasure
}) => {
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true}>
      <div className="w-full h-[750px] flex-center">
        <div
          className="w-[99%] h-[700px] flex flex-col  rounded-[10px] overflow-hidden text-[#fff]"
          style={{
            boxShadow: `0 0 10px #3e3e3e`
          }}
        >
          <div
            className="w-full flex-1 flex-col-center justify-center pb-[20px]"
            style={{
              background: `url(${BannerBg.src}) center  / 100% auto`
            }}
          >
            {type === TreasureType.OPEN ? (
              <>
                <p className="text-[24px] font-next-book-bold mb-[43px] tracking-[0.48px]">
                  You found something hidden on your HackQuest Journey!
                </p>
                <Button
                  onClick={() => {}}
                  className={`w-[400px] text-[18px]  h-[55px] bg-auth-primary-button-bg
                      border-auth-primary-button-border-color p-0 text-[#0b0b0b] hover:border-auth-primary-button-border-hover-color 
                      hover:text-auth-primary-button-text-hover-color 
                      hover:bg-auth-primary-button-hover-bg  mb-[25px] tracking-[0.36px] `}
                >
                  Dig Treasures
                </Button>
                <Button
                  className={`w-[400px] text-[18px]  h-[55px] border
                      border-[#fff] p-0 text-[#fff] tracking-[0.36px]  `}
                  onClick={onClose}
                >
                  Check Later
                </Button>
              </>
            ) : (
              <>
                <p className="text-[24px] font-next-book-bold  tracking-[0.48px]">
                  The treasures you’ve got are
                </p>
                <div className="flex justify-center gap-[30px] my-[30px]">
                  <div>
                    <Image src={IconCoin} width={60} alt="iconCoin" />
                    <p className="w-[60px] h-[30px] rounded-[20px] bg-[#3E3E3E] flex-center mt-[10px]">
                      {treasureCoin}
                    </p>
                  </div>
                  <div>
                    <Image src={IconXp} width={60} alt="iconXp" />
                    <p className="w-[60px] h-[30px] rounded-[20px] bg-[#3E3E3E] flex-center mt-[10px]">
                      {treasureXp}
                    </p>
                  </div>
                </div>
                <Button
                  className={`w-[400px] text-[18px]  h-[55px] border
                      border-[#fff] p-0 text-[#fff] tracking-[0.36px]  `}
                  onClick={onClose}
                >
                  Continue
                </Button>
              </>
            )}
          </div>
          <div
            className="w-full h-[154px] flex-center relative"
            style={{
              backgroundImage: `url(${MoonFace.src})`,
              backgroundPosition: `0 bottom`,
              backgroundSize: `100% 154px`,
              backgroundRepeat: 'repeat-x'
            }}
          >
            {type === TreasureType.OPEN ? (
              <Image src={PitM} width={293} alt="pit" />
            ) : (
              <>
                <Image src={Pit} width={293} alt="pit" />
                <Image
                  src={Flag}
                  width={80}
                  alt="flag"
                  className="absolute left-[calc(50%-80px)] top-[-35px]"
                />
              </>
            )}
            <div className="absolute left-[calc(50%+66px)] top-[-166px]">
              <Image src={Mperson} width={190} alt="Mperson" className="" />
              {type === TreasureType.SHOW ? (
                <div className="absolute right-[-35px] top-[25px] font-next-book">
                  <div className="flex-row-center gap-[8px]">
                    <Image
                      src={IconCoin}
                      width={20}
                      alt="iconCoin"
                      className=""
                    />
                    <span className="text-[16px]">{`X${treasureXp}`}</span>
                  </div>
                  <div className="flex-row-center gap-[8px] mt-[10px]">
                    <Image
                      src={IconXp}
                      width={20}
                      alt="iconCoin"
                      className=""
                    />
                    <span className="text-[16px]">{`X${treasureCoin}`}</span>
                  </div>
                </div>
              ) : (
                <Image
                  src={Qmark}
                  width={50}
                  alt="flag"
                  className="absolute right-[10px] top-[12px]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TreasureModal;
