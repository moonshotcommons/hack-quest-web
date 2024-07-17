import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ApplicationStatus, InformationType } from '../../../../constants/type';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import dayjs from 'dayjs';

interface AuditTableProp {
  handleCheckAll: VoidFunction;
  checkAll: boolean;
  information: InformationType[];
  tableList: any;
  checkIds: string[];
  changeTeamIds: (id: string) => void;
  handleStautusSingle: (team: any, sta: ApplicationStatus) => void;
  teamIds: string[];
  handleCheck: (id: string) => void;
}

const AuditTable: React.FC<AuditTableProp> = ({
  handleCheckAll,
  checkAll,
  information,
  tableList,
  checkIds,
  changeTeamIds,
  handleStautusSingle,
  handleCheck,
  teamIds
}) => {
  return (
    <Table className="h-full" tableClassName={'flex-1 overflow-hidden w-full '}>
      <TableHeader className="table w-full table-fixed">
        <TableRow className="body-m-bold table w-full  table-fixed border-none bg-neutral-off-white text-neutral-rich-gray [&>th]:border-r [&>th]:border-neutral-light-gray">
          <TableHead
            className="w-[44px] cursor-pointer border-l border-neutral-light-gray p-0 text-center"
            onClick={handleCheckAll}
          >
            <Checkbox checked={checkAll} />
          </TableHead>
          {information.map((v) => (
            <TableHead key={v.value} className="min-w-[180px]">
              <div className={`${v.value === 'name' && 'pl-[32px]'}`}>{v.label}</div>
            </TableHead>
          ))}
          <TableHead className="w-[15.625rem]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="body-s block h-[calc(100%-50px)] w-full overflow-auto text-neutral-off-black">
        {tableList.map((team: any, i: number) => (
          <TableRow
            key={team.id}
            className={`table w-full table-fixed border-none [&>td]:border-r [&>td]:border-neutral-light-gray ${team.pId ? 'bg-neutral-off-white' : team.index % 2 ? 'bg-yellow-extra-light' : ''}`}
          >
            <TableCell
              className="w-[44px] cursor-pointer border-l  border-neutral-light-gray p-0 text-center"
              onClick={() => handleCheck(team.id)}
            >
              {!team.pId && <Checkbox checked={checkIds.includes(team.id)} />}
            </TableCell>
            {information.map((v) => (
              <TableCell
                key={v.value}
                className="min-w-[180px] truncate"
                title={v.value === 'createdAt' ? dayjs(team[v.value]).format('YYYY-M-DD hh:mm') : team[v.value]}
              >
                {v.value === 'name' && (
                  <div className={`flex cursor-pointer items-center gap-[8px] ${!team.team?.length && 'pl-[32px]'}`}>
                    {team.team?.length > 0 && (
                      <span
                        className="flex-shrink-0 cursor-pointer text-neutral-medium-gray"
                        onClick={() => changeTeamIds(team.id)}
                      >
                        {teamIds.includes(team.id) ? (
                          <IoIosRemoveCircleOutline size={24} />
                        ) : (
                          <IoIosAddCircleOutline size={24} />
                        )}
                      </span>
                    )}
                    <span className="flex-1 truncate">{team[v.value]}</span>
                  </div>
                )}
                {v.value === 'createdAt'
                  ? dayjs(team[v.value]).format('YYYY-M-DD hh:mm')
                  : v.value !== 'name'
                    ? team[v.value]
                    : null}
              </TableCell>
            ))}
            <TableCell className="w-[15.625rem]">
              {!team.pId && (
                <div className="flex gap-[24px] underline [&>div]:cursor-pointer">
                  <div onClick={() => handleStautusSingle(team, ApplicationStatus.APPROVED)}>Approve</div>
                  <div onClick={() => handleStautusSingle(team, ApplicationStatus.REJECTED)}>Decline</div>
                  <div onClick={() => handleStautusSingle(team, ApplicationStatus.WAIT)}>Waitlist</div>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AuditTable;
