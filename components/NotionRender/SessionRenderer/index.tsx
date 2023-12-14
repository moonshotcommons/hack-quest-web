import { FC, createContext, useMemo, useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatSource } from './formateSource';
import SessionItemRenderer from './SessionItemRenderer';

export const SessionRendererContext = createContext<{
  currentSessionIndex: number;
  setCurrentSessionIndex: (value: number) => void;
  sessionList: any[];
  setSessionList: (value: any) => void;
  originList: any[];
} | null>(null);

interface SessionRendererProps {
  type: any;
  source: any;
  parent: any;
  onCompleteStateChange: (v: boolean) => void;
}

const SessionRenderer: FC<SessionRendererProps> = (props) => {
  const { source, parent, onCompleteStateChange } = props;
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [sessionList, setSessionList] = useState<any[]>([]);
  const sessionListRef = useRef<HTMLDivElement>();
  const originList = useMemo(() => {
    return formatSource(source);
  }, [source]);

  useEffect(() => {
    setSessionList([]);
    setCurrentSessionIndex(0);
  }, [source]);

  useEffect(() => {
    if (originList && currentSessionIndex < originList.length) {
      const newItem = originList[currentSessionIndex];
      setSessionList(sessionList.concat(newItem));
      return;
    }

    if (currentSessionIndex >= originList.length) {
      onCompleteStateChange(true);
    }
  }, [currentSessionIndex]);

  useEffect(() => {
    if (!sessionList.length && !currentSessionIndex) {
      const newItem = originList[currentSessionIndex];
      setSessionList(sessionList.concat(newItem));
    }
    sessionListRef.current?.scrollTo(0, sessionListRef.current.scrollHeight);
  }, [sessionList]);

  return (
    <SessionRendererContext.Provider
      value={{
        currentSessionIndex,
        setCurrentSessionIndex: (value) => setCurrentSessionIndex(value),
        sessionList,
        setSessionList: (value) => setSessionList(value),
        originList
      }}
    >
      <div
        className="w-full h-full flex flex-col gap-6 overflow-y-scroll scroll-wrap-y no-scrollbar"
        ref={sessionListRef as any}
      >
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
