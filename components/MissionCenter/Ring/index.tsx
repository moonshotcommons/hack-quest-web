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

function Ring({ radius, percent, strokeWidth = 2 }: RingProps) {
  const width = 2 * radius;
  const len = 2 * Math.PI * radius;
  const p = percent > 1 || percent < 0 ? 0 : percent;
  const strokeDashoffset = len - len * p;
  return (
    <svg width={width} height={width} className="-rotate-90">
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth}
        className="text-mission-center-quests-box"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="none"
      ></circle>
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth}
        className="text-mission-center-quests-box-active"
        strokeWidth={strokeWidth}
        strokeDasharray={len}
        strokeDashoffset={strokeDashoffset as number}
        stroke="currentColor"
        fill="none"
      ></circle>
    </svg>
  );
}

export default Ring;
