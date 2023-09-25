import SelectiveCoursesBox from '@/components/v2/ElectivesBox';
import PageDescription from '@/components/v2/PageDescription';
import { useRef, useState } from 'react';

function SelectiveCourses() {
  const selectiveCoursesRef = useRef<HTMLDivElement | null>(null);

  const [loadNum, setLoadNum] = useState(0);
  const [apiStatus, setApiStatus] = useState('init');

  const handleScroll = () => {
    if (apiStatus !== 'init') return;
    const clientHeight = selectiveCoursesRef.current?.clientHeight || 0;
    const scrollTop = selectiveCoursesRef.current?.scrollTop || 0;
    const scrollHeight = selectiveCoursesRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setLoadNum((num) => num + 1);
    }
  };
  return (
    <div
      className="h-[calc(100vh-64px)] overflow-auto"
      onScroll={handleScroll}
      ref={selectiveCoursesRef}
    >
      <div className="container mx-auto ">
        <div className="pb-[60px]">
          <PageDescription
            title={'Selective Courses'}
            description={
              'Electives is a treasury hunt. Each course is relatively short and independent, with a focused topic. You may learning something mind-blowing, or simply steel your skills.'
            }
          />
        </div>
        <SelectiveCoursesBox
          loadNum={loadNum}
          setApiStatus={(status) => setApiStatus(status)}
          apiStatus={apiStatus}
        />
      </div>
    </div>
  );
}

export default SelectiveCourses;
