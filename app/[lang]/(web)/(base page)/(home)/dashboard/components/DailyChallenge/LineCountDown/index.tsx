import { useCountDown } from 'ahooks';
import { FC, useEffect, useState } from 'react';

interface LineCountDownProps {
  second: number;
  stop: boolean;
  onEnd: VoidFunction;
  dep: any;
}

const LineCountDown: FC<LineCountDownProps> = ({ second, stop = false, onEnd, dep }) => {
  const [targetDate, setTargetDate] = useState<number>();
  const [width, setWidth] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  const [countDown, formattedRes] = useCountDown({ targetDate, interval: 60, onEnd });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;
  useEffect(() => {
    setTargetDate(Date.now() + second * 1000);
  }, [dep]);

  useEffect(() => {
    if (!stop) {
      let s = Math.ceil((seconds * 1000 + milliseconds) / 1000);
      setWidth(Math.abs((countDown / (second * 1000) - 1) * 100));
      setTimeLeft(`${minutes < 10 ? '0' + minutes : minutes}:${s < 10 ? '0' + s : s}`);
    }
  }, [countDown, stop, formattedRes]);

  return (
    <div className="flex w-full items-center gap-6">
      <div className="relative h-3 flex-1 rounded-full bg-yellow-extra-light">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-yellow-primary transition-all ease-linear"
          style={{
            width: `${width}%`
          }}
        ></div>
      </div>
      <span className="body-l-bold text-neutral-medium-gray">{timeLeft}</span>
    </div>
  );
};

export default LineCountDown;
