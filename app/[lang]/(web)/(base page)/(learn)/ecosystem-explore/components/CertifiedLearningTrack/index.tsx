'use client';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import CertifiedCover from '@/public/images/learn/certified_learning_track_cover.png';
import EcoCard from './EcoCard';
import { EcosystemType } from '@/service/webApi/ecosystem/type';
import { useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import Link from 'next/link';
import { UserRole } from '@/service/webApi/user/type';
import MenuLink from '@/constants/MenuLink';

interface CertifiedLearningTrackProp {
  ecosystems: EcosystemType[];
}

const CertifiedLearningTrack: React.FC<CertifiedLearningTrackProp> = ({ ecosystems }) => {
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex items-center justify-between">
        <DeveloperTitle image={CertifiedCover} title={'learningTrack'} />
        {userInfo?.role === UserRole.ADMIN && (
          <Link href={`${MenuLink.ECOSYSTEM_VIEW}`}>
            <span className="body-m text-neutral-off-black underline">View Ecosystems</span>
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-[32px]">
        {ecosystems.map((eco) => (
          <div key={eco.id} className="w-[calc((100%-64px)/3)]">
            <EcoCard ecosystem={eco} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertifiedLearningTrack;
