import { DateTime } from 'luxon';
import {
  FetchResult,
  Nft,
  NftTransferArgument,
  Transaction,
  TransactionAction
} from 'types';

const NFT_CATEGORY = 'esdtNft';

export const queryParamsParser = (params: string) => {
  if (!params?.length) {
    return null;
  }

  const queryParamsMap: Map<string, string> = new Map();

  params.split('&').forEach((param: string, index: number) => {
    const keyValues: string[] = param.split('=');
    const key: string =
      index > 0 ? keyValues[0] : keyValues[0].replace('?', '');
    const value: string | number = keyValues[1];

    queryParamsMap.set(key, value);
  });

  return queryParamsMap;
};

export const getTimestamp = (timeField: string, units: number) =>
  DateTime.local()
    .plus({ [timeField]: units })
    .toMillis();

export const checkNftOwnership = (
  accountNftsResult: FetchResult<Nft>,
  transactionResult: FetchResult<Transaction>
) => {
  if (accountNftsResult.success && transactionResult.success) {
    return !!accountNftsResult.data.length && !transactionResult.data.length;
  }

  return false;
};

export const isNftTransfer = (transaction: Transaction, collection: string) => {
  const action: TransactionAction = transaction.action;

  if (action.category === NFT_CATEGORY && action.arguments.transfers?.length) {
    return action.arguments.transfers.some(
      (transfer: NftTransferArgument) => transfer.collection === collection
    );
  }

  return false;
};

export const asyncWrapper = async (asyncRequest: () => Promise<any>) => {
  try {
    const { data } = await asyncRequest();

    return {
      data,
      success: data !== undefined
    };
  } catch (e) {
    console.error(e);
    return {
      success: false
    };
  }
};