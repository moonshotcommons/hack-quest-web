import { FC } from 'react';
import ScrollContainer from './ScrollContainer';
import EvaluationCard from './EvaluationCard';
import { userEvaluation } from './constant';
import { cn } from '@/helper/utils';

const UserEvaluation: FC<{}> = (props) => {
  return (
    <div className="mt-[7.5rem] w-full bg-neutral-white py-10">
      <div className="mx-auto flex w-[50rem] flex-col items-center gap-3 text-center">
        <p className="body-s-bold uppercase text-neutral-rich-gray">{`testimonial`}</p>
        <h2 className="text-h2">
          Students and Partners like You <span className="text-status-error">❤</span> us ️
        </h2>
        <p className="body-l tracking-tight text-neutral-medium-gray">
          Don’t take our words for it. See what others say about HackQuest!
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
