import { HackathonEditModalType } from './type';

import { z } from 'zod';

export const hackathonDetailTimeLine = [
  {
    key: 'registrationOpen',
    time: 'openTime'
  },
  {
    key: 'submissionsClose',
    time: 'reviewTime'
  },
  {
    key: 'rewardAnnouncement',
    time: 'rewardTime'
  }
];

export const initNavs = [
  {
    label: 'hackathonDetail.cover',
    value: 'cover'
  },
  {
    label: 'hackathonDetail.timeline',
    value: 'timeline'
  },
  {
    label: 'hackathonDetail.rewards',
    value: 'rewards'
  },
  {
    label: 'hackathonDetail.judging',
    value: 'judging'
  },
  {
    label: 'hackathonDetail.application',
    value: 'application'
  },
  {
    label: 'hackathonDetail.submission',
    value: 'submission'
  },
  {
    label: 'hackathonDetail.links',
    value: 'links'
  }
];

export const placeIndexStr = ['First', 'Second', 'Third', 'Fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];

export const scheduleFormSchema = z.object({
  eventName: z
    .string()
    .min(1, {
      message: 'Event Name is a required input.'
    })
    .max(80, {
      message: 'Event Name cannot exceed 80 characters.'
    })
  // startTime: z.string().min(1),
  // endTime: z.string().min(1),
  // speakerNames: z.string(),
  // description: z.string().max(360, {
  //   message: 'Description cannot exceed 360 characters.'
  // }),
  // link: z.string().url(),
  // address: z.string()
});

export const faqsFormSchema = z.object({
  id: z.string().uuid(),
  question: z
    .string()
    .min(1, {
      message: 'Question is a required input.'
    })
    .max(120, {
      message: 'Question cannot exceed 120 characters.'
    }),
  answer: z
    .string()
    .min(1, {
      message: 'Answer is a required input.'
    })
    .max(360, {
      message: 'Answer cannot exceed 360 characters.'
    })
});

export const faqsFormArraySchema = z.object({
  items: z.array(faqsFormSchema)
});

export type FormValueType = z.infer<typeof faqsFormArraySchema>;
