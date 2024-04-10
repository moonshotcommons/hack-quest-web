'use client';
import { useContext, useRef, useState } from 'react';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import Image from 'next/image';
import CourseSlider from '@/components/Web/Business/CourseSlider';
import { CourseFilterListType } from '@/components/Web/Business/CourseFilterList';
import webApi from '@/service';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import CourseFilterListSearch from '../CourseFilterListSearch';
import CourseFilterListDefault from '../CourseFilterListDefault';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

function Practices() {
  const selectiveCoursesRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [topProjects, setTopProjects] = useState<ProjectCourseType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [type, setType] = useState<CourseFilterListType>(CourseFilterListType.DEFAULT);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  const handleScroll = () => {
    const clientHeight = selectiveCoursesRef.current?.clientHeight || 0;
    const scrollTop = selectiveCoursesRef.current?.scrollTop || 0;
    const scrollHeight = selectiveCoursesRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setPage((num) => num + 1);
    }
  };

  const coverImage = (
    <div className="pt-[50px]">
      <Image
        src={'/images/course/course_cover/practices_cover.png'}
        width={314}
        height={300}
        alt="Projects cover"
      ></Image>
    </div>
  );

  const onSearch = (value: string) => {
    setSearchKeyword(value);
    if (!value) {
      setType(CourseFilterListType.DEFAULT);
      return;
    }
    setType(CourseFilterListType.SEARCH);
  };

  const { loading } = useRequest(
    () => {
      return webApi.courseApi.getTopCourses<ProjectCourseType>({
        type: CourseType.GUIDED_PROJECT
      });
    },
    {
      onSuccess(res) {
        setTopProjects(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  return (
    <div className="h-full overflow-auto" onScroll={handleScroll} ref={selectiveCoursesRef}>
      <div className="container mx-auto">
        <CourseListPageHeader
          title={t('practice.title')}
          description={t('practice.description')}
          placeholder={t('courses.searchPlaceholder')}
          coverImage={coverImage}
          coverWidth={523}
          coverHeight={277}
          onSearch={onSearch}
        ></CourseListPageHeader>

        {/* Top Projects */}
        {/* <Loading loading={loading} loadingText=""> */}
        {/* <div className="w-full h-fit min-h-[360px]"> */}
        {type === CourseFilterListType.DEFAULT && (
          <CourseSlider
            title={t('practice.topProjects')}
            loading={loading}
            renderItem={(course) => {
              return (
                <div key={course.id} className="w-[calc((100%-60px)/4)]">
                  <PracticeCard course={course as ProjectCourseType} />
                </div>
              );
            }}
            list={topProjects}
          ></CourseSlider>
        )}
        {/* </div> */}
        {/* </Loading> */}

        {/* CourseList */}
        {type === CourseFilterListType.DEFAULT && (
          <div className="mt-[60px]">
            <CourseFilterListDefault title={t('practice.exploreWeb3')} />
          </div>
        )}

        {/* Course Search List */}
        {type === CourseFilterListType.SEARCH && <CourseFilterListSearch keyword={searchKeyword} />}
        {/*
        <SelectiveCoursesBox
          loadNum={loadNum}
          setApiStatus={(status) => setApiStatus(status)}
          apiStatus={apiStatus}
        /> */}
      </div>
    </div>
  );
}

export default Practices;
