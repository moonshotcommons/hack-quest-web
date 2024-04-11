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
    <div className="w-full bg-neutral-white py-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="body-s-bold text-[.875rem] uppercase text-neutral-rich-gray">{t(`UserEvaluation.testimonial`)}</p>
        <h2 className="text-h2-mob">{t('UserEvaluation.Students and Partners like You ❤️ us')}</h2>
        <p className="body-s text-neutral-medium-gray">{t('UserEvaluation.See what others say about HackQuest')}</p>
      </div>
      <div className="mt-10">
        <ScrollContainer>
          <div className="flex justify-center gap-6">
            {/* 第一列 */}
            {userEvaluation.map((col, index) => {
              return (
                <div key={index} className={cn('flex h-full w-[17.5rem] shrink-0 flex-col gap-6')}>
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
