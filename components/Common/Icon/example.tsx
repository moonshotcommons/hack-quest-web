import { FC, ReactElement, ReactNode, cloneElement } from 'react';
import icons from './index';
import { IconsType } from './type';
import { message } from 'antd';

interface ButtonExampleProps {
  // children: ReactNode;
}

const CopyWrap = (props: { children: ReactNode; copyText: string }) => {
  return (
    <div
      onClick={() => {
        navigator.clipboard
          .writeText(props.copyText)
          .then(() => {
            message.success('copy success!');
          })
          .catch((err) => {
            message.error('Error in copying text: ', err);
          });
      }}
      className="cursor-pointer w-[5rem] h-[5rem] flex justify-center items-center"
    >
      {props.children}
    </div>
  );
};

const ButtonExample: FC<ButtonExampleProps> = (props) => {
  return (
    <div>
      <div>
        <h1 className="text-text-default-color text-[24px] pb-8 ">图标</h1>
        <div className="flex flex-row gap-8 flex-wrap items-center">
          {Object.keys(icons).map((key: any, index) => {
            return (
              <CopyWrap key={index} copyText={`<${key}Icon />`}>
                <span className="flex justify-center items-center">
                  {cloneElement(icons[key as keyof IconsType] as ReactElement, {
                    color: 'red'
                  })}
                </span>
              </CopyWrap>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ButtonExample;
