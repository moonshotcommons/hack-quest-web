import { useMintFromEvm } from './useMintFromEvm';
import { useMintFromSolana } from './useMintFromSolana';
import { useMintFromSui } from './useMintFromSui';

export const useMintCertificate = () => {
  const { safeMintAsync: safeMintAsyncFromEvm, safeMint: safeMintFromEvm } = useMintFromEvm();
  const { safeMintAsync: safeMintAsyncFromSolana, safeMint: safeMintFromSolana } = useMintFromSolana();
  const { safeMintAsync: safeMintAsyncFromSui, safeMint: safeMintFromSui } = useMintFromSui();

  return {
    safeMintFromEvm,
    safeMintAsyncFromEvm,
    safeMintFromSolana,
    safeMintAsyncFromSolana,
    safeMintFromSui,
    safeMintAsyncFromSui
  };
};
