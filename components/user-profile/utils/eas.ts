import { AttestationShareablePackageObject } from '@ethereum-attestation-service/eas-sdk';
import axios from 'axios';
import { EAS_BASE_URL } from './constants';

type StoreIPFSActionReturn = {
  error: null | string;
  ipfsHash: string | null;
  offchainAttestationId: string | null;
};

type StoreAttestationRequest = {
  filename: string;
  textJson: string;
};

export async function submitSignedAttestation(pkg: AttestationShareablePackageObject) {
  const data: StoreAttestationRequest = {
    filename: `schema-186-attestation-${Math.round(Date.now() / 1000)}.eas.txt`,
    textJson: JSON.stringify(pkg)
  };

  return await axios.post<StoreIPFSActionReturn>(`${EAS_BASE_URL}/offchain/store`, data);
}
