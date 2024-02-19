import Tags from '@/components/Common/Tags';
import { FC } from 'react';

interface WillLearnProps {}

const WillLearn: FC<WillLearnProps> = (props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-fit items-center gap-2">
        <div className="h-[22px] w-[5px] rounded-full bg-yellow-dark"></div>
        <h2 className="text-h2-mob text-neutral-black">{`What You’ll Learn`}</h2>
      </div>

      <div className="flex flex-col gap-5">
        <ul className="[&>li]:body-s flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
          <li>
            Explain the meaning of terms such as “Web3,” “token,” “smart
            contract,” “decentralized autonomous organization (DAO),” and
            “blockchain trilemma”
          </li>
          <li>
            Describe seven principles for the design of blockchain-based
            systems, and seven challenge areas associated with implementing
            blockchain technology
          </li>
          <li>
            Identify five questions one must consider when deciding whether
            blockchain is appropriate for a particular problem or use-case
          </li>
          <li>
            Describe some real-world examples of companies that have integrated
            blockchain into their business models
          </li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <Tags size="sm">Digital Assets</Tags>
          <Tags size="sm">Business Strategy</Tags>
          <Tags size="sm">Blockchain</Tags>
          <Tags size="sm">Web3</Tags>
          <Tags size="sm">Solidity</Tags>
          <Tags size="sm">Digital Transformation</Tags>
          <Tags size="sm">Non-Fungible Token (NFT)</Tags>
        </div>
      </div>
    </div>
  );
};

export default WillLearn;
