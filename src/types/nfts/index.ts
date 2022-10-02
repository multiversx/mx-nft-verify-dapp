import { GetTransactions } from 'types/transactions';

export interface NftTransferArgument {
  collection: string;
  identifier: string;
  name: string;
  svgUrl: string;
  ticker: string;
  type: string;
  value: string;
}

export interface Nft {
  collection: string;
  timestamp: number;
  data: string;
}

export interface GetAccountNfts extends GetTransactions {
  collections: string[];
}

export interface GetCollectionNfts {
  apiAddress: string;
  collection: string;
}
