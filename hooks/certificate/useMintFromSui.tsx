import { getDomain } from '@/constants/links';
import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { useSuiConnectModal } from '@/components/Provider/SuiProvider';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { errorMessage } from '@/helper/ui';

// const stateTemplate = {
//   statId: '0x5bc323843afc995543a0218724317397db1fb8655df163607b822cffcf5a1bb3',
//   adminId: '0xb074ecea1c673a3f292e5c4ba24646cc4f053b74614ea4f416d37c8015f85c43',
//   globalId: '0x0a55800a945a7120ef378321c85ab0da5c548e3c8c311a945fc8cd7919a0efc4',
//   packageId: '0x14c9ad9200ede43dae0a50db1a06550d24665a5ea2c671c6a7da6babc601a108',
//   sender: '0xbefe4881a3f08d191d71ed3d6af5ce07de39f010fe0da692c26374f465efd0cf'
// };

export const useMintFromSui = () => {
  const account = useCurrentAccount();
  const tx = new Transaction();
  const client = useSuiClient();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          // Select additional data to return
          showObjectChanges: true
        }
      })
  });
  const { visible, setVisible } = useSuiConnectModal();

  const {
    mutate: safeMint,
    mutateAsync: safeMintAsync,
    isPending
  } = useMutation({
    mutationFn: async (certification: UserCertificateInfo) => {
      return new Promise((resolve, reject) => {
        debugger;
        if (!account?.address && !visible) {
          setVisible(true);
          reject();
          return;
        }

        if (!account?.address) {
          reject();
          return;
        }

        tx.setSender(certification.extra.sender);

        tx.setGasBudget(100_000_00);

        tx.moveCall({
          target: certification.extra.packageId + '::certificateNFT::mint',
          arguments: [
            tx.object(certification.extra.adminId),
            tx.object(certification.extra.statId),
            tx.object(certification.extra.globalId),
            tx.pure.address(account.address),
            tx.pure.string(certification.username),
            tx.pure.string(encodeURIComponent(certification.username)),
            tx.pure.string(String(certification.chainId)),
            tx.pure.string(''),
            tx.pure.string(certification.certificateId.toString()),
            tx.pure.string(''),
            tx.pure.string('')
            // tx.object(certification.extra.globalId)
          ],
          typeArguments: []
        });

        signAndExecuteTransaction(
          { transaction: tx, chain: 'sui:testnet' },
          {
            onSuccess: (result) => {
              console.log('executed transaction', result);
              const res = webApi.campaignsApi.savaMintState({
                certificationId: certification.id,
                txId: result.digest
              });
              resolve(res);
            },
            onError(err) {
              errorMessage(err);
              reject(err);
            }
          }
        );
      });
    }
  });

  return {
    safeMint,
    safeMintAsync
  };
};

export const useUpdateBaseUriFromSui = () => {
  const account = useCurrentAccount();
  const tx = new Transaction();
  const client = useSuiClient();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          // Select additional data to return
          showObjectChanges: true
        }
      })
  });
  const { visible, setVisible } = useSuiConnectModal();

  const {
    mutate: updateUri,
    mutateAsync: updateUriAsync,
    isPending
  } = useMutation({
    mutationFn: async (certification: UserCertificateInfo) => {
      return new Promise((resolve, reject) => {
        if (!account?.address && !visible) {
          setVisible(true);
          reject();
          return;
        }

        if (!account?.address) {
          return;
        }

        tx.setSender(account?.address);

        tx.setGasBudget(100_000_00);

        tx.moveCall({
          target: certification.extra.packageId + '::certificateNFT::updateBaseURI',
          arguments: [
            tx.object(certification.extra.globalId),
            tx.pure.string(`${getDomain(process.env.RUNTIME_ENV || 'dev')}api/`)
          ],
          typeArguments: []
        });

        signAndExecuteTransaction(
          { transaction: tx, chain: 'sui:testnet' },
          {
            onSuccess: (result) => {
              console.log('executed transaction', result);
              // const res = webApi.campaignsApi.savaMintcertification.extra.statId({
              //   certificationId: certification.id,
              //   txId: result.digest
              // });

              resolve(null);
            },

            onError(err) {
              errorMessage(err);
              reject(err);
            }
          }
        );
      });
    }
  });

  return {
    updateUri,
    updateUriAsync
  };
};

export const useGetBaseUriFromSui = () => {
  const account = useCurrentAccount();
  const tx = new Transaction();
  const client = useSuiClient();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          // Select additional data to return
          showObjectChanges: true
        }
      })
  });
  const { visible, setVisible } = useSuiConnectModal();

  const {
    mutate: getBaseUri,
    mutateAsync: getBaseUriAsync,
    isPending
  } = useMutation({
    mutationFn: async (certification: UserCertificateInfo) => {
      return new Promise((resolve, reject) => {
        if (!account?.address && !visible) {
          setVisible(true);
          reject();
          return;
        }

        if (!account?.address) {
          return;
        }

        tx.setSender(account?.address);

        tx.setGasBudget(100_000_00);

        tx.moveCall({
          target: certification.extra.packageId + '::certificateNFT::get_baseURI',
          arguments: [tx.object(certification.extra.globalId)],
          typeArguments: []
        });

        signAndExecuteTransaction(
          { transaction: tx, chain: 'sui:testnet' },
          {
            onSuccess: (result) => {
              function Uint8ArrayToString(fileData: any[]) {
                var dataString = '';
                for (var i = 0; i < fileData.length; i++) {
                  dataString += String.fromCharCode(fileData[i]);
                }

                return dataString;
              }
              console.log(
                'executed transaction',
                result.rawEffects ? Uint8ArrayToString(result.rawEffects) : 'undefined'
              );

              // window.rawEffects = result.rawEffects;
              // const res = webApi.campaignsApi.savaMintcertification.extra.statId({
              //   certificationId: certification.id,
              //   txId: result.digest
              // });

              resolve(null);
            },

            onError(err) {
              errorMessage(err);
              reject(err);
            }
          }
        );
      });
    }
  });

  return {
    getBaseUriAsync,
    getBaseUri
  };
};
