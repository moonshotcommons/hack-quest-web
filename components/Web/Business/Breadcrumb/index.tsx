import { tagFormate } from '@/helper/formate';
import webApi from '@/service';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { menuLink, menuName, navIdType, navLinks } from './data';
import { MenuNameType, QueryIdType } from './type';

interface navDataProps {
  label?: string;
  link?: string;
}
const Breadcrumb: React.FC = () => {
  const query = useSearchParams();

  const params = useParams();
  const [navData, setNavData] = useState<navDataProps[]>([]);
  const getLearningTrackDetail = (id: string) => {
    return new Promise(async (resolve) => {
      if (id) {
        const res = await webApi.learningTrackApi.getLearningTrackDetailAndCourses(id);
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
            title: 'Projects'
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
      query.get(QueryIdType.LEARNING_TRACK_ID),
      query.get(QueryIdType.MENU_COURSE_ID),
      params[QueryIdType.LESSON_ID],
      query.get(QueryIdType.HACKATHON_ID),
      query.get(QueryIdType.PROJECT_ID)
    ];
    Promise.all([
      getLearningTrackDetail(queryIds[0] as string),
      getCourseDetail(queryIds[1] as string),
      getLessonDetail(queryIds[2] as string),
      getHackathonDetail(queryIds[3] as string),
      getProjectDetail(queryIds[4] as string)
    ]).then((res) => {
      let linkIdsStr = '';
      const menu = query.get('menu') as keyof MenuNameType;
      const menuNavData = {
        label: tagFormate(menuName[menu]),
        link: menuLink[menu]
      };
      const newNavData = res
        .map((v: any, i) => {
          if (v) {
            linkIdsStr += `&${navIdType[i]}=${v.id}`;
            return {
              label: v.title || v.name,
              link: !v.menu_ ? `${navLinks[i]}/${v.id}?menu=${query.get('menu')}${linkIdsStr}` : ''
            };
          } else {
            return {};
          }
        })
        .filter((v) => v.label);
      setNavData([menuNavData, ...newNavData]);
    });
  }, []);

  useEffect(() => {
    getNavData();
  }, [query, getNavData]);
  const renderNav = (item: navDataProps, i: number) => {
    if (i < navData.length - 1) {
      return (
        // <Link
        //   key={i}
        //   href={item.link || ''}
        //   onClick={() => {
        //     BurialPoint.track('使用navbar跳转');
        //   }}
        // >
        //   {i ? <span className="mx-2 text-neutral-black">/</span> : ''}
        //   <span className=" text-neutral-black"> {item.label}</span>
        // </Link>
        <div key={i}>
          {i ? <span className="mx-2 text-neutral-black">/</span> : ''}
          <span className={`text-neutral-black`}>{item.label}</span>
        </div>
      );
    } else {
      return (
        <div key={i}>
          <span className="mx-2">/</span>
          <span className={`font-bold underline`}>{item.label}</span>
        </div>
      );
    }
  };
  return (
    <div className="body-s flex h-[50px] items-center text-lesson-preview-color ">
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
