import { Lang } from '@/i18n/config';
import { FC } from 'react';
import { data } from './constant';
import Button from '@/components/Common/Button';

interface OurSupportForProjectsProps {
  lang: Lang;
}

const OurSupportForProjects: FC<OurSupportForProjectsProps> = ({ lang }) => {
  return (
    <div className="container relative mx-auto mt-5 flex w-full flex-col items-center py-20">
      <h2 className="text-h2 mb-6 text-center text-neutral-black">
        Our Support For Projects
      </h2>
      <p className="body-m mx-auto w-[960px] max-w-[960px] text-center">
        Many talented founders capable of delivering high-quality products often
        lack the experience needed to build a crypto community. We address this
        critical need by offering our support, and allowing them solely focusing
        on delivering good products.
      </p>
      <div className="flex flex-wrap justify-center gap-6 py-10">
        {data.map((item) => {
          return (
            <div
              key={item}
              className="body-m-bold rounded-[24px] bg-neutral-white p-6 tracking-tight  text-neutral-black"
            >
              {item}
            </div>
          );
        })}
      </div>
      <Button ghost className="px-6 py-4 uppercase">
        Submit an IDO Project
      </Button>
    </div>
  );
};

export default OurSupportForProjects;
