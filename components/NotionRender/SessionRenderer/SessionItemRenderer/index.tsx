import { FC, ReactNode, useContext, useLayoutEffect, useState } from 'react';
import { SessionRendererContext } from '..';
import { DialogBox } from '../formateSource';
import SessionSelectRenderer from '../SessionSelectRenderer';

interface SessionItemRendererProps {
  // children: ReactNode;
  item: any;
}

const SessionItemRenderer: FC<SessionItemRendererProps> = (props) => {
  const { item } = props;
  const [children, setChildren] = useState(() =>
    item.type === 'left' ? '...' : ''
  );
  const { sessionList, currentSessionIndex, setCurrentSessionIndex } =
    useContext(SessionRendererContext)!;
  const writing = (prev: string, index: number) => {
    if (index < item.content.length) {
      let newString = prev + item.content[index];
      setChildren(newString);
      setTimeout(writing, 200, newString, ++index);
    } else {
      item.isAuto && setCurrentSessionIndex(currentSessionIndex + 1);
    }
  };

  useLayoutEffect(() => {
    let timer: NodeJS.Timer;
    if (item.content && item.type === 'left') {
      timer = setTimeout(() => {
        writing('', 0);
      }, item.content.length * 100);
    } else {
      setChildren(item.content);
    }

    return () => timer && clearTimeout(timer);
  }, []);

  if (['left'].includes(item.type)) {
    return (
      <div className="w-full">
        <DialogBox direction={item.type} className="max-w-[74%]">
          {children}
        </DialogBox>
      </div>
    );
  }

  if (['right'].includes(item.type)) {
    return (
      <div className="w-full flex justify-end items-center">
        <span className="text-[#676767] text-[0.875rem] leading-[121% ]">
          click here
        </span>
        <DialogBox
          direction={item.type}
          className="max-w-[74%] cursor-pointer"
          onClick={() => {
            const currentIndex = sessionList.findIndex((session) => {
              return session.source.id === item.source.id;
            });
            if (currentSessionIndex > currentIndex) {
              return;
            }
            setCurrentSessionIndex(currentSessionIndex + 1);
          }}
        >
          {children}
        </DialogBox>
      </div>
    );
  }

  if (['select'].includes(item.type) && item.children?.length) {
    return <SessionSelectRenderer item={item}></SessionSelectRenderer>;
  }
};

export default SessionItemRenderer;
