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

export interface TransactionAction {
  category: string;
  name: string;
  description: string;
  arguments: any;
}

export interface Transaction {
  txHash: string;
  gasLimit: number;
  gasPrice: number;
  gasUsed: number;
  miniBlockHash: string;
  nonce: number;
  receiver: string;
  receiverAssets: any;
  receiverShard: number;
  round: number;
  sender: string;
  senderAssets: any;
  senderShard: number;
  signature: string;
  status: string;
  value: string;
  fee: string;
  timestamp: number;
  data: string;
  function: string;
  action: TransactionAction;
  scamInfo: {
    type: string;
    info: string;
  };
  type: Transaction;
  originalTxHash: string;
  pendingResults: boolean;
}

export interface GetAccountTransfers {
  apiAddress: string;
  accountAddress: string;
  before?: number;
  after?: number;
  token?: string;
}
