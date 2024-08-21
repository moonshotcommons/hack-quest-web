'use client';

import * as React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { CircularProgress } from '@/components/shared/circular-progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { INDICATORS } from '../constants';
import { useProfile } from './profile-provider';
import { getGrade } from '../utils';
import { useModal } from '../utils/modal';
import { EditExperience } from '../modals/edit-experience';

const chartConfig = {
  score: {
    label: 'Score',
    color: 'var(--yellow-dark)'
  }
} satisfies ChartConfig;

export function BuilderScore() {
  const { onOpen } = useModal();
  const { profile } = useProfile();

  const avgrateScore = React.useMemo(() => {
    if (profile?.web3Score) {
      return Math.round(profile?.web3Score.reduce((acc, cur) => acc + cur.score, 0) / profile?.web3Score.length);
    }
    return 0;
  }, [profile?.web3Score]);

  console.info(profile?.web3Score);
  return (
    <div className="bg-neutral-white px-5 py-4 sm:p-0">
      <h2 className="font-next-book-bold text-lg font-bold sm:text-[22px]">Web 3 Builder Score</h2>
      <p className="body-s mt-2 text-neutral-medium-gray">
        A score generated through analyzing how Web3 native you are and how your Web3 dev ability is.
      </p>
      <div className="mt-5 flex flex-col gap-8 sm:mt-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_460px]">
          <div className="hidden sm:block">
            <ChartContainer config={chartConfig} className="h-[440px] w-[540px]">
              <RadarChart data={profile?.web3Score}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <PolarAngleAxis dataKey="latitude" />
                <PolarRadiusAxis angle={25} domain={[0, 100]} tick={false} axisLine={false} />
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
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <CircularProgress value={avgrateScore}>
                <span className="font-next-book-bold text-lg font-bold text-neutral-rich-gray">
                  {getGrade(avgrateScore > 100 ? 100 : avgrateScore)}
                </span>
              </CircularProgress>
              <div className="flex flex-col gap-1">
                <h3 className="body-s">Current Score</h3>
                <p className="body-s-bold">{avgrateScore > 100 ? 100 : avgrateScore}/100</p>
              </div>
            </div>
            <Separator variant="dashed" />
            <Accordion type="multiple" className="flex w-full flex-col gap-4">
              {INDICATORS.map(({ title, icon: Icon, content }, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl px-3 data-[state=open]:bg-neutral-off-white"
                >
                  <AccordionTrigger className="py-3">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="ml-3 font-bold text-neutral-off-black">{title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2 px-9">
                    {content.map((item, itemIndex) =>
                      item.action ? (
                        item.action === 'experience' ? (
                          <EditExperience key={itemIndex} type="create" iconOnly={false} label={item.title} />
                        ) : (
                          <p
                            className="cursor-pointer underline"
                            key={itemIndex}
                            onClick={() => {
                              if (item.action === 'onboarding') {
                                const progress = profile?.progress || [];
                                if (progress.length < 3) {
                                  onOpen('onboarding');
                                }
                              }
                              if (item.action === 'profile') {
                                onOpen('profile');
                              }
                            }}
                          >
                            {item.title}
                          </p>
                        )
                      ) : item.link === '#' ? (
                        <p className="cursor-pointer self-start underline" key={itemIndex}>
                          {item.title}
                        </p>
                      ) : (
                        <Link href={item.link} key={itemIndex} className="self-start">
                          <p className="underline">{item.title}</p>
                        </Link>
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* {profile?.isCurrentUser && (
          <div className="hidden w-full rounded-2xl bg-neutral-off-white p-4 sm:block">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">
                Want to increase score? Connect with verified web3 platforms to let us know more about you!
              </h3>
              <ConnectAppModal />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
