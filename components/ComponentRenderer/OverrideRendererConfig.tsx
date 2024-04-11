import { FC, ReactNode, useContext, useMemo } from 'react';
import { RendererContext, RendererContextType } from './context';

interface OverrideRendererConfigProps {
  children: ReactNode;
}

const OverrideRendererConfig: FC<OverrideRendererConfigProps & Partial<RendererContextType>> = (props) => {
  const { children, ...rest } = props;
  const context = useContext(RendererContext);
  const newContextValue = useMemo(() => {
    for (let key in rest) {
      context[key as keyof RendererContextType] = {
        ...context[key as keyof RendererContextType],
        ...rest[key as keyof RendererContextType]
      } as any;
    }

    return { ...context };
  }, [rest, context]);
  return <RendererContext.Provider value={newContextValue}>{children}</RendererContext.Provider>;
};

export default OverrideRendererConfig;
