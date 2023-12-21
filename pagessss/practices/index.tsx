import Title from '@/components/v1/Head/Title';
import PageDescription from '@/components/v2/Business/PageDescription';
import PracticesBox from '@/components/v2/PracticesBox';
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
      className="h-full overflow-auto"
      onScroll={handleScroll}
      ref={selectiveCoursesRef}
    >
      <Title title="Electives" />
      <div className="container mx-auto ">
        <PageDescription
          title={'Electives'}
          description={
            'Each elective course is relatively short and independent, with a focused topic. You will  learn how to build a project step by step. '
          }
        />

        <PracticesBox
          loadNum={loadNum}
          setApiStatus={(status) => setApiStatus(status)}
          apiStatus={apiStatus}
        />
      </div>
    </div>
  );
}

export default SelectiveCourses;
