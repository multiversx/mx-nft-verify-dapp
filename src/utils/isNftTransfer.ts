import { NftTransferArgument, Transaction, TransactionAction } from 'types';

const NFT_CATEGORY = 'esdtNft';

export const isNftTransfer = (transaction: Transaction, collection: string) => {
  const action: TransactionAction = transaction.action;

  if (action.category === NFT_CATEGORY && action.arguments.transfers?.length) {
    return action.arguments.transfers.some(
      (transfer: NftTransferArgument) => transfer.collection === collection
    );
  }

  return false;
};
