import { DateTime, DurationObjectUnits } from 'luxon';
import { FetchResult, Nft, Transaction } from 'model';

export const queryParamsParser: (params: string) => Map<string, string> | null =
  (params: string) => {
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

export const isOlderThanHours = (timestamp: number, hours: number): boolean => {
  const date: DateTime = DateTime.fromMillis(timestamp);
  const diff: DurationObjectUnits = DateTime.now()
    .diff(date, 'hours')
    .toObject();

  return (diff.hours as number) > hours;
};

export const checkNftOwnership = (
  nftResult: FetchResult<Nft>,
  nftColletionAddress: string,
  transactionResult: FetchResult<Transaction>
): boolean => {
  if (nftResult.success && nftResult.data.length) {
    const foundNft: Nft | undefined = nftResult.data.find(
      (nft: Nft) => nft.collection === nftColletionAddress
    );

    if (
      !!foundNft &&
      transactionResult.success &&
      transactionResult.data.length
    ) {
      const nftTransaction: Transaction | undefined =
        transactionResult.data.find(
          (transaction: Transaction) => transaction.data === foundNft.data // FIXME: Find something common between NFT and its transaction
        );

      return !!nftTransaction && isOlderThanHours(nftTransaction.timestamp, 48);
    }
  }

  return false;
};
