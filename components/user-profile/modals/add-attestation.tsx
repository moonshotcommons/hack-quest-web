'use client';

import * as React from 'react';
import { SchemaEncoder, AttestationShareablePackageObject, EAS } from '@ethereum-attestation-service/eas-sdk';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MobileModalHeader } from './mobile-modal-header';
import { ChevronIcon } from '@/components/ui/icons/chevron';
import { Label } from '@/components/ui/label';
import { Textarea } from '../common/textarea';
import { Button } from '@/components/ui/button';
import { RadioCards, RadioCardsItem } from '@/components/shared/radio-cards';
import Image from 'next/image';
import { WalletIcon } from 'lucide-react';
import { Steps } from '../common/steps';
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { cn } from '@/helper/utils';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { useProfile } from '../modules/profile-provider';
import { useParams } from 'next/navigation';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useSwitchChain } from 'wagmi';
import { submitSignedAttestation } from '../utils/eas';
import dayjs from '@/components/Common/Dayjs';
import { useEthersSigner } from '../utils/wagmi-utils';
import { lineaSepolia, mainnet } from 'wagmi/chains';
import { getClient } from '../utils/eth-sign';
import { v4 } from 'uuid';
import { omit } from 'lodash-es';
import { useVeraxSdk } from '../utils/verax';
import {
  EAS_CONTRACT_ADDRESS,
  EAS_REF_UID,
  EAS_SCHEMA_ID,
  EAS_ZERO_ADDRESS,
  ETH_SIGN_SCHEMA_ID,
  PORTAL_ADDRESS,
  VERAX_SCHEMA_ID
} from '../utils/constants';
import { waitForTransactionReceipt } from 'viem/actions';
import { config } from '@/config/wagmi';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

type Store = {
  current: number;
  open: boolean;
  state: Record<string, any>;
  setCurrent: (current: number) => void;
  setState: (newState: Record<string, any>) => void;
  onOpen: (state: { type: 'Certification' | 'Experience' | 'Hackathon'; sourceId: string }) => void;
  onOpenChange: (open: boolean) => void;
  reset: () => void;
};

export const useAttestation = create<Store>((set) => ({
  current: 0,
  state: {},
  open: false,
  setCurrent: (current) => set({ current }),
  setState: (newState = {}) => set((initState) => ({ state: { ...initState.state, ...newState } })),
  onOpen: ({ type, sourceId }) => set({ open: true, state: { type, sourceId } }),
  onOpenChange: (open) => set({ open }),
  reset: () => set({ current: 0, state: {}, open: false })
}));

export const services = {
  EAS: 'EAS',
  Verax: 'VERAX',
  EthSign: 'ETH_SIGN'
} as const;

