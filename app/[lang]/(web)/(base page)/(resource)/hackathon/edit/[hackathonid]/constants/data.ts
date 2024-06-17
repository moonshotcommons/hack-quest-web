import { HackathonEditModalType } from './type';

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
