import { FC, ReactNode, createContext, useMemo } from 'react';
import { RichTextType } from '../type';
import { useState } from 'react';
import { useEffect } from 'react';
import { render } from '@headlessui/react/dist/utils/render';
import { formatSource } from './formateSource';
import SessionItemRenderer from './SessionItemRenderer';

export const SessionRendererContext = createContext<{
  currentSessionIndex: number;
  setCurrentSessionIndex: (value: number) => void;
  sessionList: any[];
  setSessionList: (value: any) => void;
} | null>(null);

interface SessionRendererProps {
  type: any;
  source: any;
  parent: any;
}

const SessionRenderer: FC<SessionRendererProps> = (props) => {
  const { source, parent } = props;
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [sessionList, setSessionList] = useState<any[]>([]);
  const originList = useMemo(() => {
    return formatSource(source);
  }, [source]);
  console.log(source);
  useEffect(() => {
    console.log(currentSessionIndex);
    if (originList && currentSessionIndex < originList.length) {
      const newItem = originList[currentSessionIndex];
      setSessionList(sessionList.concat(newItem));
    }
  }, [currentSessionIndex]);

  useEffect(() => {
    if (source) {
      formatSource(source);
    }
  }, [source]);

  return (
    <SessionRendererContext.Provider
      value={{
        currentSessionIndex,
        setCurrentSessionIndex: (value) => setCurrentSessionIndex(value),
        sessionList,
        setSessionList: (value) => setSessionList(value)
      }}
    >
      <div className="w-full h-full flex flex-col gap-6 overflow-y-scroll scroll-wrap-y">
        {sessionList?.map((item: any, index: number) => {
          if (!item) return <></>;
          return (
            <SessionItemRenderer key={index} item={item}></SessionItemRenderer>
          );
        })}
      </div>
    </SessionRendererContext.Provider>
  );
};

export default SessionRenderer;
