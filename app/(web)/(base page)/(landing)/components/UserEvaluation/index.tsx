import { FC } from 'react';
import ScrollContainer from './ScrollContainer';
import EvaluationCard from './EvaluationCard';
import { userEvaluation } from './constant';
import { cn } from '@/helper/utils';

const UserEvaluation: FC<{}> = (props) => {
  return (
    <div className="mt-[7.5rem] w-full bg-neutral-white py-10">
      <div className="flex flex-col gap-3 items-center text-center w-[50rem] mx-auto">
        <p className="body-s-bold uppercase text-neutral-rich-gray">{`testimonial`}</p>
        <h2 className="text-h2">
          Students and Partners like You{' '}
          <span className="text-status-error">❤</span> us ️
        </h2>
        <p className="body-l text-neutral-medium-gray tracking-tight">
          Don’t take our words for it. See what others say about HackQuest!
        </p>
      </div>
      <div className="mt-[3.75rem]">
        <ScrollContainer>
          <div className="flex justify-center gap-6 h-[35.75rem]">
            {/* 第一列 */}
            {userEvaluation.map((col, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    'w-[19.4375rem] flex flex-col gap-6 h-full shrink-0',
                    col.className
                  )}
                >
                  {col.items.map((item, i) => {
                    return (
                      <EvaluationCard
                        key={item.username + i}
                        content={item.content}
                        username={item.username}
                        userDesc={item.userDesc}
                        avatar={`/images/landing/avatar/${item.username}.png`}
                      ></EvaluationCard>
                    );
                  })}
                </div>
              );
            })}
            {/* <div className="w-[19.4375rem] flex flex-col gap-6 h-full shrink-0">
              <EvaluationCard
                content={
                  <span className="tracking-normal">
                    Partnering with the HackQuest team has been an amazing
                    experience. I am amazed every time when we host developer
                    IRL events like hacker house and developer meetup.{' '}
                    <span className="body-s-bold">
                      Our team is beyond excited to see the impact HackQuest
                      will have on the Solana and Rust communities going
                      forward.
                    </span>
                  </span>
                }
                username="Yaoyao"
                userDesc="Growth @ Solana Foundation"
                avatar="/images/landing/solana_icon.png"
              ></EvaluationCard>
              <EvaluationCard
                content={
                  <span>
                    {`What truly makes HackQuest special is the incredible individuals who are part of this community. I've had the pleasure of meeting sincere and practical idealists here. `}
                    <span className="body-s-bold">
                      {`To all my fellow builders out there, if you are considering joining their Hackathons, go for it. `}
                    </span>
                    {` You won't regret it!`}
                  </span>
                }
                username="Eric"
                userDesc="Founder @ Cluster3"
                avatar="/images/landing/eric.png"
              ></EvaluationCard>
            </div>
            <div className="w-[19.4375rem] flex flex-col gap-6 h-full shrink-0">
              <EvaluationCard
                content={
                  <span>
                    We co-hosted several hackathons with the HackQuest team
                    including ETH Shanghai. It’s great that HackQuest always
                    brings in new blood to Web3. Both HackQuest and ChainIDE
                    share a common goal:{' '}
                    <span className="body-s-bold">
                      to drive the mass adoption of Web3 by onboarding more
                      developers.
                    </span>
                  </span>
                }
                username="Wuxiao"
                userDesc="Founder @ ChainIDE"
                avatar="/images/landing/mantle_icon.png"
              ></EvaluationCard>
              <EvaluationCard
                content={
                  <span>
                    I’m super glad to have taken part in HackQuest’s Hackathon.{' '}
                    <span className="body-s-bold">
                      I met a group of insightful instructors and reliable
                      teammates.
                    </span>{' '}
                    Ever since I first joined the community through the Fireside
                    chat, I immediately felt a sense of belonging here.
                  </span>
                }
                username="Suneal & Colin"
                userDesc="Founders @ MetaMail"
                avatar="/images/landing/solana_icon.png"
              ></EvaluationCard>
            </div>
            <div className="w-[19.4375rem] h-full shrink-0">
              <EvaluationCard
                content={
                  <span className="tracking-normal">
                    I’m super glad to have taken part in HackQuest’s Hackathon.{' '}
                    <span className="body-s-bold">
                      I met a group of insightful instructors and reliable
                      teammates.
                    </span>{' '}
                    Ever since I first joined the community through the Fireside
                    chat, I immediately felt a sense of belonging here.
                  </span>
                }
                username="Suneal & Colin"
                userDesc="Founders @ MetaMail"
                avatar="/images/landing/solana_icon.png"
              ></EvaluationCard>
              <EvaluationCard
                content={
                  <span>
                    {`From learning to launch my own meme token to building a yield farming protocol during their Hackathon, HackQuest's real-world projects and post learning support`}{' '}
                    <span className="body-s-bold">
                      helped me grow as a smart contract developer and gave me
                      the confidence to be a full-time technical founder.
                    </span>
                  </span>
                }
                username="Student Name"
                avatar="/images/landing/solana_icon.png"
              ></EvaluationCard>
            </div>
            <div className="w-[19.4375rem] h-full shrink-0">
              <EvaluationCard
                content="SSS"
                username="Student Name"
                avatar="/images/landing/solana_icon.png"
              ></EvaluationCard>
              <EvaluationCard
                content=" I've used other sites to learn to code in Solidity and Rust, but HackQuest's been the one that I've stuck with. I love going to meet-ups and connect with other aspiring devs."
                username="Student Name"
                avatar="/images/landing/solana_icon.png"
              ></EvaluationCard>
            </div>
            <div className="w-[19.4375rem] h-full shrink-0">
              <EvaluationCard
                content="SSS"
                username="Student Name"
                avatar="/images/landing/solana_icon.png"
              ></EvaluationCard>
              <EvaluationCard
                content=" I've used other sites to learn to code in Solidity and Rust, but HackQuest's been the one that I've stuck with. I love going to meet-ups and connect with other aspiring devs."
                username="Student Name"
                avatar="/images/landing/solana_icon.png"
              ></EvaluationCard>
            </div> */}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default UserEvaluation;
