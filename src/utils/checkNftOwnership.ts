export const checkNftOwnership = ({
  accountNftsResult,
  transactionsCountResult
}: {
  accountNftsResult: any;
  transactionsCountResult: any;
}) => {
  return Boolean(accountNftsResult.data.length && transactionsCountResult.data);
};
