import Loading from '@/components/v2/Common/Loading';
import LearningTracksCard from '@/components/v2/LearningTrackCard';
import PageDescription from '@/components/v2/PageDescription';
import { useGetLearningTracks } from '@/hooks/useLearningTrackHooks/useLearningTracks';
import { LearningTrackCourseType } from '@/service/webApi/course/type';

function LearningTrack() {
  const { learningTracks, loading } = useGetLearningTracks();
  return (
    <div className="container mx-auto">
      <PageDescription
        title={'Learning Track'}
        description={`Don't know where to start? Pick a learning track! Leaning Track provides a series of core + elective courses that help you master one topic and explore in the related field.`}
      />
      <Loading loading={loading}>
        <div className="pt-[60px]">
          {learningTracks.map((item) => (
            <LearningTracksCard
              key={item.id}
              learningTrack={item}
              status={
                !item.progress
                  ? LearningTrackCourseType.UN_ENROLL
                  : item.progress === 1
                  ? LearningTrackCourseType.COMPLETED
                  : LearningTrackCourseType.IN_PROCESS
              }
            />
          ))}
        </div>
        <div className="flex-center h-[170px]">
          <div className="w-[1px] h-[100px] bg-learning-track-line-bg"></div>
        </div>
        <div className="font-next-book-bold text-[24px] text-center text-learning-track-more-text-color pb-[63px] pt-[10px]">
          <p>Vyper, Huff, Rust ...</p>
          <p>More Learning Tracks are coming soon</p>
        </div>
      </Loading>
    </div>
  );
}

export default LearningTrack;
