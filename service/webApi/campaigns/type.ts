export interface CertificationType {
  name: string;
  description: string;
  image: string;
  exp: number;
  credits: number;
  id: string;
  claimed: boolean;
  mint: boolean;
  signatureId: number;
  template: string;
  contract: `0x${string}` | null;
  chainId: number;
}

export interface UserCertificateInfo extends CertificationType {
  certificateId: number;
  certificateTime: string;
  username: string;
  contract: `0x${string}`;
  extra: any;
  certificateImage: string;
}

export interface MantleType {
  id: string;
  name: string;
  title: string;
  description: string;
  progress: [number, number];
  sequence: number;
  completed: boolean;
  claimed: boolean;
  certification: UserCertificateInfo;
}

export enum TargetType {
  COURSE = 'COMPLETE_COURSE',
  LEARNING_TRACK = 'COMPLETE_LEARNING_TRACK',
  TWITTER = 'FOLLOW_TWITTER',
  DISCORD = 'JOIN_DISCORD',
  GIUHUB = 'CONNECT_GITHUB'
}
export interface TargetsType {
  id: string;
  campaignId: string;
  name: string;
  title: string;
  progress: [number, number];
  sequence: number;
  completed: boolean;
  claimed: boolean;
  reward: number;
  type: TargetType;
  extra?: {
    url: string;
  };
}

export interface GetSignatureParams {
  address: string;
}

export interface SignatureData {
  msg: string;
  signature: `0x${string}`;
}
