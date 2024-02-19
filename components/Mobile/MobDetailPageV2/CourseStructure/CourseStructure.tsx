import { FC } from 'react';
import IconTextTag from '../CourseTag/IconTextTag';
import { IconTextTagType } from '../CourseTag/IconTextTag/constant';
import { ElectiveCourseDetailType } from '@/service/webApi/elective/type';
import { CourseDetailType } from '@/service/webApi/course/type';

interface CourseStructureProps {
  detail: ElectiveCourseDetailType | CourseDetailType;
}

const CourseStructure: FC<CourseStructureProps> = ({ detail }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-fit items-center gap-2">
        <div className="h-[22px] w-[5px] rounded-full bg-yellow-dark"></div>
        <h2 className="text-h2-mob text-neutral-black">{`Course Structure`}</h2>
      </div>

      <div className="flex flex-col gap-4">
        <IconTextTag
          type={IconTextTagType.LESSONS_COUNT}
          text={`${detail.totalPages} lessons`}
        ></IconTextTag>
        <IconTextTag
          type={IconTextTagType.VIDEO_COUNT}
          text={`7.5 hours video`}
        ></IconTextTag>
        <IconTextTag type={IconTextTagType.DEVICE_ACCESS}></IconTextTag>
        {detail.certificationId && (
          <IconTextTag type={IconTextTagType.CERTIFICATION}></IconTextTag>
        )}
      </div>
    </div>
  );
};

export default CourseStructure;
