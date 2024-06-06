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

  function handleSearch(value: string) {
    searchList({
      createdAt: projectSort[0].value,
      winner: '',
      tracks: '',
      track: '',
      prizeTrack: '',
      keyword: value
    });
  }

  return (
    <div className="min-h-[100vh]">
      <div className="px-[1.25rem]">
        <ListBox
          list={list}
          searchParams={searchParams}
          total={total}
          pageInfo={pageInfo}
          defaultValue={searchParams.keyword || ''}
          searchList={searchList}
          onSearch={handleSearch}
        />
      </div>

      <PageRetentionTime trackName="hackathon-project 页面留存时间" />
    </div>
  );
};

export default ProjectsPage;
