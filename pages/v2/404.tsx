import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface NotFoundPageProps {
  children: React.ReactNode;
}

const NotFoundPage: NextPage<NotFoundPageProps> = (props) => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(3);
  useEffect(() => {
    let time = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(time);
  }, [router]);

  useEffect(() => {
    let time = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(time);
  }, [seconds]);

  return (
    <div className="text-center m-20 text-white font-next-book-bold">
      <div className="text-8xl">404 Not Found</div>
      <p className="m-10">
        It will return to the home page in
        <span className="text-4xl">{seconds}</span> seconds
      </p>
    </div>
  );
};

export default NotFoundPage;
