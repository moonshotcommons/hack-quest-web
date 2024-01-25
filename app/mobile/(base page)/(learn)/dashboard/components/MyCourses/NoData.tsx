import Button from '@/components/Common/Button';
import { useRedirect } from '@/hooks/useRedirect';
import { ProcessType } from '@/service/webApi/course/type';
interface NoDataType {
  curTab: ProcessType;
}
const NoData: React.FC<NoDataType> = ({ curTab }) => {
  const { redirectToUrl } = useRedirect();
  return (
    <div className="flex flex-col items-center pb-[6.25rem] pt-[2.5rem]">
      <p className="text-neutral-medium-gray body-l">
        {curTab === ProcessType.IN_PROCESS
          ? 'You don’t have any on-going course'
          : 'You don’t have any completed course'}
      </p>
      <Button
        onClick={() => redirectToUrl('learning-track')}
        className="w-[212px] p-0 uppercase h-[48px] my-[12px] button-text-m bg-yellow-primary text-neutral-black"
      >
        Add Learning Tracks
      </Button>
      <Button
        onClick={() => redirectToUrl('electives')}
        className="w-[212px] p-0 uppercase h-[48px] button-text-m  text-neutral-black border border-neutral-black"
      >
        Explore Electives
      </Button>
    </div>
  );
};

export default NoData;
