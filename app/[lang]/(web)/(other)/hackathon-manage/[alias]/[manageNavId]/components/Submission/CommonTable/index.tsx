'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { AuditTabType, SelectType } from '../../../../../constants/type';
import { cloneDeep } from 'lodash-es';
import Operation from './Operation';
import AuditTable from './AuditTable';
import InfoModal from '../../InfoModal';
import InfoContent from './InfoContent';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import { exportToCsv, exportToXlsx } from '@/helper/utils';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import DownloadModal from '@/components/hackathon/download-modal';
import { createEditor } from '@wangeditor/editor';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';
import webApi from '@/service';
import Input from '@/components/Common/Input';
import { message } from 'antd';
import { errorMessage } from '@/helper/ui';
import { getDomain } from '@/constants/links';

interface CommonTableProp {
  list: any[];
  information: SelectType[];
  loading: boolean;
  tabs: AuditTabType[];
  prizeTrack: string;
  refresh: VoidFunction;
}

const CommonTable: React.FC<CommonTableProp> = ({ list, information, loading, tabs, prizeTrack, refresh }) => {
  const { hackathon } = useHackathonManageStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [checkAll, setCheckAll] = useState(false);
  const [checkItems, setCheckItems] = useState<ProjectType[]>([]);
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [curInfo, setCurInfo] = useState<ProjectType | null>(null);
  const { getInfo: getMemberInfo } = useDealHackathonData();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [downloadItems, setDownloadItems] = useState<ProjectType[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [markInfo, setMarkInfo] = useState<ProjectType | null>(null);
  const [invalidReason, setInvalidReason] = useState('');
  const handleCheck = (item: ProjectType) => {
    const newCheckItems = checkItems.some((v) => v.id === item.id)
      ? checkItems.filter((v) => v.id !== item.id)
      : [...checkItems, item];
    setCheckItems(newCheckItems);
    setCheckAll(newCheckItems.length === list.length && list.length > 0);
  };
  const handleCheckAll = () => {
    !checkAll ? setCheckItems(list) : setCheckItems([]);
  };

  const getInfo = (item: ProjectType) => {
    const info: Record<string, any> = {
      name: item.name,
      link: `${getDomain(process.env.RUNTIME_ENV || 'production')}en/hackathon/projects/${item.alias}`,
      vote: item.vote,
      winner: item.winner ? 'Yes' : 'No',
      secotr: item.tracks?.join(','),
      'prize track': item.prizeTrack,
      location: item.location,
      'pitch video': item.pitchVideo,
      'demo video': item.demoVideo
    };
    [item.detail || {}, item.addition || {}].forEach((ad) => {
      for (let key in ad) {
        if (key === 'detailedIntro') {
          const detailIntro = (ad as any)[key] as string;
          info[key] = createEditor({ html: detailIntro }).getText();
        }
        if (!['id', 'fields'].includes(key)) {
          const dKey = key as keyof typeof ad;
        }
        for (let fKey in ad.fields) {
          info[ad.fields[fKey]['label']] = ad.fields[fKey]['value'];
        }
      }
    });
    for (let fKey in item.fields) {
      info[item.fields[fKey]['label']] = item.fields[fKey]['value'];
    }
    return info;
  };

  const handleDownload = (type: 'csv' | 'xlsx') => {
    const newCheckItems = structuredClone(downloadItems);
    const submissionData: Record<string, any>[] = [];

    newCheckItems.forEach((v) => {
      submissionData.push(getInfo(v));
      if (v.members?.length) {
        v.members.forEach((m) => {
          submissionData.push(getMemberInfo(hackathon as unknown as HackathonType, m as any));
        });
      }
    });
    const tabName = tabs.find((v) => v.value === prizeTrack)?.label;
    if (type === 'csv') {
      exportToCsv(submissionData, `${hackathon.name}-${tabName}-submission`);
    } else {
      exportToXlsx(submissionData, `${hackathon.name}-${tabName}-submission`);
    }
    setDownloadOpen(false);
  };

  const handleDown = (item?: ProjectType) => {
    const items = item ? [item] : checkItems;
    if (!items.length) return;
    setDownloadOpen(true);
    setDownloadItems(items);
  };

  const handleMark = (item: ProjectType) => {
    setMarkInfo(item);
    setConfirmOpen(true);
  };

  const confirmMark = () => {
    setConfirmLoading(true);
    webApi.resourceStationApi
      .projectMark(markInfo?.id as string, {
        invalid: !markInfo?.invalid,
        invalidReason
      })
      .then(() => {
        message.success('Mark Success');
        setConfirmOpen(false);
        refresh();
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const changeTeamIds = (id: string) => {
    const newTeamIds = teamIds.includes(id) ? teamIds.filter((v) => v !== id) : [...teamIds, id];
    setTeamIds(newTeamIds);
  };

  const showInfo = (item: any) => {
    setCurInfo(item);
  };

  useEffect(() => {
    setCheckAll(checkItems.length === list.length && list.length > 0);
  }, [checkItems, list]);

  const tableList = useMemo(() => {
    const l = list.map((v, i) => ({
      ...v,
      index: i
    }));
    const newList = cloneDeep(l);
    // teamIds.map((id) => {
    //   const index = l.findIndex((l) => l.id === id);
    //   newList.splice(index + 1, 0, ...l[index].team);
    // });
    return newList;
  }, [list, teamIds]);

  useEffect(() => {
    setCheckItems([]);
    setTeamIds([]);
  }, [list]);

  useEffect(() => {
    setInvalidReason('');
  }, [confirmOpen]);
  return (
    <div className="flex w-full flex-1 flex-col">
      <Operation checkIds={checkItems.map((v) => v.id)} handleDown={() => handleDown()} />
      <AuditTable
        checkIds={checkItems.map((v) => v.id)}
        handleCheckAll={handleCheckAll}
        checkAll={checkAll}
        tableList={tableList}
        information={information}
        changeTeamIds={changeTeamIds}
        handleCheck={handleCheck}
        teamIds={teamIds}
        showInfo={showInfo}
        loading={loading}
      />
      <InfoModal
        open={!!curInfo?.id}
        curInfo={curInfo}
        renderItem={() =>
          tableList?.map((info) => (
            <InfoContent
              key={info.id}
              info={info}
              handleDown={() => handleDown(info)}
              handleMark={() => handleMark(info)}
              onClose={() => setCurInfo(null)}
            />
          ))
        }
      />
      <ConfirmModal
        open={confirmOpen}
        isLoading={confirmLoading}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmMark}
        autoClose={false}
        confirmDisable={!markInfo?.invalid && !invalidReason.length}
      >
        <div>
          <p>
            {markInfo?.invalid
              ? `Confirm to restore ${markInfo?.name} to qualified`
              : `Confirm to mark ${markInfo?.name} as unqualified`}
          </p>
          {!markInfo?.invalid && (
            <div className="mt-[30px] w-full">
              <Input
                label={<span className="body-s text-neutral-medium-gray">{'Reasons for disqualification'}</span>}
                name=""
                value={invalidReason}
                theme="light"
                placeholder={'Reason...'}
                className="h-[40px] border-neutral-medium-gray"
                maxLength={60}
                onChange={(e) => setInvalidReason(e.target.value)}
              />
              <div className="body-l mt-[10px] flex w-full justify-end text-neutral-medium-gray">{`${invalidReason.length}/60`}</div>
            </div>
          )}
        </div>
      </ConfirmModal>
      <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} handleDownload={handleDownload} />
    </div>
  );
};

export default CommonTable;
