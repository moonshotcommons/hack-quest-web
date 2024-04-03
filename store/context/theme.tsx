'use client';
import { Theme } from '@/constants/enum';
import { FC, ReactNode, createContext, useEffect, useState } from 'react';
interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

const ThemeContextProvider: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;

  // const [theme, setTheme] = useState<Theme>(
  //   () =>
  //     (typeof window === 'object' &&
  //       (localStorage?.getItem('theme') as Theme)) ||
  //     Theme.Light
  // );
  const [theme, setTheme] = useState<Theme>(Theme.Light);
  useEffect(() => {
    const checkTheme = () => {
      // const cacheTheme =
      //   (localStorage.getItem('theme') as Theme) || Theme.Light;
      // setTheme(cacheTheme);
      document.documentElement.classList.add(theme);
      document.getElementsByTagName('html')[0].dataset.theme = theme;
      document.documentElement.classList.remove(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    };
    checkTheme();

    // 标签主题同步
    window.addEventListener('storage', checkTheme);
    return (): void => {
      window.removeEventListener('storage', checkTheme);
    };
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (value: Theme) => {
          setTheme(value);
          localStorage.setItem('theme', value);
          document.getElementsByTagName('html')[0].dataset.theme = value;
          document.documentElement.classList.add(value);
          document.documentElement.classList.remove(value === Theme.Dark ? Theme.Light : Theme.Dark);
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
