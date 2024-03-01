'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useRedirect } from '@/hooks/useRedirect';
import LinkArrow from '@/components/Common/LinkArrow';
interface BackButtonProps {
  type: 'learningTrack' | 'practices' | 'electives';
}

const BackButton: FC<BackButtonProps> = ({ type }) => {
  const router = useRouter();

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
      Back
    </LinkArrow>
  );
};

export default BackButton;
