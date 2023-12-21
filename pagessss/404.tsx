import { useRedirect } from '@/hooks/useRedirect';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface NotFoundPageProps {
  children: React.ReactNode;
}

const NotFoundPage: NextPage<NotFoundPageProps> = (props) => {
  const { redirectToUrl } = useRedirect();
  const [seconds, setSeconds] = useState(3);

  const dispatch = useDispatch();
  useEffect(() => {
    let time = setTimeout(() => {
      dispatch(setUnLoginType(UnLoginType.LOGIN));
      redirectToUrl('/');
    }, 3000);

    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    let time = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(time);
  }, [seconds]);

  return (
    <div className="text-center m-20 text-black font-next-book-bold">
      <div className="text-8xl">404 Not Found</div>
      <p className="m-10">
        It will return to the home page in
        <span className="text-4xl">{seconds}</span> seconds
      </p>
    </div>
  );
};

export default NotFoundPage;
