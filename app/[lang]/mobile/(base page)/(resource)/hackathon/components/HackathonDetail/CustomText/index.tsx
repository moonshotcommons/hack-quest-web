import React, { useContext, useRef } from 'react';
import EditBox from '../EditBox';
import { HackathonInfoSectionCustomType } from '@/service/webApi/resourceStation/type';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import RemoveSectionModal, { RemoveSectionModalRef } from '../RemoveSectionModal';
import { createEditor } from '@wangeditor/editor';
import {
  HackathonEditContext,
  HackathonEditModalType
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface CustomTextProp {
  custom: HackathonInfoSectionCustomType;
}

const CustomText: React.FC<CustomTextProp> = ({ custom }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setEditCustomInfo } = useContext(HackathonEditContext);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  return (
    <EditBox
      title={custom.title}
      className="rounded-none border-none bg-transparent p-0"
      type={HackathonEditModalType.CUSTOM_TEXT}
      custom={custom}
      handleDelete={() => {
        setEditCustomInfo(custom as HackathonInfoSectionCustomType);
        removeSectionRef.current?.open();
      }}
    >
      <div
        className={`reset-editor-style-mob whitespace-pre-line`}
        dangerouslySetInnerHTML={{
          __html: createEditor({ content: structuredClone((custom.text as any)?.content) || [] }).getHtml()
        }}
      ></div>
      <RemoveSectionModal ref={removeSectionRef} title={custom.title} type={HackathonEditModalType.CUSTOM_TEXT} />
    </EditBox>
  );
};

export default CustomText;
