'use client';

import * as React from 'react';

const EcosystemContext = React.createContext({
  ecosystems: []
});

export function EcosystemProvider({
  ecosystems,
  children
}: Readonly<{
  ecosystems: any;
  children: React.ReactNode;
}>) {
  return <EcosystemContext.Provider value={{ ecosystems }}>{children}</EcosystemContext.Provider>;
}

export function useEcosystems() {
  const context = React.use(EcosystemContext);
  if (context === undefined) {
    throw new Error('useEcosystems must be used within a EcosystemProvider');
  }
  return context;
}
