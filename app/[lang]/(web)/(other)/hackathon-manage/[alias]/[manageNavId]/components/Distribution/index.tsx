'use client';
import React, { useState, useEffect } from 'react';
import Sources from './Sources';
import Growth from './Growth';
import Various from './Various';
import SourceModal from './SourceModal';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import webApi from '@/service';
import { UtmSourceType } from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';
import { message } from 'antd';
import Loading from '@/components/Common/Loading';

interface DistributionProp {}

const Distribution: React.FC<DistributionProp> = () => {
  const query = useSearchParams();
  console.info(query.get('utm'));
  const { alias } = useParams();
  const { hackathon } = useHackathonManageStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [open, setOpen] = useState(false);
  const [curSource, setCurSource] = useState<UtmSourceType | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: utmSources, isLoading: getLoading } = useQuery<UtmSourceType[]>({
    queryKey: ['utmSource'],
    queryFn: () => webApi.resourceStationApi.getUtmSource(alias as string)
  });

  const { mutate: addUtmSource, isPending: addLoading } = useMutation({
    mutationFn: (param: UtmSourceType) => webApi.resourceStationApi.addUtmSource(alias as string, param),
    onSuccess: () => {
      message.success('Add successfully');
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['utmSource'] });
    },
    onError: (err) => {
      errorMessage(err);
    }
  });

  const { mutate: editUtmSource, isPending: editLoading } = useMutation({
    mutationFn: (param: UtmSourceType) =>
      webApi.resourceStationApi.editUtmSource(alias as string, curSource?.id as string, param),
    onSuccess: () => {
      message.success('Update successfully');
      setOpen(false);
      setCurSource(null);
      queryClient.invalidateQueries({ queryKey: ['utmSource'] });
    },
    onError: (err) => {
      errorMessage(err);
    }
  });

  const { mutate: delelteUtmSource, isPending: deleteLoading } = useMutation({
    mutationFn: () => webApi.resourceStationApi.deleteUtmSource(alias as string, curSource?.id as string),
    onSuccess: () => {
      message.success('Delete successfully');
      setOpen(false);
      setCurSource(null);
      setDeleteOpen(false);
      queryClient.invalidateQueries({ queryKey: ['utmSource'] });
    },
    onError: (err) => {
      errorMessage(err);
    }
  });

  const handleSource = (source?: any) => {
    setOpen(true);
    source && setCurSource(source);
  };
  const handleSubmit = (param: UtmSourceType) => {
    if (curSource) {
      editUtmSource(param);
    } else {
      addUtmSource(param);
    }
  };

  useEffect(() => {
    if (!utmSources?.length && !getLoading) {
      setOpen(true);
    }
  }, [utmSources, getLoading]);
  return (
    <>
      <Loading loading={getLoading}>
        <div className="flex flex-col gap-[40px]">
          {(utmSources as UtmSourceType[])?.length > 0 && (
            <>
              <Sources handleSource={handleSource} utmSources={utmSources as UtmSourceType[]} />
              <Growth />
              <Various />
            </>
          )}
        </div>
      </Loading>

      <SourceModal
        open={open}
        onClose={() => {
          setOpen(false);
          setCurSource(null);
        }}
        source={curSource}
        loading={addLoading || editLoading}
        handleDelete={() => setDeleteOpen(true)}
        handleSubmit={handleSubmit}
        hackathon={hackathon}
      />
      <ConfirmModal
        open={deleteOpen}
        autoClose={false}
        onClose={() => setDeleteOpen(false)}
        isLoading={deleteLoading}
        onConfirm={delelteUtmSource}
      >
        {`Do you want to delete the UTM source ${curSource?.sourceName}?`}
      </ConfirmModal>
    </>
  );
};

export default Distribution;
