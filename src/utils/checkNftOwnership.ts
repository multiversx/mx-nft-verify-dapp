import { FetchResult, Nft } from 'types';

export const checkNftOwnership = ({
  accountNftsResult,
  transactionsCountResult
}: {
  accountNftsResult: FetchResult<Nft>;
  transactionsCountResult: FetchResult<number>;
}) => {
  if (accountNftsResult && transactionsCountResult) {
    return Boolean(
      accountNftsResult.data?.length && transactionsCountResult.data
    );
  }

  return false;
};
