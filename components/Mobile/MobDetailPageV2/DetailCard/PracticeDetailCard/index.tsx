import Image from 'next/image';
import { FC } from 'react';
import Cover from '../image 405.png';
import IconTextTag from '@/components/Web/DetailPageV2/CourseTag/IconTextTag';
import { IconTextTagType } from '@/components/Web/DetailPageV2/CourseTag/IconTextTag/constant';
import { CourseDetailType } from '@/service/webApi/course/type';
import PracticeStatusButton from '../../StatusButton/PracticeStatusButton';
interface PracticeDetailCardProps {
  courseDetail: CourseDetailType;
}

const PracticeDetailCard: FC<PracticeDetailCardProps> = ({ courseDetail }) => {
  return (
    <div className="sticky left-full top-5 w-[380px] rounded-[16px] border border-neutral-light-gray bg-neutral-white">
      <div className="relative h-[212px] w-full overflow-hidden rounded-t-[16px]">
        <Image src={Cover} alt={courseDetail.title} fill></Image>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <p className="body-xl-bold">{courseDetail.title}</p>
        <div className="flex flex-col gap-4">
          <IconTextTag type={IconTextTagType.LESSONS_COUNT} text={`${courseDetail.totalPages} lessons`}></IconTextTag>
          <IconTextTag type={IconTextTagType.DEVICE_ACCESS}></IconTextTag>
          {courseDetail.certificationId && <IconTextTag type={IconTextTagType.CERTIFICATION}></IconTextTag>}
        </div>
        <PracticeStatusButton courseDetail={courseDetail} />
      </div>
    </div>
  );
};

export default PracticeDetailCard;
