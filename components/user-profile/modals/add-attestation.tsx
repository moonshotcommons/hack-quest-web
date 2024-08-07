'use client';

import * as React from 'react';
import { SchemaEncoder, AttestationShareablePackageObject } from '@ethereum-attestation-service/eas-sdk';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { MobileModalHeader } from './mobile-modal-header';
import { AttestButton } from '../common/attest-button';
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
import { useUserStore } from '@/store/zustand/userStore';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { eas, refUID, schemaUID, submitSignedAttestation } from '../utils/utils';
import { ethers } from 'ethers';
import dayjs from 'dayjs';
import { useEthersSigner } from '../utils/wagmi-utils';

type Store = {
  current: number;
  open: boolean;
  state: Record<string, any>;
  setCurrent: (current: number) => void;
  setState: (newState: Record<string, any>) => void;
  onOpenChange: (open: boolean) => void;
  reset: () => void;
};

const useAttestation = create<Store>((set) => ({
  current: 0,
  state: {},
  open: false,
  setCurrent: (current) => set({ current }),
  setState: (newState = {}) => set((initState) => ({ state: { ...initState.state, ...newState } })),
  onOpenChange: (open) => set({ open }),
  reset: () => set({ current: 0, state: {}, open: false })
}));

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
  const { setCurrent } = useAttestation();
  return (
    <React.Fragment>
      <h2 className="shrink-0 text-lg font-bold sm:text-[22px]">Choose a Service</h2>
      <div className="flex flex-1 flex-col gap-6">
        <RadioCards defaultValue="evs">
          <RadioCardsItem
            value="evs"
            className="flex items-center gap-4 aria-checked:border-yellow-dark aria-checked:bg-yellow-extra-light"
          >
            <div className="relative h-8 w-8 justify-center overflow-hidden rounded-full">
              <Image src="/images/profile/evs.svg" alt="evs" fill />
            </div>
            <span className="text-left font-bold">EAS</span>
          </RadioCardsItem>
        </RadioCards>
      </div>
      <Button className="w-full shrink-0 sm:w-[165px] sm:self-end" onClick={() => setCurrent(2)}>
        Continue
      </Button>
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
    } else {
      document.body.style.pointerEvents = 'none';
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
      <Button className="w-full shrink-0 sm:w-[165px] sm:self-end" onClick={onSubmit}>
        Continue
      </Button>
    </React.Fragment>
  );
}

function Step4() {
  const { username } = useParams();
  const { invalidate } = useProfile();
  const { address } = useAccount();
  const { state, reset } = useAttestation();
  const signer = useEthersSigner();
  const [loading, setLoading] = React.useState(false);

  async function createAttestation(data: { attest: boolean; comment?: string }) {
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

      eas.connect(signer);

      const offchain = await eas.getOffchain();

      const offchainAttestation = await offchain.signOffchainAttestation(
        {
          schema: schemaUID,
          recipient: ethers.ZeroAddress,
          refUID: refUID,
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
          ...state,
          username,
          chain: {
            ipfsHash: attestation.ipfsHash,
            offchainAttestationId: attestation.offchainAttestationId
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

  const create = useMutation({
    mutationFn: (input: any) => webApi.userApi.createAttestation(input),
    onSuccess() {
      toast.success('Attestation created');
      reset();
      invalidate();
    }
  });

  function onSubmit() {
    createAttestation({
      attest: state?.attest === 'true',
      comment: state?.comment
    });
  }

  return (
    <React.Fragment>
      <h2 className="shrink-0 text-lg font-bold sm:text-[22px]">Sign Attestation</h2>
      <p className="font-bold">Add attestation to Hack Quester’s Solana Learner Certificate:</p>
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
      <Button className="w-full shrink-0 sm:w-[165px] sm:self-end" isLoading={loading} onClick={onSubmit}>
        Sign
      </Button>
    </React.Fragment>
  );
}

const steps = [Step1, Step2, Step3, Step4];

export function AddAttestation({
  type,
  sourceId
}: {
  type: 'Certification' | 'Experience' | 'Hackathon';
  sourceId: string;
}) {
  const { current, open, setState, onOpenChange } = useAttestation();
  const { userInfo, setAuthModalOpen } = useUserStore();

  const Component = steps[current] || null;

  function onClick() {
    if (!userInfo) {
      setAuthModalOpen(true);
      return;
    }
    setState({ type, sourceId });
    onOpenChange(true);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <AttestButton onClick={onClick} />
      </DialogTrigger>
      <DialogContent className="flex h-screen flex-col gap-5 px-5 pt-0 sm:h-auto sm:w-[900px] sm:max-w-[900px] sm:gap-6 sm:px-8 sm:pb-8 sm:pt-16">
        <MobileModalHeader />
        <Steps currentStep={current + 1} totalStep={steps.length} />
        <Component />
      </DialogContent>
    </Dialog>
  );
}
