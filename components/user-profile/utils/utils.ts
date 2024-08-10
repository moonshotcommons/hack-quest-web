import { AttestationShareablePackageObject, EAS } from '@ethereum-attestation-service/eas-sdk';
import axios from 'axios';

type StoreIPFSActionReturn = {
  error: null | string;
  ipfsHash: string | null;
  offchainAttestationId: string | null;
};

type StoreAttestationRequest = {
  filename: string;
  textJson: string;
};

export const baseURL = 'https://easscan.org';

export const EASContractAddress = '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587';

export const schemaUID = '0xa5339faa62ade78a69470f5882104959e53e286d229ba2658f6fc38fbe0a1d61';

export const refUID = '0x0000000000000000000000000000000000000000000000000000000000000000';

export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const eas = new EAS(EASContractAddress);

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export async function submitSignedAttestation(pkg: AttestationShareablePackageObject) {
  const data: StoreAttestationRequest = {
    filename: `schema-186-attestation-${Math.round(Date.now() / 1000)}.eas.txt`,
    textJson: JSON.stringify(pkg)
  };

  return await axios.post<StoreIPFSActionReturn>(`${baseURL}/offchain/store`, data);
}
