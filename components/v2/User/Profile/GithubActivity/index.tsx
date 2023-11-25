import { FC, useContext, useEffect, useMemo, useState } from 'react';
import Box from '../components/Box';
import Add from '../components/Add';
import Chart, { OptionDataType } from './Charts';
import HoverIcon from '../components/HoverIcon';
import { IconType } from '../components/HoverIcon/type';

import { BoxType, ProfileContext } from '../type';
import Confirm from '../components/Confirm';
import { fontSizeSpec } from './data';
import webApi from '@/service';
import { message } from 'antd';
import Image from 'next/image';
import Loading from '@/public/images/other/loading.png';

interface GithubActivityProps {}

interface GithubInfoType {
  commit: number;
  fork: number;
  teachStack: OptionDataType[];
}
const GithubActivity: FC<GithubActivityProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { profile, refresh } = useContext(ProfileContext);
  const handleAdd = async () => {
    setLoading(true);
    webApi.userApi
      .getGithubConnectUrl()
      .then((res) => {
        window.open(
          res.url,
          '_blank',
          'width=500,height=500,toolbar=no,menubar=no,location=no,status=no'
        );
      })
      .catch((err) => {
        message.error(err.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [modalOpen, setModalOpen] = useState(false);

  const separationNumber = (num: number) => {
    return String(num).replace(/(?!^)(?=(\d{3})+$)/g, ',');
  };

  const handleDisConnect = () => {
    setLoading(true);
    webApi.userApi
      .unLinkGithub()
      .then(() => {
        refresh();
        setModalOpen(false);
      })
      .catch((err) => {
        message.error(err.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const n = 123456789111;
  const renderFontSize = (num: number) => {
    const len = String(num).length;
    const bNum = 5;
    let fontSize = 54;
    const index = len - bNum;
    if (index < 0) return `${fontSize}px`;
    return fontSizeSpec[index] || '22px';
  };

  const githubInfo = useMemo(() => {
    const githubActivity = profile?.githubActivity;
    if (githubActivity?.languages) {
      const l = profile.githubActivity.languages;
      const techStackArr = [];
      for (let key in l) {
        techStackArr.push({
          name: key,
          value: l[key]
        });
      }
      techStackArr.sort((a, b) => b.value - a.value);
      let techStack = [];
      if (techStackArr.length > 5) {
        techStack = techStackArr.slice(0, 5);
        const othersValue = techStackArr
          .slice(5, techStackArr.length)
          .reduce((prev, next) => {
            return prev + next.value;
          }, 0);
        techStack.push({
          name: 'Others',
          value: othersValue
        });
      } else {
        techStack = techStackArr;
      }
      return {
        commit: githubActivity.totalContributor,
        start: githubActivity.totalStar,
        techStack
      };
    } else {
      return null;
    }
  }, [profile]);

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e.key === 'linkGitHub') {
        refresh();
      }
    });
    return () => {
      window.removeEventListener('storage', (e) => {
        if (e.key === 'linkGitHub') {
          refresh();
        }
      });
    };
  }, []);
  return (
    <Box className="font-next-poster relative group h-[261.4px] flex flex-col justify-between">
      {!!githubInfo && (
        <div className="absolute right-[30px] top-[30px] hidden group-hover:block">
          <div className="flex gap-[10px]">
            <HoverIcon type={IconType.REFRESH} onClick={() => handleAdd()} />
            <HoverIcon
              type={IconType.UN_LINK}
              onClick={() => setModalOpen(true)}
            />
          </div>
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
      ) : githubInfo ? (
        <div className="flex">
          <div className="w-[55%] flex-center flex-shrink-0">
            <Chart optionData={githubInfo?.techStack as []} />
          </div>
          <div className="w-[45%] flex-shrink-0 flex">
            <div className="w-[52.99%] border-l-[0.5px] border-l-[#000] flex flex-col justify-between text-center">
              <p
                className="text-[54px] text-[#000] leading-[86px]"
                style={{
                  fontSize: renderFontSize(githubInfo.commit)
                }}
              >
                {separationNumber(githubInfo.commit)}
              </p>
              <p className="text-[#8c8c8c] tracking-[0.36px]">Commits</p>
            </div>
            <div className="w-[47.99%] border-l-[0.5px] border-l-[#000] flex flex-col justify-between text-center">
              <p
                className="text-[54px] text-[#000] leading-[86px]"
                style={{
                  fontSize: renderFontSize(githubInfo.start)
                }}
              >
                {separationNumber(githubInfo.start)}
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
        loading={loading}
        onClose={() => setModalOpen(false)}
        title="GithubActivity"
        content="Do you want to disconnect from Github?"
        handleConfirm={handleDisConnect}
      />
    </Box>
  );
};

export default GithubActivity;
