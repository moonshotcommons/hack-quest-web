import { FC, useState } from 'react';
import Box from '../components/Box';
import Add from '../components/Add';
import Chart from './Charts';
import HoverIcon from '../components/HoverIcon';
import { IconValue } from '../components/HoverIcon/type';

import { BoxType } from '../type';
import Confirm from '../components/Confirm';

interface GithubActivityProps {}

const GithubActivity: FC<GithubActivityProps> = (props) => {
  const handleAdd = () => {};
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = (value: IconValue) => {
    console.info(value);
  };
  const separationNumber = (num: number) => {
    return String(num).replace(/(?!^)(?=(\d{3})+$)/g, ',');
  };
  const handleConfirm = () => {};
  return (
    <Box className="font-next-poster relative group">
      <div className="absolute right-[30px] top-[30px] hidden group-hover:block">
        <HoverIcon
          boxType={BoxType.GITHUB_ACTIVITY}
          handleClick={handleClick}
        />
      </div>
      <div className="text-[28px] font-next-book-bold tracking-[1.68px]">
        GithubActivity (6)
      </div>
      {false ? (
        <div className="flex">
          <Chart />
          <div className="flex-1 flex pl-[60px]">
            <div className="w-[49.99%] border-l-[0.5px] border-l-[#000] flex flex-col justify-between text-center">
              <p className="text-[54px] text-[#000] leading-[86px]">
                {separationNumber(123456)}
              </p>
              <p className="text-[#8c8c8c] tracking-[0.36px]">Commits</p>
            </div>
            <div className="w-[49.99%] border-l-[0.5px] border-l-[#000] flex flex-col justify-between text-center">
              <p className="text-[54px] text-[#000] leading-[86px]">3,936</p>
              <p className="text-[#8c8c8c] tracking-[0.36px]">Commits</p>
            </div>
          </div>
        </div>
      ) : (
        <Add
          addText="Share your Github information with others"
          buttonText="Connect to Github"
          handleClick={handleAdd}
        />
      )}

      <Confirm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="GithubActivity"
        content="Do you want to disconnect from Github?"
        handleConfirm={handleConfirm}
      />
    </Box>
  );
};

export default GithubActivity;
