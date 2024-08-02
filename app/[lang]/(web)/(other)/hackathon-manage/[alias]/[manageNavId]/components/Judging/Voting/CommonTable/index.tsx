'use client';
import React from 'react';
import { SelectType } from '../../../../../../constants/type';
import AuditTable from './AuditTable';
import { HackathonJudgeProjectType } from '@/service/webApi/resourceStation/type';

interface CommonTableProp {
  list: HackathonJudgeProjectType[];
  information: SelectType[];
  loading: boolean;
}

const CommonTable: React.FC<CommonTableProp> = ({ loading, list, information }) => {
  return (
    <div className="flex w-full flex-1 flex-col">
      <AuditTable tableList={list} information={information} loading={loading} />
    </div>
  );
};

export default CommonTable;
