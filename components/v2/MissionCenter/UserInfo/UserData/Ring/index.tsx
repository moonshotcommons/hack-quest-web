import React from 'react';

/**
 * @圆环进度条
 * radius 圆环进度条半径
 * percent 进度(0 - 1)
 * strokeWidth 圆环宽度 默认2px
 */
type RingProps = {
  radius: number;
  percent: number;
  strokeWidth?: number;
};

function Ring({ radius, percent }: RingProps) {
  const width = 2 * radius;
  const len = 2 * Math.PI * radius;
  const p = percent > 1 || percent < 0 ? 0 : percent;
  const strokeDashoffset = len - len * p || 0;
  return (
    <svg width={width} height={width} className="rotate-90">
      <circle
        cx={radius}
        cy={radius}
        r={radius - 14}
        className="text-[#DADADA]"
        strokeWidth={12}
        stroke="currentColor"
        fill="none"
      ></circle>
      <circle
        cx={radius}
        cy={radius}
        r={radius - 10}
        className="text-[#FFD850]"
        strokeWidth={20}
        strokeDasharray={len}
        strokeDashoffset={strokeDashoffset as number}
        stroke="currentColor"
        fill="none"
      ></circle>
    </svg>
  );
}

export default Ring;
