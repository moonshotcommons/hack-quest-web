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
import webApi from '@/service';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { FiX } from 'react-icons/fi';

export enum TreasureType {
  DIG = 'dig',
  NOT_DIG = 'not dig'
}
interface TreasureModalProp {}

export interface TreasureModalRef {
  open: (
    treasureId: string,
    isDig?: boolean,
    digCallback?: VoidFunction
  ) => void;
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
    const { updateMissionDataAll } = useGetMissionData();

    const openTreasures = async (
      treasureId: string,
      digCallback?: VoidFunction
    ) => {
      setType(TreasureType.DIG);
      const res = await webApi.missionCenterApi.openTreasures(treasureId);
      setTreasureContent({
        treasureCoin: res.coin,
        treasureXp: res.exp
      });
      updateMissionDataAll();
      digCallback?.();
      return res;
    };

    const resetModal = () => {
      setOpen(false);

      setTimeout(() => {
        setTreasureId('');
        setTreasureContent({
          treasureCoin: 0,
          treasureXp: 0
        });
        setType(TreasureType.NOT_DIG);
      }, 300);
    };

    useImperativeHandle(ref, () => {
      return {
        open(treasureId: string, isDig = false, digCallback) {
          setTreasureId(treasureId);
          setOpen(true);
          if (isDig) {
            openTreasures(treasureId, digCallback);
          }
        }
      };
    });

    return (
      <Modal
        open={open}
        onClose={() => resetModal()}
        showCloseIcon={true}
        icon={<FiX size={26} color={'#fff'} />}
        className="min-w-[75vw]"
      >
        <div className="flex-center h-[750px] w-full">
          <div
            className="flex h-[700px] w-[99%] flex-col  overflow-hidden rounded-[10px] text-neutral-white"
            style={{
              boxShadow: `0 0 10px #3e3e3e`
            }}
          >
            <div
              className="flex-col-center w-full flex-1 justify-center pb-[20px]"
              style={{
                background: `url(${BannerBg.src}) center  / 100% auto`
              }}
            >
              {type === TreasureType.NOT_DIG && (
                <>
                  <p className="body-xl-bold mb-[43px] tracking-[0.48px]">
                    You found something hidden on your HackQuest Journey!
                  </p>
                  <Button
                    onClick={() => {
                      openTreasures(treasureId);
                    }}
                    className={`body-l mb-[25px]  h-[55px] w-[400px]
                      border-auth-primary-button-border-color bg-auth-primary-button-bg p-0
                      text-neutral-black
                      hover:border-auth-primary-button-border-hover-color  hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color `}
                  >
                    Dig Treasures
                  </Button>
                  <Button
                    className={`body-l h-[55px]  w-[400px] border
                      border-neutral-white p-0 text-neutral-white text-neutral-white `}
                    onClick={() => resetModal()}
                  >
                    Check Later
                  </Button>
                </>
              )}
              {type === TreasureType.DIG && (
                <>
                  <p className="body-xl-bold  tracking-[0.48px]">
                    The treasures you’ve got are
                  </p>
                  <div className="my-[30px] flex justify-center gap-[30px]">
                    <div>
                      <Image src={IconCoin} width={60} alt="iconCredits" />
                      <p className="flex-center mt-[10px] h-[30px] w-[60px] rounded-[20px] bg-neutral-rich-gray">
                        {treasureContent.treasureCoin}
                      </p>
                    </div>
                    <div>
                      <Image src={IconXp} width={60} alt="iconXp" />
                      <p className="flex-center mt-[10px] h-[30px] w-[60px] rounded-[20px] bg-neutral-rich-gray">
                        {treasureContent.treasureXp}
                      </p>
                    </div>
                  </div>
                  <Button
                    className={`body-l h-[55px]  w-[400px] border
                      border-neutral-white p-0 text-neutral-white  `}
                    onClick={() => resetModal()}
                  >
                    Continue
                  </Button>
                </>
              )}
            </div>
            <div
              className="flex-center relative h-[154px] w-full"
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
                  <div className="absolute right-[-35px] top-[25px]">
                    <div className="flex-row-center gap-[8px]">
                      <Image
                        src={IconCoin}
                        width={20}
                        alt="iconCredits"
                        className=""
                      />
                      <span className="body-m">{`X${treasureContent.treasureCoin}`}</span>
                    </div>
                    <div className="flex-row-center mt-[10px] gap-[8px]">
                      <Image
                        src={IconXp}
                        width={20}
                        alt="iconXp"
                        className=""
                      />
                      <span className="body-m">{`X${treasureContent.treasureXp}`}</span>
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
