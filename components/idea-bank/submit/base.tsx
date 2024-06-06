'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';
import { Step, StepLabel, Stepper } from '@/components/ui/stepper';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useSubmitModal } from './store';
import { IdeaInfo } from '../submit-form/idea-info';
import { Problem } from '../submit-form/problem';
import { Inspiration } from '../submit-form/inspiration';
import { Others } from '../submit-form/others';

const steps = ['Idea Info', 'Problem & Solution', 'Inspiration', 'Others'];

const componentMap: Record<number, React.FC> = {
  0: IdeaInfo,
  1: Problem,
  2: Inspiration,
  3: Others
};

export function SubmitBase() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.IDEA_BANK);
  const { step, onClose } = useSubmitModal();

  const Component = componentMap[step];

  return (
    <React.Fragment>
      <button className="absolute right-4 top-4 outline-none" onClick={onClose}>
        <XIcon size={24} />
      </button>
      <h1 className="sm:headline-h4 headline-h4-mob text-center text-neutral-off-black">{t('submit_an_idea')}</h1>
      <p className="body-xs mb-4 mt-1 text-neutral-rich-gray">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida mollis mattis. Morbi eget tempor
        augue. Aenean lacus nisl, volutpat sed nunc et, ornare egestas augue.{' '}
      </p>
      <Stepper activeStep={step}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className="whitespace-nowrap">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Component />
    </React.Fragment>
  );
}
