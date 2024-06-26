import { TeamMemberInfo } from '@/service/webApi/resourceStation/type';

export enum ActionType {
  DeleteTeam = 'DeleteTeam',
  RemoveMember = 'RemoveMember',
  LeaveTeam = 'LeaveTeam'
}

interface DeleteAndLeaveTeamParams {
  type: ActionType.DeleteTeam | ActionType.LeaveTeam;
  teamName: string;
}

interface RemoveMemberParams {
  type: ActionType.RemoveMember;
  userInfo: TeamMemberInfo;
}

// type A = Omit

type Merge<T extends DeleteAndLeaveTeamParams | RemoveMemberParams> = T & {
  onCancel?: VoidFunction;
  onConfirm: () => Promise<unknown>;
  onConfirmCallback?: VoidFunction;
};

export type GetParams<T extends ActionType> = T extends ActionType.DeleteTeam
  ? Merge<{ [Key in keyof DeleteAndLeaveTeamParams]: DeleteAndLeaveTeamParams[Key] } & { type: T }>
  : T extends ActionType.LeaveTeam
    ? Merge<{ [Key in keyof DeleteAndLeaveTeamParams]: DeleteAndLeaveTeamParams[Key] } & { type: T }>
    : T extends ActionType.RemoveMember
      ? Merge<{ [Key in keyof RemoveMemberParams]: RemoveMemberParams[Key] } & { type: T }>
      : unknown;

export type OptionType = Merge<DeleteAndLeaveTeamParams> | Merge<RemoveMemberParams>;
