'use client';
import { FC } from 'react';
import LEARNING_TRACK_DARK from '@/public/images/mantle/learning-image.svg';
import CourseTags from '@/components/Mantle/CourseTags';
import Image from 'next/image';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import { useUserStore } from '@/store/zustand/userStore';
import { useRouter } from 'next/navigation';
interface LearningTrackCardProps {
  learningTrack: LearningTrackDetailType;
}

const LearningTrackCard: FC<LearningTrackCardProps> = ({ learningTrack }) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center rounded-[.9375rem] border border-[#202020] bg-black px-[12.25rem] py-10">
      <Image
        src={LEARNING_TRACK_DARK}
        width={74}
        height={137}
        alt="mantle learning track"
      ></Image>
      <div className="flex flex-col gap-2">
        <p className="text-[1.125rem] leading-[160%] text-white opacity-60">
          Learning Track
        </p>
        <p className="text-[2rem] font-medium leading-[110%] -tracking-[.12rem] text-white">
          {learningTrack.name}
        </p>
        <CourseTags
          type="learning-track"
          level={learningTrack.level as string}
          duration={learningTrack.duration}
          unitCount={learningTrack.courseCount}
        ></CourseTags>
      </div>
      <p
        className="mt-[1.375rem] text-[1rem] leading-[160%] text-[#C4C4C4]"
        onClick={() => {}}
      >
        {learningTrack.description}
      </p>
      <div className="mt-8 flex gap-5">
        <Button
          type="mantle"
          className="w-[16.875rem] rounded-[10px] text-[18px] leading-[140%] text-neutral-black"
          onClick={() => {
            if (!userInfo) {
              setAuthModalOpen(true);
            } else {
              router.push(`/learning-track/${learningTrack.id}`);
            }
          }}
        >
          Enroll
        </Button>
        <Link href={`/learning-track/${learningTrack.id}`}>
          <Button
            ghost
            className="w-[16.875rem] rounded-[10px] border-[#CCE9E7] text-[18px] leading-[140%] text-[#CCE9E7] hover:bg-[#CCE9E7] hover:text-neutral-black"
          >
            View Syllabus
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LearningTrackCard;
