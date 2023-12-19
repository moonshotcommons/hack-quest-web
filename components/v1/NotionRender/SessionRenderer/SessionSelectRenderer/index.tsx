import { FC, useContext, useEffect, useState } from 'react';
import { DialogBox, getJoinedRichText } from '../formateSource';
import { SessionRendererContext } from '..';
import { useDebounceFn } from 'ahooks';

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
    isEnd: boolean;
  }>({
    index: 0,
    waitTime: 0,
    isEnd: false
  });
  const {
    setSessionList,
    sessionList,
    currentSessionIndex,
    setCurrentSessionIndex,
    originList
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
    if (waitInfo.index >= array.length) {
      setTimeout(() => {
        setWait({ ...waitInfo, isEnd: true });
      }, waitInfo.waitTime);
      return;
    }
    let target = array[waitInfo.index];
    const type = target.type;
    const text = getJoinedRichText(target[type].rich_text);
    if (!text) return;
    const waitTime = text.length * 25 + text.length * 50;
    if (text.trim().startsWith('V：')) {
      const nextObj = {
        type: 'left',
        content: text.replace('V：', '').trim(),
        source: target,
        isAuto: waitInfo.index === array.length - 1 ? true : false
      };
      setTimeout(() => {
        setSessionList(sessionList.concat(nextObj));
        setWait({ index: waitInfo.index + 1, waitTime, isEnd: false });
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
        setWait({ index: waitInfo.index + 1, waitTime, isEnd: false });
      }, waitInfo.waitTime);
    }
  };

  const { run: onNext } = useDebounceFn(
    (child) => {
      setSelectItem(child);
      if (child?.source?.children?.length) {
        waiting(child?.source?.children, { index: 0, waitTime: 0 });
      } else {
        setCurrentSessionIndex(currentSessionIndex + 1);
        const nextSession = originList[currentSessionIndex + 1];
        const text = nextSession.content;
        if (!text) {
          setWait({ ...wait, isEnd: true });
          return;
        }
        const waitTime = text.length * 25 + text.length * 50;
        setTimeout(() => {
          setWait({ ...wait, isEnd: true });
        }, waitTime);
      }
    },
    { wait: 500 }
  );

  const { run: onBack } = useDebounceFn(
    () => {
      if (!wait.isEnd) return;
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
    },
    { wait: 500 }
  );

  return (
    <div className="w-fit max-w-[74%] flex flex-col gap-3 self-end">
      <span className="text-lesson-right-session-text-color text-[0.875rem] leading-[121% ]">
        Select response
      </span>
      {!selectItem &&
        item.children.map((child: any, index: number) => {
          return (
            <div
              key={index}
              className="flex justify-end cursor-pointer"
              onClick={() => onNext(child)}
            >
              <DialogBox
                direction={child.type}
                className="hover:bg-lesson-right-session-hover-bg hover:border-lesson-right-session-hover-border-color hover:text-lesson-right-session-hover-text-color bg-lesson-right-session-bg text-lesson-right-session-text-color border border-lesson-right-session-border-color"
              >
                {child.content}
              </DialogBox>
            </div>
          );
        })}
      {selectItem && (
        <div
          className={`flex justify-end ${
            !wait.isEnd ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <DialogBox
            direction={selectItem.type}
            onClick={onBack}
            className={`bg-lesson-right-session-bg border border-lesson-right-session-border-color text-lesson-right-session-text-color ${
              !wait.isEnd
                ? ''
                : 'hover:bg-lesson-right-session-hover-bg hover:text-lesson-right-session-hover-text-color hover:border-lesson-right-session-hover-border-color'
            }`}
          >
            {selectItem.content}
          </DialogBox>
        </div>
      )}
    </div>
  );
};

export default SessionSelectRenderer;
