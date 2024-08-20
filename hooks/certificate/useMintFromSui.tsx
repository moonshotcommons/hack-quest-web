import { getDomain } from '@/constants/links';
import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { useSuiConnectModal } from '@/components/Provider/SuiProvider';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { errorMessage } from '@/helper/ui';

// const stateTemplate = {
//   statId: '0x19f79ef0d752b71eaa2d57b90a8503e99f00b03036544c3f32b3c31a491387fb',
//   adminId: '0xb5d3547e9d8f5e2514d6e92b4383b9ef16f84eae435012f113587f27ec2eb48f',
//   globalId: '0x3ea7342bcc40d9362f208df8a46521282f568d7a6156579dd262e1fd6212af07',
//   packageId: '0x6fc119c8190729a43bafccd85494558986ea11b4030bf9b57f4c56318f6d1c03',
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
        if (!account?.address && !visible) {
          setVisible(true);
          reject();
          return;
        }

        if (!account?.address) {
          reject();
          return;
        }

        tx.setSender(account.address);
        tx.setGasBudget(100_000_00);

        tx.moveCall({
          target: certification.extra.packageId + '::certificateNFT::mint',
          arguments: [
            // tx.object(certification.extra.adminId),
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

        tx.setSender(account.address);

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

        tx.setSender(account.address);

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
