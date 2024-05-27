import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Button from '@/components/Common/Button';

interface SearchTxtProp {
  projects: ProjectType[];
  keyword: string;
  handleReset: VoidFunction;
}

const SearchTxt: React.FC<SearchTxtProp> = ({ projects, keyword, handleReset }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  if (!keyword) return null;
  return (
    <div className="mb-[32px] mt-[16px] flex flex-col items-center gap-[24px]">
      {projects.length > 0 ? (
        <>
          <div className="body-m text-neutral-black">
            {t('courses.searchResultFor', {
              keyword: keyword
            })}
          </div>
        </>
      ) : (
        <>
          <div className="body-m text-neutral-black">
            {t('courses.searchResultForNodata', {
              keyword: keyword
            })}
          </div>
          <Button
            ghost
            className="button-text-m h-[3rem] w-[212px] border-neutral-black p-0 uppercase text-neutral-black"
            onClick={handleReset}
          >
            {t('hackathonVoting.showAllProjects')}
          </Button>
        </>
      )}
    </div>
  );
};

export default SearchTxt;
