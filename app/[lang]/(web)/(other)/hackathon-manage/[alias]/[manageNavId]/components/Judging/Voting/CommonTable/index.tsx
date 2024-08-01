'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { SelectType } from '../../../../../../constants/type';
import AuditTable from './AuditTable';
import { ApplicationStatus, HackathonManageApplicationType } from '@/service/webApi/resourceStation/type';

interface CommonTableProp {
  list: HackathonManageApplicationType[];
  information: SelectType[];
  status: ApplicationStatus;
  loading: boolean;
}

const CommonTable: React.FC<CommonTableProp> = ({ loading, list, information, status: tabStatus }) => {
  return (
    <div className="flex w-full flex-1 flex-col">
      <AuditTable tableList={list} information={information} loading={loading} />
    </div>
  );
};

export default CommonTable;
