import React, { ReactNode } from 'react';

interface IndexProp {
  children: ReactNode;
}

const Index: React.FC<IndexProp> = ({ children }) => {
  return <>{children}</>;
};

export default Index;
