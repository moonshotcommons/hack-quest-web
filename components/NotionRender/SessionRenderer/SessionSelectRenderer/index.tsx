import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { DialogBox, getJoinedRichText } from '../formateSource';
import { SessionRendererContext } from '..';

interface SessionSelectRendererProps {
  // children: ReactNode;
  item: any;
}

const SessionSelectRenderer: FC<SessionSelectRendererProps> = (props) => {
  const { item } = props;
  const [selectItem, setSelectItem] = useState<any>(null);
  const [wait, setWait] = useState<{
    index: number;
    waitTime: number;
  }>({
    index: 0,
    waitTime: 0
  });
  const {
    setSessionList,
    sessionList,
    currentSessionIndex,
    setCurrentSessionIndex
  } = useContext(SessionRendererContext)!;

  useEffect(() => {
    if (selectItem?.source?.children?.length) {
      waiting(selectItem?.source?.children, wait);
    }
  }, [sessionList]);

  const waiting = (
    array: any[],
    waitInfo: { index: number; waitTime: number }
  ) => {
    if (waitInfo.index >= array.length) return;
    let target = array[waitInfo.index];
    const type = target.type;
    const text = getJoinedRichText(target[type].rich_text);
    if (!text) return;
    const waitTime = text.length * 100 + text.length * 200;
    if (text.trim().startsWith('V：')) {
      const nextObj = {
        type: 'left',
        content: text.replace('V：', '').trim(),
        source: target,
        isAuto: waitInfo.index === array.length - 1 ? true : false
      };
      setTimeout(() => {
        setSessionList(sessionList.concat(nextObj));
        setWait({ index: waitInfo.index + 1, waitTime });
      }, waitInfo.waitTime);
      return;
    }

    if (text.trim().startsWith('你：')) {
      const nextObj = {
        type: 'right',
        content: text.replace('你：', '').trim(),
        source: target
      };
      setTimeout(() => {
        setSessionList(sessionList.concat(nextObj));
        setWait({ index: waitInfo.index + 1, waitTime });
      }, waitInfo.waitTime);
    }
  };

  // useEffect(() => {

  // }, [selectItem]);

  return (
    <div className="w-fit max-w-[74%] flex flex-col gap-3 self-end">
      <span className="text-[#676767] text-[0.875rem] leading-[121% ]">
        Select response
      </span>
      {!selectItem &&
        item.children.map((child: any, index: number) => {
          return (
            <div
              key={index}
              className="flex justify-end cursor-pointer"
              onClick={() => {
                setSelectItem(child);
                if (child?.source?.children?.length) {
                  waiting(child?.source?.children, { index: 0, waitTime: 0 });
                } else {
                  setCurrentSessionIndex(currentSessionIndex + 1);
                }
              }}
            >
              <DialogBox direction={child.type}>{child.content}</DialogBox>
            </div>
          );
        })}
      {selectItem && (
        <div className="flex justify-end">
          <DialogBox
            direction={selectItem.type}
            onClick={() => {
              const endIndex = sessionList.findIndex((item) => {
                return item.source.id === selectItem.source.parent_block_id;
              });
              let newSessionList;
              if (endIndex === currentSessionIndex) {
                newSessionList = sessionList.slice(0, endIndex + 1);
              } else {
                newSessionList = sessionList.slice(0, endIndex);
              }

              setSelectItem(null);
              setCurrentSessionIndex(endIndex);
              setSessionList(newSessionList);
            }}
          >
            {selectItem.content}
          </DialogBox>
        </div>
      )}
    </div>
  );
};

export default SessionSelectRenderer;
