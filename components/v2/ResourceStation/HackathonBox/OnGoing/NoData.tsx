import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import Button from '@/components/v2/Common/Button';
import { useRouter } from 'next/router';
interface NoDataType {
  goPast: VoidFunction;
}
const NoData: React.FC<NoDataType> = ({ goPast }) => {
  const router = useRouter();
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
          router.push(
            `${menuLink.projects}/projects?menu=${Menu.PROJECTS}&${QueryIdType.PROJECT_ID}=projects`
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
