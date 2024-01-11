import { FC } from 'react';
import ScrollContainer from './ScrollContainer';
import EvaluationCard from './EvaluationCard';

const UserEvaluation: FC<{}> = (props) => {
  return (
    <div className="mt-[7.5rem] w-full bg-yellow-extra-light py-10">
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
          <div className="flex justify-center gap-6 h-[32rem]">
            <div className="w-[19.4375rem] h-full shrink-0">
              <EvaluationCard
                content="SSS"
                username="Student Name"
                avatar="/images/landing/solana_icon.png"
                className="mt-9"
              ></EvaluationCard>
              <EvaluationCard
                content="SSS"
                username="Student Name"
                avatar="/images/landing/solana_icon.png"
                className="mt-[134px]"
              ></EvaluationCard>
            </div>
            <div className="w-[19.4375rem] h-full shrink-0">
              <EvaluationCard
                content={
                  <span className="tracking-normal">
                    {`I never thought I could become a Web3 developer, but HackQuest's platform made it `}
                    <span className="body-s-bold">
                      accessible and fun for beginners.
                    </span>
                  </span>
                }
                username="Student Name"
                avatar="/images/landing/solana_icon.png"
                className="mt-1"
              ></EvaluationCard>
              <EvaluationCard
                content={
                  <span className="tracking-tighter">
                    {`What truly makes HackQuest special is the incredible individuals who are part of this community. I've had the pleasure of meeting sincere and practical idealists here. `}
                    <span className="body-s-bold">
                      {`To all my fellow builders out there, if you are considering to join their Hackathons, go for it.`}
                    </span>
                    {` You won't regret it!`}
                  </span>
                }
                username="Eric"
                userDesc="Founder @ Cluster3"
                avatar="/images/landing/eric.png"
                className="mt-9"
              ></EvaluationCard>
            </div>
            <div className="w-[19.4375rem] h-full shrink-0">
              <EvaluationCard
                content="Our collaboration with HackQuest is aimed at crafting a curriculum that is as diverse as it is deep, ensuring developers not only learn but also apply their knowledge in real-world Web3 scenarios."
                username="Mantle Network"
                avatar="/images/landing/mantle_icon.png"
                className="mt-[4rem]"
              ></EvaluationCard>
              <EvaluationCard
                content="SSS"
                username="Student Name"
                avatar="/images/landing/solana_icon.png"
                className="mt-[1.5rem]"
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
                className="mt-4"
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
                className="mt-[1.125rem]"
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
                className="mt-[8.375rem]"
              ></EvaluationCard>
            </div>
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default UserEvaluation;
