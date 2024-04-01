import Button from '@/components/Common/Button';
import { useRedirect } from '@/hooks/router/useRedirect';
import { useGlobalStore } from '@/store/zustand/globalStore';
interface NoDataType {
  goPast: VoidFunction;
}
const NoData: React.FC<NoDataType> = ({ goPast }) => {
  const { redirectToUrl } = useRedirect();
  const setTipsModalOpenState = useGlobalStore((state) => state.setTipsModalOpenState);
  return (
    <div className="flex flex-col items-center pb-[6.25rem] ">
      <p className="text-h2-mob text-neutral-off-black">There is no ongoing hackathon</p>
      <Button
        onClick={goPast}
        className="body-l mb-[1.25rem] mt-[1.875rem] h-[3rem] w-full bg-home-learning-track-no-data-button-add-bg text-home-learning-track-no-data-button-add-color"
      >
        Check Past Hackathon
      </Button>
      <Button
        onClick={() => {
          setTipsModalOpenState(true);
          // redirectToUrl(`${MenuLink.PROJECTS}`)
        }}
        className="body-l h-[3rem] w-full border border-home-learning-track-no-data-button-explore-border text-home-learning-track-no-data-button-explore-color"
      >
        Check All Projects
      </Button>
    </div>
  );
};

export default NoData;
