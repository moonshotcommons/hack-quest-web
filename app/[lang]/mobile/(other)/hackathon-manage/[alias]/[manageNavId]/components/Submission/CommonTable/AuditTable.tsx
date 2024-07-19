import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { InformationType } from '../../../../../constants/type';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import dayjs from 'dayjs';
import { Spinner } from '@/components/ui/spinner';

interface AuditTableProp {
  handleCheckAll: VoidFunction;
  checkAll: boolean;
  information: InformationType[];
  tableList: any;
  checkIds: string[];
  changeTeamIds: (id: string) => void;
  teamIds: string[];
  handleCheck: (id: string) => void;
  showInfo: (v: any) => void;
  loading: boolean;
}

const AuditTable: React.FC<AuditTableProp> = ({
  handleCheckAll,
  checkAll,
  information,
  tableList,
  checkIds,
  changeTeamIds,
  handleCheck,
  teamIds,
  showInfo,
  loading
}) => {
  const renderTd = (key: string, item: any) => {
    switch (key) {
      case 'ptName':
        return (
          <div className="flex cursor-pointer items-center gap-[8px]" onClick={() => showInfo(item)}>
            111 {item[key]}
          </div>
        );
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
    <div className="flex flex-1 flex-col">
      {loading ? (
        <div className="flex-center h-full w-full">
          <Spinner />
        </div>
      ) : (
        <>
          <Table className="table-fixed  " tableContainerClassName="overflow-hidden">
            <TableHeader className={`table w-full table-fixed `}>
              <TableRow className="body-m-bold table w-full table-fixed border-b-0  border-l border-neutral-light-gray  bg-neutral-off-white text-neutral-rich-gray [&>th]:border-r [&>th]:border-neutral-light-gray">
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
              </TableRow>
            </TableHeader>
          </Table>
          <div className="relative flex-1 ">
            <div className="absolute left-0 top-0 h-full w-full ">
              <Table
                className="table-fixed"
                tableContainerClassName="max-h-full rounded-b-[8px] border-l border-b border-neutral-light-gray overflow-auto "
              >
                <TableBody className={`body-s w-full text-neutral-off-black`}>
                  {tableList.map((item: any) => (
                    <TableRow
                      key={item.id}
                      className={`table w-full table-fixed border-none [&>td]:border-r [&>td]:border-neutral-light-gray ${item.pId ? 'bg-neutral-off-white' : item.index % 2 ? 'bg-yellow-extra-light' : ''}`}
                    >
                      <TableCell
                        className="w-[44px] cursor-pointer  p-0 text-center"
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuditTable;
