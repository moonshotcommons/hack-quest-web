'use client';
import React from 'react';
const useIsPc = () => {
  const isPc = () => {
    const winWidth = window?.screen?.width;
    return winWidth >= 770;
  };
  return isPc;
};

export default useIsPc;
