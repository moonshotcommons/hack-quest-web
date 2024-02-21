import { FC } from 'react';
import IconTextTag from '../CourseTag/IconTextTag';
import { IconTextTagType } from '../CourseTag/IconTextTag/constant';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';

interface CourseStructureProps {
  detail: LearningTrackDetailType;
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
          type={IconTextTagType.COURSES_COUNT}
          text={`${detail.courseCount} courses`}
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
