'use client';
import { FC, ReactNode, useEffect } from 'react';
import { UgcCreateContext } from '../../constants/type';
import { RendererContext } from '@/components/Web/Business/Renderer/context';
import emitter from '@/store/emitter';

interface UgcProviderProps {
  children: ReactNode;
}

const UgcProvider: FC<UgcProviderProps> = ({ children }) => {
  useEffect(() => {
    return () => {
      emitter.all.clear();
    };
  }, []);

  return (
    <UgcCreateContext.Provider value={{}}>
      <RendererContext.Provider
        value={{
          textRenderer: {
            textStyle: 'body-l text-neutral-black',
            codeStyle:
              'code-l text-code-red bg-neutral-off-white py-[2px] px-[7px]'
          }
        }}
      >
        {children}
      </RendererContext.Provider>
    </UgcCreateContext.Provider>
  );
};

export default UgcProvider;
