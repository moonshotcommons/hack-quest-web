import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ApplicationStatus, InformationType } from '../../../../../constants/type';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import dayjs from 'dayjs';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { BiXCircle } from 'react-icons/bi';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';

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
  tabStatus: ApplicationStatus;
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
  teamIds,
  tabStatus
}) => {
  const { hackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );

  const renderTd = (key: string, item: any) => {
    switch (key) {
      case 'name':
        return (
          <div className={`flex items-center gap-[8px] ${!item.team?.length && 'pl-[32px]'}`}>
            {item.team?.length > 0 && (
              <span
                className="flex-shrink-0 cursor-pointer text-neutral-medium-gray"
                onClick={() => changeTeamIds(item.id)}
              >
                {teamIds.includes(item.id) ? (
                  <IoIosRemoveCircleOutline size={24} />
                ) : (
                  <IoIosAddCircleOutline size={24} />
                )}
              </span>
            )}
            <span className="flex-1 truncate">{item[key]}</span>
          </div>
        );
      case 'createdAt':
        return dayjs(item[key]).format('MMM D,YYYY');
      default:
        return item[key];
    }
  };
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
          {hackathon?.info?.mode !== 'ONLINE' && (
            <>
              {tabStatus === ApplicationStatus.REVIEW && <TableHead className="w-[15.625rem]">Actions</TableHead>}
              {tabStatus === ApplicationStatus.APPROVED && <TableHead className="w-[29.375rem]">Status</TableHead>}
              {tabStatus === ApplicationStatus.REJECTED && <TableHead className="w-[15.625rem]">Status</TableHead>}
              {tabStatus === ApplicationStatus.WAIT && <TableHead className="w-[21.875rem]">Status</TableHead>}
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody className="body-s block h-[calc(100%-50px)] w-full overflow-auto text-neutral-off-black">
        {tableList.map((item: any, i: number) => (
          <TableRow
            key={item.id}
            className={`table w-full table-fixed border-none [&>td]:border-r [&>td]:border-neutral-light-gray ${item.pId ? 'bg-neutral-off-white' : item.index % 2 ? 'bg-yellow-extra-light' : ''}`}
          >
            <TableCell
              className="w-[44px] cursor-pointer border-l  border-neutral-light-gray p-0 text-center"
              onClick={() => handleCheck(item.id)}
            >
              {!item.pId && <Checkbox checked={checkIds.includes(item.id)} />}
            </TableCell>
            {information.map((v) => (
              <TableCell
                key={v.value}
                className="min-w-[180px] truncate"
                title={v.value === 'createdAt' ? dayjs(item[v.value]).format('MMM D,YYYY') : item[v.value]}
              >
                {renderTd(v.value, item)}
              </TableCell>
            ))}
            {hackathon?.info?.mode !== 'ONLINE' && (
              <>
                {tabStatus === ApplicationStatus.REVIEW && (
                  <TableCell className="w-[15.625rem]">
                    {!item.pId && (
                      <div className="flex gap-[24px] underline [&>div]:cursor-pointer">
                        <div onClick={() => handleStautusSingle(item, ApplicationStatus.APPROVED)}>Approve</div>
                        <div onClick={() => handleStautusSingle(item, ApplicationStatus.REJECTED)}>Decline</div>
                        <div onClick={() => handleStautusSingle(item, ApplicationStatus.WAIT)}>Waitlist</div>
                      </div>
                    )}
                  </TableCell>
                )}
                {tabStatus === ApplicationStatus.APPROVED && (
                  <TableCell className="w-[29.375rem]">
                    <div className="body-s flex items-center gap-[16px] text-neutral-off-black">
                      <div className="flex items-center gap-[8px]">
                        <IoCheckmarkCircleSharp size={24} className="text-status-success" />
                        <span>Approve</span>
                        <span
                          className="cursor-pointer text-neutral-medium-gray underline"
                          onClick={() => handleStautusSingle(item, ApplicationStatus.REVIEW)}
                        >
                          Undo
                        </span>
                      </div>
                      <div
                        className={`flex w-[136px] items-center gap-[8px] ${false ? '' : 'text-neutral-medium-gray'}`}
                      >
                        {false ? (
                          <>
                            <IoCheckmarkCircleSharp size={24} className="text-status-success" />
                            <span>Confirmed</span>
                          </>
                        ) : (
                          <>
                            <IoCheckmarkCircleSharp size={24} />
                            <span>Not Confirmed</span>
                          </>
                        )}
                      </div>
                      <div
                        className={`flex w-[136px] items-center gap-[8px] ${false ? '' : 'text-neutral-medium-gray'}`}
                      >
                        {false ? (
                          <>
                            <IoCheckmarkCircleSharp size={24} className="text-status-success" />
                            <span>Submitted</span>
                          </>
                        ) : (
                          <>
                            <IoCheckmarkCircleSharp size={24} />
                            <span>Not Submitted</span>
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                )}

                {tabStatus === ApplicationStatus.REJECTED && (
                  <TableCell className="w-[15.625rem]">
                    {!item.pId && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[8px]">
                          <BiXCircle size={24} className="text-status-error-dark" />
                          <span>Declined</span>
                        </div>
                        <span
                          className="cursor-pointer text-neutral-medium-gray underline"
                          onClick={() => handleStautusSingle(item, ApplicationStatus.REVIEW)}
                        >
                          Undo
                        </span>
                      </div>
                    )}
                  </TableCell>
                )}

                {tabStatus === ApplicationStatus.WAIT && (
                  <TableCell className="w-[21.875rem]">
                    {!item.pId && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[8px]">
                          <MdOutlineAccessTimeFilled size={24} />
                          <span>Waitlisted</span>
                        </div>
                        <div className="flex gap-[16px] underline [&>div]:cursor-pointer">
                          <div onClick={() => handleStautusSingle(item, ApplicationStatus.APPROVED)}>Approve</div>
                          <div onClick={() => handleStautusSingle(item, ApplicationStatus.REJECTED)}>Decline</div>
                          <div
                            onClick={() => handleStautusSingle(item, ApplicationStatus.REVIEW)}
                            className="text-neutral-medium-gray"
                          >
                            Undo
                          </div>
                        </div>
                      </div>
                    )}
                  </TableCell>
                )}
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AuditTable;
