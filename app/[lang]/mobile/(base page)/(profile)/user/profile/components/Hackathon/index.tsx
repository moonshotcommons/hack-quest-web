import Button from '@/components/Common/Button';
import { FC, useContext, useEffect, useState } from 'react';
import Box from '../components/Box';
import Add from '../components/Add';
import { IconType } from '@/components/Web/Business/HoverIcon/type';
import HoverIcon from '@/components/Web/Business/HoverIcon';
import Edit from './Edit';
import { ProfileContext } from '../../constants/type';
import { UserHackathonType } from '@/service/webApi/user/type';
import { dealDate, dateInterval } from './utils';
import { deepClone } from '@/helper/utils';
import { BurialPoint } from '@/helper/burialPoint';

interface HackathonProps {
  edit?: boolean;
}
export type ListDataType = {
  showMore: boolean;
  descriptions: string[];
  descriptionLess: string[];
} & UserHackathonType;
const Hackathon: FC<HackathonProps> = ({ edit = false }) => {
  const [editOpen, setEditOpen] = useState(false);
  const { profile } = useContext(ProfileContext);
  const [listData, setListData] = useState<ListDataType[]>([]);
  const [allData, setAllData] = useState<ListDataType[]>([]);
  const [showAll, setShowAll] = useState(false);
  const handleAdd = () => {
    BurialPoint.track(
      'user-profile Hackathon Add Hackathon Experience按钮点击'
    );
    setEditOpen(true);
  };
  useEffect(() => {
    if (profile?.hackathonExperiences?.length) {
      let list = profile.hackathonExperiences?.map((v) => ({
        ...v,
        showMore: false,
        descriptions: v.description.split('\n').filter((d) => d),
        descriptionLess: v.description
          .split('\n')
          .filter((d) => d)
          .slice(0, 1)
      }));
      setAllData(list);
      setListData(showAll ? list : list.slice(0, 4));
    } else {
      setAllData([]);
      setListData([]);
    }
  }, [profile, showAll]);

  const handleShowMore = (index: number) => {
    BurialPoint.track('user-profile Hackathon Show More按钮点击');
    const newListData = deepClone(listData);
    newListData[index].showMore = !newListData[index].showMore;
    setListData(newListData);
  };

  return (
    <Box className="group relative">
      {listData?.length > 0 && edit && (
        <div className="absolute right-[30px] top-[30px] hidden group-hover:block">
          <HoverIcon
            type={IconType.EDIT}
            tooltip="Edit your hackathon experience"
            onClick={() => {
              BurialPoint.track('user-profile Hackathon Edit icon按钮点击');
              setEditOpen(true);
            }}
          />
        </div>
      )}
      <div className="text-h3">Hackathon ({allData.length})</div>
      {listData?.length ? (
        <>
          {listData.map((v, i) => (
            <div
              key={v.id}
              className="flex gap-[50px] border-b-[0.5px] border-b-neutral-black py-[20px]"
            >
              <div className="body-l w-[270px] text-neutral-medium-gray">
                <p>
                  {dealDate(v.startDate)} -{' '}
                  {v.endDate ? dealDate(v.endDate) : 'Present'} ·{' '}
                  {dateInterval(v.startDate, v.endDate)}
                </p>
                <p>{v.location}</p>
              </div>
              <div className="flex-1 text-neutral-black">
                <div className="w-full break-all">
                  <span className="body-xl-bold">{v.hackathonName}</span>
                  <span>{` · `}</span>
                  <span className="body-l">{v.role}</span>
                </div>
                <div>
                  {v.showMore ? (
                    v.descriptions.map((d, j) => (
                      <div className="flex items-start" key={j}>
                        <span className="relative top-[11px] mr-[7px] h-[5px] w-[5px] rounded-[50%] bg-neutral-black"></span>
                        <span className="flex-1 break-all leading-[26px]">
                          {d}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start">
                      <span className="relative top-[11px] mr-[7px] h-[5px] w-[5px] rounded-[50%] bg-neutral-black"></span>
                      <span className="flex-1 break-all leading-[26px]">
                        {v.descriptionLess[0]}
                      </span>
                    </div>
                  )}
                  {v.descriptions.length > 1 && (
                    <div className="flex justify-end ">
                      <div
                        onClick={() => handleShowMore(i)}
                        className="body-l cursor-pointer text-neutral-medium-gray underline"
                      >
                        Show {v.showMore ? 'Less' : 'More'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {allData.length > 4 && (
            <div className="flex justify-center pt-[20px]">
              <Button
                onClick={() => setShowAll(!showAll)}
                className="body-m h-[44px] w-[265px] bg-yellow-primary"
              >
                View {showAll ? 'Less' : 'Full'} Hackathon
              </Button>
            </div>
          )}
        </>
      ) : edit ? (
        <Add
          addText={'Share your hackathon experience with others'}
          buttonText={'Add a Hackathon Experience'}
          handleClick={handleAdd}
        />
      ) : null}
      <Edit open={editOpen} list={allData} onClose={() => setEditOpen(false)} />
    </Box>
  );
};

export default Hackathon;
