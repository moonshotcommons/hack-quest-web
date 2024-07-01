import Button from '@/components/Common/Button';
import CompletedIcon from '@/components/Common/Icon/Completed';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { hackathonSections } from '../../../../constants/data';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import { StartModal } from '@/components/hackathon-org/modals/start-modal';

interface DraftHackahtonCardProp {
  hackathon: HackathonType;
}

const DraftHackahtonCard: React.FC<DraftHackahtonCardProp> = ({ hackathon }) => {
  console.info(hackathon);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [open, setOpen] = useState(false);
  const { redirectToUrl } = useRedirect();
  const isEdited = false;
  const handleClickButton = () => {
    if (isEdited) {
      redirectToUrl(`${MenuLink.HACKATHON_EDIT}/${hackathon.alias}`);
    } else {
      redirectToUrl(`${MenuLink.FORM_HACKATHON_ORGANIZER}/${hackathon.alias}/create`);
    }
  };
  return (
    <div className="card-hover body-m rounded-[16px] bg-neutral-white p-[24px] text-neutral-medium-gray">
      <div className="flex items-center justify-between border-b border-neutral-medium-gray pb-[24px]">
        <h2 className="text-h3 text-neutral-off-black">{hackathon.name}</h2>
        <Button type="primary" className="h-[51px] w-[310px] uppercase" onClick={handleClickButton}>
          {isEdited ? t('organizer.previewSubmit') : t('organizer.continueEditing')}
        </Button>
      </div>
      <div className="flex flex-col gap-[24px] pt-[24px]">
        <div>
          <div className="body-s">
            <span>{t('organizer.requiredSections')}</span>
            <span>{` (${1}/${8})`}</span>
          </div>
          <div className="mt-[4px] flex gap-[20px]">
            {hackathonSections.require.map((v) => (
              <div
                key={v}
                className={`body-m flex items-center gap-[4px] rounded-[4px] border  px-[20px] py-[12px] ${hackathon.progress.includes(v) ? 'border-transparent bg-neutral-off-white' : 'border border-neutral-light-gray bg-transparent'}`}
              >
                <span>{t(`hackathonDetail.${v}`)}</span>
                {hackathon.progress.includes(v) ? (
                  <CompletedIcon size={14} />
                ) : (
                  <div className="h-[14px] w-[14px] rounded-[50%] bg-neutral-off-white"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="body-s">
            <span>{t('organizer.optionalSections')}</span>
            <span>{` (${1}/${8})`}</span>
          </div>
          <div className="mt-[4px] flex gap-[20px]">
            {hackathonSections.optional.map((v) => (
              <div
                key={v}
                className={`body-m flex items-center gap-[4px] rounded-[4px] border  px-[20px] py-[12px] ${hackathon.progress.includes(v) ? 'border-transparent bg-neutral-off-white' : 'border border-neutral-light-gray bg-transparent'}`}
              >
                <span>{t(`hackathonDetail.${v}`)}</span>
                {hackathon.progress.includes(v) ? (
                  <CompletedIcon size={14} />
                ) : (
                  <div className="h-[14px] w-[14px] rounded-[50%] bg-neutral-off-white"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <StartModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default DraftHackahtonCard;
