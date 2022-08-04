export interface ScResultType {
  callType: string;
  gasLimit: number;
  gasPrice: number;
  nonce: number;
  prevTxHash: string;
  receiver?: string;
  sender: string;
  value: string;
  data?: string;
  returnMessage?: string;
}

export type TxStatusType = 'pending' | 'notExecuted' | 'success' | 'fail';

export interface TransactionType {
  epoch: number;
  gasConsumed: number;
  gasPenalized: number;
  gasRefunded: number;
  hash: string;
  maxGasLimit: number;
  nonce: number;
  prevHash: string;
  proposer: string;
  pubKeyBitmap: string;
  round: number;
  shard: number;
  size: number;
  sizeTxs: number;
  stateRootHash: string;
  timestamp: number;
  txCount: number;
}

export interface StateType {
  transactions: TransactionType[];
  transactionsFetched: boolean | undefined;
}

export class HomeState {
  constructor(
    public nftCollectionHash: string = '',
    public callbackUrl?: string,
    public isVerified: boolean = false,
    public isValidated: boolean = false
  ) {}
}
