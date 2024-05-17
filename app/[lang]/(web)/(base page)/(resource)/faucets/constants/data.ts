import { BlockChainType } from '@/service/webApi/resourceStation/type';

export const faucetsFilterData = [
  {
    label: 'EVM',
    value: BlockChainType.EVM
  },
  {
    label: 'Solana',
    value: BlockChainType.SOLANA
  },
  {
    label: 'Sui',
    value: BlockChainType.SUI
  },
  {
    label: 'Near',
    value: BlockChainType.NEAR
  }
];

export const FAQData = [
  {
    problem: 'faucets.FAQS.question1.problem',
    answer: 'faucets.FAQS.question1.answer'
  },
  {
    problem: 'faucets.FAQS.question2.problem',
    answer: 'faucets.FAQS.question2.answer'
  },
  {
    problem: 'faucets.FAQS.question3.problem',
    answer: 'faucets.FAQS.question3.answer'
  },
  {
    problem: 'faucets.FAQS.question4.problem',
    answer: 'faucets.FAQS.question4.answer'
  }
];
