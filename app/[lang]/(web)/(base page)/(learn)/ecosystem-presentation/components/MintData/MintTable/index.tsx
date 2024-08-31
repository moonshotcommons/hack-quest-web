import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mintTableInformation } from '../../../constant/data';
import BaseImage from '@/components/Common/BaseImage';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import { ecosystemUserData } from '@/service/webApi/ecosystem/type';
import { Spinner } from '@/components/ui/spinner';

interface MintTableProp {
  tableList: ecosystemUserData[];
  loading: boolean;
}

const MintTable: React.FC<MintTableProp> = ({ tableList, loading }) => {
  const { redirectToUrl } = useRedirect();
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
          <div className="flex h-full w-full items-center justify-center">
            <Spinner loading={loading} />
          </div>
        ) : (
          <div className="no-scrollbar absolute left-0 top-0 h-full w-full overflow-auto">
            {tableList.length > 0 ? (
              <Table className="table-fixed">
                <TableBody>
                  {tableList?.map((mint) => (
                    <TableRow
                      key={mint.username}
                      className="cursor-pointer"
                      onClick={() => {
                        redirectToUrl(`${MenuLink.USER_PROFILE}/${mint.username}`);
                      }}
                    >
                      {mintTableInformation.map((m) => (
                        <TableCell key={m.value}>
                          {m.value === 'avatar' ? (
                            <BaseImage
                              src={mint.avatar}
                              alt={mint.nickname}
                              className="h-[40px] w-[40px] rounded-[50%]"
                            />
                          ) : (
                            mint[m.value as keyof typeof mint]
                          )}
                        </TableCell>
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
