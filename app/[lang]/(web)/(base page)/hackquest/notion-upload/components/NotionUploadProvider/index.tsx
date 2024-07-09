'use client';
import { FC, ReactNode, createContext, useContext } from 'react';
import { useSubmitNotionUrl } from '../hooks/useSubmitNotionUrl';

interface ContextType {
  logs: { status: string; message: string };
  onSubmit: (notionUrl: string) => void;
  setLogs: (logs: { status: string; message: string }) => void;
}

const Context = createContext<ContextType>({
  logs: { status: 'default', message: '' },
  onSubmit: () => {},
  setLogs: () => {}
});

interface NotionUploadProviderProps {
  children: ReactNode;
}

const NotionUploadProvider: FC<NotionUploadProviderProps> = ({ children }) => {
  const value = useSubmitNotionUrl();
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useNotionUploadContext = () => {
  return useContext(Context);
};

export default NotionUploadProvider;
