export const STATUS = {
  REGISTERED: 'registered',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under review',
  ENDED: 'ended',
  MISSED: 'missed'
};

export const ROLES = {
  TEAM_LEADER: 'team_leader',
  TEAM_MEMBER: 'team_member',
  SOLO: 'solo'
};

export const PERMISSIONS = {
  [ROLES.TEAM_LEADER]: {
    [STATUS.REGISTERED]: ['submit', 'manage'],
    [STATUS.SUBMITTED]: ['edit', 'manage'],
    [STATUS.UNDER_REVIEW]: ['view'],
    [STATUS.ENDED]: ['learn_more'],
    [STATUS.MISSED]: ['learn_more']
  },
  [ROLES.TEAM_MEMBER]: {
    [STATUS.REGISTERED]: ['leave'],
    [STATUS.SUBMITTED]: ['leave'],
    [STATUS.UNDER_REVIEW]: ['leave'],
    [STATUS.ENDED]: ['learn_more'],
    [STATUS.MISSED]: ['learn_more']
  },
  [ROLES.SOLO]: {
    [STATUS.REGISTERED]: ['submit', 'withdraw'],
    [STATUS.SUBMITTED]: ['edit', 'withdraw'],
    [STATUS.UNDER_REVIEW]: ['view'],
    [STATUS.ENDED]: ['learn_more'],
    [STATUS.MISSED]: ['learn_more']
  }
};

export function hasPermission(role: string, status: string, action: string) {
  return PERMISSIONS[role] && PERMISSIONS[role][status] && PERMISSIONS[role][status].includes(action);
}
