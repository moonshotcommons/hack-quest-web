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
      sort: search.sort === projectSort[0].value ? '' : search.sort,
      winner: !search.winner ? '' : search.winner
    };
    const url = getSearchParamsUrl(searchInfo, MenuLink.PROJECTS);
    router.push(url);
  };

  function handleSearch(keyword: string) {
    searchList({
      sort: projectSort[0].value,
      winner: '',
      tracks: '',
      track: '',
      prizeTrack: '',
      keyword,
      page: '1'
    });
  }

  return (
    <div className="container mx-auto pt-[40px]">
      <ListBox
        list={list}
        searchParams={searchParams}
        total={total}
        pageInfo={pageInfo}
        defaultValue={searchParams.keyword || ''}
        searchList={searchList}
        onSearch={handleSearch}
      />
      <PageRetentionTime trackName="hackathon-project 页面留存时间" />
    </div>
  );
};

export default ProjectsPage;
