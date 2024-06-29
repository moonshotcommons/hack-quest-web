import { HackathonTeam, HackathonTeamDetail, TeamMemberInfo } from '@/service/webApi/resourceStation/type';
import message from 'antd/es/message';
import Image from 'next/image';
import { FC, useCallback } from 'react';
import { HackathonPartner } from '../../../../../submission/[projectId]/components/constants';

interface OwnerGroupDetailProps {
  team: HackathonTeam;
  teamDetail: HackathonTeamDetail;
  onDelete: (team: HackathonTeam) => void;
  onRemoveMember: (team: HackathonTeam, userInfo: TeamMemberInfo) => void;
  userId: string;
  hackathonId: string;
}

const OwnerGroupDetail: FC<OwnerGroupDetailProps> = ({
  team,
  onDelete,
  onRemoveMember,
  userId,
  teamDetail,
  hackathonId
}) => {
  // const [teamDetail, setTeamDetail] = useState<HackathonTeamDetail>();

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(team.code || '');
      message.success('Copy success!');
    } catch (e) {
      message.warning('The browser version is too low or incompatible！');
    }
  }, [team.code]);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <span className="body-l-bold text-neutral-off-black">{team.name}</span>
        <span className="underline-s flex cursor-pointer items-center gap-1 text-neutral-rich-gray transition hover:text-status-error">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.6654 1.33594H3.33203C2.22746 1.33594 1.33203 2.23137 1.33203 3.33594V4.66927C1.33203 5.03746 1.63051 5.33594 1.9987 5.33594H2.66536V12.6693C2.66536 13.7738 3.56079 14.6693 4.66536 14.6693H11.332C12.4366 14.6693 13.332 13.7738 13.332 12.6693V5.33594H13.9987C14.3669 5.33594 14.6654 5.03746 14.6654 4.66927V3.33594C14.6654 2.23137 13.7699 1.33594 12.6654 1.33594ZM11.999 12.6693C11.999 13.0375 11.7005 13.3359 11.3324 13.3359H4.66569C4.2975 13.3359 3.99902 13.0375 3.99902 12.6693V5.33594H11.999V12.6693ZM2.66504 4.00228H13.3317V3.33561C13.3317 2.96742 13.0332 2.66895 12.665 2.66895H3.33171C2.96352 2.66895 2.66504 2.96742 2.66504 3.33561V4.00228ZM5.33203 11.3356V7.33561C5.33203 6.96742 5.63051 6.66895 5.9987 6.66895C6.36689 6.66895 6.66536 6.96742 6.66536 7.33561V11.3356C6.66536 11.7038 6.36689 12.0023 5.9987 12.0023C5.63051 12.0023 5.33203 11.7038 5.33203 11.3356ZM9.33203 7.33561V11.3356C9.33203 11.7038 9.63051 12.0023 9.9987 12.0023C10.3669 12.0023 10.6654 11.7038 10.6654 11.3356V7.33561C10.6654 6.96742 10.3669 6.66895 9.9987 6.66895C9.63051 6.66895 9.33203 6.96742 9.33203 7.33561Z"
              fill="currentColor"
            />
          </svg>
          <span className="body-s text-[14px] leading-[160%]" onClick={() => onDelete(team)}>
            Delete Team
          </span>
        </span>
      </div>
      <div className="flex justify-between gap-1 rounded-[16px] bg-neutral-off-white p-3 text-left">
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.9987 15.5609C4.3168 15.5609 1.33203 12.5761 1.33203 8.89421C1.33203 5.21231 4.3168 2.22754 7.9987 2.22754C9.76681 2.22754 11.4625 2.92992 12.7127 4.18016C13.963 5.4304 14.6654 7.1261 14.6654 8.89421C14.6654 12.5761 11.6806 15.5609 7.9987 15.5609ZM8.66536 9.5612V5.5612C8.66536 5.19301 8.36689 4.89453 7.9987 4.89453C7.63051 4.89453 7.33203 5.19301 7.33203 5.5612V9.5612C7.33203 9.92939 7.63051 10.2279 7.9987 10.2279C8.36689 10.2279 8.66536 9.92939 8.66536 9.5612ZM8.25204 11.6145C8.29453 11.6291 8.33488 11.6493 8.37204 11.6745C8.40697 11.6991 8.44036 11.7258 8.47204 11.7545C8.59386 11.8823 8.66292 12.0513 8.66538 12.2278C8.6664 12.405 8.59683 12.5754 8.47204 12.7012C8.40724 12.7601 8.33283 12.8074 8.25204 12.8412C8.09068 12.9125 7.90674 12.9125 7.74538 12.8412C7.66459 12.8074 7.59018 12.7601 7.52538 12.7012C7.40058 12.5754 7.33102 12.405 7.33204 12.2278C7.33102 12.0506 7.40058 11.8803 7.52538 11.7545C7.68298 11.5984 7.90789 11.531 8.12538 11.5745C8.16953 11.5807 8.21234 11.5942 8.25204 11.6145ZM7.99837 3.56055C10.9439 3.56055 13.3317 5.94836 13.3317 8.89388C13.3317 10.3084 12.7698 11.6649 11.7696 12.6651C10.7694 13.6653 9.41286 14.2272 7.99837 14.2272C5.05285 14.2272 2.66504 11.8394 2.66504 8.89388C2.66504 5.94836 5.05285 3.56055 7.99837 3.56055Z"
            fill="#8C8C8C"
          />
        </svg>

        <p className="button-text-s leading-[160%] text-neutral-medium-gray">
          This hackathon let’s you have upto {hackathonId === HackathonPartner.Hack4Bengal ? '4' : '5'} teammates. Share
          the code below to add teammates.
        </p>
      </div>
      <div className="my-1 flex flex-col gap-1">
        <p className="body-s text-left text-neutral-rich-gray">Team Code</p>
        <div className="body-m flex items-center justify-between gap-1 rounded-[16px] bg-yellow-extra-light px-6 py-3 leading-[160%] text-neutral-off-black">
          <span>{team.code}</span>
          <span className="text-neutral-medium-gray transition hover:text-neutral-rich-gray" onClick={copyCode}>
            <svg
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M2.58759 19.6453C2.05915 19.6453 1.60662 19.4562 1.23 19.078C0.85337 18.6999 0.665377 18.2458 0.666017 17.7159V5.17499C0.666017 4.90166 0.758253 4.67239 0.942723 4.48717C1.12719 4.30195 1.35522 4.20966 1.6268 4.21031C1.89902 4.21031 2.12737 4.30292 2.31184 4.48813C2.49631 4.67335 2.58823 4.90231 2.58759 5.17499V17.7159H12.1954C12.4676 17.7159 12.696 17.8085 12.8805 17.9937C13.0649 18.1789 13.1568 18.4079 13.1562 18.6806C13.1562 18.9539 13.064 19.1832 12.8795 19.3684C12.695 19.5536 12.467 19.6459 12.1954 19.6453H2.58759ZM6.43072 15.7865C5.90229 15.7865 5.44976 15.5975 5.07313 15.2193C4.69651 14.8411 4.50851 14.3871 4.50915 13.8572V2.28093C4.50915 1.75036 4.69747 1.29599 5.07409 0.917834C5.45072 0.539678 5.90293 0.350921 6.43072 0.351564H15.0778C15.6062 0.351564 16.0587 0.540642 16.4354 0.918799C16.812 1.29696 17 1.751 16.9993 2.28093V13.8572C16.9993 14.3877 16.811 14.8421 16.4344 15.2203C16.0578 15.5984 15.6056 15.7872 15.0778 15.7865H6.43072ZM6.43072 13.8572H15.0778V2.28093H6.43072V13.8572Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="my-1 flex flex-col gap-1">
        <p className="body-s text-left text-neutral-rich-gray">Team Members ({teamDetail?.members.length || 0})</p>
        {(teamDetail?.members || []).map((member) => {
          return (
            <div className="flex items-center justify-between py-2" key={member.userId}>
              <span className="flex  items-center gap-2 ">
                <span className="h-9 w-9 overflow-hidden rounded-full bg-neutral-light-gray text-xs">
                  <Image src={member.avatar} alt="avatar" width={36} height={36} />
                </span>
                <span className="body-s">
                  {member.firstName + ' ' + member.lastName}
                  {userId === member.userId && ' (You)'}
                </span>
              </span>
              {member.isAdmin && <span>Admin</span>}
              {!member.isAdmin && (
                <span
                  className="underline-s cursor-pointer leading-[160%] text-neutral-rich-gray transition hover:text-status-error"
                  onClick={() => onRemoveMember(team, member)}
                >
                  Remove Teammate
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OwnerGroupDetail;
