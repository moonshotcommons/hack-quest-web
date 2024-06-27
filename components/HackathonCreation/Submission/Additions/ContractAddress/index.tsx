import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface ContractAddressProps {
  form: any;
  config: CustomComponentConfig;
}

const ContractAddress: FC<ContractAddressProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

ContractAddress.displayName = 'ContractAddress';

export const ContractAddressConfig: PresetComponentConfig<ContractAddressProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: ContractAddress.displayName,
  component: ContractAddress,
  optional: false,
  property: {
    label: 'Contract Address',
    placeholder: 'Paste contract address here',
    name: 'contractAddress'
  },
  validate(values: { contractAddress: string }, form, config) {
    return [
      getValidateResult(
        z
          .string()
          .min(config.optional ? 0 : 1)
          .safeParse(values.contractAddress),
        form,
        'contractAddress'
      )
    ];
  }
};

export default ContractAddressConfig;
