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
    <div className="flex w-full flex-col items-center rounded-[.9375rem] border border-[#202020] bg-black p-5">
      <Image
        src={LEARNING_TRACK_DARK}
        width={74}
        height={137}
        alt="mantle learning track"
      ></Image>
      <div className="flex flex-col gap-2">
        <p className="text-[1rem] leading-[160%] text-white opacity-60">
          Learning Track
        </p>
        <p className="text-[1.375rem] font-medium leading-[110%] -tracking-[.12rem] text-white">
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
        className="mt-4 text-[.875rem] leading-[160%] text-[#C4C4C4]"
        onClick={() => {}}
      >
        {learningTrack.description}
      </p>
      <div className="mt-4 flex w-full gap-4">
        <Button
          type="mantle"
          className="flex-1 rounded-[10px] px-0 text-[14px] leading-[140%] text-neutral-black"
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

        <Button
          ghost
          className="flex-1 rounded-[10px] border-[#CCE9E7] px-0 text-[14px] leading-[140%] text-[#CCE9E7] hover:bg-[#CCE9E7] hover:text-neutral-black"
        >
          <Link href={`/learning-track/${learningTrack.id}`}>
            View Syllabus
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LearningTrackCard;
