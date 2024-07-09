import { AddSectionType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

export const week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

export const modalList = [
  {
    label: 'hackathonDetail.mediaPartners',
    type: AddSectionType.MEDIA_PARTNERS
  },
  {
    label: 'hackathonDetail.communityPartners',
    type: AddSectionType.COMMUNITY_PARTNERS
  },
  {
    label: 'hackathonDetail.partners',
    type: AddSectionType.PARTNERS
  },
  {
    label: 'hackathonDetail.speakers',
    type: AddSectionType.SPEAKERS
  },
  {
    label: 'hackathonDetail.sponsors',
    type: AddSectionType.SPONSORS
  },
  {
    label: 'hackathonDetail.schedule',
    type: AddSectionType.SCHEDULE
  },
  {
    label: 'FAQs',
    type: AddSectionType.FAQS
  }
];

export const hackathonSections = {
  require: ['info', 'application', 'submission', 'links', 'cover', 'timeline', 'rewards', 'judge'],
  optional: ['mediaPartners', 'communityPartners', 'partners', 'speakers', 'sponsors', 'schedule', 'faqs']
};
