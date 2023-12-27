export enum LearningTrackTab {
  BASIC = 'Basic',
  SPECIALLIZATION = 'Specialization'
}
export enum LearningTrackFilter {
  ALL = 'All',
  SOLIDITY = 'Solidity',
  RUST = 'Rust',
  MOVE = 'Move'
}

export interface SearchInfoType {
  tab: LearningTrackTab;
  filter: LearningTrackFilter;
}
