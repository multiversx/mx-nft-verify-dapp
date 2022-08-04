import { TxStatusType } from 'pages/Home/interfaces';

export interface VerificationProps {
  nftCollectionHash: string;
  callbackUrl?: string;
  handleVerificationResult: (result: TxStatusType) => void;
}

export class VerificationState {
  constructor(public blockHash = '', public refreshRate: number = 30000) {}
}
