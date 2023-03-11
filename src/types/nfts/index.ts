import { GetAccountTransfers } from 'types/transactions';

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

export interface GetAccountNfts extends GetAccountTransfers {
  collections: string[];
}

export interface GetCollectionNfts {
  apiAddress: string;
  collection: string;
}

export enum AgeEnum {
  oneHour = '3600',
  oneDay = '86400',
  oneWeek = '604800',
  oneMonth = '2628288',
  oneYear = '31556952'
}
