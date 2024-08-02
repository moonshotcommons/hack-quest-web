'use client';
import Button from '@/components/Common/Button';
import { FC, useState } from 'react';

import Input from '@/components/Common/Input';
import { generateChainId } from '@/helper/utils';

interface GenerateChainIdProps {}

const GenerateChainId: FC<GenerateChainIdProps> = (props) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | number>('');
  return (
    <div className=" flex flex-col gap-3">
      <h3 className="text-h3">通过chain的名称生成数字id</h3>
      <div className="flex items-center gap-4">
        <Input
          name="chainName"
          className="h-12 rounded-lg"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button
          type="primary"
          className="h-12 rounded-lg"
          onClick={() => {
            const chainId = generateChainId(input);
            setOutput(chainId);
          }}
        >
          生成
        </Button>
        {output}
      </div>
    </div>
  );
};

export default GenerateChainId;
