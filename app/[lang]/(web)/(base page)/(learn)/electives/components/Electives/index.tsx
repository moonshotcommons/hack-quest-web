'use client';
import { useContext, useRef, useState } from 'react';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import CourseSlider from '@/components/Web/Business/CourseSlider';
import { CourseFilterListType } from '@/components/Web/Business/CourseFilterList';
import webApi from '@/service';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import CourseFilterListSearch from '../CourseFilterListSearch';
import CourseFilterListDefault from '../CourseFilterListDefault';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import { Metadata } from 'next';
import { CourseType } from '@/service/webApi/course/type';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export const metadata: Metadata = {
  title: 'Electives'
};

function Electives() {
  const selectiveCoursesRef = useRef<HTMLDivElement | null>(null);
  const [loadNum, setLoadNum] = useState(0);
  const [apiStatus, setApiStatus] = useState('init');
  const [topElectives, setTopElectives] = useState<ElectiveCourseType[]>([]);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  const [searchKeyword, setSearchKeyword] = useState('');

  const [type, setType] = useState<CourseFilterListType>(CourseFilterListType.DEFAULT);

  const handleScroll = () => {
    if (apiStatus !== 'init') return;
    const clientHeight = selectiveCoursesRef.current?.clientHeight || 0;
    const scrollTop = selectiveCoursesRef.current?.scrollTop || 0;
    const scrollHeight = selectiveCoursesRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setLoadNum((num) => num + 1);
    }
  };

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
      return webApi.courseApi.getTopCourses<ElectiveCourseType>({
        type: `${CourseType.MINI},${CourseType.UGC}`
      });
    },
    {
      onSuccess(res) {
        setTopElectives(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  return (
    <div className="h-full overflow-auto">
      <div className="container mx-auto ">
        <CourseListPageHeader
          title={t('electives.title')}
          description={t('electives.description')}
          placeholder={t('courses.searchPlaceholder')}
          coverImageUrl={'/images/course/course_cover/elective_cover.png'}
          coverImgClassName="mt-[50px]"
          coverWidth={394}
          coverHeight={300}
          onSearch={onSearch}
        ></CourseListPageHeader>
        {type === CourseFilterListType.DEFAULT && (
          <CourseSlider
            title={t('electives.topElectives')}
            loading={loading}
            renderItem={(course) => {
              return (
                <div key={course.id} className="w-[calc((100%-60px)/4)]">
                  <ElectiveCard course={course as ElectiveCourseType}></ElectiveCard>
                </div>
              );
            }}
            list={topElectives}
          ></CourseSlider>
        )}
        {type === CourseFilterListType.DEFAULT && (
          <div className="mt-[60px]">
            <CourseFilterListDefault title={t('electives.exploreWeb3')}></CourseFilterListDefault>
          </div>
        )}
        {type === CourseFilterListType.SEARCH && (
          <CourseFilterListSearch keyword={searchKeyword}></CourseFilterListSearch>
        )}
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

export default Electives;
