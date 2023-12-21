import UserIcon from '@/components/v2/Common/Icon/User';
import PeopleJoined from '@/components/v2/Common/PeopleJoined';
import { computeTime, tagFormate } from '@/helper/formate';
import { getRandomAvatars } from '@/helper/random';
import { CourseDetailType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { FC, useMemo } from 'react';

interface CourseDetailInfoProps {
  courseDetail?: CourseDetailType | LearningTrackDetailType;
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
            className={`w-12 h-12 border flex justify-center items-center border-solid border-course-detail-type-text-color rounded-full text-text-default-color`}
          >
            <UserIcon size={18} color="currentColor"></UserIcon>
          </span>
          <span className="text-text-default-color font-next-book">
            {tagFormate(level)} Level
          </span>
        </div>

        {/* 课程预计时间 */}
        <div className="flex items-center gap-5">
          <span
            className={`w-12 h-12 border flex justify-center items-center border-solid border-course-detail-type-text-color font-next-book text-text-default-color rounded-full`}
          >
            {computeTime(courseDetail?.duration || 0, 'Hour', false)} h
          </span>
          <span className="text-text-default-color font-next-book">
            <span className="text-course-detail-type-text-color">
              Estimate{' '}
            </span>
            <span>Learning Time</span>
          </span>
        </div>

        {/* 观看人数 */}
        <div className="flex h-full items-center gap-3">
          <PeopleJoined avatars={getRandomAvatars(4)}></PeopleJoined>
          <div className="text-text-default-color font-next-book">
            <span className="">{courseDetail?.peopleJoined ?? 4} </span>
            <span className="text-course-detail-type-text-color ml-1">
              People joined
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailInfo;
