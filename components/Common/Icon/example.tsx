import { FC, ReactElement, ReactNode, cloneElement } from 'react';
import icons from './index';
import { IconsType } from './type';
import message from 'antd/es/message';

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
      className="flex h-[5rem] w-[5rem] cursor-pointer items-center justify-center"
    >
      {props.children}
    </div>
  );
};

const ButtonExample: FC<ButtonExampleProps> = (props) => {
  return (
    <div>
      <div>
        <h1 className="body-xl pb-8 text-text-default-color ">图标</h1>
        <div className="flex flex-row flex-wrap items-center gap-8">
          {Object.keys(icons).map((key: any, index) => {
            return (
              <CopyWrap key={index} copyText={`<${key}Icon />`}>
                <span className="flex items-center justify-center">
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
