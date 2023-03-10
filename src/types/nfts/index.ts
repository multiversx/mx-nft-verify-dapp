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
  oneHour = '1 hour',
  oneDay = '1 day',
  oneWeek = '1 week',
  oneMonth = '1 month',
  oneYear = '1 year'
}
