'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useRedirect } from '@/hooks/router/useRedirect';
interface BackButtonProps {
  type: 'learningTrack' | 'practices' | 'electives';
}

const BackButton: FC<BackButtonProps> = ({ type }) => {
  const router = useRouter();

  const { redirectToUrl } = useRedirect();

  return (
    <div
      className="flex cursor-pointer items-center gap-[7px]"
      onClick={() => {
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
      }}
    >
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 4.5C13.2761 4.5 13.5 4.27614 13.5 4C13.5 3.72386 13.2761 3.5 13 3.5L13 4.5ZM0.646446 3.64645C0.451184 3.84171 0.451184 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.97631 4.7308 0.659728 4.53553 0.464465C4.34027 0.269203 4.02369 0.269203 3.82843 0.464465L0.646446 3.64645ZM13 3.5L1 3.5L1 4.5L13 4.5L13 3.5Z"
          fill="#0B0B0B"
        />
      </svg>
      <span className="body-m capitalize text-neutral-black">Back</span>
    </div>
  );
};

export default BackButton;
