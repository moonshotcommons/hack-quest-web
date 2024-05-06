import webApi from '@/service';
import { FC } from 'react';
import ExpandWrap from './ExpandWrap';
import Link from 'next/link';
import { cn } from '@/helper/utils';

interface DocsSidebarProps {
  selectAlias: string;
}

const DocsSidebar: FC<DocsSidebarProps> = async ({ selectAlias }) => {
  const docs = await webApi.helperApi.fetchGetDocs();
  return (
    <div className="fixed left-0 top-[64px] h-[calc(100vh-64px)] w-[296px] bg-neutral-off-white py-10 shadow-[2px_0px_4px_0px_rgba(0,0,0,0.12)]">
      {docs.map((doc) => {
        return (
          <ExpandWrap key={doc.id} doc={doc} selectAlias={selectAlias}>
            {doc.children.map((child) => {
              return (
                <div key={child.id} className="flex flex-col pb-2">
                  <div className="body-l-bold pl-10 pr-5 text-neutral-rich-gray">{child.title}</div>
                  <div className="mt-2 flex flex-col">
                    {child.children.map((item) => {
                      return (
                        <Link
                          href={`/docs/${item.alias}`}
                          key={item.id}
                          className={cn(
                            'body-m relative block rounded-l-[8px] py-2 pl-14 pr-4',
                            selectAlias === item.alias
                              ? 'bg-neutral-white text-neutral-black'
                              : 'text-neutral-medium-gray'
                          )}
                        >
                          <span
                            className={cn(
                              'absolute left-0 top-0 h-full w-2 rounded-l-[8px] bg-yellow-dark',
                              selectAlias === item.alias ? '' : 'hidden'
                            )}
                          >
                            &nbsp;
                          </span>
                          <span>{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </ExpandWrap>
        );
      })}
    </div>
  );
};

export default DocsSidebar;
