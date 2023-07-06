//用react写一个弹窗组件，要求：
//1. 通过props控制弹窗的显示和隐藏，内容自定义
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
export interface IProps {
  children?: ReactElement;
  // ...
}
const Modal: FC<IProps> = memo(function (props) {
  const { children } = props;
  return (
    <div className="home">
      <div>1</div>
    </div>
  );
});
export default Modal;
Modal.displayName = 'Moda';
