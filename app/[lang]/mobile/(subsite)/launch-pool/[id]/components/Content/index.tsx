'use client';
import React, { useContext, useEffect, useRef } from 'react';
import OverView from './OverView';
import TimeLine from './TimeLine';
import YourFuelingBoard from './YourFuelingBoard';
import About from './About';
import DemoVideo from './DemoVideo';
import KeyMetrics from './KeyMetrics';
import Tractions from './Tractions';
import Loading from '@/components/Common/Loading';
import { titleTxtData } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/data';
import { useWriteAirdropClaim } from '@/lib/generated';
import { parseUnits } from 'viem';
import { errorMessage } from '@/helper/ui';
import { useAccount } from 'wagmi';
import { LaunchDetailContext } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/type';

export interface OffsetTopsType {
  title: string;
  offsetTop: number;
}
interface ContentProp {
  loading: boolean;
  setOffsetTop: (tops: OffsetTopsType[]) => void;
}

const Content: React.FC<ContentProp> = ({ loading, setOffsetTop }) => {
  const { setLoading } = useContext(LaunchDetailContext);
  const overViewRef = useRef<HTMLDivElement>(null);
  const timeLineRef = useRef<HTMLDivElement>(null);
  const yourFuelingBoardRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const demoVideoRef = useRef<HTMLDivElement>(null);
  const keyMetricsRef = useRef<HTMLDivElement>(null);
  const tractionsRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const account = useAccount();
  const { writeContractAsync: writeContractAsyncClaim } = useWriteAirdropClaim();
  const claimToken = async () => {
    setLoading(true);
    try {
      await writeContractAsyncClaim({
        account: account.address,
        address: '0x6Eb462Aa74AbDc99Fd025bD32800500c37B0040a',
        args: [
          '0x7184c70bdC9eaD810C795d5df0Bf4aC987988927',
          ['0x7dd532323d5d20b862da3f3fdab74408430bb345a3d37317e354a89c7c5dc653'],
          parseUnits('0.0001', 18)
        ]
      });
    } catch (error) {
      console.info(error);
      errorMessage(error);
    }
    setLoading(false);
  };
  const getOffsetTops = () => {
    const offsetTops = [];
    const childNodes = boxRef.current?.childNodes || [];
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0;
      offsetTops.push({
        title: `launch-${titleTxtData[i]}`,
        offsetTop: offsetTop
      });
    }
    setOffsetTop(offsetTops);
  };
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        getOffsetTops();
      }, 3000);
    }
  }, [loading]);
  return (
    <div className="pb-[2rem]">
      <Loading loading={loading} className="w-full">
        <div ref={boxRef} className="[&>div]:relative">
          <div ref={overViewRef}>
            <OverView claimToken={claimToken} />
          </div>
          <div ref={timeLineRef} className="mt-[4rem]">
            <TimeLine />
          </div>
          <div ref={yourFuelingBoardRef} className="mt-[4rem]">
            <YourFuelingBoard claimToken={claimToken} />
          </div>
          <div ref={aboutRef} className="mt-[4rem]">
            <About />
          </div>
          <div ref={demoVideoRef} className="mt-[4rem]">
            <DemoVideo />
          </div>
          <div ref={keyMetricsRef} className="mt-[4rem]">
            <KeyMetrics />
          </div>
          <div ref={tractionsRef} className="mt-[4rem]">
            <Tractions />
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default Content;
