import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { getCourseLink } from '@/helper/utils';
interface LessonNavProps {
  lesson: CourseLessonType;
  courseType: CourseType;
  isPreview?: boolean;
}
interface navDataProps {
  label: string;
  link: string;
}

const previewNavData = [
  {
    label: 'Preview course',
    link: '/preview'
  },
  {
    label: 'Preview lesson',
    link: '/preview'
  }
];

const LessonNav: React.FC<LessonNavProps> = ({
  lesson,
  courseType,
  isPreview = false
}) => {
  const router = useRouter();
  const { lessonId } = router.query;
  const [navData, setNavData] = useState<navDataProps[]>([]);

  const renderNav = (item: navDataProps, i: number) => {
    if (item.link) {
      return (
        <Link key={i} href={item.link}>
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
  useEffect(() => {
    const initLink = [
      {
        label: 'All Courses',
        link: '/courses'
      }
    ];
    if (!router.query?.courseId && isPreview) {
      setNavData([...initLink, ...previewNavData]);
      return;
    }
    const lessonLink = (router.query?.courseId as string)
      .split(' - ')
      .map((v, i) => ({
        label: v,
        link: !i ? `${getCourseLink(courseType)}/${lesson?.courseId}` : ''
      }));
    setNavData([...initLink, ...lessonLink]);
  }, []);

  return (
    <div className="mb-[30px] text-[14px] text-lesson-preview-color flex pt-5">
      {navData.map((nav: navDataProps, i: number) => renderNav(nav, i))}
    </div>
  );
};

export default LessonNav;
