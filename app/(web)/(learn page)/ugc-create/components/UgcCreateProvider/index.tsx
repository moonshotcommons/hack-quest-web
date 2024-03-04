'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import { UgcCreateContext } from '../../constants/type';
import { RendererContext } from '@/components/Web/Business/Renderer/context';
import emitter from '@/store/emitter';

interface UgcProviderProps {
  children: ReactNode;
}

const UgcProvider: FC<UgcProviderProps> = ({ children }) => {
  const [loading, setLoaing] = useState(false);
  useEffect(() => {
    return () => {
      emitter.all.clear();
    };
  }, []);

  return (
    <UgcCreateContext.Provider
      value={{
        loading,
        setLoaing: (val) => setLoaing(val)
      }}
    >
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