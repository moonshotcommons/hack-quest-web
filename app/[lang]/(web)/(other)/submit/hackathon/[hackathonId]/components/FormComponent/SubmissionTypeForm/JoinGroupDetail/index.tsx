import Image from 'next/image';
import { FC } from 'react';

interface JoinGroupDetailProps {
  teamName: string;
  onLeaveTeam: VoidFunction;
}

const JoinGroupDetail: FC<JoinGroupDetailProps> = ({ teamName, onLeaveTeam }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <span className="body-xl-bold text-neutral-off-black">{teamName}</span>
        <span className="underline-s flex cursor-pointer items-center gap-1 text-neutral-rich-gray transition hover:text-status-error">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9987 12.6693V10.6693C11.9987 10.3011 11.7002 10.0026 11.332 10.0026C10.9638 10.0026 10.6654 10.3011 10.6654 10.6693V12.6693C10.6654 13.0375 10.3669 13.3359 9.9987 13.3359H3.33203C2.96384 13.3359 2.66536 13.0375 2.66536 12.6693V3.33594C2.66536 2.96775 2.96384 2.66927 3.33203 2.66927H9.9987C10.3669 2.66927 10.6654 2.96775 10.6654 3.33594V5.33594C10.6654 5.70413 10.9638 6.0026 11.332 6.0026C11.7002 6.0026 11.9987 5.70413 11.9987 5.33594V3.33594C11.9987 2.23137 11.1033 1.33594 9.9987 1.33594H3.33203C2.22746 1.33594 1.33203 2.23137 1.33203 3.33594V12.6693C1.33203 13.7738 2.22746 14.6693 3.33203 14.6693H9.9987C11.1033 14.6693 11.9987 13.7738 11.9987 12.6693ZM13.1387 6.19594L14.472 7.52927C14.5982 7.65445 14.6692 7.82485 14.6692 8.0026C14.6692 8.18036 14.5982 8.35076 14.472 8.47594L13.1387 9.80927C13.0135 9.93548 12.8431 10.0065 12.6654 10.0065C12.4876 10.0065 12.3172 9.93548 12.192 9.80927C12.0658 9.68409 11.9948 9.5137 11.9948 9.33594C11.9948 9.15818 12.0658 8.98778 12.192 8.8626L12.392 8.66927H7.9987C7.63051 8.66927 7.33203 8.37079 7.33203 8.0026C7.33203 7.63441 7.63051 7.33594 7.9987 7.33594H12.392L12.192 7.1426C11.9306 6.88119 11.9306 6.45735 12.192 6.19594C12.4534 5.93452 12.8773 5.93452 13.1387 6.19594Z"
              fill="#3E3E3E"
            />
          </svg>
          <span className="text-[14px] leading-[160%]" onClick={onLeaveTeam}>
            Leave Team
          </span>
        </span>
      </div>
      {/* <div className="my-1 flex flex-col gap-1">
        <p className="body-m text-left text-neutral-rich-gray">Team Code</p>
        <div className="body-m flex items-center justify-between gap-1 rounded-[16px] bg-yellow-extra-light px-6 py-3 leading-[160%] text-neutral-off-black">
          <span>HX56QSDFDSC</span>
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
              fill="#8C8C8C"
            />
          </svg>
        </div>
      </div> */}
      <div className="my-1 flex flex-col gap-1">
        <p className="body-m text-left text-neutral-rich-gray">Team Members (1)</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between py-2">
            <span className="flex items-center gap-2">
              <Image src={'/images/user/login_avatar.svg'} alt="测试" width={36} height={36} />
              <span className="body-m">测试</span>
            </span>
            <span>Admin</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="flex items-center gap-2">
              <Image src={'/images/user/login_avatar.svg'} alt="测试" width={36} height={36} />
              <span className="body-m">测试</span>
            </span>
            <span className="underline-s cursor-pointer leading-[160%] text-neutral-rich-gray transition hover:text-status-error">
              Teammate
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 rounded-[16px] bg-neutral-off-white p-4">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.9987 14.6693C4.3168 14.6693 1.33203 11.6845 1.33203 8.0026C1.33203 4.32071 4.3168 1.33594 7.9987 1.33594C9.76681 1.33594 11.4625 2.03832 12.7127 3.28856C13.963 4.5388 14.6654 6.23449 14.6654 8.0026C14.6654 11.6845 11.6806 14.6693 7.9987 14.6693ZM8.66536 8.6696V4.6696C8.66536 4.30141 8.36689 4.00293 7.9987 4.00293C7.63051 4.00293 7.33203 4.30141 7.33203 4.6696V8.6696C7.33203 9.03779 7.63051 9.33626 7.9987 9.33626C8.36689 9.33626 8.66536 9.03779 8.66536 8.6696ZM8.25204 10.7229C8.29453 10.7375 8.33488 10.7577 8.37204 10.7829C8.40697 10.8075 8.44036 10.8342 8.47204 10.8629C8.59386 10.9907 8.66292 11.1597 8.66538 11.3362C8.6664 11.5134 8.59683 11.6838 8.47204 11.8096C8.40724 11.8685 8.33283 11.9158 8.25204 11.9496C8.09068 12.0209 7.90674 12.0209 7.74538 11.9496C7.66459 11.9158 7.59018 11.8685 7.52538 11.8096C7.40058 11.6838 7.33102 11.5134 7.33204 11.3362C7.33102 11.159 7.40058 10.9887 7.52538 10.8629C7.68298 10.7068 7.90789 10.6394 8.12538 10.6829C8.16953 10.6891 8.21234 10.7026 8.25204 10.7229ZM7.99837 2.66895C10.9439 2.66895 13.3317 5.05676 13.3317 8.00228C13.3317 9.41677 12.7698 10.7733 11.7696 11.7735C10.7694 12.7737 9.41286 13.3356 7.99837 13.3356C5.05285 13.3356 2.66504 10.9478 2.66504 8.00228C2.66504 5.05676 5.05285 2.66895 7.99837 2.66895Z"
            fill="#8C8C8C"
          />
        </svg>
        <p className="body-s leading-[160%] text-neutral-medium-gray">
          Only the admin can continue to submit the project.
        </p>
      </div>
    </div>
  );
};

export default JoinGroupDetail;
