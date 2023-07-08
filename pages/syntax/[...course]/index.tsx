// ./pages/article/[articleId].tsx
import CourseDescription from '@/components/Course/CourseDetail/CourseDescription';
import CourseDetailBanner from '@/components/Course/CourseDetail/CourseDetailBranner';
import CourseDetailInfo from '@/components/Course/CourseDetail/CouseDetailInfo';
import UnitList from '@/components/Course/UnitList';
import GuidePage from '@/components/Lesson/GuidePage';
import { tagFormate } from '@/helper/formate';
import webApi from '@/service';
import {
  CourseDetailType,
  CourseLessonType,
  CourseType
} from '@/service/webApi/course/type';
import wrapper, { AppRootState } from '@/store/redux';
import { Typography, message } from 'antd';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { shallowEqual, useSelector } from 'react-redux';
import lessonData from '@/constants/page_json.json';
import { useEffect, useState } from 'react';
import { Block } from '@/components/TempComponent/Block';
import Quest from '@/components/TempComponent/Quest';
import LeftArrowIcon from '@/components/Common/Icon/LeftArrow';
import { useRouter } from 'next/router';

interface IProps {
  unitId: string;
  unitDetail?: CourseDetailType;
  lesson: CourseLessonType;
  data: any;
}

const SyntaxUnit: NextPage<IProps> = (props) => {
  const { unitId, unitDetail, lesson, data } = props;
  const [lessonContent, setLessonContent] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [isProgressing, setIsProgressing] = useState(false);
  const router = useRouter();
  console.log(data, 'debug-----------------------');
  useEffect(() => {
    if (lesson) {
      setLessonContent((lesson.content?.[0] as any).children);
      setQuizes((lesson.content?.[1] as any).children);
    } else {
      // router.push('/404');
    }
  }, [lesson, router]);

  return (
    // <div className="px-[5.5rem]">
    //   <CourseDetailBanner courseDetail={courseDetail}></CourseDetailBanner>
    //   <CourseDetailInfo courseDetail={courseDetail}></CourseDetailInfo>
    //   <div className="mt-[4rem]">
    //     <CourseDescription>{courseDetail?.aboutDesc}</CourseDescription>
    //   </div>
    //   <h2 className="text-[#F2F2F2] font-next-book text-[1.75rem] mt-[4rem]">
    //     Course structure
    //   </h2>
    //   <div className="mt-[2.5rem]">
    //     <UnitList units={courseDetail?.units || []}></UnitList>
    //   </div>
    // </div>
    // <h1 className="text-white text-5xl">{`当前正在浏览 syntax unit ${unitId}`}</h1>
    <>
      <div>{/* <GuidePage></GuidePage> */}</div>
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center gap-[.75rem] mt-[3.375rem]">
          <div
            className="max-w-fit flex items-center justify-center p-2 rounded-full bg-[#000] border border-solid border-[#303030] hover:bg-[#303030] cursor-pointer"
            onClick={() => router.back()}
          >
            <LeftArrowIcon></LeftArrowIcon>
          </div>
          <div className="text-[#F2F2F2F2] font-next-poster-Bold text-2xl">
            {lesson?.name}
          </div>
          <div>dropdown</div>
        </div>
        <div className="w-full h-[80vh] flex justify-between gap-[4.5rem] mt-[1.25rem]">
          <div className="text-white h-full w-full px-[3rem] py-[2.5rem] rounded-[2.5rem] bg-[#101010] overflow-y-scroll notion-render-block no-scrollbar">
            {lessonContent &&
              lessonContent?.map((block: any) => (
                <Block block={block} key={block.id} darkMode={true} />
              ))}
          </div>
          <div className="text-[#E2E2E2] h-full bg-[#111] notion-render-block w-full py-[2.5rem] rounded-[2.5rem] overflow-y-scroll no-scrollbar">
            <Quest
              courseType={CourseType.SYNTAX}
              lessonID={unitId}
              isLastUnit={false}
              content={quizes}
              onPass={() => console.log('object')}
              darkMode={true}
              setIsProgressing={setIsProgressing}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Syntax.getInitialProps = (context) => {
//   const { courseId } = context.query;
//   return {
//     courseId: courseId as string
//   };
// };

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      // const { course } = context.query;

      let lesson = null;
      try {
        // let lessonId = course?.[(course?.length || 0) - 1] || '-1';
        // console.log(lessonId);
        lesson = await webApi.courseApi.getLessonContent(
          '44e4c9ac-0e6c-4650-95e9-0ae4f3c5b278'
        );
      } catch (e: any) {
        // message.error(`Course detail ${e.message}`);
        console.log(e);
        lesson = {};
      }
      return {
        props: {
          lesson: lesson
        }
      };
    };
  });

export default SyntaxUnit;
