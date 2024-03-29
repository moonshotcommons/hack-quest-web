'use client';
import Loading from '@/components/Common/Loading';
import MenuLink from '@/constants/MenuLink';
import webApi from '@/service';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import Button from '@/components/Common/Button';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';
import { useRedirect } from '@/hooks/router/useRedirect';
import ScrollControl from '../../../blog/components/ScrollControl';
import MobGlossaryCard from '@/components/Mobile/MobGlossaryCard';

interface GlossaryFooterProp {
  backTop?: VoidFunction;
  type?: 'link' | 'top';
}

const GlossaryFooter: React.FC<GlossaryFooterProp> = ({ backTop, type = 'top' }) => {
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  const [featureBlogList, setFeatureBlogList] = useState<BlogType[]>([]);
  const { redirectToUrl } = useRedirect();
  const { loading } = useRequest(async () => {
    const res = await webApi.resourceStationApi.getFeaturedGlossary();
    setFeatureBlogList(res);
  });

  const handleClick = () => {
    if (type === 'top') {
      backTop?.();
    } else {
      redirectToUrl(MenuLink.GLOSSARY);
    }
  };
  return (
    <div className="w-full bg-yellow-extra-light px-[1.25rem] py-[1.875rem]">
      <div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h3-mob text-neutral-off-black">Latest Glossary</h2>
          </div>
        </div>
        <Loading loading={loading}>
          <ScrollContainer onChange={(state: any) => setScrollContainerState(state)}>
            <div className="my-[1.875rem] flex overflow-x-hidden">
              {featureBlogList.map((glossary) => (
                <div key={glossary.id} className="w-[calc(100vw-2.5rem)] p-[.3125rem]">
                  <MobGlossaryCard glossary={glossary} />
                </div>
              ))}
            </div>
          </ScrollContainer>
          <ScrollControl
            changeState={scrollContainerState}
            burialPointType={[`glossary-content-page-featured blogCard滚动-左`, `glossary-content-page-featured blogCard滚动-右`]}
          ></ScrollControl>
        </Loading>
        <div className="button-text-m flex w-full justify-center pt-[1.875rem]">
          <Button className="h-[3rem] w-[15rem] border border-neutral-black p-0 text-neutral-black" onClick={handleClick}>
            BACK TO {`${type === 'top' ? 'TOP' : `ALL GLOSSARY`}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlossaryFooter;
