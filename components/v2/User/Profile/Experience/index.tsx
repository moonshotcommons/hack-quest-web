import Button from '@/components/v2/Common/Button';
import { FC, useState } from 'react';
import Box from '../components/Box';
import Add from '../components/Add';
import { BoxType, IconValue } from '../components/HoverIcon/type';
import HoverIcon from '../components/HoverIcon';
import Edit from './Edit';

interface ExperienceProps {}

const Experience: FC<ExperienceProps> = (props) => {
  const handleAdd = () => {};
  const [editOpen, setEditOpen] = useState(false);
  const handleClick = (value: IconValue) => {
    switch (value) {
      case 'edit':
        setEditOpen(true);
        break;
    }
  };
  return (
    <Box className="font-next-poster relative group">
      <div className="absolute right-[30px] top-[30px] hidden group-hover:block">
        <HoverIcon
          boxType={BoxType.EXPERIENCE}
          handleClick={handleClick}
          editTip="Edit your experience"
        />
      </div>
      <div className="text-[28px] font-next-book-bold tracking-[1.68px]">
        Experience (6)
      </div>
      {false ? (
        <>
          {Array.from({ length: 5 }).map((_, i: number) => (
            <div
              key={i}
              className="border-b-[0.5px] border-b-[#000] py-[20px] flex gap-[50px]"
            >
              <div className="w-[240px] font-next-book text-[18px] text-[#8C8C8C]">
                Jul 2022 - Present · 1 yr 5 mos California, United States
              </div>
              <div className="flex-1 text-[#000]">
                <div className="w-full break-all">
                  <span className="text-[21px] font-next-poster-Bold">
                    Software Development Engineer
                  </span>
                  <span>{` · `}</span>
                  <span className="font-next-book text-[18px] ">
                    Amazon · Full-time
                  </span>
                </div>
                <div>
                  <div className="flex items-start">
                    <span className="w-[5px] h-[5px] rounded-[50%] bg-[#000] relative top-[11px] mr-[7px]"></span>
                    <span className="break-all flex-1 leading-[26px]">
                      Designed a commuter-based idea for delivering packages on
                      top of current delivery system(Amazon Flex).Designed a
                      commuter-based
                    </span>
                  </div>
                  <div className="flex justify-end font-next-book tracking-[0.1px]  ">
                    <div className="underline text-[18px] text-[#8c8c8c] cursor-pointer">
                      Show More
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center pt-[20px]">
            <Button className="w-[265px] h-[44px] bg-[#ffd850] font-next-book text-[16px]">
              View Full Experience
            </Button>
          </div>
        </>
      ) : (
        <Add
          addText="Share your work experience with others"
          buttonText="Add Experience"
          handleClick={handleAdd}
        />
      )}
      <Edit open={editOpen} onClose={() => setEditOpen(false)} />
    </Box>
  );
};

export default Experience;
