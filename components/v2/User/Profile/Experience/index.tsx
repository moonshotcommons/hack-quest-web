import Button from '@/components/v2/Common/Button';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import Box from '../components/Box';
import Add from '../components/Add';
import { IconType } from '@/components/v2/Business/HoverIcon/type';
import HoverIcon from '@/components/v2/Business/HoverIcon';
import Edit from './Edit';
import { BoxType, ProfileContext } from '../type';
import { UserExperienceType } from '@/service/webApi/user/type';
import { dealDate, dateInterval } from './utils';
import { deepClone } from '@/helper/utils';

interface ExperienceProps {}
export type ListDataType = {
  showMore: boolean;
  descriptions: string[];
  descriptionLess: string[];
} & UserExperienceType;
const Experience: FC<ExperienceProps> = ({}) => {
  const [editOpen, setEditOpen] = useState(false);
  const { profile } = useContext(ProfileContext);
  const [listData, setListData] = useState<ListDataType[]>([]);
  const [allData, setAllData] = useState<ListDataType[]>([]);
  const [showAll, setShowAll] = useState(false);
  const handleAdd = () => {
    setEditOpen(true);
  };

  useEffect(() => {
    if (profile?.workExperiences?.length) {
      let list = profile.workExperiences?.map((v) => ({
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
    const newListData = deepClone(listData);
    newListData[index].showMore = !newListData[index].showMore;
    setListData(newListData);
  };

  return (
    <Box className="font-next-poster relative group">
      {listData?.length > 0 && (
        <div className="absolute right-[30px] top-[30px] hidden group-hover:block">
          <HoverIcon
            type={IconType.EDIT}
            tooltip="Edit your experience"
            onClick={() => setEditOpen(true)}
          />
        </div>
      )}
      <div className="text-[28px] font-next-book-bold tracking-[1.68px]">
        Experience ({allData.length})
      </div>
      {listData?.length ? (
        <>
          {listData.map((v, i) => (
            <div
              key={v.id}
              className="border-b-[0.5px] border-b-[#000] py-[20px] flex gap-[50px]"
            >
              <div className="w-[270px] font-next-book text-[17px] text-[#8C8C8C]">
                <p>
                  {dealDate(v.startDate)} -{' '}
                  {v.endDate ? dealDate(v.endDate) : 'Present'} ·{' '}
                  {dateInterval(v.startDate, v.endDate)}
                </p>
                <p>{v.location}</p>
              </div>
              <div className="flex-1 text-[#000]">
                <div className="w-full break-all">
                  <span className="text-[21px] font-next-poster-Bold">
                    {v.title}
                  </span>
                  <span>{` · `}</span>
                  <span className="font-next-book text-[18px] ">
                    {v.companyName} · {v.employmentType}
                  </span>
                </div>
                <div>
                  {v.showMore ? (
                    v.descriptions.map((d, j) => (
                      <div className="flex items-start" key={j}>
                        <span className="w-[5px] h-[5px] rounded-[50%] bg-[#000] relative top-[11px] mr-[7px]"></span>
                        <span className="break-all flex-1 leading-[26px]">
                          {d}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start">
                      <span className="w-[5px] h-[5px] rounded-[50%] bg-[#000] relative top-[11px] mr-[7px]"></span>
                      <span className="break-all flex-1 leading-[26px]">
                        {v.descriptionLess[0]}
                      </span>
                    </div>
                  )}
                  {v.descriptions.length > 1 && (
                    <div className="flex justify-end font-next-book tracking-[0.1px]  ">
                      <div
                        onClick={() => handleShowMore(i)}
                        className="underline text-[18px] text-[#8c8c8c] cursor-pointer"
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
                className="w-[265px] h-[44px] bg-[#ffd850] font-next-book text-[16px]"
              >
                View {showAll ? 'Less' : 'Full'} Experience
              </Button>
            </div>
          )}
        </>
      ) : (
        <Add
          addText={'Share your work experience with others'}
          buttonText={'Add Experience'}
          handleClick={handleAdd}
        />
      )}
      <Edit open={editOpen} list={allData} onClose={() => setEditOpen(false)} />
    </Box>
  );
};

export default Experience;
