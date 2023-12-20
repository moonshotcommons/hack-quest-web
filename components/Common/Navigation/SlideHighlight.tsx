'use client';
import {
  CSSProperties,
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';

interface SlideHighlightProps {
  children: React.ReactNode;
  className: string;
  type?: 'underline' | 'background';
  currentIndex: number;
}

type SlideNavigatorHighlight = CSSProperties & {
  '--highlight-x'?: string;
  '--highlight-width'?: string;
};

const SlideHighlight: FC<SlideHighlightProps> = function (props) {
  const { className, children, type = 'underline', currentIndex } = props;
  const theClassName = `${className} slide-navigator ${
    type === 'underline' ? ' slide-navigator-underline' : 'slide-navigator-full'
  }`;
  const root = useRef<HTMLDivElement>(null);
  const [navStyle, setNavStyle] = useState<SlideNavigatorHighlight>();

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!root.current) return;

    const target = Array.from(root.current.children).find((v) =>
      v.contains(event.target as Node)
    ) as HTMLElement;
    const { left } = root.current.getBoundingClientRect();
    const { left: l, width } = target?.getBoundingClientRect() || {};
    setNavStyle({
      '--highlight-x': `${l - left}px`,
      '--highlight-width': `${width}px`
    });
  };

  useEffect(() => {
    if (!root.current) return;

    if (currentIndex === -1) {
      setNavStyle({
        '--highlight-width': `0px`
      });
      return;
    }

    const { left } = root.current.getBoundingClientRect();
    const target = root.current.children[currentIndex] as HTMLElement;
    const { left: l, width } = target?.getBoundingClientRect() || {};
    setNavStyle({
      '--highlight-x': `${l - left}px`,
      '--highlight-width': `${width}px`
    });
  }, [currentIndex]);

  return (
    <div ref={root} className={theClassName} style={navStyle} onClick={onClick}>
      {children}
    </div>
  );
};

export default SlideHighlight;
