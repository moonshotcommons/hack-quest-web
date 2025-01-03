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

  console.log(hackathonInfo);

  return (
    <div>
      <Button
        type="primary"
        onClick={async () => {
          // 黑客松详情
          for (let i = 0; i < hackathonInfo.length; i++) {
            const hackathon = hackathonInfo[i];
            const description = hackathon.description;
            const data: any = {};
            if (description.type === TEXT_EDITOR_TYPE) {
              // await webApi.hackathonV2Api.updateHackathonDesc(hackathon.id, {
              //   description: createEditor({ content: structuredClone(description?.content) || [] }).getHtml()
              // });
              data.description = createEditor({ content: structuredClone(description?.content) || [] }).getHtml();
            }

            for (let app of hackathon.application) {
              for (let j = 0; j < app.length; j++) {
                const input = structuredClone(app[j]);
                if (input?.property?.placeholder?.type === TEXT_EDITOR_TYPE) {
                  input.property.placeholder = createEditor({
                    content: structuredClone(input?.property?.placeholder.content) || []
                  }).getHtml();
                }
              }
              data.application = app;
            }

            for (let submission of hackathon.submission) {
              for (let j = 0; j < submission.length; j++) {
                const input = structuredClone(submission[j]);
                if (input?.property?.placeholder?.type === TEXT_EDITOR_TYPE) {
                  input.property.placeholder = createEditor({
                    content: structuredClone(input?.property?.placeholder.content) || []
                  }).getHtml();
                }
              }
              data.submission = submission;
            }

            const sections = hackathon.sections;
            for (let key of sections) {
              // if(key === 'faqs')
            }
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
