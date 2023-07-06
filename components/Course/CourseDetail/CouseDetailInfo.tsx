import UserIcon from '@/components/Common/Icon/User';
import PeopleJoined from '@/components/Common/PeopleJoined';
import { computeTime, tagFormate } from '@/helper/formate';
import { getRandomAvatars } from '@/helper/random';
import { CourseDetailType, CourseResponse } from '@/service/webApi/course/type';
import { FC, ReactNode, useMemo } from 'react';

interface CourseDetailInfoProps {
  courseDetail?: CourseDetailType;
}

const CourseDetailInfo: FC<CourseDetailInfoProps> = (props) => {
  const { courseDetail } = props;
  const level = useMemo(() => {
    return tagFormate(
      (Array.isArray(courseDetail?.level)
        ? courseDetail?.level[0]
        : courseDetail?.level) || ''
    );
  }, [courseDetail]);
  return (
    <>
      <div className="w-full relative h-[8rem] flex items-center justify-between top-line bottom-line">
        {/* 课程等级 */}
        <div className="flex items-center gap-5">
          <span
            className={`w-12 h-12 border flex justify-center items-center border-solid border-[#676767] rounded-full`}
          >
            <UserIcon size={18}></UserIcon>
          </span>
          <span className="text-[#F2F2F2] font-next-book">
            {tagFormate(level)}
          </span>
        </div>

        {/* 课程预计时间 */}
        <div className="flex items-center gap-5">
          <span
            className={`w-12 h-12 border flex justify-center items-center border-solid border-[#676767] font-next-book text-white rounded-full`}
          >
            {computeTime(courseDetail?.duration || 0, 'Hour', false)} h
          </span>
          <span className="text-[#F2F2F2] font-next-book">
            <span className="text-[#676767]">Estimate </span>
            <span>Learning Time</span>
          </span>
        </div>

        {/* 观看人数 */}
        <div className="flex h-full items-center gap-3">
          <PeopleJoined avatars={getRandomAvatars(4)}></PeopleJoined>
          <div className="text-[#F2F2F2] font-next-book">
            <span className="">{courseDetail?.peopleJoined} </span>
            <span className="text-[#676767] ml-1">People joined</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailInfo;
