import { BurialPoint } from '@/helper/burialPoint';
import { tagFormate } from '@/helper/formate';
import webApi from '@/service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { navIdType, navLinks } from './data';
import { QueryIdType } from './type';

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

  const getHackathonDetail = (id: string) => {
    return new Promise(async (resolve) => {
      if (id) {
        const res = await webApi.courseApi.getLessonContent(id);
        resolve(res);
      } else {
        resolve(false);
      }
    });
  };

  const getProjectDetail = (id: string) => {
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
      setNavData([menuNavData, ...newNavData]);
    });
  }, [router]);

  useEffect(() => {
    getNavData();
  }, [router, getNavData]);
  const renderNav = (item: navDataProps, i: number) => {
    if (i < navData.length - 1) {
      return (
        <Link
          key={i}
          href={item.link as string}
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
          <span className={`font-next-book underline`}>{item.label}</span>
        </div>
      );
    }
  };
  return (
    <div className="text-[14px] text-lesson-preview-color flex h-[50px] items-center ">
      {navData?.map((nav: navDataProps, i: number) => renderNav(nav, i))}
    </div>
  );
};

export default Breadcrumb;
