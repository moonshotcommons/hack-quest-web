import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';
import React from 'react';
interface SearchParamsType {}

const EcosystemPresentationPage: React.FC<SearchParamsType> = async ({}) => {
  useNeedPCRedirect();
  return <></>;
};

export default EcosystemPresentationPage;
