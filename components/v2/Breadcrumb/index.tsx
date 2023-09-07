import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QueryIdType } from './type';
import { navLinks, navIdType } from './data';
import webApi from '@/service';
import { tagFormate } from '@/helper/formate';

interface navDataProps {
  label?: string;
  link?: string;
}
const Breadcrumb: React.FC = () => {
  const router = useRouter();

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

  const getNavData = useCallback(() => {
    const queryIds = [
      router.query[QueryIdType.LEARNING_TRACK_ID],
      router.query[QueryIdType.MENU_COURSE_ID],
      router.query[QueryIdType.LESSON_ID]
    ];
    Promise.all([
      getLearningTrackDetail(queryIds[0] as string),
      getCourseDetail(queryIds[1] as string),
      getLessonDetail(queryIds[2] as string)
    ]).then((res) => {
      let linkIdsStr = '';
      const menuNavData = {
        label: tagFormate(router.query.menu as string),
        link: `/${router.query.menu}`
      };
      const newNavData = res
        .map((v: any, i) => {
          if (v) {
            linkIdsStr += `&${navIdType[i]}=${v.id}`;
            return {
              label: v.name,
              link: `/${navLinks[i]}/${v.id}?menu=${router.query.menu}${linkIdsStr}`
            };
          } else {
            return {};
          }
        })
        .filter((v) => v.label);
      console.info(newNavData);
      setNavData([menuNavData, ...newNavData]);
    });
  }, [router]);

  useEffect(() => {
    getNavData();
  }, [router, getNavData]);
  const renderNav = (item: navDataProps, i: number) => {
    if (i < navData.length - 1) {
      return (
        <Link key={i} href={item.link as string}>
          {i ? <span className="mx-2">/</span> : ''}
          <span
            className={`${
              i === navData.length - 1 ? 'font-next-book underline' : ''
            }`}
          >
            {item.label}
          </span>
        </Link>
      );
    } else {
      return (
        <div key={i}>
          {i ? <span className="mx-2">/</span> : ''}
          <span
            className={`${
              i === navData.length - 1 ? 'font-next-book underline' : ''
            }`}
          >
            {item.label}
          </span>
        </div>
      );
    }
  };
  return navData.length === 1 ? null : (
    <div className="text-[14px] text-lesson-preview-color flex py-5">
      {navData?.map((nav: navDataProps, i: number) => renderNav(nav, i))}
    </div>
  );
};

export default Breadcrumb;
