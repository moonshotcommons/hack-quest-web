'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { CircularProgress } from '@/components/shared/circular-progress';

const chartConfig = {
  score: {
    label: 'Score',
    color: 'var(--yellow-dark)'
  }
} satisfies ChartConfig;

const chartData = [
  { latitude: 'Technical Ability', score: 25 },
  { latitude: 'Reputation', score: 100 },
  { latitude: 'Contribution', score: 100 },
  { latitude: 'On-chain Activity', score: 75 },
  { latitude: 'Influence', score: 75 }
];

export function BuilderScore() {
  return (
    <div className="mt-[88px]">
      <h2 className="font-next-book-bold text-[22px] font-bold">Web 3 Builder Score</h2>
      <p className="body-s mt-2 text-neutral-medium-gray">
        A score generated through analyzing how Web3 native you are and how your Web3 dev ability is.
      </p>
      <div className="mt-8 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">
          <ChartContainer config={chartConfig} className="aspect-square">
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="latitude" />
              <PolarGrid radialLines={false} />
              <Radar
                dataKey="score"
                fill="var(--color-score)"
                stroke="var(--color-score)"
                strokeWidth={4}
                fillOpacity={0.2}
                dot={{
                  r: 5,
                  fillOpacity: 1
                }}
              />
            </RadarChart>
          </ChartContainer>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <CircularProgress value={88}>
                <span className="font-next-book-bold text-lg font-bold text-neutral-rich-gray">A+</span>
              </CircularProgress>
              <div className="flex flex-col gap-1">
                <h3 className="body-s">Current Score</h3>
                <p className="body-s-bold">88/100</p>
              </div>
            </div>
            <Separator variant="dashed" />
          </div>
        </div>
        <div>3</div>
      </div>
    </div>
  );
}
