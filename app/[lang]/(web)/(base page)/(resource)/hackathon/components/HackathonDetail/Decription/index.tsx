import React, { useContext, useMemo } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import HackathonRenderer from '../../HackathonRenderer';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import { createEditor } from '@wangeditor/editor';

interface DescriptionProp {
  hackathon: HackathonType;
}

const Description: React.FC<DescriptionProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const description = hackathon.info?.description;

  // 会频繁更新，图片会闪，所以放到useMemo
  const domNode = useMemo(() => {
    return (
      <div
        className="body-m reset-editor-style whitespace-pre-line text-neutral-rich-gray"
        dangerouslySetInnerHTML={{
          __html: createEditor({ content: description?.content || [] }).getHtml()
        }}
      ></div>
    );
  }, []);

  const renderDescription = () => {
    if (typeof description === 'string') {
      return <div className="body-m whitespace-pre-line text-neutral-rich-gray">{hackathon.info?.description}</div>;
    }

    if (description?.type === TEXT_EDITOR_TYPE) {
      return domNode;
    }

    if (description?.length) {
      return <HackathonRenderer content={description} />;
    }

    return null;
  };

  return (
    <EditBox title={'hackathonDetail.description'} className="rounded-none border-none bg-transparent p-0">
      {renderDescription()}
    </EditBox>
  );
};

export default Description;
