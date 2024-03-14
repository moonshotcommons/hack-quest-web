import { FC } from 'react';
import { SearchParamsType } from './constant/type';
import CourseMarketPage from './components';
import { getCourseMarket } from '@/service/cach/learn/course-market';
import { CourseType } from '@/service/webApi/course/type';

export const dynamic = 'force-dynamic';
interface CourseMarketProps {
  params: { slug: string[] };
  searchParams: SearchParamsType;
}

const CourseMarket: FC<CourseMarketProps> = async ({
  searchParams = {},
  params: { slug = [] }
}) => {
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;
  searchParams.sort = searchParams.sort || '-createdAt';
  const course = await getCourseMarket({
    ...searchParams,
    page,
    type: CourseType.UGC,
    limit: 12
  });
  return (
    <>
      <CourseMarketPage
        page={page}
        searchParams={searchParams}
        course={course}
      />
    </>
  );
};

export default CourseMarket;
