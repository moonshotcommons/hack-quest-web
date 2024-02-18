import Button from '@/components/Common/Button';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ApplyAdvocateProps {}

const ApplyAdvocate: FC<ApplyAdvocateProps> = (props) => {
  return (
    <div className="mt-[100px] flex w-full flex-col items-center gap-[60px] bg-neutral-white p-20">
      <h2 className="text-h2 text-neutral-off-black">
        Apply to become an advocate now 🙌
      </h2>
      <div className="relative h-[420px] w-[900px]">
        <Image src={'/images/advocate/map.webp'} fill alt="hackquest"></Image>
      </div>
      <Link
        href={'https://xsxo494365r.typeform.com/to/X1n7gsPH'}
        target="_blank"
      >
        <Button className="w-[165px] py-4 uppercase" type="primary">
          apply NOW
        </Button>
      </Link>
    </div>
  );
};

export default ApplyAdvocate;
