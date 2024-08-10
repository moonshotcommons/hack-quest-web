'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Tab from '../Tab';
import { Checkbox } from '@/components/ui/checkbox';
import VoteCloseIn from './VoteCloseIn';
import JudgInfo from './JudgInfo';
import JudgesModal from './JudgesModal';
import {
  HackathonJugingInfoType,
  HackathonType,
  HackathonWinnerType,
  SubmissionStatusType
} from '@/service/webApi/resourceStation/type';
import { AuditTabType } from '../../../../constants/type';
import webApi from '@/service';
import { useMutation, useQueries } from '@tanstack/react-query';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import WinnerBelow from './WinnerBelow';
import Voting from './Voting';
import WinnerView from './WinnerView';
import { MultiSelectOption } from '../../../../components/MultiSelect';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { message } from 'antd';
import { errorMessage } from '@/helper/ui';
import { v4 } from 'uuid';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';
import { useRequest } from 'ahooks';
import JudgeDisabledTips from './JudgeDisabledTips';

interface JudgingProp {}

const Judging: React.FC<JudgingProp> = () => {
  const { hackathon, setJudgeInfo } = useHackathonManageStore(
    useShallow((state) => ({
      hackathon: state.hackathon,
      setJudgeInfo: state.setJudgeInfo
    }))
  );
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [winners, setWinners] = useState<HackathonWinnerType[]>([]);
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon as unknown as HackathonType);
  const [baseHandleWinners, setBaseHandleWinners] = useState<HackathonWinnerType[]>([]);
  const [otherHandleWinners, setOtherHandleWinners] = useState<HackathonWinnerType[]>([]);
  const [allWinners, setAllWinners] = useState<HackathonWinnerType[]>([]);
  const [announceOpen, setAnnounceOpen] = useState(false);
  const [deleteWinnerInfo, setDeleteWinnerInfo] = useState<HackathonWinnerType | null>(null);
  const [{ data: tracks = [] }, { data: tabData = [] }] = useQueries({
    queries: [
      {
        queryKey: ['tracks'],
        queryFn: () => webApi.resourceStationApi.getProjectTracksDict(),
        select: (data: string[]) => {
          const newData: MultiSelectOption[] = data.map((v) => ({
            label: v,
            value: v
          }));
          return newData;
        }
      },
      {
        enabled: !!hackathon?.id,
        queryKey: ['prizeTracks', hackathon?.id],
        queryFn: () => webApi.resourceStationApi.getHackathonSubmissionStatus(hackathon.id),
        select: (data: SubmissionStatusType[]) => {
          const newData: AuditTabType[] = data.map((v) => ({
            label: v.name,
            value: v.name,
            count: v.projectCount
          }));
          return newData;
        }
      }
    ]
  });
  const {
    run: refreshJudge,
    loading: judgingLoading,
    data: judgeInfo = {} as HackathonJugingInfoType
  } = useRequest(
    async () => {
      const data = await webApi.resourceStationApi.getHackathonJudgingInfo(hackathon.id, {
        prizeTrack: status
      });
      const judge = data.reward?.judge;
      if (judge.judgeMode === 'judges' && judge.voteMode === 'score') {
        data.projects?.map((v) => {
          v.votes?.scores?.map((s) => {
            s.avatar = judge.judgeAccounts.find((j) => j.id === s.userId)?.avatar || '';
          });
        });
      }
      refreshWinners(data);
      setJudgeInfo(data);
      return data;
    },
    {
      manual: true
    }
  );
  const { run: refreshWinners, loading: winnersLoading } = useRequest(
    async (judge?: HackathonJugingInfoType) => {
      const res = await webApi.resourceStationApi.getHackathonJudgingWinner(hackathon.id, {
        prizeTrack: status
      });
      const jInfo = judge || judgeInfo;
      const newWinners = res?.map((v) => {
        const project = jInfo.projects.find((p) => p.id === v.projectId);
        return {
          ...v,
          project
        };
      }) as unknown as HackathonWinnerType[];
      setWinners(newWinners);
      return res;
    },
    {
      manual: true
    }
  );

  useEffect(() => {
    if (tabData.length) {
      setStatus(tabData[0].value);
    }
  }, [tabData]);

  const onSuccess = () => {
    message.success('Success');
    refreshWinners();
  };
  const { mutate: addWinner, isPending: addLoading } = useMutation({
    mutationFn: ({
      winnerId,
      winner
    }: {
      winnerId: string;
      winner: {
        rewardId: string;
        place: number;
        name: string;
        projectId: string;
        type: 'base' | 'other';
      };
    }) => webApi.resourceStationApi.hackathonWinnerAdd(hackathon.id, winner),
    onSuccess: (_, variables) => {
      variables.winner.type === 'base'
        ? setBaseHandleWinners(baseHandleWinners.filter((v) => v.id !== variables.winnerId))
        : setOtherHandleWinners(otherHandleWinners.filter((v) => v.id !== variables.winnerId));
      onSuccess();
    },
    onError: (err) => {
      errorMessage(err);
    }
  });
  const { mutate: eidtWinner, isPending: editLoading } = useMutation({
    mutationFn: ({ winnerId, winner }: { winnerId: string; winner: { name: string; projectId: string } }) =>
      webApi.resourceStationApi.hackathonWinnerEdit(hackathon.id, winnerId, winner),
    onSuccess,
    onError: (err) => {
      errorMessage(err);
    }
  });
  const { mutate: deleteWinner, isPending: deleteLoading } = useMutation({
    mutationFn: (winnerId: string) => webApi.resourceStationApi.hackathonWinnerDelete(hackathon.id, winnerId),
    onSuccess: () => {
      setDeleteWinnerInfo(null);
      onSuccess();
    },
    onError: (err) => {
      errorMessage(err);
    }
  });
  const { mutate: confirmAnnounce, isPending: announceLoading } = useMutation({
    mutationFn: () => webApi.resourceStationApi.hackathonJudgeAnnounce(hackathon.id, judgeInfo?.reward?.id),
    onSuccess: () => {
      setAnnounceOpen(false);
      message.success('Success');
      refreshJudge();
    },
    onError: (err) => {
      errorMessage(err);
    }
  });

  const handleAdd = (type: 'base' | 'other') => {
    if (type === 'base') {
      const projects = judgeInfo?.projects;
      const project = projects.find((p) =>
        winners.filter((v) => v.type === 'base').every((w) => p.id !== w.project?.id)
      );
      if (!project) return;
      const newWinner = {
        id: `unAdd-${v4()}`,
        name: '',
        place: project?.votes?.rank,
        type,
        project: {
          ...project,
          vote: project?.votes?.totalVotes
        }
      } as unknown as HackathonWinnerType;
      setBaseHandleWinners((pre) => [...pre, newWinner]);
    } else {
      const newWinner = {
        id: `unAdd-${v4()}`,
        name: '',
        type,
        project: {}
      } as unknown as HackathonWinnerType;
      setOtherHandleWinners((pre) => [...pre, newWinner]);
    }
  };

  const handleEdit = (winner: HackathonWinnerType) => {
    if (winner.name && winner.project?.id) {
      const isAdd = /^unAdd/.test(winner.id);
      if (isAdd) {
        if (winner.type === 'base') {
          const initBaseWinners = winners.filter((v) => v.type === 'base');
          if (initBaseWinners.some((v) => v.id === winner.id)) {
            errorMessage('Winner already exists');
            return;
          }
        }
        addWinner({
          winnerId: winner.id,
          winner: {
            rewardId: judgeInfo.reward?.id,
            place: winner.project?.votes?.rank,
            name: winner.name,
            projectId: winner.project?.id,
            type: winner.type
          }
        });
      } else {
        eidtWinner({
          winnerId: winner.id,
          winner: {
            name: winner.name,
            projectId: winner.project?.id
          }
        });
      }
    } else {
      const index = otherHandleWinners.findIndex((v) => v.id === winner.id);
      const newWinners = structuredClone(otherHandleWinners);
      newWinners[index] = winner;
      setOtherHandleWinners(newWinners);
    }
  };

  const handleDelete = (winner: HackathonWinnerType) => {
    if (/^unAdd/.test(winner.id)) {
      winner.type === 'base'
        ? setBaseHandleWinners(baseHandleWinners.filter((v) => v.id !== winner.id))
        : setOtherHandleWinners(otherHandleWinners.filter((v) => v.id !== winner.id));
    } else {
      setDeleteWinnerInfo(winner);
    }
  };

  const loading = useMemo(() => {
    return winnersLoading || addLoading || editLoading || deleteLoading || judgingLoading;
  }, [winnersLoading, addLoading, editLoading, deleteLoading, judgingLoading]);

  useEffect(() => {
    setAllWinners([...winners, ...baseHandleWinners, ...otherHandleWinners]);
  }, [winners, baseHandleWinners, otherHandleWinners]);

  useEffect(() => {
    if (status) {
      refreshJudge();
    }
  }, [status]);
  return (
    <div className="flex h-full flex-col gap-[20px]">
      <div className="flex items-center justify-between">
        <Tab
          curTab={status}
          tabs={tabData}
          changeTab={(tab) => {
            setStatus(tab);
            setBaseHandleWinners([]);
            setOtherHandleWinners([]);
            setAllWinners([]);
          }}
          disable={judgingLoading || winnersLoading}
        />
        <div
          className={`body-s flex cursor-pointer items-center  gap-[8px] ${isShowDetail ? 'text-neutral-off-black' : 'text-neutral-medium-gray'}`}
          onClick={() => setIsShowDetail(!isShowDetail)}
        >
          <Checkbox checked={isShowDetail} />
          <span>Show judging details</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[28px] pb-[40px]">
        <VoteCloseIn judgeInfo={judgeInfo} />
        <JudgInfo
          show={isShowDetail}
          handleShowJudges={() => setOpen(true)}
          rewardJudgeInfo={judgeInfo?.reward?.judge}
        />
        <JudgeDisabledTips rewardJudgeInfo={judgeInfo?.reward?.judge} />
        {judgeInfo.reward?.judge?.disableJudge && (
          <WinnerBelow
            winners={allWinners}
            judgeInfo={judgeInfo}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleAnnounce={() => setAnnounceOpen(true)}
            loading={loading}
          />
        )}
        {!judgeInfo.reward?.judge?.disableJudge &&
          (stepIndex > 1 ? (
            <WinnerView
              winners={allWinners}
              judgeInfo={judgeInfo}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleAnnounce={() => setAnnounceOpen(true)}
              loading={loading}
            />
          ) : (
            <Voting judgeInfo={judgeInfo} loading={judgingLoading} tracks={tracks} />
          ))}
      </div>
      <JudgesModal open={open} onClose={() => setOpen(false)} judgeReward={judgeInfo?.reward} refresh={refreshJudge} />
      <ConfirmModal
        open={!!deleteWinnerInfo?.id}
        autoClose={false}
        isLoading={loading}
        onClose={() => setDeleteWinnerInfo(null)}
        onConfirm={() => deleteWinner(deleteWinnerInfo?.id as string)}
        className=" px-[132px] sm:!w-[808px] sm:!max-w-[808px]"
      >
        {`Do you want to remove winner ${deleteWinnerInfo?.name}`}
      </ConfirmModal>
      <ConfirmModal
        open={announceOpen}
        autoClose={false}
        onClose={() => setAnnounceOpen(false)}
        onConfirm={confirmAnnounce}
        isLoading={announceLoading}
        className=" px-[132px] sm:!w-[808px] sm:!max-w-[808px]"
      >
        <div className="body-m flex flex-col items-center gap-[40px] text-neutral-black">
          <p className="text-h3">Do you want to announce winners?</p>
          <p className="">
            {judgeInfo.reward?.judge?.disableJudge
              ? `This step cannot be undone and all winners will be notified.`
              : `This step cannot be undone and all submitters will be notified. Please check the reward announcement before
            you announce winners.`}
          </p>
          {/* <p className="cursor-pointer underline">Click to check the reward announcement</p> */}
        </div>
      </ConfirmModal>
    </div>
  );
};

export default Judging;
