import { ProjectCourseType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { FC, useEffect, useState } from 'react';
import TrackCard from './TrackCard';

interface TrackListProps {
  trackDetail: LearningTrackDetailType;
}

type CourseListType = {
  title: string;
  courses: ProjectCourseType;
}[];

const TrackList: FC<TrackListProps> = (props) => {
  const { trackDetail } = props;
  // const { courses } = trackDetail;

  const [courseList, setCourseList] = useState<CourseListType>([]);

  useEffect(() => {
    // if (trackDetail) {
    //   const map = new Map();
    //   trackDetail?.courses?.forEach((course) => {
    //     const track = map.get(course.group);
    //     if (Array.isArray(track?.courses)) {
    //       track?.courses.push(course);
    //     } else {
    //       const courses = [course];
    //       map.set(course.group, { title: course.group, courses });
    //     }
    //   });
    //   const res = Array.from(map).map((track) => track[1]);
    //   console.log(res);
    //   setCourseList(res);
    // }
  }, [trackDetail]);

  return (
    <div>
      <ul className="w-full">
        {courseList.map((course, index) => {
          if (index === 0) {
            return (
              <li key={index} className="w-full relative top-line bottom-line">
                <TrackCard
                  // unit={unit}
                  course={course}
                  // isLock={false}
                  // courseType={courseType}
                  // index={index}
                  // courseDetail={courseDetail}
                ></TrackCard>
              </li>
            );
          }
          return (
            <li
              // key={unit.id}
              key={index}
              className="w-full relative bottom-line"
            >
              <TrackCard
                course={course}
                // unit={unit}
                // isLock={
                //   units[index - 1].progress < 1 || unit.progress === undefined
                // }
                // courseType={courseType}
                // index={index}
                // courseDetail={courseDetail}
              ></TrackCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TrackList;
