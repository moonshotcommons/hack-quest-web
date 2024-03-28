'use client';
import React, { useEffect, useState } from 'react';
import CoursesTab from '../CoursesTab';
import { CourseTab } from '../../constants/type';
import CourseList from '../CourseList';
import { useRouter } from 'next/navigation';
import { getSearchParamsUrl } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { UGCCourseType } from '@/service/webApi/course/type';
import { PageResult } from '@/service/webApi/type';
import { courseTab } from '../../constants/data';

interface MyCoursesProp {
  status: CourseTab;
}

const MyCourses: React.FC<MyCoursesProp> = ({ status }) => {
  const router = useRouter();
  const [list, setList] = useState<UGCCourseType[]>([]);
  const changeTab = (val: CourseTab) => {
    router.push(
      getSearchParamsUrl(
        {
          status: val
        },
        MenuLink.INSTRUCTOR
      )
    );
  };
  const { run } = useRequest(
    async () => {
      const res = await webApi.courseApi.getUgcCourseListBySearch<PageResult<UGCCourseType>>({
        status
      });
      setList(res.data);
    },
    {
      manual: true
    }
  );
  useEffect(() => {
    run();
  }, [status]);
  return (
    <div>
      <div className="mb-[24px] text-neutral-off-black">
        <CoursesTab courseTab={courseTab} curTab={status} changeTab={changeTab} />
        <CourseList list={list} />
      </div>
    </div>
  );
};

export default MyCourses;
