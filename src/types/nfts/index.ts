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

export enum AgeEnum {
  hour = '1 hour',
  day = '1 day',
  week = '1 week',
  month = '1 month',
  year = '1 year'
}
