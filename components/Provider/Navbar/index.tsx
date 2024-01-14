'use client';
import NavBar from '@/components/Layout/Navbar';
import { navbarList } from '@/components/Layout/Navbar/data';
import { FC, ReactNode, createContext, useMemo } from 'react';
export const NavbarContext = createContext({
  navbarInstance: <NavBar navList={navbarList} />
});

interface NavbarProviderProps {
  children: ReactNode;
}

const NavbarProvider: FC<NavbarProviderProps> = ({ children }) => {
  const navbar = useMemo(() => {
    return <NavBar navList={navbarList} />;
  }, []);

  return (
    <NavbarContext.Provider value={{ navbarInstance: navbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarProvider;