function Wallet() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none'
              }
            })}
            className="w-full"
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="flex items-center gap-3 text-sm" onClick={openConnectModal}>
                    <WalletIcon size={24} />
                    <span>Connect Wallet</span>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <div className="flex items-center gap-3 text-sm" onClick={openChainModal}>
                    <WalletIcon size={24} />
                    <p>Wrong network</p>
                  </div>
                );
              }

              return (
                <div className="flex items-center gap-3 text-sm">
                  <WalletIcon size={24} />
                  <p>{account.displayName}</p>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

function Step1() {
  const { state, setState, setCurrent } = useAttestation();

  function onSubmit() {
    if (!state.attest) {
      toast.error('Please select an option');
      return;
    }
    setCurrent(1);
  }

  return (
    <React.Fragment>
      <h2 className="shrink-0 text-lg font-bold sm:text-[22px]">Add an Attestation</h2>
      <div className="flex flex-1 flex-col gap-6">
        <RadioCards value={state?.attest} onValueChange={(value) => setState({ attest: value })}>
          <RadioCardsItem
            value="true"
            className="flex items-center gap-4 aria-checked:border-status-success-dark aria-checked:bg-status-success-light"
          >
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-status-success-light">
              <ChevronIcon className="h-6 w-6 text-status-success-dark" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-left font-bold">Attest True</span>
              <span className="text-xs text-neutral-medium-gray">Share good comments about experience</span>
            </div>
          </RadioCardsItem>
          <RadioCardsItem
            value="false"
            className="flex items-center gap-4 aria-checked:border-status-error-dark aria-checked:bg-status-error-light"
          >
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-status-error-light">
              <ChevronIcon className="h-6 w-6 rotate-180 text-status-error-dark" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-left font-bold">Attest False</span>
              <span className="text-xs text-neutral-medium-gray">Add comments about experience</span>
            </div>
          </RadioCardsItem>
        </RadioCards>
        <div className="flex flex-col gap-2">
          <Label className="text-base font-bold">Add Comment (Optional)</Label>
          <Textarea
            placeholder="Add comments....."
            value={state?.comment}
            onChange={(e) => setState({ comment: e.target.value })}
            className="min-h-24"
          />
        </div>
      </div>
      <Button className="w-full shrink-0 sm:w-[165px] sm:self-end" onClick={onSubmit}>
        Continue
      </Button>
    </React.Fragment>
  );
}

function Step2() {
  const { state, setCurrent, setState } = useAttestation();

  function onSubmit() {
    if (!state.service) {
      toast.error('Please select a service');
      return;
    }
    setCurrent(2);
  }

  return (
    <React.Fragment>
      <h2 className="shrink-0 text-lg font-bold sm:text-[22px]">Choose a Service</h2>
      <div className="flex flex-1 flex-col gap-6">
        <RadioCards
          value={state?.service}
          onValueChange={(value) => {
            setState({ service: value });
          }}
        >
          <RadioCardsItem
            value="EAS"
            className="flex items-center gap-4 aria-checked:border-yellow-dark aria-checked:bg-yellow-extra-light"
          >
            <div className="relative h-8 w-8 justify-center overflow-hidden rounded-full">
              <Image src="/images/profile/evs.svg" alt="evs" fill />
            </div>
            <span className="text-left font-bold">EAS</span>
          </RadioCardsItem>
          <RadioCardsItem
            value="ETH_SIGN"
            className="flex items-center gap-4 aria-checked:border-yellow-dark aria-checked:bg-yellow-extra-light"
          >
            <div className="relative h-8 w-8 justify-center overflow-hidden rounded-full">
              <Image src="/images/profile/eth_sign.svg" alt="eth sign" fill />
            </div>
            <span className="text-left font-bold">EthSign</span>
          </RadioCardsItem>
          <RadioCardsItem
            value="VERAX"
            className="flex items-center gap-4 aria-checked:border-yellow-dark aria-checked:bg-yellow-extra-light"
          >
            <div className="relative h-8 w-8 justify-center overflow-hidden rounded-full">
              <Image src="/images/profile/verax.svg" alt="verax" fill />
            </div>
            <span className="text-left font-bold">Verax Attestation Registry</span>
          </RadioCardsItem>
        </RadioCards>
      </div>
      <div className="flex w-full shrink-0 gap-4 sm:justify-end">
        <Button className="w-full sm:w-[165px]" variant="outline" onClick={() => setCurrent(0)}>
          Back
        </Button>
        <Button className="w-full sm:w-[165px]" onClick={onSubmit}>
          Continue
        </Button>
      </div>
    </React.Fragment>
  );
}

function Step3() {
  const { address } = useAccount();
  const { connectModalOpen, openConnectModal } = useConnectModal();
  const { setCurrent } = useAttestation();

  function onSubmit() {
    if (!address) {
      openConnectModal?.();
      toast.error('Please connect your wallet first');
      return;
    }

    setCurrent(3);
  }

  React.useEffect(() => {
    if (connectModalOpen) {
      document.body.style.pointerEvents = 'auto';
    }
  }, [connectModalOpen]);

  return (
    <React.Fragment>
      <h2 className="shrink-0 text-lg font-bold sm:text-[22px]">Choose Wallet</h2>
      <div className="flex flex-1 flex-col gap-6">
        <RadioCards defaultValue="1">
          <RadioCardsItem
            value="1"
            className="flex items-center gap-4 aria-checked:border-yellow-dark aria-checked:bg-yellow-extra-light"
          >
            <Wallet />
          </RadioCardsItem>
        </RadioCards>
      </div>
      <div className="flex w-full shrink-0 gap-4 sm:justify-end">
        <Button className="w-full sm:w-[165px]" variant="outline" onClick={() => setCurrent(1)}>
          Back
        </Button>
        <Button className="w-full sm:w-[165px]" onClick={onSubmit}>
          Continue
        </Button>
      </div>
    </React.Fragment>
  );
}

function Step4() {
  const { username } = useParams();
  const { invalidate } = useProfile();
  const { address, chainId } = useAccount();
  const { state, reset, setCurrent } = useAttestation();
  const signer = useEthersSigner();
  const { switchChainAsync } = useSwitchChain();
  const [loading, setLoading] = React.useState(false);
  const { veraxSdk } = useVeraxSdk();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (state?.service === services.EAS || state?.service === services.EthSign) {
      if (chainId !== mainnet.id) {
        switchChainAsync({ chainId: mainnet.id }).then(() => setReady(true));
      } else {
        setReady(true);
      }
    }

    if (state?.service === services.Verax) {
      if (chainId !== lineaSepolia.id) {
        switchChainAsync({ chainId: lineaSepolia.id }).then(() => setReady(true));
      } else {
        setReady(true);
      }
    }
  }, [chainId, state?.service, switchChainAsync]);

  async function createEASAttestation(data: { attest: boolean; comment?: string }) {
    if (!signer || !address) {
      toast.error('Please connect your wallet');
      return;
    }
    setLoading(true);
    try {
      const schemaEncoder = new SchemaEncoder('bool attest, string comment');
      const encodedData = schemaEncoder.encodeData([
        { name: 'attest', value: data.attest, type: 'bool' },
        { name: 'comment', value: data.comment || '', type: 'string' }
      ]);

      const eas = new EAS(EAS_CONTRACT_ADDRESS);

      eas.connect(signer);

      const offchain = await eas.getOffchain();

      const offchainAttestation = await offchain.signOffchainAttestation(
        {
          schema: EAS_SCHEMA_ID,
          recipient: EAS_ZERO_ADDRESS,
          refUID: EAS_REF_UID,
          expirationTime: BigInt(0),
          time: BigInt(dayjs().unix()),
          revocable: true,
          data: encodedData,
          nonce: BigInt(0)
        },
        signer
      );
      const pkg: AttestationShareablePackageObject = {
        signer: address,
        sig: offchainAttestation
      };
      const { data: attestation } = await submitSignedAttestation(pkg);

      if (!attestation.error) {
        await create.mutateAsync({
          ...omit(state, ['service']),
          username,
          chain: {
            attestationId: attestation.offchainAttestationId,
            service: services.EAS
          },
          attest: data.attest,
          comment: data.comment || null
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create attestation');
      setLoading(false);
    }
  }

  async function createETHSignAttestation(data: { attest: boolean; comment?: string }) {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }
    setLoading(true);
    try {
      const client = getClient();
      const result = await client.createAttestation({
        schemaId: ETH_SIGN_SCHEMA_ID,
        data: {
          attest: data.attest,
          comment: data.comment || ''
        },
        indexingValue: v4()
      });
      if (result.attestationId) {
        await create.mutateAsync({
          ...omit(state, ['service']),
          username,
          chain: {
            attestationId: result.attestationId,
            service: services.EthSign
          },
          attest: data.attest,
          comment: data.comment || null
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error('Failed to create attestation');
      console.error(error);
      setLoading(false);
    }
  }

  async function createVeraxAttestation(data: { attest: boolean; comment?: string }) {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }
    if (veraxSdk) {
      setLoading(true);
      try {
        const receipt = await veraxSdk.portal.attest(
          PORTAL_ADDRESS,
          {
            schemaId: VERAX_SCHEMA_ID,
            expirationDate: Math.floor(Date.now() / 1000) + 2592000,
            subject: address,
            // @ts-expect-error
            attestationData: [data.attest, data.comment || '']
          },
          []
        );
        if (receipt.transactionHash) {
          const result = await waitForTransactionReceipt(config.getClient(), {
            hash: receipt.transactionHash
          });
          const attestationId = result.logs?.[0].topics[1];
          if (attestationId) {
            await create.mutateAsync({
              ...omit(state, ['service']),
              username,
              chain: {
                attestationId,
                service: services.Verax
              },
              attest: data.attest,
              comment: data.comment || null
            });
            setLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error('Failed to create attestation');
      }
    }
  }

  const create = useMutation({
    mutationFn: (input: any) => webApi.userApi.createAttestation(input),
    onSuccess() {
      toast.success('Attestation created');
      reset();
      invalidate();
    }
  });

  async function onSubmit() {
    const service = state?.service || services.EAS;
    const data = {
      attest: state?.attest === 'true',
      comment: state?.comment
    };
    if (service === services.EAS) {
      createEASAttestation(data);
    } else if (service === services.EthSign) {
      createETHSignAttestation(data);
    } else if (service === services.Verax) {
      createVeraxAttestation(data);
    }
  }

  return (
    <React.Fragment>
      <h2 className="shrink-0 text-lg font-bold sm:text-[22px]">Sign Attestation</h2>
      <div
        className={cn('flex w-full flex-1 flex-col gap-4 rounded-2xl bg-status-error-light p-4', {
          'bg-status-success-light': state?.attest === 'true'
        })}
      >
        <div className="flex items-center">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full">
            <ChevronIcon
              className={cn('h-6 w-6 text-status-success-dark', {
                'rotate-180 text-status-error-dark': state?.attest === 'false'
              })}
            />
          </div>
          <p className="font-bold">Attest {state?.attest === 'true' ? 'True' : 'False'}</p>
        </div>
        {state?.comment && <p className="text-sm text-neutral-rich-gray">{state.comment}</p>}
      </div>
      <div className="flex w-full shrink-0 gap-4 sm:justify-end">
        <Button className="w-full sm:w-[165px]" variant="outline" onClick={() => setCurrent(2)}>
          Back
        </Button>
        <Button className="w-full sm:w-[165px]" isLoading={loading} onClick={onSubmit} disabled={!ready}>
          {ready ? 'Sign' : 'Ready...'}
        </Button>
      </div>
    </React.Fragment>
  );
}

const steps = [Step1, Step2, Step3, Step4];

export function AddAttestation() {
  const { current, open, onOpenChange } = useAttestation();

  const Component = steps[current] || null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-full flex-col gap-5 px-5 pt-0 sm:h-auto sm:w-[900px] sm:max-w-[900px] sm:gap-6 sm:px-8 sm:pb-8 sm:pt-16">
        <MobileModalHeader />
        <Steps currentStep={current + 1} totalStep={steps.length} />
        <Component />
      </DialogContent>
    </Dialog>
  );
}
