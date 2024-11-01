import { MotionProps } from 'framer-motion';
import { z } from 'zod';
import { HackathonEditModalType, HackathonTabType } from './type';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

export const projectSort = [
  {
    label: 'Latest to oldest',
    value: '-createdAt'
  },
  {
    label: 'Oldest to latest',
    value: 'createdAt'
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
    key: 'Registration',
    timeStr: 'Registration Open',
    time: ['registrationOpen', 'registrationClose']
  },
  {
    key: 'Submission',
    timeStr: 'Submission Deadline',
    time: ['submissionOpen', 'submissionClose']
  },
  {
    key: 'Judging Ends',
    timeStr: 'Judging Ends',
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
    label: 'hackathonDetail.judge',
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
    value: ''
  },
  {
    label: 'hackathonDetail.timeline',
    value: 'timeline'
  }
];

export const initMobileDetailNavs = [
  {
    label: 'hackathonDetail.overview',
    value: 'overview'
  },
  {
    label: 'hackathonDetail.timeline',
    value: 'timeline'
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
  description: z.string(),
  // .max(360, {
  //   message: 'Description cannot exceed 360 characters.'
  // }),
  link: z.string().url().optional().or(z.literal('')),
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
  answer: z.string().min(1, {
    message: 'Answer is a required input.'
  })
  // .max(6000, {
  //   message: 'Answer cannot exceed 6000 characters.'
  // })
});

export const faqsFormArraySchema = z.object({
  items: z.array(faqsFormSchema)
});

export const customTextFormSchema = z.object({
  text: z.string().min(1, {
    message: 'Answer is a required input.'
  })
});

export type FormValueType = z.infer<typeof faqsFormArraySchema>;

export const hackathonDashboardTab: HackathonTabType[] = [
  {
    label: 'onGoingHackathon',
    value: HackathonStatusType.ON_GOING,
    count: 0
  },
  {
    label: 'review',
    value: HackathonStatusType.REVIEW,
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

export const judgeModeLabel = {
  all: 'Users + Judges',
  judges: 'Judges Only'
};
export const voteModeLabel = {
  fixed: 'Fixed Number of Vote',
  score: 'Project Scoring'
};

export const ORGANIZATION_APPLY_LINK = 'https://xsxo494365r.typeform.com/to/PxtaoxdQ';

export const customModalList = [
  {
    label: 'Text',
    value: HackathonEditModalType.CUSTOM_TEXT,
    image: '',
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus ipsum id velit accumsan tristique.'
  },
  {
    label: 'Image & Name',
    value: HackathonEditModalType.CUSTOM_IMAGE_NAME,
    image: '/images/hackathon/image_name.png',
    intro: ''
  },
  {
    label: 'Image, Name & Intro',
    value: HackathonEditModalType.CUSTOM_IMAGE_TITLE,
    image: '/images/hackathon/image_title.png',
    intro: ''
  }
];
