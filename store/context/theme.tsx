import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { Theme } from '@/constants/enum';
interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext({} as ThemeContextProps);

const ThemeContextProvider: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const [theme, setTheme] = useState<Theme>(Theme.Dark);
  useEffect(() => {
    const checkTheme = () => {
      const cacheTheme = (localStorage.getItem('theme') as Theme) || Theme.Dark;
      setTheme(theme);
      document.getElementsByTagName('html')[0].dataset.theme = cacheTheme;
    };
    checkTheme();

    // 标签主题同步
    window.addEventListener('storage', checkTheme);
    return window.removeEventListener('storage', checkTheme);
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (value: Theme) => {
          setTheme(value);
          localStorage.setItem('theme', value);
          document.getElementsByTagName('html')[0].dataset.theme = value;
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
