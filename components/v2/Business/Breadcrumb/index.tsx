import { BurialPoint } from '@/helper/burialPoint';
import { tagFormate } from '@/helper/formate';
import webApi from '@/service';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { menuLink, menuName, navIdType, navLinks } from './data';
import { MenuNameType, QueryIdType } from './type';

interface navDataProps {
  label?: string;
  link?: string;
}
const Breadcrumb: React.FC = () => {
  const router = useRouter();
  const query = useParams();

  const [navData, setNavData] = useState<navDataProps[]>([]);
  const getLearningTrackDetail = (id: string) => {
    return new Promise(async (resolve) => {
      if (id) {
        const res =
          await webApi.learningTrackApi.getLearningTrackDetailAndCourses(id);
        resolve(res);
      } else {
        resolve(false);
      }
    });
  };

  const getCourseDetail = (id: string) => {
    return new Promise(async (resolve) => {
      if (id) {
        const res = await webApi.courseApi.getCourseDetail(id);
        resolve(res);
      } else {
        resolve(false);
      }
    });
  };

  const getLessonDetail = (id: string) => {
    return new Promise(async (resolve) => {
      if (id) {
        const res = await webApi.courseApi.getLessonContent(id);
        resolve(res);
      } else {
        resolve(false);
      }
    });
  };

  const getHackathonDetail = (id: string) => {
    return new Promise(async (resolve) => {
      if (id) {
        const res = await webApi.resourceStationApi.getHackathonDetail(id);
        resolve(res);
      } else {
        resolve(false);
      }
    });
  };

  const getProjectDetail = (id: string) => {
    return new Promise(async (resolve) => {
      if (id) {
        if (id === 'projects') {
          resolve({
            menu_: true,
            name: 'Projects'
          });
        } else {
          const res = await webApi.resourceStationApi.getProjectsDetail(id);
          resolve(res);
        }
      } else {
        resolve(false);
      }
    });
  };

  const getNavData = useCallback(() => {
    const queryIds = [
      query[QueryIdType.LEARNING_TRACK_ID],
      query[QueryIdType.MENU_COURSE_ID],
      query[QueryIdType.LESSON_ID],
      query[QueryIdType.HACKATHON_ID],
      query[QueryIdType.PROJECT_ID]
    ];
    Promise.all([
      getLearningTrackDetail(queryIds[0] as string),
      getCourseDetail(queryIds[1] as string),
      getLessonDetail(queryIds[2] as string),
      getHackathonDetail(queryIds[3] as string),
      getProjectDetail(queryIds[4] as string)
    ]).then((res) => {
      let linkIdsStr = '';
      const menu = query.menu as keyof MenuNameType;
      const menuNavData = {
        label: tagFormate(menuName[menu]),
        link: menuLink[menu]
      };
      const newNavData = res
        .map((v: any, i) => {
          if (v) {
            linkIdsStr += `&${navIdType[i]}=${v.id}`;
            return {
              label: v.name,
              link: !v.menu_
                ? `${navLinks[i]}/${v.id}?menu=${query.menu}${linkIdsStr}`
                : ''
            };
          } else {
            return {};
          }
        })
        .filter((v) => v.label);
      setNavData([menuNavData, ...newNavData]);
    });
  }, [query]);

  useEffect(() => {
    getNavData();
  }, [query, getNavData]);
  const renderNav = (item: navDataProps, i: number) => {
    if (i < navData.length - 1) {
      return (
        <Link
          key={i}
          href={item.link || ''}
          onClick={() => {
            BurialPoint.track('使用navbar跳转');
          }}
        >
          {i ? <span className="mx-2 text-[#0b0b0b]">/</span> : ''}
          <span className=" text-[#0b0b0b]"> {item.label}</span>
        </Link>
      );
    } else {
      return (
        <div key={i}>
          <span className="mx-2">/</span>
          <span className={`font-next-book-bold underline`}>{item.label}</span>
        </div>
      );
    }
  };
  return (
    <div className="text-[14px] font-next-book text-lesson-preview-color flex h-[50px] items-center ">
      {navData?.map((nav: navDataProps, i: number) => {
        return (
          <div key={i} className="max-w-[30%] truncate">
            {renderNav(nav, i)}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
