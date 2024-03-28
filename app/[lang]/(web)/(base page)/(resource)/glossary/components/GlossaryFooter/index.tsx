'use client';
import Loading from '@/components/Common/Loading';
import MenuLink from '@/constants/MenuLink';
import webApi from '@/service';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import Button from '@/components/Common/Button';
import { useRedirect } from '@/hooks/router/useRedirect';
import GlossaryCard from '@/components/Web/Business/GlossaryCard';

interface GlossaryFooterProp {
  backTop?: VoidFunction;
  type?: 'link' | 'top';
}

const GlossaryFooter: React.FC<GlossaryFooterProp> = ({ backTop, type = 'top' }) => {
  const [featureBlogList, setFeatureBlogList] = useState<BlogType[]>([]);
  const { redirectToUrl } = useRedirect();
  const { loading } = useRequest(async () => {
    const res = await webApi.resourceStationApi.getFeaturedGlossary();
    setFeatureBlogList(res?.slice(0, 4) || []);
  });

  const handleClick = () => {
    if (type === 'top') {
      backTop?.();
    } else {
      redirectToUrl(MenuLink.GLOSSARY);
    }
  };
  return (
    <div className="w-full bg-yellow-extra-light py-[60px]">
      <div className="container mx-auto">
        <div className="mb-[30px] flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h3 text-neutral-black">Latest Glossary</h2>
          </div>
        </div>
        <Loading loading={loading}>
          <div className="flex gap-[20px]">
            {featureBlogList.map((glossary) => (
              <div key={glossary.id} className="w-[calc(100%-60px)]">
                <GlossaryCard glossary={glossary} />
              </div>
            ))}
          </div>
        </Loading>
        <div className="button-text-l flex w-full justify-center pt-[60px]">
          <Button className="h-[60px] w-[270px] border border-neutral-black p-0 text-neutral-black" onClick={handleClick}>
            BACK TO ALL GLOSSARY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlossaryFooter;
