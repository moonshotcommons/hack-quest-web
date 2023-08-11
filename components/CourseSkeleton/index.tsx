import React, { ReactElement, memo, useContext, useState } from 'react';
import { Skeleton } from 'antd';
import { ThemeContext } from '@/store/context/theme';
import { Theme } from '@/constants/enum';
type CourseSkeletonType = {
  hideSkeleton: boolean;
  children: ReactElement[];
};
const CourseSkeleton: React.FC<CourseSkeletonType> = memo(
  ({ hideSkeleton, children }) => {
    const { theme } = useContext(ThemeContext);
    const skeletonBg =
      theme === 'dark'
        ? 'linear-gradient(180deg, #3D3D3D 0%, rgba(74, 74, 74, 0.17) 100%)'
        : theme === 'light'
        ? 'linear-gradient(180deg, #FFEDAC 0%, rgba(255, 237, 172, 0.17) 100%)'
        : '';

    return (
      <>
        {hideSkeleton
          ? children
          : skeletonBg
          ? [1, 1, 1].map((_, i) => (
              <Skeleton.Node
                key={i}
                active
                style={{
                  width: '416px',
                  height: '278px',
                  borderRadius: '20px',
                  backgroundImage: skeletonBg,
                  backgroundSize: '100% 150%',
                  animationName: 'course-skeleton-animation'
                }}
              >
                {' '}
              </Skeleton.Node>
            ))
          : null}
      </>
    );
  }
);
CourseSkeleton.displayName = 'CourseSkeleton';

export default CourseSkeleton;
