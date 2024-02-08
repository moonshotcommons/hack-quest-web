import Tags from '@/components/Common/Tags';
import { FC } from 'react';

interface WillLearnProps {}

const WillLearn: FC<WillLearnProps> = (props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-fit items-center gap-4">
        <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
        <h3 className="text-h3 text-neutral-black">{`What You’ll Learn`}</h3>
      </div>

      <ul className="[&>li]:body-m flex list-disc flex-col gap-2 [&>li]:ml-6 [&>li]:text-neutral-black">
        <li>
          Explain the meaning of terms such as “Web3,” “token,” “smart
          contract,” “decentralized autonomous organization (DAO),” and
          “blockchain trilemma”
        </li>
        <li>
          Describe seven principles for the design of blockchain-based systems,
          and seven challenge areas associated with implementing blockchain
          technology
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

      <div className="Web3 flex flex-wrap gap-2">
        <Tags size="lg">Digital Assets</Tags>
        <Tags size="lg">Business Strategy</Tags>
        <Tags size="lg">Blockchain</Tags>
        <Tags size="lg">Web3</Tags>
        <Tags size="lg">Solidity</Tags>
        <Tags size="lg">Digital Transformation</Tags>
        <Tags size="lg">Non-Fungible Token (NFT)</Tags>
      </div>
    </div>
  );
};

export default WillLearn;
