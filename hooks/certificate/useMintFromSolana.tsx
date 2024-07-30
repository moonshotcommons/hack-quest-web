import { getDomain } from '@/constants/links';
import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useMutation } from '@tanstack/react-query';
import { Metaplex, walletAdapterIdentity, irysStorage } from '@metaplex-foundation/js';
import { useSwitchSolanaNetwork } from '@/components/Provider/SolanaWalletProvider/NetworkConfigurationProvider';
import webApi from '@/service';

export const useMintFromSolana = () => {
  const { connection } = useConnection();
  const { wallet, publicKey } = useWallet();
  const { visible, setVisible } = useWalletModal();
  const { networkConfiguration } = useSwitchSolanaNetwork();

  console.log(networkConfiguration);

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

      const fileURL = `${getDomain(process.env.RUNTIME_ENV || 'dev')}api/certificate/${certification?.username}-${certification?.certificateId}.png`;
      const metaplex = new Metaplex(connection);
      metaplex.use(walletAdapterIdentity(wallet.adapter)).use(
        irysStorage({
          address: `https://${networkConfiguration}.irys.xyz`,
          providerUrl: `https://api.${networkConfiguration}.solana.com`,
          timeout: 60000
        })
      );

      const { uri } = await metaplex.nfts().uploadMetadata({
        name: certification.name,
        symbol: 'HACKQUEST',
        description: certification.description,
        image: fileURL
      });

      const res = await metaplex.nfts().create({
        uri,
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
    }
  });

  return {
    safeMint,
    safeMintAsync
  };
};
