export enum CourseTab {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  UNDER_REVIEW = 'under Review',
  UNPUBLISHED = 'unpublished'
}

export enum MessageTab {
  UNREAD = 'Unread',
  READ = 'Read'
}

export interface TabType {
  value: CourseTab | MessageTab;
  label: string;
  count: number;
}
