'use client';
import { FC, useContext } from 'react';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { PageInfoType, SearchParamsType } from '..';
import MenuLink from '@/constants/MenuLink';
import { useRouter } from 'next-nprogress-bar';
import { getSearchParamsUrl } from '@/helper/utils';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import ListBox from './ListBox';
import { projectSort } from '../../constants/data';

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
      createdAt: search.createdAt === projectSort[0].value ? '' : search.createdAt,
      winner: !search.winner ? '' : search.winner
    };
    const url = getSearchParamsUrl(searchInfo, MenuLink.PROJECTS);
    router.push(url);
  };
  return (
    <div className="container mx-auto pt-[40px]">
      <CourseListPageHeader
        title={t('projects.projects')}
        description={t('projects.projectsDescription')}
        coverImageUrl={'/images/hackathon/projects_cover.png'}
        coverWidth={416}
        coverHeight={331}
        onSearch={(keyword) => {
          searchList({
            createdAt: projectSort[0].value,
            winner: '',
            tracks: '',
            keyword
          });
        }}
        defaultValue={searchParams.keyword || ''}
        className="mb-[2.5rem] "
        coverImgClassName="absolute right-[0] top-[0]"
      />
      <ListBox list={list} searchParams={searchParams} total={total} pageInfo={pageInfo} searchList={searchList} />
      <PageRetentionTime trackName="hackathon-project 页面留存时间" />
    </div>
  );
};

export default ProjectsPage;
