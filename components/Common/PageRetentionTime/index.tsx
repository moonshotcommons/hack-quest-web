'use client';
import { BurialPoint, BurialPointType } from '@/helper/burialPoint';
import { FC, useEffect } from 'react';

interface PageRetentionTimeProps {
  trackName: BurialPointType;
}

const PageRetentionTime: FC<PageRetentionTimeProps> = ({ trackName }) => {
  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track(trackName, { duration });
    };
  }, []);

  return <></>;
};

export default PageRetentionTime;
