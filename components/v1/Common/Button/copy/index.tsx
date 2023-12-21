import React from 'react';
import Button from '..';
import CopyIcon from '@/components/v2/Common/Icon/Copy';
import { message } from 'antd';

interface CopyButtonType {
  copyText: string;
}
const CopyButton: React.FC<CopyButtonType> = ({ copyText }) => {
  return (
    <div>
      <Button
        type="primary"
        className="bg-[#e3e3e3] w-[30px] h-[30px] rounded-[10px]"
        size="small"
        onClick={async (e) => {
          try {
            await navigator.clipboard.writeText(copyText);
            message.success('Copy success!');
          } catch (e) {
            message.warning('The browser version is too low or incompatible！');
          }
        }}
      >
        <CopyIcon width={17} height={20} size={1} color={'#8c8c8c'}></CopyIcon>
      </Button>
    </div>
  );
};

export default CopyButton;
