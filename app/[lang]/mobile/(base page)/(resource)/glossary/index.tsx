import React from 'react';
import webApi from '@/service';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import GlossaryPage from './components';

interface GlossaryProp {
  params: { slug: string[] };
  searchParams: { keyword?: string; category?: string };
}

const Glossary: React.FC<GlossaryProp> = async ({ searchParams = {}, params: { slug = [] } }) => {
  // const limit = 100000;
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;

  const glossaryData = await webApi.resourceStationApi.getGlossaryList({
    keyword: searchParams.keyword || '',
    page
  });
  const galossaryList = glossaryData.data || [];
  return (
    <div>
      <GlossaryPage galossaryList={galossaryList} searchParams={searchParams} />
      <PageRetentionTime trackName="glossary-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default Glossary;
