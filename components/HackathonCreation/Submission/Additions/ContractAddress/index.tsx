import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
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
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      prizeTrack: config.optional ? validator.optional() : validator
    };
  }
};

export default ContractAddressConfig;
