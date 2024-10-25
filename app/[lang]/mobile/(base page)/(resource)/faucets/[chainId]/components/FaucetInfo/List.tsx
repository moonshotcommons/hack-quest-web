'use client';
import Loading from '@/components/Common/Loading';
import Pagination from '@/components/Common/Pagination';
import webApi from '@/service';
import { FaucetRecordType, FaucetType } from '@/service/webApi/resourceStation/type';
import { useUserStore } from '@/store/zustand/userStore';
import { useRequest } from 'ahooks';
import dayjs from '@/components/Common/Dayjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RiShareBoxLine } from 'react-icons/ri';
import { useShallow } from 'zustand/react/shallow';

interface ListProp {
  faucet: FaucetType;
}

const List: React.FC<ListProp> = ({ faucet }) => {
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  const [records, setRecords] = useState<FaucetRecordType[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getFaucetRecords(faucet.chainId, {
        page,
        limit: 10
      });
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setRecords(res.data);
        setTotal(res.total);
      }
    }
  );
  useEffect(() => {
    if (userInfo) run();
  }, [page, userInfo, run]);
  if (!userInfo || (page === 1 && !records.length)) return null;
  return (
    <>
      <div className="w-full rounded-[.5rem] border border-neutral-light-gray p-[16px]">
        <div className="text-h4-mob mb-[1rem] flex gap-[2.5rem] text-neutral-rich-gray [&>div]:flex-1 [&>div]:flex-shrink-0">
          <div>Transaction</div>
          <div>Timestamp</div>
        </div>
        <Loading loading={loading}>
          <div className="body-s flex flex-col gap-[16px] border-t border-neutral-light-gray pt-[16px] text-neutral-black">
            {records.map((record) => (
              <div key={record.id} className='[&>div]:flex-shrink-0" flex w-full  gap-[40px] [&>div]:flex-1'>
                <div>
                  <Link href={record.exportUrl} target="_blank" className="flex items-center gap-[.5rem]">
                    <span className="text-neutral-off-black">View on explorer</span>
                    <RiShareBoxLine className="text-neutral-off-black" />
                  </Link>
                </div>
                <div>{dayjs(record.claimTime).format('MMM. D, YYYY hh:mm:ss A')}</div>
              </div>
            ))}
          </div>
        </Loading>
      </div>
      {total > 10 && (
        <div className="flex justify-center">
          <Pagination page={page} total={total} onPageChange={setPage} />
        </div>
      )}
    </>
  );
};

export default List;
