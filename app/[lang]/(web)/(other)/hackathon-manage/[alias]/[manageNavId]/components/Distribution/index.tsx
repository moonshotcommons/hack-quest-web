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
import { DistributionDataType, GrowthDataType, UtmSourceType } from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';
import { message } from 'antd';
import Loading from '@/components/Common/Loading';
import { GrowthOptionValue } from '../../../../constants/type';
import { growthOptions } from '../../../../constants/data';

interface DistributionProp {}

const Distribution: React.FC<DistributionProp> = () => {
  const query = useSearchParams();
  const { alias } = useParams();
  const { hackathon } = useHackathonManageStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [open, setOpen] = useState(false);
  const [curSource, setCurSource] = useState<UtmSourceType | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [curKind, setCurKind] = useState<GrowthOptionValue>(growthOptions[0].value);
  const queryClient = useQueryClient();

  const { data: utmSources, isLoading: getLoading } = useQuery<UtmSourceType[]>({
    queryKey: ['get-source'],
    queryFn: () => webApi.resourceStationApi.getUtmSource(alias as string)
  });

  const { mutate: addUtmSource, isPending: addLoading } = useMutation({
    mutationFn: (param: UtmSourceType) => webApi.resourceStationApi.addUtmSource(alias as string, param),
    onSuccess: () => {
      message.success('Add successfully');
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['get-source'] });
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
      queryClient.invalidateQueries({ queryKey: ['get-source'] });
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
      queryClient.invalidateQueries({ queryKey: ['get-source'] });
    },
    onError: (err) => {
      errorMessage(err);
    }
  });

  const { data: growthData, isLoading: growthLoading } = useQuery<GrowthDataType>({
    queryKey: ['get-growth', curKind],
    queryFn: () => webApi.resourceStationApi.getUtmGrowth(alias as string, curKind)
  });

  const { data: distributionData, isLoading: disLoaidng } = useQuery<DistributionDataType>({
    queryKey: ['get-distribution'],
    queryFn: () => webApi.resourceStationApi.getUtmDistribution(alias as string)
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
    if (!getLoading) {
      if (!utmSources?.length) {
        setOpen(true);
      } else {
        console.info(11111);
        queryClient.invalidateQueries({ queryKey: ['get-growth'] });
        queryClient.invalidateQueries({ queryKey: ['get-distribution'] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utmSources, getLoading]);
  return (
    <>
      <Loading loading={getLoading}>
        <div className="flex flex-col gap-[40px]">
          {(utmSources as UtmSourceType[])?.length > 0 && (
            <>
              <Sources handleSource={handleSource} utmSources={utmSources as UtmSourceType[]} />
              <Growth
                curKind={curKind}
                setCurKind={setCurKind}
                growthData={growthData as unknown as GrowthDataType}
                isLoading={growthLoading}
              />
              <Various distributionData={distributionData as unknown as DistributionDataType} isLoading={disLoaidng} />
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
