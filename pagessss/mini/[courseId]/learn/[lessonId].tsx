import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import MiniCoursePage from '@/components/v2/MiniCoursePage';
import { CourseType } from '@/service/webApi/course/type';
import useGetDevice from '@/hooks/useGetDevice';
interface IProps {}

const MiniUnit: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { lessonId } = router.query;
  const isMobile = useGetDevice();
  if (!lessonId) {
    return null;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col font-next-book px-[40px] bg-[#f4f4f4]">
        {isMobile && null}
        {!isMobile && (
          <MiniCoursePage
            lessonId={lessonId as string}
            courseType={CourseType.Mini}
          ></MiniCoursePage>
        )}
      </div>
    </>
  );
};

export default MiniUnit;
