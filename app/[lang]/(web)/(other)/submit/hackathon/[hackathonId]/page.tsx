import { FC } from 'react';

interface HackathonSubmitPageProps {}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = (props) => {
  return (
    <div className="mx-auto my-4 flex w-full max-w-[806px] flex-col justify-center rounded-[16px] bg-neutral-white p-10">
      <div className="flex w-full flex-col justify-center text-center">
        <h4>Linea Mini-hack -May</h4>
        <p>Hackathon Registration</p>
      </div>
    </div>
  );
};

export default HackathonSubmitPage;
