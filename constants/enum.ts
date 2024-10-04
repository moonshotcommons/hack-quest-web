/** 主题 */
export enum Theme {
  Dark = 'dark',
  Light = 'light'
}

/** 卡片类型 */
export enum CardType {
  HACKATHON = 'HACKATHON',
  LEARNING_TRACK = 'LEARNING_TRACK',
  SYNTAX = 'SYNTAX',
  TEASER = 'TEASER',
  CONCEPT = 'CONCEPT',
  GUIDED_PROJECT = 'GUIDED_PROJECT'
}

/** Tab类型 */
export enum TabType {
  SYNTAX = 'SYNTAX',
  GUIDED_PROJECT = 'GUIDED_PROJECT',
  CONCEPT = 'CONCEPT',
  TEASER = 'TEASER'
}

export enum LocalStorageKey {
  ShowAICostCoinModal = 'showCostCoinModal',
  ShowAnswerCostCoinModal = 'showAnswerCostCoinModal'
}

export const domains = {
  dev: 'https://dev.hackquest.io/',
  staging: 'https://test.hackquest.io/',
  prod: 'https://www.hackquest.io/',
  local: process.env.LOCAL_HOST ?? 'http://localhost:3000/'
};
