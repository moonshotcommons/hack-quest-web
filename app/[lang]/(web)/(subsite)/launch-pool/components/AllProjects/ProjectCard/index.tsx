import { Lang } from '@/i18n/config';
import { FC } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/helper/utils';
import HandleButton from './HandleButton';
import Image from 'next/image';
import Link from 'next/link';

export enum ProjectStatus {
  UPCOMING = 'upcoming',
  LIVE_NOW = 'liveNow',
  CLOSED = 'closed'
}

const projectCardVariants = cva(
  'rounded-[24px] w-full p-16 flex justify-between h-[644px] card-hover',
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
    width="268"
    height="33"
    viewBox="0 0 268 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M126.523 28.2991H118.524V4.77369H126.523V28.2991ZM142.576 4.77369H133.138L126.523 15.1614V16.5364L133.823 28.2991H143.261L134.521 15.8489L142.576 4.77369ZM55.746 4.77369V13.3807H49.4302V4.77369H41.4318V28.2991H49.4302V19.5701H55.746V28.2991H63.7444V4.77369H55.746ZM107.121 22.1202C103.967 22.1202 101.809 19.6121 101.809 16.5364C101.809 13.4606 103.967 10.9525 107.121 10.9525C109.411 10.9525 111.054 12.1803 111.498 12.7626L115.471 7.26498C114.384 6.25795 111.029 3.97269 106.245 3.97269C97.7645 3.97269 93.4205 10.593 93.4205 16.5364C93.4205 22.4797 97.7645 29.1001 106.245 29.1001C111.031 29.1001 114.384 26.8148 115.471 25.8078L111.498 20.3101C111.054 20.8925 109.411 22.1202 107.121 22.1202ZM85.1036 28.3033C83.8819 26.1652 81.6398 25.3852 79.5003 25.3852C77.3608 25.3852 75.1186 26.1652 73.897 28.3033H66.3176L75.1501 4.76948H83.8547L92.6871 28.3033H85.1078H85.1036ZM82.5492 20.1987L79.4982 11.7577L76.4472 20.1987C76.4472 20.1987 77.6605 19.6773 79.4081 19.6773H79.5841C81.3338 19.6773 82.545 20.1987 82.545 20.1987H82.5492ZM85.1036 28.3033C83.8819 26.1652 81.6398 25.3852 79.5003 25.3852C77.3608 25.3852 75.1186 26.1652 73.897 28.3033H66.3176L75.1501 4.76948H83.8547L92.6871 28.3033H85.1078H85.1036ZM82.5492 20.1987L79.4982 11.7577L76.4472 20.1987C76.4472 20.1987 77.6605 19.6773 79.4081 19.6773H79.5841C81.3338 19.6773 82.545 20.1987 82.545 20.1987H82.5492ZM267.967 4.77369H246.524V10.921H253.247V28.2991H261.245V10.921H267.967V4.77369ZM219.111 10.921V4.77369H198.771V28.2991H206.769V28.2907H219.111V22.1434H206.769V19.1959H219.111V13.8706H206.769V10.9231H219.111V10.921ZM236.6 13.4627H232.003C231.305 13.4627 230.739 12.8951 230.739 12.195C230.739 11.4949 231.305 10.9273 232.003 10.9273H243.279V4.77999H230.132C226.016 4.77999 222.686 8.15428 222.741 12.2938C222.793 16.3703 226.179 19.6121 230.243 19.6121H234.84C235.538 19.6121 236.104 20.1798 236.104 20.8799C236.104 21.5799 235.538 22.1476 234.84 22.1476H223.569V28.2949H236.711C240.827 28.2949 244.157 24.9206 244.102 20.781C244.05 16.7046 240.663 13.4627 236.6 13.4627ZM186.504 4.77369V18.3003C186.504 20.0368 185.1 21.4454 183.369 21.4454C181.638 21.4454 180.234 20.0368 180.234 18.3003V4.77369H172.236V19.1685C172.236 25.3284 177.145 29.058 183.285 29.1043C189.473 29.1505 194.504 25.5071 194.504 19.3094V4.77369H186.506H186.504ZM165.019 22.8729L170.044 20.9492L169.62 27.5548C169.62 27.5548 163.141 29.1001 156.084 29.1001C147.203 29.1001 143.259 21.8932 143.259 16.139C143.259 10.3849 147.603 3.97479 156.084 3.97479C164.564 3.97479 168.426 9.72264 168.191 15.542C168.066 18.6829 166.473 21.4685 165.019 22.6669V22.8729ZM156.086 22.1202C158.954 22.1202 160.52 19.4503 160.52 16.5448C160.52 13.6393 158.954 10.9546 156.086 10.9546C153.217 10.9546 151.652 13.6393 151.652 16.5448C151.652 19.4503 153.217 22.1202 156.086 22.1202ZM27.2244 5.19836C30.112 8.09541 31.8953 12.092 31.8953 16.5112L31.1514 31.8647L15.9487 32.5101C11.544 32.5101 7.55838 30.7189 4.67291 27.8239C1.78535 24.929 0 20.9324 0 16.5133L0.643311 1.25854L15.9487 0.512207C20.3534 0.512207 24.339 2.30342 27.2244 5.19836ZM22.5327 10.1095C20.873 8.44441 18.5806 7.41215 16.0493 7.41215C10.9845 7.41215 6.87735 11.5328 6.87735 16.6142C6.87735 19.1538 7.90623 21.4538 9.56585 23.1189C11.2255 24.7839 13.5179 25.8162 16.0493 25.8162C21.1119 25.8162 25.2191 21.6977 25.2212 16.6142C25.2212 14.0745 24.1923 11.7745 22.5327 10.1095Z"
      fill="#0B0B0B"
    />
  </svg>
);

