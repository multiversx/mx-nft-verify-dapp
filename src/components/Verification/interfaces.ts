export interface VerificationProps {
  nftCollectionHash: string;
  callbackUrl?: string;
}

export class VerificationState {
  constructor(
    public blockHash = '',
    public secondsLeft: number = 0,
    public refreshRate: number = 30000
  ) {}
}
