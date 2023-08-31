import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
function Breadcrumb() {
  const { route } = useRouter();
  const [isShow, setIsSHow] = useState(true);
  const [navList, setNavList] = useState<Record<string, string>[]>([]);
  /** 数据格式 xx_xx => Xx Xx */
  const getTabNameToDict = (dict: string) => {
    const tabName = dict
      .replace(/\-/g, ' ')
      .toLowerCase()
      .replace(/(\s|^)[a-z]/g, (w) => w.toUpperCase());
    return tabName;
  };

  const renderBreadcrumb = () => {
    let link = '/v2';
    const routeArr = route
      .split('/')
      .filter((v) => v && v !== 'v2' && !~v.indexOf('['))
      .map((v) => {
        link += `/${v}`;
        return {
          link,
          label: getTabNameToDict(v)
        };
      });
    setIsSHow(routeArr.length === 1 ? false : false);
    setNavList(routeArr);
  };
  useEffect(() => {
    renderBreadcrumb();
  }, [route]);
  return isShow ? (
    <div className="container mx-auto font-next-book-Thin mt-[20px] mb-[30px] text-[14px]">
      {navList.map((nav, i) => (
        <div key={nav.link}>
          {i ? <span className="px-[10px]">/</span> : null}
          <span
            className={`${
              i === navList.length - 1 ? 'font-next-book-bold underline' : ''
            }`}
          >
            {nav.label}
          </span>
        </div>
      ))}
    </div>
  ) : null;
}

export default Breadcrumb;
