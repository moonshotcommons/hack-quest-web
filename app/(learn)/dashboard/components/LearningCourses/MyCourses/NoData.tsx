import Button from '@/components/Common/Button';
import { useRedirect } from '@/hooks/useRedirect';
import { ProcessType } from '@/service/webApi/course/type';
interface NoDataType {
  curTab: ProcessType;
}
const NoData: React.FC<NoDataType> = ({ curTab }) => {
  const { redirectToUrl } = useRedirect();
  return (
    <div className="flex flex-col items-center pb-[100px] font-next-book">
      <p className="text-home-learning-track-no-data-color text-[32px]">
        {curTab === ProcessType.IN_PROCESS
          ? 'You don’t have any on-going course'
          : 'You don’t have any completed course'}
      </p>
      <Button
        onClick={() => redirectToUrl('learning-track')}
        className="w-[360px] mt-[30px] text-[18px] mb-[20px] h-[55px] bg-home-learning-track-no-data-button-add-bg text-home-learning-track-no-data-button-add-color"
      >
        Add a New Learning Track
      </Button>
      <Button
        onClick={() => redirectToUrl('electives')}
        className="w-[360px] h-[55px] text-[18px] border border-home-learning-track-no-data-button-explore-border text-home-learning-track-no-data-button-explore-color"
      >
        Explore Elective Courses
      </Button>
    </div>
  );
};

export default NoData;
