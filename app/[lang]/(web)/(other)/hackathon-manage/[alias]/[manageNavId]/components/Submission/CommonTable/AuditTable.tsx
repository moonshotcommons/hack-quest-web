import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { SelectType } from '../../../../../constants/type';
import dayjs from '@/components/Common/Dayjs';
import { Spinner } from '@/components/ui/spinner';
import BaseImage from '@/components/Common/BaseImage';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import NoData from '../../NoData';

interface AuditTableProp {
  handleCheckAll: VoidFunction;
  checkAll: boolean;
  information: SelectType[];
  tableList: any;
  checkIds: string[];
  changeTeamIds: (id: string) => void;
  teamIds: string[];
  handleCheck: (item: ProjectType) => void;
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
  const renderText = (key: string, item: any) => {
    switch (key) {
      case 'createdAt':
        return dayjs(item[key]).format('MMM D,YYYY');
      case 'tracks':
        return item[key].join(',');
      case 'winner':
        return item[key] ? 'YES' : 'NO';
      default:
        return item[key];
    }
  };
  const renderTd = (key: string, item: any) => {
    switch (key) {
      case 'name':
        return (
          <div className={`flex cursor-pointer items-center gap-[8px]`} onClick={() => showInfo(item)}>
            <BaseImage
              src={item.logo}
              alt={item[key]}
              className="h-[32px] w-[32px] rounded-[4px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
            />
            <span className="flex-1 truncate">{renderText(key, item)}</span>
          </div>
        );
      default:
        return renderText(key, item);
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
                    <div className={`${v.value === 'name' && 'pl-[37px]'}`}>{v.label}</div>
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
                  tableContainerClassName="max-h-full rounded-b-[8px] border-l border-b border-neutral-light-gray overflow-auto no-scrollbar"
                >
                  <TableBody className={`body-s w-full text-neutral-off-black`}>
                    {tableList.map((item: any) => (
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
                          <TableCell key={v.value} className="min-w-[180px] truncate" title={renderText(v.value, item)}>
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
