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
    <div className="rounded-[1rem] border border-neutral-light-gray bg-neutral-white p-[1.5rem]">
      <div className="flex flex-col items-center justify-center gap-[.25rem] pb-[.5rem]">
        <div className="text-h2-mob text-neutral-off-black">{`${separationNumber(reward.totalRewards)} ${reward.currency || 'USD'}`}</div>
        <p className="text-center text-neutral-medium-gray">{reward.name}</p>
      </div>
      <div className="flex-1 border-t border-neutral-light-gray pt-[.5rem]">
        {reward.mode === 'RANK' ? (
          <div className="body-s flex h-full flex-col justify-center gap-[4px] text-neutral-medium-gray">
            {reward.rewards?.map((p, j) => (
              <div key={j} className="flex items-center justify-between">
                <span>{`${p.label}`}</span>
                <span className="body-m text-neutral-off-black">{`${p.value} ${reward.currency || 'USD'}`}</span>
              </div>
            ))}
          </div>
        ) : reward?.rule?.type === TEXT_EDITOR_TYPE ? (
          <div
            className="body-s reset-editor-style whitespace-pre-line text-neutral-rich-gray"
            dangerouslySetInnerHTML={{
              __html: createEditor({ content: structuredClone(reward.rule?.content || []) }).getHtml()
            }}
          ></div>
        ) : (
          <div className="body-s whitespace-pre-line text-neutral-rich-gray">
            {reward.rule?.replaceAll('\\n', '\n')}
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardCard;
