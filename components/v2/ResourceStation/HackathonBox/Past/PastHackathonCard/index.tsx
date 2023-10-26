import { FC, ReactNode } from 'react';

interface PastHackathonCardProps {}

const PastHackathonCard: FC<PastHackathonCardProps> = (props) => {
  return (
    <div className="rounded-[10px] w-full h-fit flex gap-y-[22px] flex-col bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer">
      <div className="h-[194px] w-full bg-[#D9D9D9] rounded-t-[10px]"></div>
      <div className="pb-[30px] flex flex-col px-[22px]">
        <h2 className="font-next-book-bold text-[#0b0b0b] text-[18px] leading-[125%]">
          2023 Web 3 Hackathon Forum London + Day Party
        </h2>
        <div className="mt-[15px] flex w-full h-fit gap-[15px]">
          <div className="w-[5px] rounded-full bg-[#FFD850]"></div>
          <div className="flex flex-col gap-[15px]">
            <div className="w-full font-next-book leading-[125%]">
              <p className="text-[12px] tracking-[0.24px] text-[#8C8C8C]">
                RUNS FROM
              </p>
              <p className="mt-[5px] text-[14px] text-[#0b0b0b] tracking-[0.28px]">{`Dec 8 - 10, 2023`}</p>
            </div>
            <div className="w-full font-next-book leading-[125%]">
              <p className="text-[12px] leading-[125%] tracking-[0.24px] text-[#8C8C8C]">
                HAPPENING
              </p>
              <p className="mt-[5px] text-[14px] text-[#0b0b0b] tracking-[0.28px]">
                Broadleaf, 25, Old Broad Street, EC2N 1HN, City of London
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastHackathonCard;
