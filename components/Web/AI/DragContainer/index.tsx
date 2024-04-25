import { FC, PropsWithChildren } from 'react';
interface DragContainerProps {}

const DragContainer: FC<PropsWithChildren<DragContainerProps>> = ({ children }) => {
  return <div className="fixed left-0 top-0 h-screen w-screen select-none">{children} </div>;
};

export default DragContainer;
