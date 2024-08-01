import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dayjs from 'dayjs';
import { Spinner } from '@/components/ui/spinner';
import { HackathonManageApplicationType } from '@/service/webApi/resourceStation/type';
import NoData from '../../../NoData';
import { SelectType } from '../../../../../../constants/type';
import BaseImage from '@/components/Common/BaseImage';

interface AuditTableProp {
  information: SelectType[];
  tableList: HackathonManageApplicationType[];
  loading: boolean;
}

const AuditTable: React.FC<AuditTableProp> = ({ information, tableList, loading }) => {
  const renderText = (key: string, item: any) => {
    switch (key) {
      case 'tracks':
        return item[key].join(',');
      default:
        if (key in item.votes) {
          return item?.votes?.[key];
        }
        return item[key];
    }
  };
  const renderTd = (key: string, item: any) => {
    switch (key) {
      case 'name':
        return (
          <div className={`flex  items-center gap-[8px]`}>
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
          <Table className="table-fixed" tableContainerClassName="overflow-hidden">
            <TableHeader className={`table w-full table-fixed `}>
              <TableRow className="body-m-bold table w-full table-fixed border-b-0  border-l border-neutral-light-gray  bg-neutral-off-white text-neutral-rich-gray [&>th]:border-r [&>th]:border-neutral-light-gray">
                {information.map((v) => (
                  <TableHead key={v.value} className={`min-w-[180px] ${v.value === 'rank' && 'w-[60px]'}`}>
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
                        className={`table w-full table-fixed border-none [&>td]:border-r [&>td]:border-neutral-light-gray ${item.index % 2 ? 'bg-yellow-extra-light' : ''} `}
                      >
                        {information.map((v) => (
                          <TableCell
                            key={v.value}
                            className={`min-w-[180px] truncate ${v.value === 'rank' && 'w-[60px]'}`}
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
