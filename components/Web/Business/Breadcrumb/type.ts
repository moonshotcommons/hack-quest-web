export enum QueryIdType {
  LEARNING_TRACK_ID = 'learningTrackId',
  MENU_COURSE_ID = 'menuCourseId',
  LESSON_ID = 'lessonId',
  HACKATHON_ID = 'hackathonId',
  PROJECT_ID = 'projectId'
}

export enum Menu {
  LEARNING_TRACK = 'learningTrack',
  ELECTIVES = 'electives',
  RESOURCE_STATION = 'resourceStation',
  HACKATHON = 'hackathon',
  PROJECTS = 'projects'
}
export type MenuNameType = {
  [key in Menu]: string;
};
