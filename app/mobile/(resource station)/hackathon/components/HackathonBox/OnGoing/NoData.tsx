import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import Button from '@/components/Common/Button';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
interface NoDataType {
  goPast: VoidFunction;
}
const NoData: React.FC<NoDataType> = ({ goPast }) => {
  const { redirectToUrl } = useRedirect();
  return (
    <div className="flex flex-col items-center pb-[100px] font-next-book">
      <p className="text-home-learning-track-no-data-color text-[32px]">
        There is no ongoing hackathon
      </p>
      <Button
        onClick={goPast}
        className="w-[360px] mt-[30px] text-[18px] mb-[20px] h-[55px] bg-home-learning-track-no-data-button-add-bg text-home-learning-track-no-data-button-add-color"
      >
        Check Past Hackathon
      </Button>
      <Button
        onClick={() =>
          redirectToUrl(
            `${MenuLink.PROJECTS}?menu=${Menu.HACKATHON}&${QueryIdType.PROJECT_ID}=projects`
          )
        }
        className="w-[360px] h-[55px] text-[18px] border border-home-learning-track-no-data-button-explore-border text-home-learning-track-no-data-button-explore-color"
      >
        Check All Projects
      </Button>
    </div>
  );
};

export default NoData;
