import { CourseTab, MessageTab, TabType } from './type';

export const courseTab: TabType[] = [
  {
    value: CourseTab.PUBLISHED,
    label: 'Published',
    count: 0
  },
  {
    value: CourseTab.DRAFT,
    label: 'Draft',
    count: 0
  },
  {
    value: CourseTab.UNDER_REVIEW,
    label: 'Under Review',
    count: 0
  },
  {
    value: CourseTab.UNPUBLISHED,
    label: 'Unpublished',
    count: 0
  }
];

export const messageTab: TabType[] = [
  {
    value: MessageTab.UNREAD,
    label: 'Unread',
    count: 0
  },
  {
    value: MessageTab.READ,
    label: 'read',
    count: 0
  }
];
