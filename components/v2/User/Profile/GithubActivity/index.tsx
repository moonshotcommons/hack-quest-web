import { FC, useState } from 'react';
import Box from '../components/Box';
import Add from '../components/Add';
import Chart from './Charts';
import HoverIcon from '../components/HoverIcon';
import { BoxType, IconValue } from '../components/HoverIcon/type';
import Modal from '@/components/v2/Common/Modal';
import Button from '@/components/v2/Common/Button';
import { FiX } from 'react-icons/fi';

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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        showCloseIcon={true}
        icon={<FiX size={26} />}
      >
        <div className="w-[800px] h-[400px] bg-[#fff] rounded-[10px] p-[30px] flex flex-col">
          <div className="text-[28px] font-next-book-bold tracking-[1.68px]">
            GithubActivity
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-[35px]">
            <p className="text-[#000] text-[18px]">
              Do you want to disconnect from Github?
            </p>
            <div className="flex justify-center gap-[15px]">
              <Button
                onClick={() => setModalOpen(false)}
                className="w-[265px] h-[44px] border border-[#0b0b0b]  text-[#0b0b0b] text-[16px]"
              >
                Cancel
              </Button>
              <Button className="w-[265px] h-[44px] bg-[#ffd850]    text-[16px]">
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </Box>
  );
};

export default GithubActivity;
