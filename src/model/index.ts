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

export interface NftTransferArgument {
  collection: string;
  identifier: string;
  name: string;
  svgUrl: string;
  ticker: string;
  type: string;
  value: string;
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

export interface Nft {
  collection: string;
  timestamp: number;
  data: string;
}

export interface GetBlocks {
  apiAddress: string;
  size: number;
  url?: string;
}
export interface GetTransactions {
  apiAddress: string;
  accountAddress: number;
  before?: number;
  after?: number;
  token?: string;
}

export interface GetAccountNfts extends GetTransactions {
  collections: string[];
}

export interface GetCollectionNfts {
  apiAddress: string;
  collection: string;
}

export interface FetchResult<T> {
  data: T[];
  success: boolean;
}
