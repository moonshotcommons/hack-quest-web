import { useCountDown } from 'ahooks';

import { FC, ReactNode } from 'react';

interface CountdownProps {
  // children: ReactNode;
}

const Countdown: FC<CountdownProps> = (props) => {
  const [countdown, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-8-25 23:59:59`
  });

  // console.log(countdown, formattedRes);

  return (
    <div className="text-[calc((24/1728)*100vw)] text-[#ffffff7f] font-Chaney leading-[100%]">
      <p>Hackathon count down</p>
      <p>{`
      T- ${
        formattedRes.days < 10 ? '0' + formattedRes.days : formattedRes.days
      } days /
      ${
        formattedRes.hours < 10 ? '0' + formattedRes.hours : formattedRes.hours
      } hours /
      ${
        formattedRes.minutes < 10
          ? '0' + formattedRes.minutes
          : formattedRes.minutes
      } min /
      ${
        formattedRes.seconds < 10
          ? '0' + formattedRes.seconds
          : formattedRes.seconds
      } sec`}</p>
    </div>
  );
};

export default Countdown;
