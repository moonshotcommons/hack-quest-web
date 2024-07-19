'use client';
import React, { useContext, useMemo } from 'react';
import { hackathonAuditNavData } from '../../constants/data';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { useRequest } from 'ahooks';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';
import webApi from '@/service';

interface AuditsSidebarProp {}

const AuditsSidebar: React.FC<AuditsSidebarProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { alias, manageNavId } = useParams();
  const { setHackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      setHackathon: state.setHackathon
    }))
  );
  const pId = useMemo(() => {
    return hackathonAuditNavData.some((nav) => nav.id === manageNavId) ? manageNavId : hackathonAuditNavData[0].id;
  }, [manageNavId]);
  const {} = useRequest(
    async () => {
      const hackathon = await webApi.resourceStationApi.getHackathonDetail(alias as string);
      return hackathon;
    },
    {
      onSuccess(hackathon) {
        console.info(hackathon);
        setHackathon(hackathon);
      }
    }
  );
  return (
    <div className="scroll-wrap-y text-neutral-medium-graybody-l h-full w-[296px] bg-neutral-off-white py-[27px] shadow-[2px_0_4px_0_rgba(0,0,0,0.12)]">
      {hackathonAuditNavData.map((nav) => (
        <Link key={nav.id} href={`${MenuLink.HACKATHON_MANAGER}/${alias}/${nav.id}`}>
          <div
            className={`flex h-[53px]  items-center gap-[8px] overflow-hidden rounded-l-[5px] border-l-[8px] pl-[32px] ${pId === nav.id ? 'border-yellow-dark bg-neutral-white text-neutral-black' : 'border-transparent text-neutral-medium-gray'}`}
          >
            {nav.icon}
            <span>{t(nav.label)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AuditsSidebar;
