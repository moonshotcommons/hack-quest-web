/** 学习路线卡片信息 */
export interface LearningTrackType {
  id: string;
  name: string;
  description: string;
  level: string;
  aboutDesc: string;
  courseCount: number;
  duration: number;
}

/** 学习路线详情 */
export interface LearningTrackDetailType {
  id: string;
  name: string;
  description: string;
  level: string;
  aboutDesc: string;
  courseCount: number;
  duration: number;
  peopleJoined: number;
}
