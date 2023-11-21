import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import Image from 'next/image';
import React, {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import Badge from '@/components/Common/Badge';
import { MenuType, NavbarListType } from './type';

export interface NavBarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
  showSecondNav?: boolean;
  changeShowSecondNav?: (show: boolean) => void;
  isFull?: boolean;
}

type SlideNavigatorHighlight = CSSProperties & {
  '--highlight-x'?: string;
  '--highlight-width'?: string;
};

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { navList, children, showSecondNav, changeShowSecondNav, isFull } =
    NavBarProps;
  const router = useRouter();
  const pathname = router.pathname;
  const inSideNavEl = useRef<HTMLDivElement>(null);
  const secondNavEl = useRef<HTMLDivElement>(null);
  const [secondNavData, setSecondNavData] = useState([]);
  const [curNavId, setCurNavId] = useState('');
  const [outSideNav, setOutSideNav] = useState<NavbarListType[]>([]);
  const [inSideNav, setInSideNav] = useState<NavbarListType[]>([]);
  const [inSideNavStyle, setInSideNavStyle] =
    useState<SlideNavigatorHighlight>();
  const [secondNavStyle, setSecondNavStyle] =
    useState<SlideNavigatorHighlight>();
  const { missionData } = useSelector((state: AppRootState) => {
    return {
      missionData: state.missionCenter?.missionData
    };
  });

  useEffect(() => {
    if (navList.length) {
      const outSide = navList.filter((v) => v.type === 'outSide');
      setOutSideNav(outSide);
      const inSide = navList.filter((v) => v.type !== 'outSide');
      setInSideNav(inSide);
      if (isFull) {
        changeShowSecondNav?.(false);
        setSecondNavData(inSide[0].menu as []);
        setCurNavId(inSide[0].id);
        return;
      }

      for (let nav of inSide) {
        const curNav = nav.menu.find((menu) => pathname.includes(menu.path));
        if (curNav) {
          changeShowSecondNav?.(nav.menu.length > 1);
          setSecondNavData(nav.menu as []);
          setCurNavId(nav.id);
          return;
        }
      }
      changeShowSecondNav?.(false);
      setSecondNavData([]);
      setCurNavId('');
    } else {
      setOutSideNav([]);
      setInSideNav([]);
      changeShowSecondNav?.(false);
      setSecondNavData([]);
      setCurNavId('');
    }
  }, [pathname, navList]);
  useEffect(() => {
    if (!inSideNavEl.current) return;

    const { left } = inSideNavEl.current.getBoundingClientRect();
    for (const child of inSideNavEl.current.children) {
      if (curNavId !== (child as HTMLElement).dataset.id) continue;

      const { left: l, width } = child.getBoundingClientRect();
      setInSideNavStyle({
        '--highlight-x': `${l - left}px`,
        '--highlight-width': `${width}px`
      });
    }
  }, [pathname, curNavId]);
  useEffect(() => {
    if (!showSecondNav || !secondNavEl.current) return;

    const { left } = secondNavEl.current.getBoundingClientRect();
    for (const child of secondNavEl.current.children) {
      const { href } = child as HTMLAnchorElement;
      if (!href.includes(pathname)) continue;

      const { left: l, width } = child.getBoundingClientRect();
      setSecondNavStyle({
        '--highlight-x': `${l - left}px`,
        '--highlight-width': `${width}px`
      });
    }
  }, [pathname, showSecondNav]);

  const handleClickNav = (nav: NavbarListType) => {
    router.push(nav.menu[0].path);

    if (!inSideNavEl.current) return;

    const { left } = inSideNavEl.current.getBoundingClientRect();
    for (const child of inSideNavEl.current.children) {
      if (nav.id !== (child as HTMLElement).dataset.id) continue;

      const { left: l, width } = child.getBoundingClientRect();
      setInSideNavStyle({
        '--highlight-x': `${l - left}px`,
        '--highlight-width': `${width}px`
      });
    }
  };

  const doMoveHighlight: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (!secondNavEl.current) return;

    const { left } = secondNavEl.current.getBoundingClientRect();
    const { left: l, width } = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    setSecondNavStyle({
      '--highlight-x': `${l - left}px`,
      '--highlight-width': `${width}px`
    });
  };

  return (
    <div className=" w-full">
      <div
        className={`h-[64px] mx-auto  ${
          isFull ? 'w-full 2xl:px-[40px]' : 'container'
        }`}
      >
        <div className="h-full flex items-center justify-between font-next-book">
          <nav className="h-full flex items-center text-white">
            <Image src={DarkLogoActive} alt="logo"></Image>
            <div
              ref={inSideNavEl}
              className="flex ml-16 gap-[10px] h-[34px] text-sm rounded-[20px] bg-[#3E3E3E] overflow-hidden tracking-[0.28px] slide-navigator slide-navigator-full"
              style={inSideNavStyle}
            >
              {inSideNav.map((nav) => (
                <div
                  key={nav.id}
                  className={`h-full flex-center px-[14px] rounded-[20px] cursor-pointer ${
                    curNavId === nav.id ? 'text-[#0b0b0b]' : ''
                  }`}
                  data-id={nav.id}
                  onClick={() => handleClickNav(nav)}
                >
                  <div className="relative">
                    <span>{nav.label}</span>
                    {nav.id === 'missions' && (
                      <Badge count={missionData?.unClaimAll?.length || 0} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex ml-[20px] gap-[10px] h-[34px]  text-[14px] rounded-[20px] bg-[#3E3E3E] overflow-hidden tracking-[0.28px]">
              {outSideNav.map((nav) => (
                <Link
                  key={nav.id}
                  href={nav.link as string}
                  target="_blank"
                  className={`h-full flex-center px-[14px] rounded-[20px] cursor-pointer `}
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </nav>
          {children}
        </div>
      </div>
      {showSecondNav && (
        <div className=" text-white tracking-[0.84px]  w-screen h-12 bg-[#0B0B0B]">
          <div
            ref={secondNavEl}
            className="container m-auto flex items-end gap-[30px] h-full slide-navigator slide-navigator-underline"
            style={secondNavStyle}
          >
            {secondNavData.map((menu: MenuType) => (
              <Link
                key={menu.path}
                href={menu.path}
                className="pb-3 cursor-pointer hover:underline"
                onClick={doMoveHighlight}
              >
                {menu.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
