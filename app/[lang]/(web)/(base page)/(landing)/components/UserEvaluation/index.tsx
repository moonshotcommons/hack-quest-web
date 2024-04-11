import { FC } from 'react';
import ScrollContainer from './ScrollContainer';
import EvaluationCard from './EvaluationCard';
import { userEvaluation } from './constant';
import { cn } from '@/helper/utils';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';

const UserEvaluation: FC<{ lang: Lang }> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LANDING);
  return (
    <div className="mt-[7.5rem] w-full bg-neutral-white py-10">
      <div className="mx-auto flex w-[50rem] flex-col items-center gap-3 text-center">
        <p className="body-s-bold uppercase text-neutral-rich-gray">{t(`UserEvaluation.testimonial`)}</p>
        <h2 className="text-h2">{t('UserEvaluation.Students and Partners like You ❤️ us')}</h2>
        <p className="body-l tracking-tight text-neutral-medium-gray">
          {t('UserEvaluation.See what others say about HackQuest')}
        </p>
      </div>
      <div className="mt-[3.75rem]">
        <ScrollContainer allowPausing>
          <div className="flex h-[35.75rem] justify-center gap-6">
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
                        avatar={`/images/landing/avatar/${item.username}.png`}
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
