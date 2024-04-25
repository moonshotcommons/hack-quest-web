'use client';
import { FC } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useRedirect } from '@/hooks/router/useRedirect';
import LinkArrow from '@/components/Common/LinkArrow';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
interface BackButtonProps {
  type: 'learningTrack' | 'practices' | 'electives';
  lang: Lang;
}

const BackButton: FC<BackButtonProps> = ({ type, lang }) => {
  const router = useRouter();
  const { t } = useTranslation(lang, TransNs.BASIC);

  const { redirectToUrl } = useRedirect();
  const back = () => {
    if (history.length > 0) {
      router.back();
    } else {
      switch (type) {
        case 'learningTrack':
          redirectToUrl('/learning-track');
          break;
        case 'electives':
          redirectToUrl('/electives');
          break;
        case 'practices':
          redirectToUrl('/practices');
          break;
      }
    }
  };

  return (
    <LinkArrow size="lg" onClick={back}>
      {t('back')}
    </LinkArrow>
  );
};

export default BackButton;
