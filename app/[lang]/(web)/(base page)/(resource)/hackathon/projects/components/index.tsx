'use client';
import { FC, useContext } from 'react';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { PageInfoType, SearchParamsType } from '..';
import MenuLink from '@/constants/MenuLink';
import { useRouter } from 'next/navigation';
import { getSearchParamsUrl } from '@/helper/utils';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';

interface ProjectsPageProp {
  list: ProjectType[];
  searchParams: SearchParamsType;
  total: number;
  pageInfo: PageInfoType;
}
const ProjectsPage: FC<ProjectsPageProp> = ({ list, searchParams, total, pageInfo }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const router = useRouter();
  const searchList = (search: SearchParamsType) => {
    const searchInfo = {
      ...search,
      sort: search.sort === '-featured' ? '' : search.sort,
      apolloDay: !search.apolloDay ? '' : search.apolloDay
    };
    const url = getSearchParamsUrl(searchInfo, MenuLink.PROJECTS);
    router.push(url);
  };
  return (
    <div className="px-[1.25rem]">
      <MobCourseListPageHeader
        title={t('projects.projects')}
        description={t('projects.projectsDescription')}
        coverImageUrl={'/images/hackathon/projects_cover_mob.png'}
        coverWidth={125}
        coverHeight={100}
        onSearch={(keyword) => {
          searchList({
            sort: '-featured',
            apolloDay: '',
            tracks: '',
            keyword
          });
        }}
        defaultValue={searchParams.keyword || ''}
        className="mb-[2.5rem] "
        coverImgClassName="absolute right-[0] top-[0]"
      />
      {/* <ListBox list={list} searchParams={searchParams} total={total} pageInfo={pageInfo} searchList={searchList} /> */}
      <PageRetentionTime trackName="hackathon-project 页面留存时间" />
    </div>
  );
};

export default ProjectsPage;
