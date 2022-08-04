export interface VerificationProps {
  nftCollectionHash: string;
  callbackUrl?: string;
}

export class VerificationState {
  constructor(public blockHash = '', public refreshRate: number = 30000) {}
}
