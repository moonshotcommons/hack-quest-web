'use client';
import { FC, ReactNode, createContext } from 'react';
import { Lang, defaultLocale } from '@/i18n/config';

export const LangContext = createContext({
  lang: defaultLocale
});
interface LangProviderProps {
  children: ReactNode;
  lang: Lang;
}

const LangProvider: FC<LangProviderProps> = ({ children, lang }) => {
  // const pathname = usePathname();
  // useEffect(() => {
  //   const pattern = new RegExp(`^\\/${lang}(\\/.*)?`);
  //   window.history.pushState(
  //     null,
  //     '',
  //     pathname.replace(pattern, (_, group) => (group ? group : '/'))
  //   );
  // }, [pathname, lang]);

  return (
    <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>
  );
};

export default LangProvider;
