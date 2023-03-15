import { GetAccountTransfers } from 'types/transactions';

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
