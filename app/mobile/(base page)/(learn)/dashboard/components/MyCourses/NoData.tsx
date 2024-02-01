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
      <p className="body-l text-neutral-medium-gray">
        {curTab === ProcessType.IN_PROCESS
          ? 'You don’t have any on-going course'
          : 'You don’t have any completed course'}
      </p>
      <Button
        onClick={() => redirectToUrl('learning-track')}
        className="button-text-m my-[12px] h-[48px] w-[212px] bg-yellow-primary p-0 uppercase text-neutral-black"
      >
        Add Learning Tracks
      </Button>
      <Button
        onClick={() => redirectToUrl('electives')}
        className="button-text-m h-[48px] w-[212px] border border-neutral-black  p-0 uppercase text-neutral-black"
      >
        Explore Electives
      </Button>
    </div>
  );
};

export default NoData;
