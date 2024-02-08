import { FC } from 'react';
import ScrollContainer from './ScrollContainer';
import EvaluationCard from './EvaluationCard';
import { userEvaluation } from './constant';
import { cn } from '@/helper/utils';

const UserEvaluation: FC<{}> = (props) => {
  return (
    <div className="mt-[6.25rem] w-full py-10">
      <div className="mx-auto flex w-[50rem] flex-col items-center gap-3 text-center">
        <h2 className="text-h2 text-neutral-off-black">
          we ❤️ our community advocates
        </h2>
        <p className="body-m text-neutral-medium-gray">
          Share your learning journey and tag us to be featured
        </p>
      </div>
      <div className="mt-[3.75rem]">
        <ScrollContainer>
          <div className="flex justify-center gap-6">
            {userEvaluation.map((col, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    'flex h-full w-[19.4375rem] shrink-0 flex-col gap-6',
                    col.className
                  )}
                >
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
