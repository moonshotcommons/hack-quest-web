'use client';
import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';
import React from 'react';

interface CourseMarketProp {}

const CourseMarket: React.FC<CourseMarketProp> = () => {
  useNeedPCRedirect();
  return <div></div>;
};

export default CourseMarket;
