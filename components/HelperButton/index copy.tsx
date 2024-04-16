import { FC, useEffect, useRef, useState } from 'react';

interface HelperButtonProps {}

type Size = {
  width: number;
  height: number;
};

let moving = false;

const HelperButton: FC<HelperButtonProps> = (props) => {
  const BtRef = useRef<HTMLDivElement>(null);
  const [transationRecord, setTransationRecord] = useState({ offsetLeft: 0, offsetTop: 0 });
  const [click, setClick] = useState(false);
  const [screenSize, setScreenSize] = useState<Size>({ width: 0, height: 0 });
  const [buttonSize, setButtonSize] = useState<Size>({ width: 0, height: 0 });

  /**
   * ----------PC
   */
  /**
   * 鼠标按下,阻止默认事件,开启click确认
   * @param e
   */
  const onClickDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setClick(true);
  };

  /**
   * 鼠标松开,判断是点击还是移动,处理对应的事件
   * @param e
   */
  const onClickUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setClick(false);
    if (!moving) {
      clickHandler();
    } else {
      document.onmousemove = null;
      const current = BtRef.current as HTMLDivElement;
      current.className = current.className + ` duration-100 transition`;
      // current.className = current.className + " suspendButtonTs-animate";
      let offsetLeft = transationRecord.offsetLeft;
      if (offsetLeft < (screenSize.width - buttonSize.width) / 2) {
        offsetLeft = 0;
      } else {
        offsetLeft = screenSize.width - buttonSize.width;
      }
      setTransationRecord(Object.assign({}, transationRecord, { offsetLeft: offsetLeft }));
      moving = false;
    }
  };

  /**
   * 执行click方法
   */
  const clickHandler = () => {
    console.log('点击事件');
  };

  /**
   * 移动中
   */
  useEffect(() => {
    if (click) {
      document.body.style.userSelect = 'none';
      document.onmousemove = (event) => {
        if (!click) return;
        moving = true;
        event = event || window.event;
        let moveX = event.clientX - buttonSize.width / 2; //x轴偏移量
        let moveY = event.clientY - buttonSize.height / 2; //y轴偏移量
        if (moveX < 0) {
          moveX = 0;
        } else if (moveX > screenSize.width - buttonSize.width) {
          moveX = screenSize.width - buttonSize.width;
        }
        if (moveY < 0) {
          moveY = 0;
        } else if (moveY > screenSize.height - buttonSize.height) {
          moveY = screenSize.height - buttonSize.height;
        }
        const transationRecord = { offsetLeft: moveX, offsetTop: moveY };
        setTransationRecord(transationRecord);
      };
    } else {
      if (document.onmousemove != null) {
        document.onmousemove = null;
        document.body.style.userSelect = 'auto';
      }
    }
    return () => {
      document.onmousemove = null;
    };
  }, [click]);

  /**
   * 初始化函数,获取拖拽 dom大小 以及 屏幕大小
   */
  useEffect(() => {
    setScreenSize({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });
    const currentButton = BtRef.current as HTMLDivElement;
    setButtonSize({ width: currentButton.clientWidth, height: currentButton.clientHeight });

    return () => {};
  }, []);

  /**
   * ----------WAP
   */
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setClick(true);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    let event = e.touches[0] as any; //any大法助我
    document.body.style.userSelect = 'none'; //让其他元素不可以选中
    moving = true;
    if (!click) return;
    moving = true;
    let moveX = event.clientX - buttonSize.width / 2; //x轴偏移量
    let moveY = event.clientY - buttonSize.height / 2; //y轴偏移量
    if (moveX < 0) {
      moveX = 0;
    } else if (moveX > screenSize.width - buttonSize.width) {
      moveX = screenSize.width - buttonSize.width;
    }
    if (moveY < 0) {
      moveY = 0;
    } else if (moveY > screenSize.height - buttonSize.height) {
      moveY = screenSize.height - buttonSize.height;
    }
    const transationRecord = { offsetLeft: moveX, offsetTop: moveY };
    setTransationRecord(transationRecord);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setClick(false);
    if (!moving) {
      clickHandler();
    } else {
      const current = BtRef.current as HTMLDivElement;
      current.className = current.className + ` duration-100 transition`;
      let offsetLeft = transationRecord.offsetLeft;
      if (offsetLeft < (screenSize.width - buttonSize.width) / 2) {
        offsetLeft = 0;
      } else {
        offsetLeft = screenSize.width - buttonSize.width;
      }
      setTransationRecord(Object.assign({}, transationRecord, { offsetLeft: offsetLeft }));
      moving = false;
    }
  };
  return (
    <div
      className="fixed right-0 top-[300px] h-12 w-12 bg-red-500"
      ref={BtRef}
      onMouseDown={onClickDown}
      onMouseUp={onClickUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="-z-1 sticky h-full w-full">HelperButton</div>
    </div>
  );
};

export default HelperButton;
