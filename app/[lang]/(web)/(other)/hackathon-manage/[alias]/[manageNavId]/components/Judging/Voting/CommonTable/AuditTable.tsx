import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import dayjs from 'dayjs';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { BiXCircle } from 'react-icons/bi';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { Spinner } from '@/components/ui/spinner';
import { ApplicationStatus, HackathonManageApplicationType } from '@/service/webApi/resourceStation/type';
import NoData from '../../../NoData';
import { SelectType } from '../../../../../../constants/type';

interface AuditTableProp {
  information: SelectType[];
  tableList: HackathonManageApplicationType[];
  loading: boolean;
}

const AuditTable: React.FC<AuditTableProp> = ({ information, tableList, loading }) => {
  const renderTd = (key: string, item: any) => {
    switch (key) {
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
                {information.map((v) => (
                  <TableHead key={v.value} className="min-w-[180px]">
                    <div className={`${v.value === 'name' && 'pl-[32px]'}`}>{v.label}</div>
                  </TableHead>
                ))}
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
                  tableContainerClassName="max-h-full rounded-b-[8px] border-l border-b border-neutral-light-gray overflow-auto "
                >
                  <TableBody className={`body-s w-full text-neutral-off-black`}>
                    {tableList.map((item) => (
                      <TableRow
                        key={item.id}
                        className={`table w-full table-fixed border-none [&>td]:border-r [&>td]:border-neutral-light-gray ${item.pId ? 'bg-neutral-off-white' : item.index % 2 ? 'bg-yellow-extra-light' : ''}`}
                      >
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
