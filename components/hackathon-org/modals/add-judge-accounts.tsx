import * as React from 'react';

export type JudgeAccount = {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
};

export function AddJudgeAccounts() {
  const [judgeAccounts, setJudgeAccounts] = React.useState<any[]>([]);
  return <div className="w-full"></div>;
}
