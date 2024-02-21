import Image from 'next/image';
import { FC } from 'react';
import { CourseDetailType } from '@/service/webApi/course/type';
import PracticeStatusButton from '../../StatusButton/PracticeStatusButton';
import { getCoverImageByTrack } from '@/helper/utils';
import TagsAndProgress from './TagsAndProgress';
interface PracticeDetailCardProps {
  courseDetail: CourseDetailType;
}

const PracticeDetailCard: FC<PracticeDetailCardProps> = ({ courseDetail }) => {
  return (
    <div className="sticky left-full top-5 w-[380px] rounded-[16px] border border-neutral-light-gray bg-neutral-white">
      <div className="relative h-[212px] w-full overflow-hidden rounded-t-[16px]">
        {courseDetail.image && (
          <Image src={courseDetail.image} alt={courseDetail.title} fill></Image>
        )}
        {!courseDetail.image && getCoverImageByTrack(courseDetail.track)}
      </div>
      <div className="flex flex-col gap-6 p-6">
        <p className="body-xl-bold">{courseDetail.title}</p>
        <div className="flex flex-col gap-4">
          <TagsAndProgress courseDetail={courseDetail} />
        </div>
        <PracticeStatusButton courseDetail={courseDetail} />
      </div>
    </div>
  );
};

export default PracticeDetailCard;
