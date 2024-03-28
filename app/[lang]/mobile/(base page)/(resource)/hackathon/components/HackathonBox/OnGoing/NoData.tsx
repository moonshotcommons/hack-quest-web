import Button from '@/components/Common/Button';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
interface NoDataType {
  goPast: VoidFunction;
}
const NoData: React.FC<NoDataType> = ({ goPast }) => {
  const { redirectToUrl } = useRedirect();
  return (
    <div className="flex flex-col items-center pb-[100px] ">
      <p className="text-h2-mob text-neutral-off-black">
        There is no ongoing hackathon
      </p>
      <Button
        onClick={goPast}
        className="body-l mb-[20px] mt-[30px] h-[55px] w-full bg-home-learning-track-no-data-button-add-bg text-home-learning-track-no-data-button-add-color"
      >
        Check Past Hackathon
      </Button>
      <Button
        onClick={() => redirectToUrl(`${MenuLink.PROJECTS}`)}
        className="body-l h-[55px] w-full border border-home-learning-track-no-data-button-explore-border text-home-learning-track-no-data-button-explore-color"
      >
        Check All Projects
      </Button>
    </div>
  );
};

export default NoData;
