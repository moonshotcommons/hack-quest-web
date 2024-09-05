import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mintTableInformation } from '../../../constant/data';
import BaseImage from '@/components/Common/BaseImage';
import MenuLink from '@/constants/MenuLink';
import { ecosystemUserData } from '@/service/webApi/ecosystem/type';
import Link from 'next/link';
import Loading from '@/components/Common/Loading';

interface MintTableProp {
  tableList: ecosystemUserData[];
  loading: boolean;
}

const MintTable: React.FC<MintTableProp> = ({ tableList, loading }) => {
  const renderTd = (key: string, item: ecosystemUserData) => {
    switch (key) {
      case 'avatar':
        return <BaseImage src={item.avatar} alt={item.nickname} className="h-[40px] w-[40px] rounded-[50%]" />;
      case 'link':
        return (
          <Link href={`${MenuLink.USER_PROFILE}/${item.username}`} className="underline">
            <span className="text-neutral-off-black">{`profile/${item.username}`}</span>
          </Link>
        );
      default:
        return item[key as keyof typeof item];
    }
  };
  return (
    <div className="flex h-full flex-col">
      <Table className="table-fixed" tableContainerClassName="overflow-hidden">
        <TableHeader className={`table w-full table-fixed `}>
          <TableRow>
            {mintTableInformation.map((m) => (
              <TableHead key={m.value} className="min-w-[180px]">
                <div>{m.label}</div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      </Table>
      <div className="relative flex-1">
        {loading ? (
          <div className="flex h-full justify-center overflow-hidden pt-[80px]">
            <Loading loading={true} />
          </div>
        ) : (
          <div className="no-scrollbar absolute left-0 top-0 h-full w-full overflow-auto">
            {tableList?.length > 0 ? (
              <Table className="table-fixed">
                <TableBody>
                  {tableList?.map((mint) => (
                    <TableRow key={mint.username}>
                      {mintTableInformation.map((m) => (
                        <TableCell key={m.value}>{renderTd(m.value, mint)}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="pt-[80px] text-center">No data</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MintTable;
