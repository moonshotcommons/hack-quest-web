import React, { useRef, useState } from 'react';
import PageDescription from '@/components/v2/PageDescription';
import SelectiveCoursesBox from '@/components/v2/ElectivesBox';

function SelectiveCourses() {
  const selectiveCoursesRef = useRef<HTMLDivElement | null>(null);

  const [loadNum, setLoadNum] = useState(0);
  const [isNoMore, setIsNoMore] = useState(false);

  const handleScroll = () => {
    if (isNoMore) return;
    const clientHeight = selectiveCoursesRef.current?.clientHeight || 0;
    const scrollTop = selectiveCoursesRef.current?.scrollTop || 0;
    const scrollHeight = selectiveCoursesRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 10) {
      setLoadNum((num) => num + 1);
    }
  };
  return (
    <div
      className="container mx-auto h-[95vh] overflow-auto no-scrollbar"
      onScroll={handleScroll}
      ref={selectiveCoursesRef}
    >
      <div className="pb-[60px]">
        <PageDescription
          title={'Selective Courses'}
          description={'Lorem ipsum '}
        />
      </div>
      <SelectiveCoursesBox
        loadNum={loadNum}
        setNoMore={() => setIsNoMore(true)}
      />
    </div>
  );
}

export default SelectiveCourses;
