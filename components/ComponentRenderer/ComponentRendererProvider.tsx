'use client';
import { FC, ReactNode, useMemo } from 'react';
import { RendererContext, RendererContextType, defaultRendererContext } from './context';
import { PageType } from './type';

interface ComponentRendererProviderProps {
  type: PageType;
  isMobile?: boolean;
  children: ReactNode;
}

const ComponentRendererProvider: FC<ComponentRendererProviderProps & RendererContextType> = (props) => {
  const { type, children, isMobile = false, ...rest } = props;

  const contextValue = useMemo(() => {
    return {
      ...defaultRendererContext,
      ...rest,
      globalContext: { ...(rest?.globalContext || {}), pageType: type, isMobile }
    };
  }, [rest, type, isMobile]);

  return <RendererContext.Provider value={contextValue}>{children}</RendererContext.Provider>;
};

export default ComponentRendererProvider;
