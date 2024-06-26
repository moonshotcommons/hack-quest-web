import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

export const week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

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
    label: 'hackathonDetail.speakers',
    type: HackathonEditModalType.SPEAKERS
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
