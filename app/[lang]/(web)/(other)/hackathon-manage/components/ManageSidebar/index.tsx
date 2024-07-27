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
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import webApi from '@/service';
import { useUserStore } from '@/store/zustand/userStore';
import { useRedirect } from '@/hooks/router/useRedirect';
import { HackathonManageType } from '../../constants/type';

interface ManageSidebarProp {}

const ManageSidebar: React.FC<ManageSidebarProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { alias, manageNavId } = useParams();
  const { redirectToUrl } = useRedirect();
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  const { setHackathon } = useHackathonManageStore(
    useShallow((state) => ({
      setHackathon: state.setHackathon
    }))
  );
  const pId = useMemo(() => {
    return hackathonAuditNavData.some((nav) => nav.id === manageNavId) ? manageNavId : hackathonAuditNavData[0].id;
  }, [manageNavId]);
  const {} = useRequest(
    async () => {
      const hackathon = await webApi.resourceStationApi.getSimpleHackathonInfo(alias as string);
      return hackathon;
    },
    {
      onSuccess(hackathon) {
        if (userInfo?.id !== hackathon.creatorId) {
          redirectToUrl(MenuLink.HACKATHON_ORGANIZER);
          return;
        }
        setHackathon(hackathon);
      },
      onError() {
        redirectToUrl(MenuLink.HACKATHON_ORGANIZER);
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
            {nav.id === HackathonManageType.JUDGE && (
              <div className="caption-12pt rounded-[4px] bg-yellow-primary px-[8px] py-[6px] uppercase text-neutral-off-black">{`ACTION REQUIRED`}</div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ManageSidebar;
