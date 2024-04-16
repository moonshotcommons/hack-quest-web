import { FC } from 'react';
import ScrollContainer from './ScrollContainer';
import EvaluationCard from './EvaluationCard';
import { userEvaluation } from './constant';
import { cn } from '@/helper/utils';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';

const UserEvaluation: FC<{ lang: Lang }> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="mt-[6.25rem] w-full py-10">
      <div className="mx-auto flex w-[50rem] flex-col items-center gap-3 text-center">
        <h2 className="text-h2 text-neutral-off-black"> {t('advocate.UserEvaluation.title')}</h2>
        <p className="body-m text-neutral-medium-gray"> {t('advocate.UserEvaluation.description')}</p>
      </div>
      <div className="mt-[3.75rem]">
        <ScrollContainer allowPausing>
          <div className="flex justify-center gap-6">
            {userEvaluation.map((col, index) => {
              return (
                <div key={index} className={cn('flex h-full w-[19.4375rem] shrink-0 flex-col gap-6', col.className)}>
                  {col.items.map((item, i) => {
                    return (
                      <EvaluationCard
                        key={item.username + i}
                        content={item.content}
                        username={item.username}
                        userDesc={item.userDesc}
                        avatar={`/images/advocate/avatar/${item.avatar || item.username}.webp`}
                      ></EvaluationCard>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default UserEvaluation;
