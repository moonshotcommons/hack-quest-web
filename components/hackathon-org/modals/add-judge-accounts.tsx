import * as React from 'react';
import Image from 'next/image';
import { JudgeAccount } from './edit-judging-detail-modal';

export function AddJudgeAccounts({
  judgeAccounts,
  setJudgeAccounts
}: {
  judgeAccounts: JudgeAccount[];
  setJudgeAccounts: React.Dispatch<React.SetStateAction<JudgeAccount[]>>;
}) {
  function removeJudgeAccount(email: string) {
    setJudgeAccounts((prev) => prev.filter((judge) => judge.email !== email));
  }
  return (
    <div className="w-full">
      {judgeAccounts.length > 0 && (
        <React.Fragment>
          {judgeAccounts.map((account) => (
            <div className="flex items-center" key={account.email}>
              <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full bg-yellow-dark">
                <Image src={account.avatar} alt="avatar" fill className="rounded-full" />
              </div>
              <span className="body-m ml-3 text-neutral-off-black">{account.nickname}</span>
              <span className="body-m ml-auto text-neutral-medium-gray">{account.email}</span>
              <button
                type="button"
                className="body-m ml-10 text-neutral-off-black underline"
                onClick={() => removeJudgeAccount(account.email)}
              >
                Remove
              </button>
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}
