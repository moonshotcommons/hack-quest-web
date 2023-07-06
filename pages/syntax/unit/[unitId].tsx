// ./pages/article/[articleId].tsx
import CourseDescription from '@/components/Course/CourseDetail/CourseDescription';
import CourseDetailBanner from '@/components/Course/CourseDetail/CourseDetailBranner';
import CourseDetailInfo from '@/components/Course/CourseDetail/CouseDetailInfo';
import UnitList from '@/components/Course/UnitList';
import GuidePage from '@/components/Lesson/GuidePage';
import { tagFormate } from '@/helper/formate';
import webApi from '@/service';
import { CourseDetailType } from '@/service/webApi/course/type';
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

interface IProps {
  unitId: string;
  unitDetail?: CourseDetailType;
}

const SyntaxUnit: NextPage<IProps> = (props) => {
  const { unitId, unitDetail } = props;
  const [lessonContent, setLessonContent] = useState(lessonData);
  const [isProgressing, setIsProgressing] = useState(false);
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
          <div className="max-w-fit flex items-center justify-center p-2 rounded-full bg-[#000] border border-solid border-[#303030] hover:bg-[#303030] cursor-pointer">
            <LeftArrowIcon></LeftArrowIcon>
          </div>
          <div className="text-[#F2F2F2F2] font-next-poster-Bold text-2xl">
            Mini Coin
          </div>
        </div>
        <div className="flex justify-between gap-[4.5rem] mt-[1.25rem]">
          <div className="text-white w-[45.3125rem] h-[42rem] px-[3rem] py-[2.5rem] rounded-[2.5rem] bg-[#101010] overflow-y-scroll notion-render-block no-scrollbar">
            {lessonContent &&
              lessonContent?.map((block) => (
                <Block block={block} key={block.id} darkMode={true} />
              ))}
          </div>
          <div className="text-[#E2E2E2] bg-[#111] notion-render-block w-[41.1875rem] h-[42rem] py-[2.5rem] rounded-[2.5rem] overflow-y-scroll no-scrollbar">
            <Quest
              source={`syntax`}
              lessonID={unitId}
              isLastUnit={false}
              content={lessonContent[1] as any}
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
      const { unitId } = context.query;
      // let courseDetail = null;
      // try {
      //   courseDetail = await webApi.courseApi.getCourseDetail(
      //     unitId as string,
      //     true
      //   );
      // } catch (e: any) {
      //   // message.error(`Course detail ${e.message}`);
      //   console.log(e);
      // }
      return {
        props: {
          unitId
          // courseDetail: courseDetail
        }
      };
    };
  });

export default SyntaxUnit;
