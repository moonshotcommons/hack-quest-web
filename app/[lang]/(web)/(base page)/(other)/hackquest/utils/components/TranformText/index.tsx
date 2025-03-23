'use client';

import Button from '@/components/Common/Button';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import webApi from '@/service';
import { useQuery } from '@tanstack/react-query';
import { createEditor } from '@wangeditor/editor';

export const TransformText = () => {
  const { data: hackathonInfo } = useQuery({
    queryKey: ['transformData'],
    queryFn: () => webApi.hackathonV2Api.getTransformData()
  });

  return (
    <div>
      <Button
        type="primary"
        onClick={async () => {
          // console.log('first');
          // 黑客松详情
          for (let i = 0; i < hackathonInfo?.length; i++) {
            const hackathon = hackathonInfo[i];
            const description = hackathon.description;
            const data: any = {};
            // console.log(description);
            // if (description?.type === TEXT_EDITOR_TYPE) {
            //   await webApi.hackathonV2Api.updateHackathonDesc(hackathon.id, {
            //     description: createEditor({ content: structuredClone(description?.content) || [] }).getHtml()
            //   });
            //   data.description = createEditor({ content: structuredClone(description?.content) || [] }).getHtml();
            // }
            // console.log(hackathon);
            for (let key in hackathon.application || {}) {
              const app = hackathon.application[key];
              for (let j = 0; j < app?.length; j++) {
                const input = app[j] as any;
                if (input?.property?.placeholder?.type === TEXT_EDITOR_TYPE) {
                  input.property.placeholder = createEditor({
                    content: structuredClone(input?.property?.placeholder.content) || []
                  }).getHtml();
                }
              }
            }

            for (let key in hackathon.submission) {
              const submission = hackathon.submission[key];
              for (let j = 0; j < submission?.length; j++) {
                const input = submission[j] as any;
                if (input?.property?.placeholder?.type === TEXT_EDITOR_TYPE) {
                  input.property.placeholder = createEditor({
                    content: structuredClone(input?.property?.placeholder.content) || []
                  }).getHtml();
                }
              }
            }

            data.submission = hackathon.submission;
            data.application = hackathon.application;

            // const sections = hackathon.sections;
            // for (let key in sections) {
            //   if (key === 'customs') {
            //     for (let custom of sections[key] || []) {
            //       if (custom.text?.type === TEXT_EDITOR_TYPE) {
            //         custom.text = createEditor({ content: structuredClone(custom.text.content) || [] }).getHtml();
            //       }
            //     }
            //   }

            //   if (key === 'schedule') {
            //     for (let schedule of sections[key]?.list || []) {
            //       if (schedule.text?.type === TEXT_EDITOR_TYPE) {
            //         schedule.text = createEditor({ content: structuredClone(schedule.text.content) || [] }).getHtml();
            //       }
            //     }
            //   }

            //   if (key === 'faqs') {
            //     for (let faq of sections[key]?.list || []) {
            //       if (faq.answer?.type === TEXT_EDITOR_TYPE) {
            //         faq.answer = createEditor({ content: structuredClone(faq.answer.content) || [] }).getHtml();
            //       }
            //     }
            //   }
            // }

            // data.sections = sections;

            await webApi.hackathonV2Api.updateHackathonDesc(hackathon.id, data);
          }
          // reward rule
          // for (let i = 0; i < hackathonInfo.length; i++) {
          //   const hackathon = hackathonInfo[i];
          //   const description = hackathon.rule;
          //   if (description?.type === TEXT_EDITOR_TYPE) {
          //     await webApi.hackathonV2Api.updateHackathonDesc(hackathon.id, {
          //       rule: createEditor({ content: structuredClone(description?.content) || [] }).getHtml()
          //     });
          //   }
          // }
          // judge criteria
          // for (let i = 0; i < hackathonInfo.length; i++) {
          //   const hackathon = hackathonInfo[i];
          //   const description = hackathon.criteria;
          //   if (description?.type === TEXT_EDITOR_TYPE) {
          //     await webApi.hackathonV2Api.updateHackathonDesc(hackathon.id, {
          //       criteria: createEditor({ content: structuredClone(description?.content) || [] }).getHtml()
          //     });
          //   }
          // }
        }}
      >
        更新 hackathon 的 description
      </Button>
    </div>
  );
};
