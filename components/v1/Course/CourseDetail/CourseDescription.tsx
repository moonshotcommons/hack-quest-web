import { FC, ReactNode } from 'react';

interface CourseDescriptionProps {
  children: ReactNode;
  title?: ReactNode;
}

const CourseDescription: FC<CourseDescriptionProps> = (props) => {
  const { children, title = 'About this course' } = props;
  return (
    <div className="w-full px-[19.125rem] py-[4rem] border border-solid rounded-[1.25rem] border-course-detail-desc-border-color flex flex-col justify-center">
      <h1 className="font-[1.75rem] text-text-default-color font-next-book-bold text-center">
        {title}
      </h1>
      <div className="text-[#676767] font-next-book leading-[120%] text-left mt-[1.875rem] whitespace-pre-line">
        {children}
      </div>
    </div>
  );
};

export default CourseDescription;
