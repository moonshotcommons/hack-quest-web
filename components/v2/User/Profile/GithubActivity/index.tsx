import { FC, useContext, useEffect, useState } from 'react';
import Box from '../components/Box';
import Add from '../components/Add';
import Chart from './Charts';
import HoverIcon from '../components/HoverIcon';
import { IconValue } from '../components/HoverIcon/type';

import { BoxType, ProfileContext } from '../type';
import Confirm from '../components/Confirm';
import { fontSizeSpec } from './data';
import webApi from '@/service';
import { GithubActivityType } from '@/service/webApi/user/type';
import { message } from 'antd';
import Image from 'next/image';
import Loading from '@/public/images/other/loading.png';

interface GithubActivityProps {}

const GithubActivity: FC<GithubActivityProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [githubInfo, setGithubInfo] = useState<GithubActivityType | null>(null);
  const { profile, refresh } = useContext(ProfileContext);
  const handleAdd = () => {
    setLoading(true);
    webApi.userApi
      .linkGithub()
      .then((res) => {
        refresh();
      })
      .catch((err) => {
        message.error(err.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = (value: IconValue) => {
    switch (value) {
      case IconValue.REFRESH:
        handleAdd();
        break;
      case IconValue.UN_LINK:
        setModalOpen(true);
        break;
    }
  };
  const separationNumber = (num: number) => {
    return String(num).replace(/(?!^)(?=(\d{3})+$)/g, ',');
  };

  const handleDisConnect = () => {};

  const n = 123456789111;
  const renderFontSize = (num: number) => {
    const len = String(num).length;
    const bNum = 5;
    let fontSize = 54;
    const index = len - bNum;
    if (index < 0) return `${fontSize}px`;
    return fontSizeSpec[index] || '22px';
  };

  useEffect(() => {
    setGithubInfo(profile.githubActivity);
  }, [profile]);
  return (
    <Box className="font-next-poster relative group h-[260px] flex flex-col justify-between">
      {githubInfo?.telegram && (
        <div className="absolute right-[30px] top-[30px] hidden group-hover:block">
          <HoverIcon
            boxType={BoxType.GITHUB_ACTIVITY}
            handleClick={handleClick}
          />
        </div>
      )}
      <div className="text-[28px] font-next-book-bold tracking-[1.68px]">
        GithubActivity
      </div>
      {loading ? (
        <div className="relative flex-1 w-full flex-center">
          <Image
            src={Loading}
            width={40}
            alt="loading"
            className="object-contain animate-spin opacity-100"
          ></Image>
        </div>
      ) : githubInfo?.telegram ? (
        <div className="flex">
          <div className="w-[55%] flex-center flex-shrink-0">
            <Chart />
          </div>
          <div className="w-[45%] flex-shrink-0 flex">
            <div className="w-[52.99%] border-l-[0.5px] border-l-[#000] flex flex-col justify-between text-center">
              <p
                className="text-[54px] text-[#000] leading-[86px]"
                style={{
                  fontSize: renderFontSize(n)
                }}
              >
                {separationNumber(n)}
              </p>
              <p className="text-[#8c8c8c] tracking-[0.36px]">Commits</p>
            </div>
            <div className="w-[47.99%] border-l-[0.5px] border-l-[#000] flex flex-col justify-between text-center">
              <p
                className="text-[54px] text-[#000] leading-[86px]"
                style={{
                  fontSize: renderFontSize(n)
                }}
              >
                {separationNumber(n)}
              </p>
              <p className="text-[#8c8c8c] tracking-[0.36px]">
                Github Repo Stars
              </p>
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
        handleConfirm={handleDisConnect}
      />
    </Box>
  );
};

export default GithubActivity;
