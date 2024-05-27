import { FC, useContext, useEffect, useMemo, useState } from 'react';
import Box from '../components/Box';
import Add from '../components/Add';
import Chart from './Charts';
import HoverIcon from '@/components/Web/Business/HoverIcon';
import { IconType } from '@/components/Web/Business/HoverIcon/type';

import { ProfileContext } from '../../constants/type';
import Confirm from '../components/Confirm';
import webApi from '@/service';
import message from 'antd/es/message';
import Image from 'next/image';
import Loading from '@/public/images/other/loading.png';
import { separationNumber } from '@/helper/utils';
import { BurialPoint } from '@/helper/burialPoint';

interface GithubActivityProps {
  edit?: boolean;
}

const GithubActivity: FC<GithubActivityProps> = ({ edit = false }) => {
  const [loading, setLoading] = useState(false);
  const { profile, refresh, loading: refreshLoading } = useContext(ProfileContext);
  const handleAdd = async () => {
    BurialPoint.track('user-profile GithubActivity Connect to Github按钮点击');
    setLoading(true);
    webApi.userApi
      .getGithubConnectUrl()
      .then((res) => {
        window.open(res.url, '_blank', 'width=500,height=500,toolbar=no,menubar=no,location=no,status=no');
      })
      .catch((err) => {
        message.error(err.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [modalOpen, setModalOpen] = useState(false);

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
        const othersValue = techStackArr.slice(5, techStackArr.length).reduce((prev, next) => {
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
    <Box className="group relative flex h-[261px] flex-col justify-between ">
      {!!githubInfo && edit && (
        <div className="absolute right-[30px] top-[30px] hidden group-hover:block">
          <div className="flex gap-[10px]">
            <HoverIcon
              type={IconType.REFRESH}
              onClick={() => {
                BurialPoint.track('user-profile GithubActivity refresh icon按钮点击');
                handleAdd();
              }}
            />
            <HoverIcon
              type={IconType.UN_LINK}
              onClick={() => {
                BurialPoint.track('user-profile GithubActivity unLink icon按钮点击');
                setModalOpen(true);
              }}
            />
          </div>
        </div>
      )}
      <div className="text-h3">GithubActivity</div>
      {loading || refreshLoading ? (
        <div className="flex-center relative w-full flex-1">
          <Image src={Loading} width={40} alt="loading" className="animate-spin object-contain opacity-100"></Image>
        </div>
      ) : githubInfo ? (
        <div className="flex">
          <div className="flex-center w-[55%] flex-shrink-0">
            <Chart optionData={githubInfo?.techStack as []} />
          </div>
          <div className="flex w-[45%] flex-shrink-0">
            <div className="flex w-[52.99%] flex-col justify-between border-l-[0.5px] border-l-[#000] text-center">
              <p className="text-[54px] leading-[86px] text-neutral-black">
                {separationNumber(githubInfo.commit, 9999)}
              </p>
              <p className="text-neutral-medium-gray">Commits</p>
            </div>
            <div className="flex w-[47.99%] flex-col justify-between border-l-[0.5px] border-l-[#000] text-center">
              <p className="text-[54px] leading-[86px] text-neutral-black">
                {separationNumber(githubInfo.start, 9999)}
              </p>
              <p className="text-neutral-medium-gray">Github Repo Stars</p>
            </div>
          </div>
        </div>
      ) : edit ? (
        <Add
          addText="Share your Github information with others"
          buttonText="Connect to Github"
          handleClick={handleAdd}
        />
      ) : null}

      <Confirm
        open={modalOpen}
        loading={loading}
        onClose={() => setModalOpen(false)}
        title="Github Activity"
        content="Do you want to disconnect from Github?"
        handleConfirm={handleDisConnect}
      />
    </Box>
  );
};

export default GithubActivity;
