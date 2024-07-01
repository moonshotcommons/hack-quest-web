import { MotionProps } from 'framer-motion';
import { z } from 'zod';
import { HackathonTabType } from './type';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

export const projectSort = [
  {
    label: 'Latest to oldest',
    value: '-openTime'
  },
  {
    label: 'Oldest to latest',
    value: 'openTime'
  }
];

export const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0, translateY: '95%' },
  animate: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  exit: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 0 }
};

export const hackathonDetailTimeLine = [
  {
    key: 'registration',
    time: ['openTime', 'openTimeEnd']
  },
  {
    key: 'submissions',
    time: ['reviewTime', 'reviewTimeEnd']
  },
  {
    key: 'rewardAnnouncement',
    time: ['rewardTime']
  }
];

export const hackathonVoteProjectSort = [
  {
    label: 'Earliest Submission',
    value: '-createdAt'
  },
  {
    label: 'Latest Submission',
    value: 'createdAt'
  },
  {
    label: 'Your Votes',
    value: 'vote'
  }
];

export const initEditNavs = [
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

export const initDetailNavs = [
  {
    label: 'hackathonDetail.cover',
    value: 'cover'
  },
  {
    label: 'hackathonDetail.timeline',
    value: 'timeline'
  },
  {
    label: 'hackathonDetail.description',
    value: 'description'
  },
  {
    label: 'hackathonDetail.judging',
    value: 'judging'
  }
];

export const initMobileDetailNavs = [
  {
    label: 'hackathonDetail.overview',
    value: 'overview'
  },
  {
    label: 'hackathonDetail.description',
    value: 'description'
  },
  {
    label: 'hackathonDetail.timeline',
    value: 'timeline'
  },
  {
    label: 'hackathonDetail.judging',
    value: 'judging'
  }
];

export const placeIndexStr = ['First', 'Second', 'Third', 'Fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];

export const scheduleFormSchema = z.object({
  id: z.string().uuid(),
  eventName: z
    .string()
    .min(1, {
      message: 'Event Name is a required input.'
    })
    .max(80, {
      message: 'Event Name cannot exceed 80 characters.'
    }),
  startTime: z.string().min(1, {
    message: 'Start Time is a required input.'
  }),
  endTime: z.string().min(1, {
    message: 'End Time is a required input.'
  }),
  speakerNames: z.string(),
  description: z.string().max(360, {
    message: 'Description cannot exceed 360 characters.'
  }),
  link: z.string().url().optional(),
  address: z.string()
});

export const scheduleDefaultValues = {
  eventName: '',
  startTime: '',
  endTime: '',
  speakerNames: '',
  description: '',
  link: '',
  address: ''
};

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

export const hackathonDashboardTab: HackathonTabType[] = [
  {
    label: 'onGoingHackathon',
    value: HackathonStatusType.ON_GOING,
    count: 0
  },
  {
    label: 'draft',
    value: HackathonStatusType.DRAFT,
    count: 0
  },
  {
    label: 'pastHackathon',
    value: HackathonStatusType.PAST,
    count: 0
  }
];

export const hackathonSections = {
  require: ['info', 'application', 'submission', 'links', 'cover', 'timeline', 'rewards', 'judge'],
  optional: ['mediaPartners', 'communityPartners', 'partners', 'speakers', 'sponsors', 'schedule', 'faqs']
};
