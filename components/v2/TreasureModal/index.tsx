import React, { forwardRef, useImperativeHandle, useState } from 'react';
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
  DIG = 'dig',
  NOT_DIG = 'not dig'
}
interface TreasureModalProp {}

export interface TreasureModalRef {
  open: (treasureId: string) => void;
}

const TreasureModal = forwardRef<TreasureModalRef, TreasureModalProp>(
  (props, ref) => {
    const [treasureContent, setTreasureContent] = useState({
      treasureXp: 0,
      treasureCoin: 0
    });
    const [open, setOpen] = useState(false);
    const [treasureId, setTreasureId] = useState('');
    const [type, setType] = useState<TreasureType>(TreasureType.NOT_DIG);

    useImperativeHandle(ref, () => {
      return {
        open(treasureId: string) {
          setTreasureId(treasureId);
          setOpen(true);
        }
      };
    });

    return (
      <Modal open={open} onClose={() => setOpen(false)} showCloseIcon={true}>
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
              {type === TreasureType.NOT_DIG && (
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
                    onClick={() => setOpen(false)}
                  >
                    Check Later
                  </Button>
                </>
              )}
              {type === TreasureType.DIG && (
                <>
                  <p className="text-[24px] font-next-book-bold  tracking-[0.48px]">
                    The treasures you’ve got are
                  </p>
                  <div className="flex justify-center gap-[30px] my-[30px]">
                    <div>
                      <Image src={IconCoin} width={60} alt="iconCoin" />
                      <p className="w-[60px] h-[30px] rounded-[20px] bg-[#3E3E3E] flex-center mt-[10px]">
                        {treasureContent.treasureCoin}
                      </p>
                    </div>
                    <div>
                      <Image src={IconXp} width={60} alt="iconXp" />
                      <p className="w-[60px] h-[30px] rounded-[20px] bg-[#3E3E3E] flex-center mt-[10px]">
                        {treasureContent.treasureXp}
                      </p>
                    </div>
                  </div>
                  <Button
                    className={`w-[400px] text-[18px]  h-[55px] border
                      border-[#fff] p-0 text-[#fff] tracking-[0.36px]  `}
                    onClick={() => setOpen(false)}
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
              {type === TreasureType.NOT_DIG && (
                <Image src={PitM} width={293} alt="pit" />
              )}
              {type === TreasureType.DIG && (
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
                {type === TreasureType.DIG && (
                  <div className="absolute right-[-35px] top-[25px] font-next-book">
                    <div className="flex-row-center gap-[8px]">
                      <Image
                        src={IconCoin}
                        width={20}
                        alt="iconCoin"
                        className=""
                      />
                      <span className="text-[16px]">{`X${treasureContent.treasureXp}`}</span>
                    </div>
                    <div className="flex-row-center gap-[8px] mt-[10px]">
                      <Image
                        src={IconXp}
                        width={20}
                        alt="iconCoin"
                        className=""
                      />
                      <span className="text-[16px]">{`X${treasureContent.treasureCoin}`}</span>
                    </div>
                  </div>
                )}
                {type === TreasureType.NOT_DIG && (
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
  }
);

TreasureModal.displayName = 'TreasureModal';

export default TreasureModal;
