import React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../../EditBox';
import { separationNumber } from '@/helper/utils';
import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { createEditor } from '@wangeditor/editor';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';

interface RewardsProp {
  hackathon: HackathonType;
}

const Rewards: React.FC<RewardsProp> = ({ hackathon }) => {
  return (
    <EditBox
      title={'hackathonDetail.rewards'}
      type={HackathonEditModalType.REWARDS}
      className="flex flex-col gap-[1rem] rounded-[0] border-none bg-transparent p-0"
    >
      {hackathon.rewards?.map((v, i) => (
        <div className="rounded-[1rem] border border-neutral-light-gray bg-neutral-white p-[1.5rem]" key={i}>
          <div className="flex flex-col items-center justify-center gap-[.25rem] pb-[.5rem]">
            <div className="text-h2-mob text-neutral-off-black">{`${separationNumber(v.totalRewards)} ${v.currency || 'USD'}`}</div>
            <p className="text-neutral-medium-gray">{v.name}</p>
          </div>
          <div className="flex-1 border-t border-neutral-light-gray pt-[.5rem]">
            {v.mode === 'RANK' ? (
              <div className="body-s flex h-full flex-col justify-center gap-[4px] text-neutral-medium-gray">
                {v.rewards?.map((p, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span>{`${p.label}`}</span>
                    <span className="body-m text-neutral-off-black">{`${p.value} ${v.currency || 'USD'}`}</span>
                  </div>
                ))}
              </div>
            ) : v?.rule?.type === TEXT_EDITOR_TYPE ? (
              <div
                className="body-s reset-editor-style whitespace-pre-line text-neutral-rich-gray"
                dangerouslySetInnerHTML={{
                  __html: createEditor({ content: structuredClone(v?.rule?.content || []) }).getHtml()
                }}
              ></div>
            ) : (
              <div className="body-s whitespace-pre-line text-neutral-rich-gray">{v.rule?.replaceAll('\\n', '\n')}</div>
            )}
          </div>
        </div>
      ))}
    </EditBox>
  );
};

export default Rewards;
