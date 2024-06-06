'use client';
import webApi from '@/service';
import { FC, useEffect, useState } from 'react';
import ExpandWrap from './ExpandWrap';
import Link from 'next/link';
import { cn } from '@/helper/utils';
import { motion } from 'framer-motion';
import { DocsItem } from '@/service/webApi/helper/type';
import useGetHeight from '@/hooks/dom/useGetHeight';
import { errorMessage } from '@/helper/ui';

interface DocsSidebarProps {
  selectAlias: string;
  open: boolean;
}

const DocsSidebar: FC<DocsSidebarProps> = ({ selectAlias, open }) => {
  const [docs, setDocs] = useState<DocsItem[]>([]);

  useEffect(() => {
    webApi.helperApi
      .getDocs()
      .then((res) => {
        setDocs(res);
      })
      .catch((err) => {
        errorMessage(err);
      });
  }, []);

  const { pageHeight } = useGetHeight();

  return (
    <div className="absolute left-0 top-16 w-full" style={{ height: pageHeight }}>
      <motion.div
        animate={{
          backgroundColor: open ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)'
        }}
        className="fixed left-0 top-16 z-[98] h-full w-full bg-neutral-white"
        style={{ height: pageHeight }}
      />
      <motion.div
        className={cn(
          'fixed -left-[76%] top-16 z-[99] w-[76%] bg-neutral-off-white py-10 shadow-[2px_0px_4px_0px_rgba(0,0,0,0.12)]'
        )}
        style={{ height: pageHeight }}
        animate={{
          left: open ? '0' : '-77%'
        }}
      >
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
      </motion.div>
    </div>
  );
};

export default DocsSidebar;
