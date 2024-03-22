import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/helper/utils';
import HandleButton from './HandleButton';
import Image from 'next/image';
import Link from 'next/link';
import CountDown from './CountDown';
import { useTranslation } from '@/i18n/server';

export enum ProjectStatus {
  UPCOMING = 'upcoming',
  LIVE_NOW = 'liveNow',
  CLOSED = 'closed'
}

const projectCardVariants = cva(
  'rounded-[24px] w-full p-6 flex-col card-hover',
  {
    variants: {
      status: {
        [ProjectStatus.UPCOMING]:
          'bg-neutral-off-white border border-dashed border-neutral-rich-gray',
        [ProjectStatus.LIVE_NOW]:
          'bg-neutral-white border border-neutral-rich-gray',
        [ProjectStatus.CLOSED]: 'bg-yellow-extra-light'
      }
    },
    defaultVariants: {
      status: ProjectStatus.UPCOMING
    }
  }
);

interface ProjectCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof projectCardVariants> {
  lang: Lang;
  title: string;
}

const logo = (
  <svg
    width="168"
    height="20"
    viewBox="0 0 168 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_0_31390)">
      <path
        d="M79.0767 17.3668H74.0777V2.66343H79.0767V17.3668ZM89.1102 2.66343H83.2114L79.0767 9.15577V10.0151L83.6396 17.3668H89.5384L84.0758 9.58544L89.1102 2.66343ZM34.8412 2.66343V8.04283H30.8939V2.66343H25.8949V17.3668H30.8939V11.9112H34.8412V17.3668H39.8403V2.66343H34.8412ZM66.9505 13.505C64.9794 13.505 63.6305 11.9375 63.6305 10.0151C63.6305 8.09277 64.9794 6.52519 66.9505 6.52519C68.382 6.52519 69.4087 7.29256 69.6864 7.65653L72.1695 4.22048C71.4898 3.59109 69.393 2.1628 66.403 2.1628C61.1028 2.1628 58.3878 6.30051 58.3878 10.0151C58.3878 13.7297 61.1028 17.8674 66.403 17.8674C69.3943 17.8674 71.4898 16.4391 72.1695 15.8097L69.6864 12.3737C69.4087 12.7377 68.382 13.505 66.9505 13.505ZM53.1898 17.3694C52.4262 16.0331 51.0249 15.5456 49.6877 15.5456C48.3505 15.5456 46.9492 16.0331 46.1856 17.3694H41.4485L46.9688 2.6608H52.4092L57.9295 17.3694H53.1924H53.1898ZM51.5933 12.3041L49.6864 7.02845L47.7795 12.3041C47.7795 12.3041 48.5378 11.9782 49.6301 11.9782H49.7401C50.8336 11.9782 51.5906 12.3041 51.5906 12.3041H51.5933ZM53.1898 17.3694C52.4262 16.0331 51.0249 15.5456 49.6877 15.5456C48.3505 15.5456 46.9492 16.0331 46.1856 17.3694H41.4485L46.9688 2.6608H52.4092L57.9295 17.3694H53.1924H53.1898ZM51.5933 12.3041L49.6864 7.02845L47.7795 12.3041C47.7795 12.3041 48.5378 11.9782 49.6301 11.9782H49.7401C50.8336 11.9782 51.5906 12.3041 51.5906 12.3041H51.5933ZM167.48 2.66343H154.078V6.50549H158.279V17.3668H163.278V6.50549H167.48V2.66343ZM136.945 6.50549V2.66343H124.232V17.3668H129.231V17.3615H136.945V13.5195H129.231V11.6773H136.945V8.34899H129.231V6.5068H136.945V6.50549ZM147.875 8.09408H145.002C144.566 8.09408 144.212 7.73931 144.212 7.30175C144.212 6.8642 144.566 6.50943 145.002 6.50943H152.049V2.66737H143.832C141.26 2.66737 139.179 4.7763 139.213 7.36351C139.246 9.91131 141.362 11.9375 143.902 11.9375H146.775C147.211 11.9375 147.565 12.2922 147.565 12.7298C147.565 13.1673 147.211 13.5221 146.775 13.5221H139.73V17.3642H147.945C150.517 17.3642 152.598 15.2552 152.564 12.668C152.531 10.1202 150.415 8.09408 147.875 8.09408ZM116.565 2.66343V11.1175C116.565 12.2029 115.687 13.0832 114.606 13.0832C113.524 13.0832 112.646 12.2029 112.646 11.1175V2.66343H107.647V11.6602C107.647 15.5101 110.716 17.8411 114.553 17.87C118.421 17.899 121.565 15.6218 121.565 11.7482V2.66343H116.566H116.565ZM103.137 13.9754L106.277 12.7731L106.013 16.9016C106.013 16.9016 101.963 17.8674 97.5523 17.8674C92.0019 17.8674 89.5371 13.3631 89.5371 9.76677C89.5371 6.17042 92.2521 2.16411 97.5523 2.16411C102.853 2.16411 105.266 5.75652 105.12 9.3936C105.041 11.3567 104.046 13.0977 103.137 13.8467V13.9754ZM97.5536 13.505C99.3466 13.505 100.325 11.8363 100.325 10.0204C100.325 8.20445 99.3466 6.52651 97.5536 6.52651C95.7607 6.52651 94.7823 8.20445 94.7823 10.0204C94.7823 11.8363 95.7607 13.505 97.5536 13.505ZM17.0153 2.92885C18.82 4.7395 19.9345 7.23737 19.9345 9.99934L19.4696 19.5953L9.96792 19.9987C7.21499 19.9987 4.72399 18.8792 2.92057 17.0698C1.11584 15.2605 0 12.7626 0 10.0007L0.40207 0.466461L9.96792 0C12.7209 0 15.2119 1.11951 17.0153 2.92885ZM14.0829 5.99829C13.0457 4.95762 11.6129 4.31246 10.0308 4.31246C6.86531 4.31246 4.29835 6.88785 4.29835 10.0637C4.29835 11.651 4.9414 13.0885 5.97866 14.1292C7.01592 15.1698 8.4487 15.815 10.0308 15.815C13.195 15.815 15.7619 13.2409 15.7632 10.0637C15.7632 8.47645 15.1202 7.03896 14.0829 5.99829Z"
        fill="#0B0B0B"
      />
    </g>
    <defs>
      <clipPath id="clip0_0_31390">
        <rect width="167.48" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const LabelWrapper = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex min-w-[250px] max-w-[300px] flex-col gap-1">
      <span className="body-s inline-block w-[236px] max-w-[236px] text-neutral-rich-gray">
        {label}
      </span>
      <span className="body-m-bold inline-block uppercase text-neutral-black">
        {value}
      </span>
    </div>
  );
};

