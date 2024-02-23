import { FC } from 'react';
import { SearchParamsType } from './constant/type';
import CourseMarketPage from './components';

export const dynamic = 'force-dynamic';
interface CourseMarketProps {
  params: { slug: string[] };
  searchParams: SearchParamsType;
}

const CourseMarket: FC<CourseMarketProps> = async ({
  searchParams = {},
  params: { slug = [] }
}) => {
  // const featured = await getFeaturedProjects();
  const courseList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;
  searchParams.sort = searchParams.sort || '-createdAt';
  return (
    <>
      <CourseMarketPage
        page={page}
        searchParams={searchParams}
        courseList={courseList}
      />
    </>
  );
};

export default CourseMarket;
