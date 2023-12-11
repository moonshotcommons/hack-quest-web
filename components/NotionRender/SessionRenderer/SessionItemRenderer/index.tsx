import {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { SessionRendererContext } from '..';
import { DialogBox } from '../formateSource';
import SessionSelectRenderer from '../SessionSelectRenderer';
import { useDebounceFn } from 'ahooks';

interface SessionItemRendererProps {
  // children: ReactNode;
  item: any;
}

const SessionItemRenderer: FC<SessionItemRendererProps> = (props) => {
  const { item } = props;
  const [children, setChildren] = useState(() =>
    item.type === 'left' ? '...' : ''
  );

  const timeIds = useRef<NodeJS.Timer[]>([]);

  const { sessionList, currentSessionIndex, setCurrentSessionIndex } =
    useContext(SessionRendererContext)!;
  const writing = (prev: string, index: number) => {
    let timer: NodeJS.Timer;
    if (index < item.content.length) {
      let newString = prev + item.content[index];
      setChildren(newString);
      timer = setTimeout(writing, 50, newString, ++index);
      timeIds.current = timeIds.current.concat(timer);
    } else {
      item.isAuto && setCurrentSessionIndex(currentSessionIndex + 1);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (item.content && item.type === 'left') {
      timer = setTimeout(() => {
        writing('', 0);
      }, item.content.length * 25);
    } else {
      setChildren(item.content);
    }

    return () => {
      timer && clearTimeout(timer);
      timeIds.current.forEach((timeId) => {
        clearTimeout(timeId);
      });
      timeIds.current = [];
    };
  }, [item]);

  const isDisable = useMemo(() => {
    const currentIndex = sessionList.findIndex((session) => {
      return session.source.id === item.source.id;
    });
    if (currentIndex !== sessionList.length - 1) {
      return true;
    }
    return false;
  }, [sessionList, item]);

  const { run: onNext } = useDebounceFn(
    () => {
      const currentIndex = sessionList.findIndex((session) => {
        return session.source.id === item.source.id;
      });
      if (currentIndex !== sessionList.length - 1) {
        return;
      }
      setCurrentSessionIndex(currentSessionIndex + 1);
    },
    { wait: 500 }
  );

  if (['left'].includes(item.type)) {
    return (
      <div className="w-full">
        <DialogBox
          direction={item.type}
          className="max-w-[74%] bg-lesson-left-session-bg text-lesson-left-session-text-color"
        >
          {children}
        </DialogBox>
      </div>
    );
  }

  if (['right'].includes(item.type)) {
    return (
      <div className="w-full flex justify-end items-center gap-4">
        {!isDisable && (
          <span className="text-lesson-right-session-text-color text-[0.875rem] leading-[121%]">
            click here
          </span>
        )}
        <DialogBox
          direction={item.type}
          className={`max-w-[74%] bg-lesson-right-session-bg border border-lesson-right-session-border-color text-lesson-right-session-text-color  ${
            isDisable
              ? 'cursor-not-allowed'
              : 'cursor-pointer hover:bg-lesson-right-session-hover-bg hover:text-lesson-right-session-hover-text-color hover:border-lesson-right-session-hover-border-color'
          }`}
          onClick={onNext}
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
