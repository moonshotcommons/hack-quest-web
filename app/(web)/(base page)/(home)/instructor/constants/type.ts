export enum CourseTab {
  PUBLISHED = 'Published',
  DRAFT = 'Draft',
  UNDER_REVIEW = 'under Review',
  UNPUBLISHED = 'Unpublished'
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
