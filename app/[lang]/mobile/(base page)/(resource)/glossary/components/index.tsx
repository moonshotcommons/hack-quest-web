import React from 'react';
import GlossaryHeader from './GlossaryHeader';
import webApi from '@/service';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import Pagination from '@/components/Common/Pagination';
import NoData from './NoData';
import MenuLink from '@/constants/MenuLink';
import BlogList from '../../blog/components/BlogList';
import BlogFooter from '../../blog/components/BlogFooter';
import { ResourceFrom } from '@/service/webApi/resourceStation/type';

interface GlossaryProp {
  params: { slug: string[] };
  searchParams: { keyword?: string };
}

const Glossary: React.FC<GlossaryProp> = async ({
  searchParams = {},
  params: { slug = [] }
}) => {
  const limit = 12;
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;

  const [glossaryData] = await Promise.all([
    webApi.resourceStationApi.getGlossaryList({
      limit,
      ...searchParams,
      page
    })
  ]);
  const galossaryList = glossaryData.data || [];
  const totalList = glossaryData.total;
  const totalPage = Math.ceil(glossaryData.total / limit);
  console.info(searchParams, 'searchParams');
  return (
    <div>
      <GlossaryHeader keyword={searchParams.keyword || ''} />
      <div className="px-[1.25rem] py-[2.5rem]">
        {searchParams.keyword ? (
          <div className="body-m mb-[2.5rem] text-center text-neutral-black">
            {totalList} Results for
            <span className="pl-[4px] text-neutral-medium-gray">
              “{searchParams.keyword}”
            </span>
          </div>
        ) : null}
        {galossaryList.length > 0 ? (
          <BlogList list={galossaryList} from={ResourceFrom.GLOSSARY} />
        ) : (
          <NoData
            href={MenuLink.GLOSSARY}
            keyword={searchParams.keyword}
          ></NoData>
        )}

        {totalPage > 1 && (
          <div className="mt-[80px] flex justify-center">
            <Pagination
              page={page}
              total={totalPage}
              urlPrefix={`${MenuLink.GLOSSARY}/p/`}
            />
          </div>
        )}
      </div>
      {galossaryList.length === 0 ? (
        <BlogFooter type="link" from={ResourceFrom.GLOSSARY} />
      ) : null}
      <PageRetentionTime trackName="glossary-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default Glossary;