const StatusTag = ({
  status,
  text
}: {
  status: ProjectStatus;
  text: string;
}) => {
  return (
    <div
      className={cn(
        'body-m-bold w-fit rounded-[8px] border-[2px] px-3 py-1',
        status === ProjectStatus.LIVE_NOW
          ? 'border-status-success text-status-success'
          : 'border-neutral-medium-gray text-neutral-medium-gray'
      )}
    >
      {text}
    </div>
  );
};

const StatisticsCard = (props: { totalFul: number; totalUser: number }) => {
  const { totalFul, totalUser } = props;
  return (
    <div className="flex w-[477px] max-w-[477px] gap-10 rounded-[12px] bg-yellow-extra-light px-6 py-2">
      <div className="flex flex-1 flex-col gap-1">
        <span className="body-s text-neutral-medium-gray">
          Total Participated Users
        </span>
        <span className="body-xl-bold">
          {Number(totalFul).toLocaleString('en-US')}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="body-s text-neutral-medium-gray">Total Fuel</span>
        <span className="body-xl-bold">
          {Number(totalUser).toLocaleString('en-US')}
        </span>
      </div>
    </div>
  );
};

const ProjectCard: FC<ProjectCardProps> = async ({
  lang,
  status = ProjectStatus.UPCOMING,
  className,
  title
}) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  // const t = (a: string) => a;
  return (
    <Link href={'/launch-pool/1'}>
      <div className={cn(projectCardVariants({ className, status }))}>
        <div className="flex flex-col justify-center gap-3">
          <div>{logo}</div>
          <div className="flex flex-col gap-6">
            <p className="body-s text-neutral-off-black">
              {t('projectCardDesc')}
            </p>
            {status === ProjectStatus.UPCOMING && (
              <StatusTag status={status!} text={t('upComing')} />
            )}
            {status === ProjectStatus.LIVE_NOW && (
              <StatusTag status={status!} text={t('liveNow')} />
            )}
            {status === ProjectStatus.CLOSED && (
              <StatusTag
                status={status!}
                text={`${t('closed')} MAR 9, 2024"`}
              />
            )}
            <div className="flex h-full items-center">
              <Image
                src={'/images/launch/launch_frame.png'}
                alt=""
                width={300}
                height={283}
              ></Image>
            </div>
            {status !== ProjectStatus.CLOSED && <CountDown status={status!} />}

            <div className="flex flex-col  gap-4">
              {status === ProjectStatus.LIVE_NOW && (
                <LabelWrapper
                  label={t('totalParticipatedUsers')}
                  value="35,120"
                />
              )}
              {status === ProjectStatus.LIVE_NOW && (
                <LabelWrapper label={t('totalFuel')} value="588,496" />
              )}
              <LabelWrapper label={t('projectToken')} value="$HQT" />
              <LabelWrapper
                label={t('totalAirdropAmount')}
                value="2% / 2,000,000 $hqt"
              />
              {status !== ProjectStatus.LIVE_NOW && (
                <LabelWrapper
                  label={t('currentStakings')}
                  value="10,000,000 $MNT"
                />
              )}
            </div>
            <HandleButton status={status!} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
