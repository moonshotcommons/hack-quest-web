import { FC } from 'react';
import ScrollContainer from './ScrollContainer';
import EvaluationCard from './EvaluationCard';
import { userEvaluation } from './constant';
import { cn } from '@/helper/utils';

const UserEvaluation: FC<{}> = (props) => {
  return (
    <div className="w-full bg-neutral-white py-10">
      <div className="flex flex-col gap-3 items-center text-center">
        <p className="body-s-bold uppercase text-neutral-rich-gray text-[.875rem]">{`testimonial`}</p>
        <h2 className="text-h2 text-[1.375rem]">
          Students and Partners like You{' '}
          <span className="text-status-error">❤</span> us ️
        </h2>
        <p className="body-l text-neutral-medium-gray tracking-tight text-[.875rem] font-Nunito">
          Don’t take our words for it. See what others say about HackQuest!
        </p>
      </div>
      <div className="mt-10">
        <ScrollContainer>
          <div className="flex justify-center gap-6">
            {/* 第一列 */}
            {userEvaluation.map((col, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    'w-[17.5rem] flex flex-col gap-6 h-full shrink-0'
                  )}
                >
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
