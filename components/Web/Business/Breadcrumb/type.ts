export enum QueryIdType {
  LEARNING_TRACK_ID = 'learningTrackId',
  MENU_COURSE_ID = 'menuCourseId',
  LESSON_ID = 'lessonId',
  HACKATHON_ID = 'hackathonId',
  PROJECT_ID = 'projectId',
  DOCUMENTATION_ID = 'documentationId'
}

export enum Menu {
  LEARNING_TRACK = 'learningTrack',
  ELECTIVES = 'electives',
  PRACTICES = 'practices',
  RESOURCE_STATION = 'resourceStation',
  HACKATHON = 'hackathon',
  PROJECTS = 'projects'
}
export type MenuNameType = {
  [key in Menu]: string;
};