const LabelWrapper = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <span className="body-l inline-block w-[236px] max-w-[236px] text-neutral-rich-gray">
        {label}
      </span>
      <span className="body-l-bold inline-block w-[236px] max-w-[236px] text-neutral-black">
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
        'body-l-bold w-fit rounded-[8px] border-[2px] px-3 py-1',
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

const ProjectCard: FC<ProjectCardProps> = ({
  lang,
  status = ProjectStatus.UPCOMING,
  className,
  title
}) => {
  return (
    <Link href={'/launch-pool/1'}>
      <div className={cn(projectCardVariants({ className, status }))}>
        <div className="flex flex-col justify-center gap-6">
          <div>{logo}</div>
          <div className="flex flex-col gap-8">
            <p className="body-xl-bold text-neutral-off-black">{title}</p>
            {status === ProjectStatus.UPCOMING && (
              <StatusTag status={status!} text="UPCOMING" />
            )}
            {status === ProjectStatus.LIVE_NOW && (
              <StatusTag status={status!} text="LIVE NOW" />
            )}
            {status === ProjectStatus.CLOSED && (
              <StatusTag status={status!} text="CLOSED MAR 9, 2024" />
            )}
            {status === ProjectStatus.LIVE_NOW && (
              <StatisticsCard totalFul={588496} totalUser={35120} />
            )}

            <div className="flex flex-col gap-5">
              <LabelWrapper label="Project Token" value="$HQT" />
              {status === ProjectStatus.LIVE_NOW && (
                <LabelWrapper
                  label="Offerings Close in"
                  value="5D 4H 48M 21MM"
                />
              )}
              {status === ProjectStatus.UPCOMING && (
                <LabelWrapper label="IDO Open in" value="5D 4H 48M 21MM" />
              )}
              <LabelWrapper
                label="Total Airdrop Amount"
                value="2% / 2,000,000 $hqt"
              />
              {status !== ProjectStatus.LIVE_NOW && (
                <LabelWrapper
                  label="Current Stakings"
                  value="10,000,000 $MNT"
                />
              )}
            </div>
            <HandleButton status={status!} />
          </div>
        </div>
        <div className="flex h-full items-center">
          <Image
            src={'/images/launch/launch_frame.png'}
            alt=""
            width={424}
            height={400}
          ></Image>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
