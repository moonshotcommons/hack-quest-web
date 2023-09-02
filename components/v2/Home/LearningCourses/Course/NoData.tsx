import Button from '@/components/Common/Button';
import { ProcessType } from '@/service/webApi/course/type';
interface NoDataType {
  curTab: ProcessType;
}
const NoData: React.FC<NoDataType> = ({ curTab }) => {
  return (
    <div className="flex flex-col items-center pb-[100px]">
      <p className="text-home-learning-track-no-data-color text-[32px]">
        {curTab === ProcessType.IN_PROCESS
          ? 'You don’t have any on-going course'
          : 'You don’t have any completed course'}
      </p>
      <Button className="w-90 mt-[30px] mb-[20px] h-[55px] bg-home-learning-track-no-data-button-add-bg text-home-learning-track-no-data-button-add-color">
        Add a New Learning Track
      </Button>
      <Button className="w-90 h-[55px] border border-home-learning-track-no-data-button-explore-border text-home-learning-track-no-data-button-explore-color">
        Explore Selective Courses
      </Button>
    </div>
  );
};

export default NoData;
