'use client';
import { FC, useContext } from 'react';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { PageInfoType, SearchParamsType } from '..';
import ListBox from './ListBox';
import MenuLink from '@/constants/MenuLink';
import { useRouter } from 'next-nprogress-bar';
import { getSearchParamsUrl } from '@/helper/utils';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';
import { projectSort } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/data';

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
    <div className="min-h-[100vh] ">
      <MobCourseListPageHeader
        title={t('projects.projects')}
        description={t('projects.projectsDescription')}
        coverImageUrl={'/images/hackathon/projects_cover_mob.png'}
        coverWidth={125}
        coverHeight={100}
        onSearch={(keyword) => {
          searchList({
            createdAt: projectSort[0].value,
            winner: '',
            tracks: '',
            keyword
          });
        }}
        defaultValue={searchParams.keyword || ''}
        className="bg-transparent pb-[2.5rem]"
        coverImgClassName="absolute right-[1.25rem] top-[1.25rem]"
      />
      <div className="px-[1.25rem]">
        <ListBox list={list} searchParams={searchParams} total={total} pageInfo={pageInfo} searchList={searchList} />
      </div>

      <PageRetentionTime trackName="hackathon-project 页面留存时间" />
    </div>
  );
};

export default ProjectsPage;
