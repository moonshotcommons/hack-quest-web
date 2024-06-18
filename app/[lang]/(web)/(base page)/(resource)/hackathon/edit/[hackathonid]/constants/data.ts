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

export const placeIndexStr = ['First', 'Second', 'Third', 'Fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];

export const modalList = [
  {
    label: 'hackathonDetail.mediaPartners',
    type: HackathonEditModalType.MEDIA_PARTNERS
  },
  {
    label: 'hackathonDetail.communityPartners',
    type: HackathonEditModalType.COMMUNITY_PARTNERS
  },
  {
    label: 'hackathonDetail.partners',
    type: HackathonEditModalType.PARTNERS
  },
  {
    label: 'hackathonDetail.speakersAndJudges',
    type: HackathonEditModalType.SPEAKERS_JUDGES
  },
  {
    label: 'hackathonDetail.sponsors',
    type: HackathonEditModalType.SPONSORS
  },
  {
    label: 'hackathonDetail.schedule',
    type: HackathonEditModalType.SCHEDULE
  },
  {
    label: 'FAQs',
    type: HackathonEditModalType.FAQS
  }
];

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
