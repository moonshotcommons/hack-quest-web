import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { SelectType } from '../../../../../constants/type';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import dayjs from '@/components/Common/Dayjs';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { BiXCircle } from 'react-icons/bi';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { Spinner } from '@/components/ui/spinner';
import { ApplicationStatus, HackathonManageApplicationType } from '@/service/webApi/resourceStation/type';
import NoData from '../../NoData';

interface AuditTableProp {
  handleCheckAll: VoidFunction;
  checkAll: boolean;
  information: SelectType[];
  tableList: HackathonManageApplicationType[];
  checkIds: string[];
  changeTeamIds: (id: string) => void;
  handleStatusSingle: (team: any, sta: ApplicationStatus) => void;
  teamIds: string[];
  handleCheck: (item: HackathonManageApplicationType) => void;
  tabStatus: ApplicationStatus;
  showInfo: (item: HackathonManageApplicationType) => void;
  loading: boolean;
  isHandle: boolean;
}

const AuditTable: React.FC<AuditTableProp> = ({
  handleCheckAll,
  checkAll,
  information,
  tableList,
  checkIds,
  changeTeamIds,
  handleStatusSingle,
  handleCheck,
  teamIds,
  tabStatus,
  showInfo,
  loading,
  isHandle
}) => {
  const renderTd = (key: string, item: any) => {
    const len = item.members?.length || 0;
    switch (key) {
      case 'name':
        return (
          <div className={`flex items-center gap-[8px] ${!len && 'pl-[32px]'}`}>
            {len > 0 && (
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
            <span
              className={`flex-1 truncate ${!item.pId && 'cursor-pointer'}`}
              onClick={() => {
                if (item.pId) return;
                showInfo(item);
              }}
            >
              {item[key]}
            </span>
          </div>
        );
      case 'createdAt':
        return dayjs(item[key]).format('MMM D,YYYY');
      default:
        return item[key] || '';
    }
  };
  return (
    <div className="flex flex-1 flex-col">
      {loading ? (
        <div className="flex-center h-full w-full">
          <Spinner />
        </div>
      ) : (
        <>
          <Table className="table-fixed" tableContainerClassName="overflow-hidden">
            <TableHeader className={`table w-full table-fixed `}>
              <TableRow className="body-m-bold table w-full table-fixed border-b-0  border-l border-neutral-light-gray  bg-neutral-off-white text-neutral-rich-gray [&>th]:border-r [&>th]:border-neutral-light-gray">
                <TableHead className="w-[44px] cursor-pointer  p-0 text-center" onClick={handleCheckAll}>
                  <Checkbox checked={checkAll} />
                </TableHead>
                {information.map((v) => (
                  <TableHead key={v.value} className="min-w-[180px]">
                    <div className={`${v.value === 'name' && 'pl-[32px]'}`}>{v.label}</div>
                  </TableHead>
                ))}
                {isHandle && (
                  <>
                    {tabStatus === ApplicationStatus.REVIEW && <TableHead className="w-[15.625rem]">Actions</TableHead>}
                    {tabStatus === ApplicationStatus.APPROVED && (
                      <TableHead className="w-[29.375rem]">Status</TableHead>
                    )}
                    {tabStatus === ApplicationStatus.DECLINE && <TableHead className="w-[15.625rem]">Status</TableHead>}
                    {tabStatus === ApplicationStatus.WAIT && <TableHead className="w-[21.875rem]">Status</TableHead>}
                  </>
                )}
              </TableRow>
            </TableHeader>
          </Table>
          <div className="relative flex-1 ">
            <div className="absolute left-0 top-0 h-full w-full ">
              {!tableList.length ? (
                <div className="flex-center h-full w-full">
                  <NoData />
                </div>
              ) : (
                <Table
                  className="table-fixed"
                  tableContainerClassName="max-h-full rounded-b-[8px] border-l border-b border-neutral-light-gray overflow-auto no-scrollbar "
                >
                  <TableBody className={`body-s w-full text-neutral-off-black`}>
                    {tableList.map((item) => (
                      <TableRow
                        key={item.id}
                        className={`table w-full table-fixed border-none [&>td]:border-r [&>td]:border-neutral-light-gray ${item.pId ? 'bg-neutral-off-white' : item.index % 2 ? 'bg-yellow-extra-light' : ''}`}
                      >
                        <TableCell
                          className="w-[44px] cursor-pointer  p-0 text-center"
                          onClick={() => handleCheck(item)}
                        >
                          {!item.pId && <Checkbox checked={checkIds.includes(item.id)} />}
                        </TableCell>
                        {information.map((v) => (
                          <TableCell
                            key={v.value}
                            className="min-w-[180px] truncate"
                            title={
                              v.value === 'createdAt'
                                ? dayjs(item[v.value]).format('MMM D,YYYY')
                                : (item[v.value as keyof HackathonManageApplicationType] as string)
                            }
                          >
                            {renderTd(v.value, item)}
                          </TableCell>
                        ))}
                        {isHandle && (
                          <>
                            {tabStatus === ApplicationStatus.REVIEW && (
                              <TableCell className="w-[15.625rem]">
                                {!item.pId && (
                                  <div className="flex gap-[24px] underline [&>div]:cursor-pointer">
                                    <div onClick={() => handleStatusSingle(item, ApplicationStatus.APPROVED)}>
                                      Approve
                                    </div>
                                    <div onClick={() => handleStatusSingle(item, ApplicationStatus.DECLINE)}>
                                      Decline
                                    </div>
                                    <div onClick={() => handleStatusSingle(item, ApplicationStatus.WAIT)}>Waitlist</div>
                                  </div>
                                )}
                              </TableCell>
                            )}
                            {tabStatus === ApplicationStatus.APPROVED && (
                              <TableCell className="w-[29.375rem]">
                                {!item.pId && (
                                  <div className="body-s flex items-center gap-[16px] text-neutral-off-black">
                                    <div className="flex items-center gap-[8px]">
                                      <IoCheckmarkCircleSharp size={24} className="text-status-success" />
                                      <span>Approve</span>
                                      <span
                                        className="cursor-pointer text-neutral-medium-gray underline"
                                        onClick={() => handleStatusSingle(item, ApplicationStatus.REVIEW)}
                                      >
                                        Undo
                                      </span>
                                    </div>
                                    <div
                                      className={`flex w-[136px] items-center gap-[8px] ${item.isRegister ? '' : 'text-neutral-medium-gray'}`}
                                    >
                                      {item.isRegister ? (
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
                                      className={`flex w-[136px] items-center gap-[8px] ${item.isSubmitted ? '' : 'text-neutral-medium-gray'}`}
                                    >
                                      {item.isSubmitted ? (
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
                                )}
                              </TableCell>
                            )}

                            {tabStatus === ApplicationStatus.DECLINE && (
                              <TableCell className="w-[15.625rem]">
                                {!item.pId && (
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[8px]">
                                      <BiXCircle size={24} className="text-status-error-dark" />
                                      <span>Declined</span>
                                    </div>
                                    <span
                                      className="cursor-pointer text-neutral-medium-gray underline"
                                      onClick={() => handleStatusSingle(item, ApplicationStatus.REVIEW)}
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
                                      <div onClick={() => handleStatusSingle(item, ApplicationStatus.APPROVED)}>
                                        Approve
                                      </div>
                                      <div onClick={() => handleStatusSingle(item, ApplicationStatus.DECLINE)}>
                                        Decline
                                      </div>
                                      <div
                                        onClick={() => handleStatusSingle(item, ApplicationStatus.REVIEW)}
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
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuditTable;
