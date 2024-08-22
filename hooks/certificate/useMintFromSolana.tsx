import { getDomain } from '@/constants/links';
import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useMutation } from '@tanstack/react-query';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { useSwitchSolanaNetwork } from '@/components/Provider/SolanaWalletProvider/NetworkConfigurationProvider';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';

export const useMintFromSolana = () => {
  const { connection } = useConnection();
  const { wallet, publicKey, disconnect, connected } = useWallet();
  const { visible, setVisible } = useWalletModal();
  const { networkConfiguration } = useSwitchSolanaNetwork();

  const {
    mutate: safeMint,
    mutateAsync: safeMintAsync,
    isPending
  } = useMutation({
    mutationFn: async (certification: UserCertificateInfo) => {
      if (!publicKey && !visible) {
        setVisible(true);
        return;
      }

      if (!wallet) {
        throw new Error('No wallet');
      }

      if (!publicKey) {
        throw new Error('No publicKey');
      }

      const balance = await connection.getBalance(publicKey);

      console.log(balance);

      const fileURL = `${getDomain(process.env.RUNTIME_ENV || 'dev')}api/certificate/${certification?.username}-${certification?.certificateId}.png`;
      const metaplex = new Metaplex(connection);
      metaplex.use(walletAdapterIdentity(wallet.adapter));

      // const { uri } = await metaplex.nfts().uploadMetadata({
      //   name: certification.name,
      //   symbol: 'HACKQUEST',
      //   description: certification.description,
      //   image: fileURL
      // });

      // console.log(uri);

      const res = await metaplex.nfts().create({
        uri: `${getDomain(process.env.RUNTIME_ENV || 'dev')}api/certificate/${encodeURIComponent(certification.username)}-${certification.certificateId}.json`,
        name: certification.name,
        sellerFeeBasisPoints: 0.1,
        tokenOwner: publicKey
      });

      const { nft, response } = res;

      const result = await webApi.campaignsApi.savaMintState({
        certificationId: certification.id,
        txId: response.signature
      });
      return result;
    },
    onError(error, variables, context) {
      errorMessage(error);
    }
  });

  return {
    safeMint,
    safeMintAsync
  };
};
