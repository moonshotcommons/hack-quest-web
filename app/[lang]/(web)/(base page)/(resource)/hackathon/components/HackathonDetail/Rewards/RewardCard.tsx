import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import { separationNumber } from '@/helper/utils';
import { HackathonRewardType } from '@/service/webApi/resourceStation/type';
import { createEditor } from '@wangeditor/editor';
import React from 'react';

interface RewardCardProp {
  reward: HackathonRewardType;
}

const RewardCard: React.FC<RewardCardProp> = ({ reward }) => {
  return (
    <div className="flex items-stretch gap-[24px] overflow-hidden rounded-[24px] border border-neutral-light-gray bg-neutral-white p-[20px]">
      <div className="flex w-[250px] flex-col items-center justify-center gap-[12px]">
        <div className="text-h3 text-neutral-off-black">{`${separationNumber(reward.totalRewards)} ${reward.currency || 'USD'}`}</div>
        <p>{reward.name}</p>
      </div>
      <div className="flex flex-1 items-center border-l border-neutral-light-gray pl-[20px]">
        {reward.mode === 'RANK' ? (
          <div className="body-m flex h-full w-full flex-col justify-center gap-[4px] text-neutral-medium-gray">
            {reward.rewards?.map((p, j) => (
              <div key={j} className="flex items-center justify-between">
                <span>{`${p.label}`}</span>
                <span className="body-l text-neutral-off-black">{`${p.value} ${reward.currency || 'USD'}`}</span>
              </div>
            ))}
          </div>
        ) : reward.rule?.type === TEXT_EDITOR_TYPE ? (
          <div
            className="body-m reset-editor-style whitespace-pre-line text-neutral-rich-gray"
            dangerouslySetInnerHTML={{
              __html: createEditor({ content: structuredClone(reward.rule?.content) || [] }).getHtml()
            }}
          ></div>
        ) : (
          <div className="body-m whitespace-pre-line text-neutral-rich-gray">
            {reward.rule?.replaceAll('\\n', '\n')}
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardCard;
